import * as THREE from "three";
import { IslandGenerator, ISLAND_STATIONS, IslandStation } from "./IslandGenerator";
import { DroneController, DroneInput } from "./DroneController";
import { ThrusterParticles } from "./ThrusterParticles";
import { KioskManager, KioskItem } from "./KioskManager";
import { SkillCrystalsManager, SkillCrystal } from "./SkillCrystals";

export interface EngineCallbacks {
  onNearKioskChange?: (kiosk: KioskItem | null) => void;
  onNearBeaconChange?: (isNear: boolean) => void;
  onCollectSkill?: (skill: SkillCrystal, totalCollected: number, maxCount: number) => void;
  onPositionUpdate?: (pos: { x: number; y: number; z: number; heading: number }) => void;
}

export class ArchipelagoEngine {
  private container: HTMLElement;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;

  public drone: DroneController;
  public thrusters: ThrusterParticles;
  public kioskManager: KioskManager;
  public skillManager: SkillCrystalsManager;

  private clouds: THREE.Group[] = [];
  private waterRing: THREE.Mesh | null = null;
  private isNearBeacon: boolean = false;

  // Camera follow state
  private cameraTarget: THREE.Vector3 = new THREE.Vector3();
  private cameraOffset: THREE.Vector3 = new THREE.Vector3(0, 5.5, -12);
  private cameraLookOffset: THREE.Vector3 = new THREE.Vector3(0, 1.5, 6);

  // Input state
  private input: DroneInput = {
    forward: 0,
    turn: 0,
    up: 0,
    boost: false,
  };

  private isRunning: boolean = false;
  private lastTime: number = 0;
  private callbacks: EngineCallbacks;

  constructor(container: HTMLElement, callbacks: EngineCallbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;

    // 1. Scene setup with soft pastel sky fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdbeafe); // Soft sky blue
    this.scene.fog = new THREE.FogExp2(0xdbeafe, 0.0035);

    // 2. Camera setup
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(58, aspect, 0.1, 1000);
    this.camera.position.set(0, 14, -20);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    container.appendChild(this.renderer.domElement);

    // 4. Lighting setup
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x64748b, 0.9);
    hemiLight.position.set(0, 60, 0);
    this.scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.8); // warm sunny tone
    sunLight.position.set(70, 120, 60);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 400;
    const d = 140;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    this.scene.add(sunLight);

    // 5. Build Environment
    const { clouds, waterRing } = IslandGenerator.createArchipelago(this.scene);
    this.clouds = clouds;
    this.waterRing = waterRing;

    // 6. Spawn Drone & Systems
    this.drone = new DroneController(this.scene);
    this.thrusters = new ThrusterParticles(this.scene);

    this.kioskManager = new KioskManager(this.scene, (kiosk) => {
      this.callbacks.onNearKioskChange?.(kiosk);
    });

    this.skillManager = new SkillCrystalsManager(this.scene, (skill, count) => {
      this.callbacks.onCollectSkill?.(skill, count, this.skillManager.getTotal());
    });

    // 7. Event listeners
    this.setupKeyboard();
    window.addEventListener("resize", this.handleResize);

    // Start loop
    this.isRunning = true;
    this.lastTime = performance.now();
    this.animate();
  }

  private setupKeyboard() {
    window.addEventListener("keydown", (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          this.input.forward = 1;
          break;
        case "KeyS":
        case "ArrowDown":
          this.input.forward = -1;
          break;
        case "KeyA":
        case "ArrowLeft":
          this.input.turn = -1;
          break;
        case "KeyD":
        case "ArrowRight":
          this.input.turn = 1;
          break;
        case "KeyQ":
          this.input.up = -1;
          break;
        case "KeyE":
          // If near kiosk, this will be handled by UI inspect
          this.input.up = 1;
          break;
        case "Space":
          this.input.boost = true;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
        case "KeyS":
        case "ArrowDown":
          this.input.forward = 0;
          break;
        case "KeyA":
        case "ArrowLeft":
        case "KeyD":
        case "ArrowRight":
          this.input.turn = 0;
          break;
        case "KeyQ":
        case "KeyE":
          this.input.up = 0;
          break;
        case "Space":
          this.input.boost = false;
          break;
      }
    });
  }

  // Update input from mobile virtual joystick
  public setVirtualInput(forward: number, turn: number, boost: boolean) {
    this.input.forward = forward;
    this.input.turn = turn;
    this.input.boost = boost;
  }

  // Teleport to named island
  public fastTravelTo(islandId: string) {
    const station = ISLAND_STATIONS.find((s) => s.id === islandId);
    if (station) {
      this.drone.teleportTo(station.position);
    }
  }

  private handleResize = () => {
    if (!this.container) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private animate = () => {
    if (!this.isRunning) return;

    requestAnimationFrame(this.animate);

    const now = performance.now();
    const delta = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    // 1. Update Drone physics & mesh
    this.drone.update(delta, this.input);

    // 2. Emit thruster particles
    const [leftThruster, rightThruster] = this.drone.getThrusterWorldPositions();
    const speed = this.drone.velocity.length();
    if (speed > 1 || this.input.boost) {
      this.thrusters.emit(leftThruster, this.drone.velocity, this.input.boost);
      this.thrusters.emit(rightThruster, this.drone.velocity, this.input.boost);
    }
    this.thrusters.update(delta);

    // 3. Update Kiosks & Skill Crystals
    this.kioskManager.update(delta, this.drone.position);
    this.skillManager.update(delta, this.drone.position);

    // 4. Check Contact Beacon proximity (65, -2, 75)
    const beaconDist = this.drone.position.distanceTo(new THREE.Vector3(65, 0, 75));
    const isNowNearBeacon = beaconDist < 18;
    if (isNowNearBeacon !== this.isNearBeacon) {
      this.isNearBeacon = isNowNearBeacon;
      this.callbacks.onNearBeaconChange?.(this.isNearBeacon);
    }

    // 5. Slowly rotate clouds
    this.clouds.forEach((cloud, i) => {
      cloud.rotation.y += delta * (0.015 + (i % 3) * 0.008);
    });

    // 6. Water wave pulse
    if (this.waterRing) {
      this.waterRing.rotation.z += delta * 0.01;
    }

    // 7. Smooth Chase Camera
    const dronePos = this.drone.position;
    const droneYaw = this.drone.yaw;

    // Calculate ideal camera position behind the drone
    const backward = new THREE.Vector3(
      -Math.sin(droneYaw) * this.cameraOffset.z,
      this.cameraOffset.y,
      -Math.cos(droneYaw) * this.cameraOffset.z
    );
    const idealCamPos = new THREE.Vector3().copy(dronePos).add(backward);

    // Camera look-at target slightly ahead of drone
    const forward = new THREE.Vector3(
      Math.sin(droneYaw) * this.cameraLookOffset.z,
      this.cameraLookOffset.y,
      Math.cos(droneYaw) * this.cameraLookOffset.z
    );
    const idealLookAt = new THREE.Vector3().copy(dronePos).add(forward);

    // Smooth lerp
    this.camera.position.lerp(idealCamPos, delta * 4.5);
    this.cameraTarget.lerp(idealLookAt, delta * 6.5);
    this.camera.lookAt(this.cameraTarget);

    // 8. Notify HUD of player position
    this.callbacks.onPositionUpdate?.({
      x: dronePos.x,
      y: dronePos.y,
      z: dronePos.z,
      heading: droneYaw,
    });

    // Render frame
    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    this.isRunning = false;
    window.removeEventListener("resize", this.handleResize);
    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
