import * as THREE from "three";
import { soundEngine } from "@/lib/audio";

export interface DroneInput {
  forward: number; // -1 to 1
  turn: number; // -1 to 1
  up: number; // -1 to 1
  boost: boolean;
}

export class DroneController {
  public mesh: THREE.Group;
  public position: THREE.Vector3;
  public velocity: THREE.Vector3;
  public yaw: number = 0; // heading in radians
  public roll: number = 0; // banking tilt in radians
  public pitch: number = 0;

  // Flight parameters
  private maxSpeed: number = 32;
  private boostMultiplier: number = 1.9;
  private turnSpeed: number = 2.4;
  private acceleration: number = 42;
  private damping: number = 0.94;
  private hoverHeight: number = 4.5;
  private hoverTime: number = 0;

  // Visual sub-meshes for animation
  private leftRotor: THREE.Mesh;
  private rightRotor: THREE.Mesh;
  private thrusterGlowLeft: THREE.Mesh;
  private thrusterGlowRight: THREE.Mesh;

  // Teleportation state
  private isTeleporting: boolean = false;
  private teleportTarget: THREE.Vector3 | null = null;
  private teleportProgress: number = 0;
  private teleportStart: THREE.Vector3 = new THREE.Vector3();

  constructor(scene: THREE.Scene) {
    this.mesh = new THREE.Group();
    this.position = this.mesh.position;
    this.velocity = new THREE.Vector3(0, 0, 0);

    // Initial spawn location (Welcome Island landing pad)
    this.position.set(0, this.hoverHeight, 0);

    // Build stylized Cyber Drone 3D model
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // dark sleek slate
      metalness: 0.8,
      roughness: 0.2,
      flatShading: true,
    });

    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, // glowing cyan glass
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
    });

    const neonMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    // 1. Central fuselage (tapered wedge)
    const bodyGeo = new THREE.ConeGeometry(1.4, 3.8, 6);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.x = Math.PI / 2;
    body.rotation.z = Math.PI;
    body.scale.set(1.2, 1, 0.5);
    body.castShadow = true;
    this.mesh.add(body);

    // 2. Cockpit visor / canopy
    const visorGeo = new THREE.SphereGeometry(0.85, 8, 6);
    const visor = new THREE.Mesh(visorGeo, canopyMat);
    visor.position.set(0, 0.35, 0.4);
    visor.scale.set(0.9, 0.5, 1.4);
    this.mesh.add(visor);

    // 3. Wings & Thruster Nacelles
    const wingGeo = new THREE.BoxGeometry(4.2, 0.15, 0.9);
    const wing = new THREE.Mesh(wingGeo, bodyMat);
    wing.position.set(0, 0.1, -0.2);
    this.mesh.add(wing);

    // Left nacelle
    const nacelleGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.2, 8);
    const leftNacelle = new THREE.Mesh(nacelleGeo, bodyMat);
    leftNacelle.position.set(-2.2, 0.15, -0.2);
    leftNacelle.rotation.x = Math.PI / 2;
    this.mesh.add(leftNacelle);

    // Right nacelle
    const rightNacelle = new THREE.Mesh(nacelleGeo, bodyMat);
    rightNacelle.position.set(2.2, 0.15, -0.2);
    rightNacelle.rotation.x = Math.PI / 2;
    this.mesh.add(rightNacelle);

    // Spinning rotor blades inside nacelles
    const rotorGeo = new THREE.BoxGeometry(0.9, 0.04, 0.15);
    const rotorMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
    this.leftRotor = new THREE.Mesh(rotorGeo, rotorMat);
    this.leftRotor.position.set(-2.2, 0.15, -0.2);
    this.mesh.add(this.leftRotor);

    this.rightRotor = new THREE.Mesh(rotorGeo, rotorMat);
    this.rightRotor.position.set(2.2, 0.15, -0.2);
    this.mesh.add(this.rightRotor);

    // Emissive thruster glow rings (back)
    const glowGeo = new THREE.RingGeometry(0.2, 0.45, 12);
    this.thrusterGlowLeft = new THREE.Mesh(glowGeo, neonMat);
    this.thrusterGlowLeft.position.set(-2.2, 0.15, -0.82);
    this.mesh.add(this.thrusterGlowLeft);

    this.thrusterGlowRight = new THREE.Mesh(glowGeo, neonMat);
    this.thrusterGlowRight.position.set(2.2, 0.15, -0.82);
    this.mesh.add(this.thrusterGlowRight);

    // Dual forward headlights
    const lightL = new THREE.SpotLight(0x38bdf8, 3, 35, Math.PI / 5, 0.5);
    lightL.position.set(-0.6, 0.2, 1.8);
    lightL.target.position.set(-0.6, -0.5, 15);
    this.mesh.add(lightL);
    this.mesh.add(lightL.target);

    const lightR = new THREE.SpotLight(0x38bdf8, 3, 35, Math.PI / 5, 0.5);
    lightR.position.set(0.6, 0.2, 1.8);
    lightR.target.position.set(0.6, -0.5, 15);
    this.mesh.add(lightR);
    this.mesh.add(lightR.target);

    scene.add(this.mesh);
  }

  public update(delta: number, input: DroneInput) {
    this.hoverTime += delta * 2.5;

    // Handle fast-travel interpolation
    if (this.isTeleporting && this.teleportTarget) {
      this.teleportProgress += delta * 1.5;
      if (this.teleportProgress >= 1) {
        this.position.copy(this.teleportTarget);
        this.position.y += this.hoverHeight;
        this.velocity.set(0, 0, 0);
        this.isTeleporting = false;
        this.teleportTarget = null;
      } else {
        const ease = 0.5 - Math.cos(this.teleportProgress * Math.PI) / 2;
        this.position.lerpVectors(this.teleportStart, this.teleportTarget, ease);
        this.position.y = this.teleportStart.y + Math.sin(this.teleportProgress * Math.PI) * 20;
      }
      this.mesh.rotation.y = this.yaw;
      return;
    }

    // 1. Steering & Yaw rotation
    if (Math.abs(input.turn) > 0.05) {
      this.yaw -= input.turn * this.turnSpeed * delta;
    }

    // 2. Banking (Roll) tilt when turning
    const targetRoll = -input.turn * 0.45;
    this.roll = THREE.MathUtils.lerp(this.roll, targetRoll, delta * 6);

    // 3. Pitch tilt when moving forward/back
    const targetPitch = input.forward * 0.25;
    this.pitch = THREE.MathUtils.lerp(this.pitch, targetPitch, delta * 6);

    // Apply rotations
    this.mesh.rotation.set(0, 0, 0);
    this.mesh.rotation.y = this.yaw;
    this.mesh.rotation.z = this.roll;
    this.mesh.rotation.x = this.pitch;

    // 4. Forward thrust
    const forwardVec = new THREE.Vector3(
      Math.sin(this.yaw),
      0,
      Math.cos(this.yaw)
    );

    const speedCap = input.boost ? this.maxSpeed * this.boostMultiplier : this.maxSpeed;

    if (Math.abs(input.forward) > 0.05) {
      const accel = this.acceleration * (input.boost ? 1.6 : 1.0);
      this.velocity.addScaledVector(forwardVec, input.forward * accel * delta);
    }

    // Vertical control (Up / Down / Hover)
    if (Math.abs(input.up) > 0.05) {
      this.velocity.y += input.up * 20 * delta;
    }

    // Dampen horizontal velocity
    this.velocity.x *= Math.pow(this.damping, delta * 60);
    this.velocity.z *= Math.pow(this.damping, delta * 60);
    this.velocity.y *= Math.pow(0.9, delta * 60);

    // Clamp speed
    const horizSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
    if (horizSpeed > speedCap) {
      const factor = speedCap / horizSpeed;
      this.velocity.x *= factor;
      this.velocity.z *= factor;
    }

    // Apply movement
    this.position.x += this.velocity.x * delta;
    this.position.z += this.velocity.z * delta;
    this.position.y += this.velocity.y * delta;

    // Keep within world boundaries (soft clamp)
    const maxRadius = 180;
    const distFromCenter = Math.sqrt(this.position.x * this.position.x + this.position.z * this.position.z);
    if (distFromCenter > maxRadius) {
      const pull = (distFromCenter - maxRadius) * 0.5 * delta;
      this.position.x -= (this.position.x / distFromCenter) * pull;
      this.position.z -= (this.position.z / distFromCenter) * pull;
    }

    // Floor and ceiling limits with natural hovering wave
    const naturalHover = Math.sin(this.hoverTime) * 0.35;
    if (this.position.y < this.hoverHeight - 2) {
      this.position.y = THREE.MathUtils.lerp(this.position.y, this.hoverHeight + naturalHover, delta * 4);
    } else if (this.position.y > 60) {
      this.position.y = 60;
    }

    // Spin rotor blades
    const rotorSpeed = 25 + (horizSpeed / this.maxSpeed) * 35;
    this.leftRotor.rotation.y += rotorSpeed * delta;
    this.rightRotor.rotation.y += rotorSpeed * delta;

    // Pulse thruster glow brightness
    const glowScale = 1.0 + (horizSpeed / this.maxSpeed) * 0.8 + (input.boost ? 0.6 : 0);
    this.thrusterGlowLeft.scale.set(glowScale, glowScale, 1);
    this.thrusterGlowRight.scale.set(glowScale, glowScale, 1);

    // Audio modulation
    soundEngine.updateEngine(horizSpeed / this.maxSpeed, input.boost);
  }

  // Fast-travel smoothly to target coordinates
  public teleportTo(target: THREE.Vector3) {
    soundEngine.playWhoosh();
    this.isTeleporting = true;
    this.teleportProgress = 0;
    this.teleportStart.copy(this.position);
    this.teleportTarget = target.clone();
    // Look toward destination
    const dir = new THREE.Vector3().subVectors(target, this.position);
    this.yaw = Math.atan2(dir.x, dir.z);
  }

  // Get exhaust thruster world coordinates for particle trails
  public getThrusterWorldPositions(): [THREE.Vector3, THREE.Vector3] {
    const leftLocal = new THREE.Vector3(-2.2, 0.15, -0.85);
    const rightLocal = new THREE.Vector3(2.2, 0.15, -0.85);

    this.mesh.localToWorld(leftLocal);
    this.mesh.localToWorld(rightLocal);

    return [leftLocal, rightLocal];
  }
}
