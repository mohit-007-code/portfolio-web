import * as THREE from "three";
import { SKILL_CATEGORIES } from "@/data/skills";
import { soundEngine } from "@/lib/audio";

export interface SkillCrystal {
  name: string;
  category: string;
  level: string;
  position: THREE.Vector3;
  mesh: THREE.Group;
  collected: boolean;
  colorHex: number;
}

export class SkillCrystalsManager {
  public crystals: SkillCrystal[] = [];
  private onCollectSkill?: (skill: SkillCrystal, totalCollected: number) => void;
  private collectedCount: number = 0;

  constructor(scene: THREE.Scene, onCollectSkill?: (skill: SkillCrystal, totalCollected: number) => void) {
    this.onCollectSkill = onCollectSkill;

    // Skill Grove center is (85, 7.5, -75)
    const center = new THREE.Vector3(85, 8.5, -75);

    // Collect all skills
    const allSkills: { name: string; category: string; level: string; color: number }[] = [];
    SKILL_CATEGORIES.forEach((cat) => {
      const color =
        cat.color === "cyan" ? 0x06b6d4 : cat.color === "purple" ? 0xa855f7 : 0xf43f5e;
      cat.skills.forEach((s) => {
        allSkills.push({
          name: s.name,
          category: cat.category,
          level: s.level,
          color,
        });
      });
    });

    // Place crystals in rings around the ancient tree
    allSkills.forEach((skill, idx) => {
      const ringRadius = 9 + (idx % 3) * 6;
      const angle = (idx / allSkills.length) * Math.PI * 2;
      const pos = new THREE.Vector3(
        center.x + Math.cos(angle) * ringRadius,
        center.y + 0.8 + (idx % 2) * 1.5,
        center.z + Math.sin(angle) * ringRadius
      );

      const group = new THREE.Group();
      group.position.copy(pos);

      // Stylized Octahedron / Icosahedron crystal gem
      const gemGeo = new THREE.OctahedronGeometry(1.2, 0);
      const gemMat = new THREE.MeshStandardMaterial({
        color: skill.color,
        emissive: skill.color,
        emissiveIntensity: 0.45,
        roughness: 0.1,
        metalness: 0.8,
        flatShading: true,
      });
      const gemMesh = new THREE.Mesh(gemGeo, gemMat);
      gemMesh.scale.set(0.8, 1.4, 0.8);
      group.add(gemMesh);

      // Glowing aura ring around crystal
      const auraGeo = new THREE.RingGeometry(1.6, 1.85, 12);
      const auraMat = new THREE.MeshBasicMaterial({
        color: skill.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const aura = new THREE.Mesh(auraGeo, auraMat);
      aura.rotation.x = -Math.PI / 2;
      aura.position.y = -1.2;
      group.add(aura);

      scene.add(group);

      this.crystals.push({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        position: pos,
        mesh: group,
        collected: false,
        colorHex: skill.color,
      });
    });
  }

  public update(delta: number, dronePos: THREE.Vector3) {
    const time = performance.now() * 0.003;

    this.crystals.forEach((crystal, idx) => {
      const gem = crystal.mesh.children[0] as THREE.Mesh;
      if (gem) {
        // Continuous rotation & hover bob
        gem.rotation.y += delta * 1.5;
        gem.rotation.x = Math.sin(time + idx) * 0.2;
        gem.position.y = Math.sin(time * 2 + idx) * 0.4;
      }

      // Proximity collection detection
      if (!crystal.collected && dronePos.distanceTo(crystal.position) < 4.8) {
        crystal.collected = true;
        this.collectedCount++;
        soundEngine.playChime(1.0 + (this.collectedCount % 5) * 0.15);

        // Visual collection pop
        crystal.mesh.scale.set(1.6, 1.6, 1.6);
        const aura = crystal.mesh.children[1] as THREE.Mesh;
        if (aura) {
          aura.scale.setScalar(2.0);
        }

        if (this.onCollectSkill) {
          this.onCollectSkill(crystal, this.collectedCount);
        }
      }

      // Smooth shrink back if collected
      if (crystal.collected) {
        crystal.mesh.scale.lerp(new THREE.Vector3(0.5, 0.5, 0.5), delta * 3);
      }
    });
  }

  public getTotal(): number {
    return this.crystals.length;
  }

  public getCollectedCount(): number {
    return this.collectedCount;
  }
}
