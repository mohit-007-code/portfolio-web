import * as THREE from "three";

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
}

export class ThrusterParticles {
  private particles: Particle[] = [];
  private maxParticles: number = 180;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private points: THREE.Points;

  private positions: Float32Array;
  private colors: Float32Array;

  constructor(scene: THREE.Scene) {
    this.positions = new Float32Array(this.maxParticles * 3);
    this.colors = new Float32Array(this.maxParticles * 3);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));

    this.material = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    scene.add(this.points);
  }

  public emit(pos: THREE.Vector3, droneVelocity: THREE.Vector3, isBoost: boolean) {
    if (this.particles.length >= this.maxParticles) {
      this.particles.shift();
    }

    const color = isBoost
      ? new THREE.Color(0xf59e0b).lerp(new THREE.Color(0xef4444), Math.random() * 0.4) // Fiery orange/red
      : new THREE.Color(0x38bdf8).lerp(new THREE.Color(0xa855f7), Math.random() * 0.3); // Cyan/purple

    const spread = isBoost ? 0.4 : 0.2;
    const velocity = droneVelocity
      .clone()
      .multiplyScalar(-0.15)
      .add(
        new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread - 0.5,
          (Math.random() - 0.5) * spread
        )
      );

    this.particles.push({
      position: pos.clone(),
      velocity,
      life: 0,
      maxLife: 0.35 + Math.random() * 0.25,
      size: isBoost ? 1.0 : 0.6,
      color,
    });
  }

  public update(delta: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += delta;

      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
        continue;
      }

      p.position.addScaledVector(p.velocity, delta);
    }

    // Update GPU buffers
    for (let i = 0; i < this.maxParticles; i++) {
      if (i < this.particles.length) {
        const p = this.particles[i];
        const progress = p.life / p.maxLife;
        const fade = 1 - progress;

        this.positions[i * 3] = p.position.x;
        this.positions[i * 3 + 1] = p.position.y;
        this.positions[i * 3 + 2] = p.position.z;

        this.colors[i * 3] = p.color.r * fade;
        this.colors[i * 3 + 1] = p.color.g * fade;
        this.colors[i * 3 + 2] = p.color.b * fade;
      } else {
        // Place unused off-screen
        this.positions[i * 3] = 0;
        this.positions[i * 3 + 1] = -9999;
        this.positions[i * 3 + 2] = 0;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
  }
}
