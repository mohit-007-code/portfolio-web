import * as THREE from "three";
import { PROJECTS, Project } from "@/data/projects";

export interface KioskItem {
  project: Project;
  position: THREE.Vector3;
  mesh: THREE.Group;
  beaconRing: THREE.Mesh;
  glowLight: THREE.PointLight;
  isHovered: boolean;
}

export class KioskManager {
  public kiosks: KioskItem[] = [];
  private activeKiosk: KioskItem | null = null;
  private onNearKioskChange?: (kiosk: KioskItem | null) => void;

  constructor(scene: THREE.Scene, onNearKioskChange?: (kiosk: KioskItem | null) => void) {
    this.onNearKioskChange = onNearKioskChange;

    // Project Archipelago center is roughly (-85, 4, -80)
    const basePos = new THREE.Vector3(-85, 5.5, -80);

    // Arrange 5 project kiosks in an arc around the archipelago plaza
    const kioskOffsets: [number, number][] = [
      [-14, -10],
      [-7, 12],
      [8, 14],
      [15, -4],
      [2, -16],
    ];

    PROJECTS.forEach((project, idx) => {
      const offset = kioskOffsets[idx] || [0, 0];
      const pos = new THREE.Vector3(
        basePos.x + offset[0],
        basePos.y,
        basePos.z + offset[1]
      );

      const group = new THREE.Group();
      group.position.copy(pos);

      // 1. Hexagonal stone pedestal base
      const baseGeo = new THREE.CylinderGeometry(2.2, 2.6, 2.5, 6);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.7,
        flatShading: true,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = 1.25;
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      group.add(baseMesh);

      // 2. Levitating Hologram Monolith
      const monolithGeo = new THREE.BoxGeometry(2.2, 3.4, 0.4);
      const monolithMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(project.accent || "#38bdf8"),
        emissive: new THREE.Color(project.accent || "#38bdf8"),
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.9,
      });
      const monolith = new THREE.Mesh(monolithGeo, monolithMat);
      monolith.position.y = 4.8;
      group.add(monolith);

      // 3. Ground beacon ring
      const ringGeo = new THREE.RingGeometry(2.8, 3.2, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(project.accent || "#38bdf8"),
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.05;
      group.add(ring);

      // 4. Point light for glow
      const light = new THREE.PointLight(
        new THREE.Color(project.accent || "#38bdf8"),
        1.5,
        18
      );
      light.position.y = 5.2;
      group.add(light);

      scene.add(group);

      this.kiosks.push({
        project,
        position: pos,
        mesh: group,
        beaconRing: ring,
        glowLight: light,
        isHovered: false,
      });
    });
  }

  public update(delta: number, dronePos: THREE.Vector3) {
    let closestKiosk: KioskItem | null = null;
    let closestDist = Infinity;

    const time = performance.now() * 0.002;

    this.kiosks.forEach((kiosk) => {
      // Gentle floating bob & slow spin for monolith
      const monolith = kiosk.mesh.children[1] as THREE.Mesh;
      if (monolith) {
        monolith.rotation.y += delta * 0.8;
        monolith.position.y = 4.8 + Math.sin(time + kiosk.position.x) * 0.3;
      }

      // Proximity check
      const dist = dronePos.distanceTo(kiosk.position);
      const isNearby = dist < 14;

      if (isNearby && dist < closestDist) {
        closestDist = dist;
        closestKiosk = kiosk;
      }

      // Animate beacon ring pulse
      if (isNearby) {
        kiosk.beaconRing.scale.setScalar(1.0 + Math.sin(time * 4) * 0.15);
        kiosk.glowLight.intensity = 3.5;
      } else {
        kiosk.beaconRing.scale.setScalar(1.0);
        kiosk.glowLight.intensity = 1.2;
      }
    });

    if (closestKiosk !== this.activeKiosk) {
      this.activeKiosk = closestKiosk;
      if (this.onNearKioskChange) {
        this.onNearKioskChange(this.activeKiosk);
      }
    }
  }

  public getActiveKiosk(): KioskItem | null {
    return this.activeKiosk;
  }
}
