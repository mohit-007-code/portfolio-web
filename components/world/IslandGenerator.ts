import * as THREE from "three";

export interface IslandStation {
  id: string;
  name: string;
  description: string;
  position: THREE.Vector3;
  color: string;
}

export const ISLAND_STATIONS: IslandStation[] = [
  {
    id: "welcome",
    name: "Welcome Island",
    description: "Spawn pad & developer bio",
    position: new THREE.Vector3(0, 0, 0),
    color: "#38bdf8",
  },
  {
    id: "projects",
    name: "Project Archipelago",
    description: "Featured engineering kiosks",
    position: new THREE.Vector3(-85, 4, -80),
    color: "#a855f7",
  },
  {
    id: "skills",
    name: "Skill Grove",
    description: "Collectible tech crystals",
    position: new THREE.Vector3(85, 6, -75),
    color: "#10b981",
  },
  {
    id: "contact",
    name: "Contact Beacon",
    description: "Transmission tower & socials",
    position: new THREE.Vector3(65, -2, 75),
    color: "#f59e0b",
  },
];

export class IslandGenerator {
  public static createArchipelago(scene: THREE.Scene): {
    clouds: THREE.Group[];
    waterRing: THREE.Mesh;
  } {
    // Shared stylized materials
    const grassTopMaterial = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      flatShading: true,
      roughness: 0.8,
    });

    const rockBottomMaterial = new THREE.MeshStandardMaterial({
      color: 0x475569,
      flatShading: true,
      roughness: 0.9,
    });

    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      flatShading: true,
      roughness: 0.8,
    });

    const foliageMaterial = new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      flatShading: true,
      roughness: 0.7,
    });

    const autumnFoliageMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      flatShading: true,
      roughness: 0.7,
    });

    // Helper: Build a floating low-poly island
    const buildFloatingIsland = (
      radius: number,
      height: number,
      x: number,
      y: number,
      z: number,
      accentColor = 0x4ade80
    ): THREE.Group => {
      const island = new THREE.Group();
      island.position.set(x, y, z);

      // Top green plate (Cylinder with low radial segments)
      const topGeo = new THREE.CylinderGeometry(radius, radius * 0.9, 3, 7);
      const topMat = grassTopMaterial.clone();
      topMat.color.setHex(accentColor);
      const topMesh = new THREE.Mesh(topGeo, topMat);
      topMesh.castShadow = true;
      topMesh.receiveShadow = true;
      island.add(topMesh);

      // Bottom jagged cone (underside rock with stalactite feel)
      const bottomGeo = new THREE.ConeGeometry(radius * 0.95, height, 7);
      const bottomMesh = new THREE.Mesh(bottomGeo, rockBottomMaterial);
      bottomMesh.position.y = -height / 2;
      bottomMesh.rotation.x = Math.PI;
      bottomMesh.castShadow = true;
      bottomMesh.receiveShadow = true;
      island.add(bottomMesh);

      // Add a couple of small sub-rocks clinging to the underside
      for (let i = 0; i < 4; i++) {
        const subRockGeo = new THREE.DodecahedronGeometry(radius * 0.25, 0);
        const subRock = new THREE.Mesh(subRockGeo, rockBottomMaterial);
        const angle = (i / 4) * Math.PI * 2;
        subRock.position.set(
          Math.cos(angle) * radius * 0.6,
          -height * 0.35 + (i % 2) * 2,
          Math.sin(angle) * radius * 0.6
        );
        subRock.rotation.set(i, i * 2, i * 0.5);
        island.add(subRock);
      }

      scene.add(island);
      return island;
    };

    // Helper: Add stylized low-poly trees
    const addTree = (parent: THREE.Group, x: number, z: number, scale = 1, isAutumn = false) => {
      const tree = new THREE.Group();
      tree.position.set(x, 1.5, z);
      tree.scale.set(scale, scale, scale);

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.3, 0.45, 2, 5);
      const trunk = new THREE.Mesh(trunkGeo, woodMaterial);
      trunk.position.y = 1;
      trunk.castShadow = true;
      tree.add(trunk);

      // Foliage layers (2-3 stacked cones)
      const foliageMat = isAutumn ? autumnFoliageMaterial : foliageMaterial;
      for (let i = 0; i < 3; i++) {
        const coneGeo = new THREE.ConeGeometry(1.8 - i * 0.4, 1.8, 6);
        const cone = new THREE.Mesh(coneGeo, foliageMat);
        cone.position.y = 2.2 + i * 1.0;
        cone.castShadow = true;
        cone.receiveShadow = true;
        tree.add(cone);
      }

      parent.add(tree);
    };

    // 1. WELCOME ISLAND
    const welcomeIsland = buildFloatingIsland(28, 22, 0, 0, 0, 0x38bdf8);
    // Landing pad with neon glowing ring
    const padGeo = new THREE.CylinderGeometry(10, 10.2, 0.4, 16);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      flatShading: true,
      roughness: 0.6,
    });
    const padMesh = new THREE.Mesh(padGeo, padMat);
    padMesh.position.y = 1.7;
    welcomeIsland.add(padMesh);

    // Glowing pad runway border
    const ringGeo = new THREE.RingGeometry(9.6, 10.1, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 1.95;
    welcomeIsland.add(ringMesh);

    // Trees on Welcome Island edges
    addTree(welcomeIsland, 15, -6, 1.3);
    addTree(welcomeIsland, 17, 4, 1.1);
    addTree(welcomeIsland, -14, 8, 1.2);
    addTree(welcomeIsland, -16, -5, 1.4);

    // 2. PROJECT ARCHIPELAGO (Main hub + 2 satellite islets)
    const projectMain = buildFloatingIsland(34, 26, -85, 4, -80, 0xa855f7);
    const projectSat1 = buildFloatingIsland(16, 16, -118, 0, -65, 0x8b5cf6);
    const projectSat2 = buildFloatingIsland(18, 18, -60, 2, -115, 0x8b5cf6);

    // Decorative archway on Project Archipelago
    const archMat = new THREE.MeshStandardMaterial({ color: 0x64748b, flatShading: true });
    const pillar1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 9, 1.5), archMat);
    pillar1.position.set(-6, 4.5, 16);
    const pillar2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 9, 1.5), archMat);
    pillar2.position.set(6, 4.5, 16);
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(14, 1.6, 2), archMat);
    lintel.position.set(0, 9.5, 16);
    projectMain.add(pillar1);
    projectMain.add(pillar2);
    projectMain.add(lintel);

    // Add trees on project archipelago
    addTree(projectMain, 18, -12, 1.2, true);
    addTree(projectMain, -20, 10, 1.3);
    addTree(projectSat1, 5, 3, 1.1, true);
    addTree(projectSat2, -4, 4, 1.2);

    // 3. SKILL GROVE
    const skillIsland = buildFloatingIsland(30, 24, 85, 6, -75, 0x10b981);
    const skillSat = buildFloatingIsland(14, 14, 115, 2, -50, 0x059669);

    // Big ancient center tree
    const bigTrunk = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.8, 6, 7),
      woodMaterial
    );
    bigTrunk.position.set(0, 3, 0);
    skillIsland.add(bigTrunk);
    const bigFoliage = new THREE.Mesh(
      new THREE.DodecahedronGeometry(5.5, 1),
      new THREE.MeshStandardMaterial({ color: 0x10b981, flatShading: true })
    );
    bigFoliage.position.set(0, 7.5, 0);
    skillIsland.add(bigFoliage);

    addTree(skillIsland, 16, 10, 1.3);
    addTree(skillIsland, -15, -12, 1.4);
    addTree(skillSat, 0, 0, 1.1);

    // 4. CONTACT BEACON ISLAND
    const contactIsland = buildFloatingIsland(24, 20, 65, -2, 75, 0xf59e0b);

    // Satellite Transmission Tower
    const towerGeo = new THREE.CylinderGeometry(0.4, 2, 22, 5);
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.6,
      roughness: 0.3,
      flatShading: true,
    });
    const towerMesh = new THREE.Mesh(towerGeo, towerMat);
    towerMesh.position.set(0, 11, 0);
    contactIsland.add(towerMesh);

    // Satellite Dish on top
    const dishGeo = new THREE.CylinderGeometry(4.5, 0.8, 1.2, 8);
    const dishMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      flatShading: true,
      roughness: 0.4,
    });
    const dishMesh = new THREE.Mesh(dishGeo, dishMat);
    dishMesh.rotation.x = Math.PI * 0.35;
    dishMesh.position.set(0, 21, 2);
    contactIsland.add(dishMesh);

    // Glowing beacon orb at tower tip
    const beaconOrb = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    );
    beaconOrb.position.set(0, 23.5, 0);
    contactIsland.add(beaconOrb);

    // Stepping stones bridges between islands
    const createBridgePath = (from: THREE.Vector3, to: THREE.Vector3, count = 7) => {
      for (let i = 1; i < count; i++) {
        const t = i / count;
        const stonePos = new THREE.Vector3().lerpVectors(from, to, t);
        // Add a gentle sag in the middle
        stonePos.y -= Math.sin(t * Math.PI) * 5;

        const stoneGeo = new THREE.DodecahedronGeometry(1.8 + Math.sin(i) * 0.4, 0);
        const stone = new THREE.Mesh(stoneGeo, rockBottomMaterial);
        stone.position.copy(stonePos);
        stone.rotation.set(i * 0.3, i * 0.7, 0);
        stone.castShadow = true;
        scene.add(stone);
      }
    };

    createBridgePath(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-85, 4, -80), 8);
    createBridgePath(new THREE.Vector3(0, 0, 0), new THREE.Vector3(85, 6, -75), 8);
    createBridgePath(new THREE.Vector3(0, 0, 0), new THREE.Vector3(65, -2, 75), 7);

    // Clouds array
    const clouds: THREE.Group[] = [];
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
      roughness: 0.6,
      transparent: true,
      opacity: 0.88,
    });

    for (let c = 0; c < 16; c++) {
      const cloud = new THREE.Group();
      const numPuffs = 4 + Math.floor(Math.random() * 4);

      for (let p = 0; p < numPuffs; p++) {
        const puffSize = 3.5 + Math.random() * 4;
        const puffGeo = new THREE.DodecahedronGeometry(puffSize, 1);
        const puff = new THREE.Mesh(puffGeo, cloudMat);
        puff.position.set(
          (p - numPuffs / 2) * 3.5 + (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 3
        );
        cloud.add(puff);
      }

      const angle = (c / 16) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 70 + Math.random() * 90;
      cloud.position.set(
        Math.cos(angle) * dist,
        -15 + Math.random() * 35,
        Math.sin(angle) * dist
      );
      cloud.scale.setScalar(0.8 + Math.random() * 0.6);
      scene.add(cloud);
      clouds.push(cloud);
    }

    // Lower endless cloud / water layer
    const waterGeo = new THREE.PlaneGeometry(600, 600, 16, 16);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.65,
      roughness: 0.2,
      metalness: 0.1,
    });
    const waterRing = new THREE.Mesh(waterGeo, waterMat);
    waterRing.rotation.x = -Math.PI / 2;
    waterRing.position.y = -40;
    scene.add(waterRing);

    return { clouds, waterRing };
  }
}
