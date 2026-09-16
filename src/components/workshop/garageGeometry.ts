import * as THREE from 'three';

// Materials factory for workshop styling
export function createWorkshopMaterials(filter: string) {
  let mainColor = 0xb0b8c4;
  let accentColor = 0xf59e0b; // amber
  let steelColor = 0x64748b;
  let darkMetal = 0x1e2229;
  let carColor = 0xd97706; // metallic burnt amber/copper

  if (filter === 'cyber') {
    accentColor = 0x06b6d4; // cyan
    carColor = 0x0284c7;
    mainColor = 0x94a3b8;
  } else if (filter === 'blueprint') {
    accentColor = 0x38bdf8;
    carColor = 0x1e40af;
    mainColor = 0x60a5fa;
    darkMetal = 0x0f172a;
  } else if (filter === 'monochrome') {
    accentColor = 0xe2e8f0;
    carColor = 0x475569;
    mainColor = 0x94a3b8;
  }

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: mainColor,
    metalness: 0.95,
    roughness: 0.18,
    envMapIntensity: 1.2,
  });

  const spannerMaterial = new THREE.MeshStandardMaterial({
    color: 0xcfd8dc,
    metalness: 0.92,
    roughness: 0.22,
  });

  const darkSteelMaterial = new THREE.MeshStandardMaterial({
    color: darkMetal,
    metalness: 0.8,
    roughness: 0.4,
  });

  const accentGlowMaterial = new THREE.MeshStandardMaterial({
    color: accentColor,
    emissive: accentColor,
    emissiveIntensity: 0.6,
    metalness: 0.5,
    roughness: 0.2,
  });

  const carBodyMaterial = new THREE.MeshStandardMaterial({
    color: carColor,
    metalness: 0.88,
    roughness: 0.25,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
  } as THREE.MeshStandardMaterialParameters);

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0a101d,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.9,
    transparent: true,
    opacity: 0.75,
  });

  const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x3e2723,
    roughness: 0.85,
    metalness: 0.05,
  });

  const rubberMaterial = new THREE.MeshStandardMaterial({
    color: 0x111317,
    roughness: 0.9,
    metalness: 0.1,
  });

  return {
    chrome: chromeMaterial,
    spanner: spannerMaterial,
    darkSteel: darkSteelMaterial,
    accent: accentGlowMaterial,
    carBody: carBodyMaterial,
    glass: glassMaterial,
    wood: woodMaterial,
    rubber: rubberMaterial,
  };
}

/**
 * Creates the Hero 3D Spanner model
 * Precision dual-ended combination wrench: open jaw on bottom, ring eyelet on top
 */
export function create3DSpanner(materials: ReturnType<typeof createWorkshopMaterials>): THREE.Group {
  const spannerGroup = new THREE.Group();
  spannerGroup.name = 'hero-spanner';

  // 1. Central handle with ergonomic bevels
  const handleShape = new THREE.Shape();
  const hw = 0.22; // half width
  const hl = 2.4;  // half length
  handleShape.moveTo(-hw * 0.8, -hl);
  handleShape.lineTo(hw * 0.8, -hl);
  handleShape.lineTo(hw * 1.05, 0);
  handleShape.lineTo(hw * 0.85, hl);
  handleShape.lineTo(-hw * 0.85, hl);
  handleShape.lineTo(-hw * 1.05, 0);
  handleShape.closePath();

  const extrudeSettings = {
    depth: 0.14,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  };

  const handleGeo = new THREE.ExtrudeGeometry(handleShape, extrudeSettings);
  handleGeo.center();
  const handleMesh = new THREE.Mesh(handleGeo, materials.spanner);
  handleMesh.castShadow = true;
  handleMesh.receiveShadow = true;
  spannerGroup.add(handleMesh);

  // Embossed center groove on handle
  const grooveGeo = new THREE.BoxGeometry(0.18, 2.2, 0.03);
  const grooveMesh = new THREE.Mesh(grooveGeo, materials.darkSteel);
  grooveMesh.position.z = 0.09;
  spannerGroup.add(grooveMesh);
  const grooveMeshBack = grooveMesh.clone();
  grooveMeshBack.position.z = -0.09;
  spannerGroup.add(grooveMeshBack);

  // 2. Open jaw head (bottom end)
  const jawGroup = new THREE.Group();
  jawGroup.position.y = -2.6;

  const jawOuterGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.2, 16);
  jawOuterGeo.rotateX(Math.PI / 2);
  const jawOuter = new THREE.Mesh(jawOuterGeo, materials.spanner);
  jawOuter.castShadow = true;
  jawGroup.add(jawOuter);

  // Cutout representation (dark inner notch)
  const notchGeo = new THREE.BoxGeometry(0.5, 0.6, 0.22);
  notchGeo.rotateZ(Math.PI / 6);
  notchGeo.translate(0, -0.25, 0);
  const notchMesh = new THREE.Mesh(notchGeo, materials.darkSteel);
  jawGroup.add(notchMesh);

  // Prongs
  const prongLeftGeo = new THREE.BoxGeometry(0.18, 0.5, 0.2);
  const prongLeft = new THREE.Mesh(prongLeftGeo, materials.spanner);
  prongLeft.position.set(-0.35, -0.3, 0);
  prongLeft.rotation.z = 0.2;
  jawGroup.add(prongLeft);

  const prongRight = prongLeft.clone();
  prongRight.position.x = 0.35;
  prongRight.rotation.z = -0.2;
  jawGroup.add(prongRight);

  spannerGroup.add(jawGroup);

  // 3. Ring head (top end) - Torus + hex ring
  const ringGroup = new THREE.Group();
  ringGroup.position.y = 2.6;

  const ringTorusGeo = new THREE.TorusGeometry(0.48, 0.16, 12, 24);
  const ringMesh = new THREE.Mesh(ringTorusGeo, materials.spanner);
  ringMesh.castShadow = true;
  ringGroup.add(ringMesh);

  // Hex teeth inside ring
  const hexTeethCount = 12;
  for (let i = 0; i < hexTeethCount; i++) {
    const angle = (i / hexTeethCount) * Math.PI * 2;
    const toothGeo = new THREE.BoxGeometry(0.06, 0.08, 0.18);
    const toothMesh = new THREE.Mesh(toothGeo, materials.darkSteel);
    toothMesh.position.set(Math.cos(angle) * 0.36, Math.sin(angle) * 0.36, 0);
    toothMesh.rotation.z = angle;
    ringGroup.add(toothMesh);
  }

  spannerGroup.add(ringGroup);

  // Scale and center entire spanner
  spannerGroup.scale.set(0.7, 0.7, 0.7);

  return spannerGroup;
}

/**
 * Creates the Sports Car representing "Experience"
 */
export function create3DCar(materials: ReturnType<typeof createWorkshopMaterials>): THREE.Group {
  const car = new THREE.Group();
  car.name = 'car-experience';

  // Chassis / lower body
  const chassisGeo = new THREE.BoxGeometry(2.4, 0.45, 4.8);
  const chassis = new THREE.Mesh(chassisGeo, materials.carBody);
  chassis.position.y = 0.5;
  chassis.castShadow = true;
  chassis.receiveShadow = true;
  car.add(chassis);

  // Cabin / Greenhouse
  const cabinGeo = new THREE.BoxGeometry(1.9, 0.55, 2.2);
  const cabin = new THREE.Mesh(cabinGeo, materials.glass);
  cabin.position.set(0, 0.95, -0.2);
  cabin.castShadow = true;
  car.add(cabin);

  // Roof plate
  const roofGeo = new THREE.BoxGeometry(1.8, 0.06, 1.8);
  const roof = new THREE.Mesh(roofGeo, materials.carBody);
  roof.position.set(0, 1.25, -0.2);
  car.add(roof);

  // Hood scoop / air intake
  const hoodGeo = new THREE.BoxGeometry(0.9, 0.08, 1.2);
  const hood = new THREE.Mesh(hoodGeo, materials.darkSteel);
  hood.position.set(0, 0.76, 1.2);
  car.add(hood);

  // Rear spoiler
  const spoilerWingGeo = new THREE.BoxGeometry(2.2, 0.06, 0.5);
  const spoilerWing = new THREE.Mesh(spoilerWingGeo, materials.darkSteel);
  spoilerWing.position.set(0, 1.15, -2.2);
  car.add(spoilerWing);

  const strutGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.4);
  const strutL = new THREE.Mesh(strutGeo, materials.darkSteel);
  strutL.position.set(-0.7, 0.95, -2.2);
  const strutR = strutL.clone();
  strutR.position.x = 0.7;
  car.add(strutL);
  car.add(strutR);

  // Wheels (4 wheels with rims and brake rotors)
  const wheelPositions = [
    { x: -1.25, y: 0.4, z: 1.4 },
    { x: 1.25, y: 0.4, z: 1.4 },
    { x: -1.25, y: 0.4, z: -1.4 },
    { x: 1.25, y: 0.4, z: -1.4 },
  ];

  wheelPositions.forEach((pos) => {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(pos.x, pos.y, pos.z);

    const tireGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 18);
    tireGeo.rotateZ(Math.PI / 2);
    const tire = new THREE.Mesh(tireGeo, materials.rubber);
    tire.castShadow = true;
    wheelGroup.add(tire);

    const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.34, 12);
    rimGeo.rotateZ(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, materials.chrome);
    wheelGroup.add(rim);

    // Hub center nut
    const hubGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.36, 6);
    hubGeo.rotateZ(Math.PI / 2);
    const hub = new THREE.Mesh(hubGeo, materials.accent);
    wheelGroup.add(hub);

    car.add(wheelGroup);
  });

  // Glowing Headlights
  const lightGeo = new THREE.BoxGeometry(0.45, 0.12, 0.1);
  const headL = new THREE.Mesh(lightGeo, materials.accent);
  headL.position.set(-0.8, 0.58, 2.41);
  const headR = headL.clone();
  headR.position.x = 0.8;
  car.add(headL);
  car.add(headR);

  // Taillights
  const tailGeo = new THREE.BoxGeometry(2.0, 0.08, 0.06);
  const tail = new THREE.Mesh(tailGeo, materials.accent);
  tail.position.set(0, 0.65, -2.41);
  car.add(tail);

  return car;
}

/**
 * Creates the Mechanical Engine representing "Projects"
 */
export function create3DEngine(materials: ReturnType<typeof createWorkshopMaterials>): THREE.Group {
  const engine = new THREE.Group();
  engine.name = 'engine-projects';

  // Engine block (cast iron / dark alloy)
  const blockGeo = new THREE.BoxGeometry(1.6, 1.2, 2.0);
  const block = new THREE.Mesh(blockGeo, materials.darkSteel);
  block.position.y = 0.9;
  block.castShadow = true;
  block.receiveShadow = true;
  engine.add(block);

  // Twin cylinder head covers (V-angle configuration)
  const headLGeo = new THREE.BoxGeometry(0.6, 0.4, 1.8);
  const headL = new THREE.Mesh(headLGeo, materials.chrome);
  headL.position.set(-0.6, 1.6, 0);
  headL.rotation.z = -0.25;
  headL.castShadow = true;
  engine.add(headL);

  const headR = headL.clone();
  headR.position.x = 0.6;
  headR.rotation.z = 0.25;
  engine.add(headR);

  // Chrome intake manifold pipes
  for (let i = -0.6; i <= 0.6; i += 0.4) {
    const pipeGeo = new THREE.TorusGeometry(0.35, 0.07, 8, 16, Math.PI);
    const pipeL = new THREE.Mesh(pipeGeo, materials.chrome);
    pipeL.position.set(-0.4, 1.7, i);
    pipeL.rotation.y = Math.PI / 2;
    pipeL.rotation.z = Math.PI / 4;
    engine.add(pipeL);

    const pipeR = pipeL.clone();
    pipeR.position.x = 0.4;
    pipeR.rotation.z = -Math.PI / 4;
    engine.add(pipeR);
  }

  // Front pulley system & belt
  const pulleyCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.15, 16), materials.chrome);
  pulleyCenter.rotateX(Math.PI / 2);
  pulleyCenter.position.set(0, 0.8, 1.08);
  engine.add(pulleyCenter);

  const pulleyTopL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16), materials.accent);
  pulleyTopL.rotateX(Math.PI / 2);
  pulleyTopL.position.set(-0.45, 1.2, 1.08);
  pulleyTopL.name = 'rotating-pulley-l';
  engine.add(pulleyTopL);

  const pulleyTopR = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16), materials.accent);
  pulleyTopR.rotateX(Math.PI / 2);
  pulleyTopR.position.set(0.45, 1.2, 1.08);
  pulleyTopR.name = 'rotating-pulley-r';
  engine.add(pulleyTopR);

  // Turbocharger housing on side
  const turboGeo = new THREE.TorusGeometry(0.32, 0.12, 12, 20);
  const turbo = new THREE.Mesh(turboGeo, materials.chrome);
  turbo.position.set(0.95, 1.1, -0.3);
  turbo.rotation.y = Math.PI / 2;
  engine.add(turbo);

  // Industrial stand / pallet
  const palletGeo = new THREE.BoxGeometry(2.0, 0.2, 2.4);
  const pallet = new THREE.Mesh(palletGeo, materials.darkSteel);
  pallet.position.y = 0.1;
  pallet.receiveShadow = true;
  engine.add(pallet);

  return engine;
}

/**
 * Creates the Tool Wall Pegboard representing "Skills"
 */
export function create3DToolWall(materials: ReturnType<typeof createWorkshopMaterials>): THREE.Group {
  const wallGroup = new THREE.Group();
  wallGroup.name = 'toolwall-skills';

  // Backboard (metal pegboard)
  const boardGeo = new THREE.BoxGeometry(4.6, 2.8, 0.1);
  const board = new THREE.Mesh(boardGeo, materials.darkSteel);
  board.position.set(0, 2.2, 0);
  board.receiveShadow = true;
  wallGroup.add(board);

  // Board frame
  const frameTop = new THREE.Mesh(new THREE.BoxGeometry(4.7, 0.08, 0.14), materials.accent);
  frameTop.position.set(0, 3.6, 0.02);
  wallGroup.add(frameTop);

  // Hanging tool rows:
  // Wrenches row
  for (let i = 0; i < 6; i++) {
    const wrenchLength = 0.6 + i * 0.1;
    const wrench = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, wrenchLength, 0.04),
      materials.chrome
    );
    wrench.position.set(-1.8 + i * 0.45, 2.6, 0.1);
    wrench.castShadow = true;
    wallGroup.add(wrench);

    // Hook
    const hook = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.08), materials.accent);
    hook.rotateX(Math.PI / 2);
    hook.position.set(-1.8 + i * 0.45, 2.6 + wrenchLength / 2 + 0.05, 0.08);
    wallGroup.add(hook);
  }

  // Screwdrivers row
  for (let i = 0; i < 5; i++) {
    const driverShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5), materials.chrome);
    driverShaft.position.set(0.9 + i * 0.35, 2.4, 0.1);
    const driverHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.25, 8), materials.accent);
    driverHandle.position.set(0.9 + i * 0.35, 2.7, 0.1);
    wallGroup.add(driverShaft);
    wallGroup.add(driverHandle);
  }

  // Digital Multimeter / Diagnostic Screen on board
  const meterBox = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 0.12), materials.darkSteel);
  meterBox.position.set(-1.5, 1.4, 0.12);
  const meterScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.45), materials.accent);
  meterScreen.position.set(-1.5, 1.6, 0.19);
  wallGroup.add(meterBox);
  wallGroup.add(meterScreen);

  // Lower workbench shelf
  const shelfGeo = new THREE.BoxGeometry(4.4, 0.15, 0.6);
  const shelf = new THREE.Mesh(shelfGeo, materials.chrome);
  shelf.position.set(0, 0.75, 0.3);
  shelf.castShadow = true;
  wallGroup.add(shelf);

  return wallGroup;
}

/**
 * Creates the Mechanic Workbench representing "About Me"
 */
export function create3DWorkbench(materials: ReturnType<typeof createWorkshopMaterials>): THREE.Group {
  const bench = new THREE.Group();
  bench.name = 'workbench-about';

  // Tabletop (heavy industrial wood & steel trim)
  const topGeo = new THREE.BoxGeometry(3.6, 0.2, 1.6);
  const top = new THREE.Mesh(topGeo, materials.wood);
  top.position.y = 1.3;
  top.castShadow = true;
  top.receiveShadow = true;
  bench.add(top);

  // Steel border
  const borderGeo = new THREE.BoxGeometry(3.7, 0.06, 1.7);
  const border = new THREE.Mesh(borderGeo, materials.darkSteel);
  border.position.y = 1.22;
  bench.add(border);

  // 4 Legs
  const legGeo = new THREE.BoxGeometry(0.18, 1.3, 0.18);
  const legPositions = [
    [-1.6, 0.65, -0.65],
    [1.6, 0.65, -0.65],
    [-1.6, 0.65, 0.65],
    [1.6, 0.65, 0.65],
  ];
  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeo, materials.darkSteel);
    leg.position.set(x, y, z);
    leg.castShadow = true;
    bench.add(leg);
  });

  // Bench Vise mounted on top left
  const viseBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.15, 12), materials.chrome);
  viseBase.position.set(-1.4, 1.48, 0.5);
  const viseJawFixed = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.1), materials.darkSteel);
  viseJawFixed.position.set(-1.4, 1.65, 0.45);
  const viseJawMove = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.1), materials.chrome);
  viseJawMove.position.set(-1.4, 1.65, 0.6);
  bench.add(viseBase);
  bench.add(viseJawFixed);
  bench.add(viseJawMove);

  // Blueprint sheet unrolled on workbench
  const blueprintGeo = new THREE.PlaneGeometry(1.6, 1.0);
  blueprintGeo.rotateX(-Math.PI / 2);
  const bpMat = new THREE.MeshStandardMaterial({
    color: 0x1e3a8a,
    roughness: 0.6,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.2,
  });
  const blueprint = new THREE.Mesh(blueprintGeo, bpMat);
  blueprint.position.set(0.3, 1.41, 0.0);
  bench.add(blueprint);

  // Angle-poise desk lamp
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.06), materials.chrome);
  lampBase.position.set(1.4, 1.44, -0.5);
  const lampArm = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.7), materials.darkSteel);
  lampArm.position.set(1.25, 1.75, -0.4);
  lampArm.rotation.z = 0.4;
  const lampHead = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.24, 16), materials.accent);
  lampHead.position.set(1.0, 2.0, -0.3);
  lampHead.rotation.z = -1.2;
  bench.add(lampBase);
  bench.add(lampArm);
  bench.add(lampHead);

  return bench;
}

/**
 * Creates Notice Board / Calendar representing "Events"
 */
export function create3DNoticeBoard(materials: ReturnType<typeof createWorkshopMaterials>): THREE.Group {
  const board = new THREE.Group();
  board.name = 'noticeboard-events';

  const frameGeo = new THREE.BoxGeometry(2.4, 1.8, 0.08);
  const frame = new THREE.Mesh(frameGeo, materials.darkSteel);
  frame.position.y = 2.0;
  frame.receiveShadow = true;
  board.add(frame);

  const innerGeo = new THREE.PlaneGeometry(2.2, 1.6);
  const innerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  inner.position.set(0, 2.0, 0.05);
  board.add(inner);

  // Tacked event notices / badges
  const badgeGeo1 = new THREE.PlaneGeometry(0.6, 0.4);
  const badge1 = new THREE.Mesh(badgeGeo1, materials.accent);
  badge1.position.set(-0.6, 2.3, 0.06);
  board.add(badge1);

  const badgeGeo2 = new THREE.PlaneGeometry(0.7, 0.5);
  const badge2 = new THREE.Mesh(badgeGeo2, materials.chrome);
  badge2.position.set(0.5, 2.2, 0.06);
  board.add(badge2);

  const badgeGeo3 = new THREE.PlaneGeometry(0.9, 0.35);
  const badge3 = new THREE.Mesh(badgeGeo3, materials.carBody);
  badge3.position.set(-0.2, 1.6, 0.06);
  board.add(badge3);

  return board;
}

/**
 * Creates Photo Wall representing "Gallery"
 */
export function create3DPhotoWall(materials: ReturnType<typeof createWorkshopMaterials>): THREE.Group {
  const gallery = new THREE.Group();
  gallery.name = 'photowall-gallery';

  const frameGeo = new THREE.BoxGeometry(2.6, 1.8, 0.08);
  const frame = new THREE.Mesh(frameGeo, materials.darkSteel);
  frame.position.y = 2.0;
  gallery.add(frame);

  // 4 illuminated photo tiles
  const offsets = [
    [-0.65, 2.35],
    [0.65, 2.35],
    [-0.65, 1.55],
    [0.65, 1.55],
  ];

  offsets.forEach(([x, y]) => {
    const photoBorder = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.65), materials.chrome);
    photoBorder.position.set(x, y, 0.05);
    const photoMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.3,
      emissive: 0x1e293b,
      emissiveIntensity: 0.3,
    });
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.55), photoMat);
    photo.position.set(x, y, 0.06);
    gallery.add(photoBorder);
    gallery.add(photo);
  });

  return gallery;
}

/**
 * Creates Diagnostic Terminal representing "Resume"
 */
export function create3DResumeTerminal(materials: ReturnType<typeof createWorkshopMaterials>): THREE.Group {
  const terminal = new THREE.Group();
  terminal.name = 'terminal-resume';

  // Pedestal stand
  const baseGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.1, 16);
  const base = new THREE.Mesh(baseGeo, materials.darkSteel);
  base.position.y = 0.05;
  terminal.add(base);

  const columnGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4);
  const column = new THREE.Mesh(columnGeo, materials.chrome);
  column.position.y = 0.75;
  terminal.add(column);

  // Tilted diagnostic display clipboard
  const screenBackGeo = new THREE.BoxGeometry(1.2, 1.6, 0.08);
  const screenBack = new THREE.Mesh(screenBackGeo, materials.darkSteel);
  screenBack.position.set(0, 1.6, 0.1);
  screenBack.rotation.x = -0.3;
  terminal.add(screenBack);

  const screenDisplayGeo = new THREE.PlaneGeometry(1.05, 1.4);
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    emissive: 0x0284c7,
    emissiveIntensity: 0.4,
    roughness: 0.2,
  });
  const screenDisplay = new THREE.Mesh(screenDisplayGeo, screenMat);
  screenDisplay.position.set(0, 1.61, 0.15);
  screenDisplay.rotation.x = -0.3;
  terminal.add(screenDisplay);

  return terminal;
}

/**
 * Creates Workshop Comm Radio & Telephone representing "Contact"
 */
export function create3DCommRadio(materials: ReturnType<typeof createWorkshopMaterials>): THREE.Group {
  const radio = new THREE.Group();
  radio.name = 'radio-contact';

  // Base table
  const standGeo = new THREE.BoxGeometry(1.0, 1.1, 0.8);
  const stand = new THREE.Mesh(standGeo, materials.darkSteel);
  stand.position.y = 0.55;
  stand.receiveShadow = true;
  radio.add(stand);

  // Rugged Radio Receiver unit
  const unitGeo = new THREE.BoxGeometry(0.7, 0.4, 0.5);
  const unit = new THREE.Mesh(unitGeo, materials.chrome);
  unit.position.set(0, 1.3, 0);
  radio.add(unit);

  // Frequency tuner dials
  const dialGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.08, 12);
  dialGeo.rotateX(Math.PI / 2);
  const dial1 = new THREE.Mesh(dialGeo, materials.accent);
  dial1.position.set(-0.15, 1.3, 0.26);
  const dial2 = dial1.clone();
  dial2.position.x = 0.15;
  radio.add(dial1);
  radio.add(dial2);

  // Antenna
  const antennaGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.9);
  const antenna = new THREE.Mesh(antennaGeo, materials.chrome);
  antenna.position.set(0.28, 1.8, -0.15);
  antenna.rotation.z = -0.15;
  radio.add(antenna);

  return radio;
}

export interface AntigravityTileData {
  mesh: THREE.Mesh;
  originPos: THREE.Vector3;
  originRot: THREE.Euler;
  currentPos: THREE.Vector3;
  currentRot: THREE.Euler;
  velocity: THREE.Vector3;
  rotVelocity: THREE.Vector3;
  mass: number;
}

export interface AntigravityInfinityController {
  group: THREE.Group;
  tiles: AntigravityTileData[];
  innerGlowMesh: THREE.Object3D;
  updateAntigravity: (
    disturbPoint: THREE.Vector3 | null,
    deltaTime: number,
    triggerShockwave?: boolean,
    strength?: number
  ) => void;
  triggerBlast: () => void;
}

/**
 * Creates the Segmented Chrome Antigravity Spanner / Spinner Model
 * Composed of segmented chrome matrix blocks with an inner glowing golden neon core
 * and real-time kinetic antigravity particle physics.
 * In the middle of the handle is an engraved badge: "IZAZ AHAMAD // PRECISION 3D".
 */
export function create3DAntigravitySpanner(
  materials: ReturnType<typeof createWorkshopMaterials>
): AntigravityInfinityController {
  const group = new THREE.Group();
  group.name = 'hero-spanner';

  const tiles: AntigravityTileData[] = [];

  // High-reflectivity Chrome & Inner Golden Glowing Core Materials
  const facetedChromeMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.98,
    roughness: 0.12,
    envMapIntensity: 1.8,
  });

  const innerGoldGlowMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xf59e0b,
    emissiveIntensity: 2.2,
    roughness: 0.15,
    metalness: 0.2,
  });

  const badgePlateMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.85,
    roughness: 0.35,
  });

  // 1. Core Internal Glowing Neon Tubes (Illuminating between the chrome blocks)
  const glowGroup = new THREE.Group();
  glowGroup.name = 'spanner-glow-core';

  // Handle core glowing rod
  const handleGlowGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.4, 12);
  const handleGlowMesh = new THREE.Mesh(handleGlowGeo, innerGoldGlowMat);
  glowGroup.add(handleGlowMesh);

  // Top ring glowing circle
  const ringGlowGeo = new THREE.TorusGeometry(0.72, 0.06, 12, 32);
  ringGlowGeo.rotateX(Math.PI / 2);
  const ringGlowMesh = new THREE.Mesh(ringGlowGeo, innerGoldGlowMat);
  ringGlowMesh.position.y = 2.45;
  glowGroup.add(ringGlowMesh);

  // Bottom jaw glowing arc
  const jawGlowCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.45, -2.1, 0),
    new THREE.Vector3(-0.35, -2.7, 0),
    new THREE.Vector3(0, -2.5, 0),
    new THREE.Vector3(0.35, -2.7, 0),
    new THREE.Vector3(0.45, -2.1, 0),
  ]);
  const jawGlowGeo = new THREE.TubeGeometry(jawGlowCurve, 24, 0.06, 8, false);
  const jawGlowMesh = new THREE.Mesh(jawGlowGeo, innerGoldGlowMat);
  glowGroup.add(jawGlowMesh);

  group.add(glowGroup);

  // Helper to register tile into antigravity physics
  const addTile = (
    mesh: THREE.Mesh,
    pos: THREE.Vector3,
    rot: THREE.Euler,
    mass = 1.0
  ) => {
    mesh.position.copy(pos);
    mesh.rotation.copy(rot);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    tiles.push({
      mesh,
      originPos: pos.clone(),
      originRot: rot.clone(),
      currentPos: pos.clone(),
      currentRot: rot.clone(),
      velocity: new THREE.Vector3(0, 0, 0),
      rotVelocity: new THREE.Vector3(0, 0, 0),
      mass,
    });
  };

  // 2. Generate Segmented Chrome Blocks along the Central Spanner Handle
  const handleTileGeo = new THREE.BoxGeometry(0.12, 0.14, 0.16);
  const handleLength = 3.2;
  const handleRows = 22;
  const handleCols = 4;

  for (let r = 0; r < handleRows; r++) {
    const y = -handleLength / 2 + (r / (handleRows - 1)) * handleLength;
    // Leave space in the middle for "IZAZ AHAMAD" nameplate
    if (Math.abs(y) < 0.46) continue;

    for (let c = 0; c < handleCols; c++) {
      const x = (c - (handleCols - 1) / 2) * 0.15;
      const zOffset = (Math.abs(c - 1.5) > 1 ? -0.02 : 0.02);

      // Front tile
      const tileMeshFront = new THREE.Mesh(handleTileGeo, facetedChromeMat);
      addTile(
        tileMeshFront,
        new THREE.Vector3(x, y, 0.09 + zOffset),
        new THREE.Euler(0, 0, (Math.random() - 0.5) * 0.05),
        0.9 + Math.random() * 0.3
      );

      // Back tile
      const tileMeshBack = new THREE.Mesh(handleTileGeo, facetedChromeMat);
      addTile(
        tileMeshBack,
        new THREE.Vector3(x, y, -0.09 - zOffset),
        new THREE.Euler(0, 0, (Math.random() - 0.5) * 0.05),
        0.9 + Math.random() * 0.3
      );
    }
  }

  // 3. Generate Segmented Chrome Blocks around Ring Head (Top end)
  const ringTileGeo = new THREE.BoxGeometry(0.12, 0.12, 0.18);
  const ringCenter = new THREE.Vector3(0, 2.45, 0);
  const ringSegments = 28;
  const ringRadiusOuter = 0.82;
  const ringRadiusInner = 0.62;

  for (let i = 0; i < ringSegments; i++) {
    const angle = (i / ringSegments) * Math.PI * 2;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    // Outer ring row
    const tileOuter = new THREE.Mesh(ringTileGeo, facetedChromeMat);
    addTile(
      tileOuter,
      new THREE.Vector3(
        ringCenter.x + cosA * ringRadiusOuter,
        ringCenter.y + sinA * ringRadiusOuter,
        0
      ),
      new THREE.Euler(0, 0, angle + Math.PI / 2),
      1.1
    );

    // Inner ring row
    const tileInner = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.16), facetedChromeMat);
    addTile(
      tileInner,
      new THREE.Vector3(
        ringCenter.x + cosA * ringRadiusInner,
        ringCenter.y + sinA * ringRadiusInner,
        0
      ),
      new THREE.Euler(0, 0, angle + Math.PI / 2),
      0.9
    );
  }

  // 4. Generate Segmented Chrome Blocks around Open Jaw (Bottom end)
  const jawTileGeo = new THREE.BoxGeometry(0.13, 0.13, 0.18);

  // Left prong
  for (let i = 0; i < 7; i++) {
    const progress = i / 6;
    const px = -0.45 - progress * 0.12;
    const py = -1.9 - progress * 0.85;
    const tile = new THREE.Mesh(jawTileGeo, facetedChromeMat);
    addTile(
      tile,
      new THREE.Vector3(px, py, 0),
      new THREE.Euler(0, 0, 0.25),
      1.0
    );
  }

  // Right prong
  for (let i = 0; i < 7; i++) {
    const progress = i / 6;
    const px = 0.45 + progress * 0.12;
    const py = -1.9 - progress * 0.85;
    const tile = new THREE.Mesh(jawTileGeo, facetedChromeMat);
    addTile(
      tile,
      new THREE.Vector3(px, py, 0),
      new THREE.Euler(0, 0, -0.25),
      1.0
    );
  }

  // Notch curve behind jaw
  for (let i = 0; i < 8; i++) {
    const angle = (i / 7) * Math.PI;
    const px = Math.cos(angle) * 0.35;
    const py = -2.15 + Math.sin(angle) * 0.25;
    const tile = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.18), facetedChromeMat);
    addTile(
      tile,
      new THREE.Vector3(px, py, 0),
      new THREE.Euler(0, 0, angle),
      0.9
    );
  }

  // 5. In the Middle: Signature "IZAZ AHAMAD" Precision 3D Badge
  const badgeGroup = new THREE.Group();
  badgeGroup.position.set(0, 0, 0);

  // Metallic central baseplate
  const plateGeo = new THREE.BoxGeometry(0.74, 0.78, 0.25);
  const plateMesh = new THREE.Mesh(plateGeo, badgePlateMat);
  plateMesh.castShadow = true;
  badgeGroup.add(plateMesh);

  // Outer gold rim bevel
  const rimGeo = new THREE.BoxGeometry(0.78, 0.82, 0.23);
  const rimEdges = new THREE.EdgesGeometry(rimGeo);
  const rimLine = new THREE.LineSegments(
    rimEdges,
    new THREE.LineBasicMaterial({ color: 0xfacc15, linewidth: 2 })
  );
  badgeGroup.add(rimLine);

  // Front & back name embossing texture using HTML5 canvas
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 512, 512);

    // Gold borders
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, 472, 472);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.strokeRect(36, 36, 440, 440);

    // Text: IZAZ AHAMAD
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 18;
    ctx.fillText('IZAZ AHAMAD', 256, 200);

    // Subtitle: PRECISION SPANNER
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 26px "JetBrains Mono", monospace';
    ctx.shadowBlur = 8;
    ctx.fillText('PRECISION 3D SPANNER', 256, 275);

    // Bottom badge
    ctx.fillStyle = '#38bdf8';
    ctx.font = '500 22px monospace';
    ctx.fillText('★ CRAFTSMANSHIP ★', 256, 345);
  }

  const nameTexture = new THREE.CanvasTexture(canvas);
  nameTexture.anisotropy = 8;

  const textMat = new THREE.MeshStandardMaterial({
    map: nameTexture,
    metalness: 0.8,
    roughness: 0.25,
    emissive: 0x221805,
  });

  const frontFaceGeo = new THREE.PlaneGeometry(0.7, 0.74);
  const frontFace = new THREE.Mesh(frontFaceGeo, textMat);
  frontFace.position.z = 0.13;
  badgeGroup.add(frontFace);

  const backFace = frontFace.clone();
  backFace.rotation.y = Math.PI;
  backFace.position.z = -0.13;
  badgeGroup.add(backFace);

  group.add(badgeGroup);

  // 6. Mechanical Shockwave Trigger
  const triggerBlast = () => {
    tiles.forEach((tile) => {
      const dir = new THREE.Vector3()
        .subVectors(tile.currentPos, new THREE.Vector3(0, 0, 0))
        .normalize();
      const blastPower = 5.0 + Math.random() * 6.0;
      tile.velocity.addScaledVector(dir, blastPower);
      tile.velocity.y += 2.0 + Math.random() * 3.0; // antigravity upward loft
      tile.rotVelocity.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      );
    });
  };

  // 7. Real-time Antigravity & Spring-Return Physics Engine
  const updateAntigravity = (
    disturbPoint: THREE.Vector3 | null,
    deltaTime: number,
    triggerShockwave = false,
    strength = 1.0
  ) => {
    if (triggerShockwave) {
      triggerBlast();
    }

    const dt = Math.min(deltaTime, 0.05);
    const springK = 22.0; // spring return pull force
    const damping = 4.8;  // drag damping
    const rotSpringK = 18.0;
    const rotDamping = 5.2;

    const disturbRadius = 1.6;
    const disturbForce = 15.0 * strength;

    tiles.forEach((tile) => {
      // A. Antigravity disturbance from cursor / interaction point
      if (disturbPoint) {
        const dist = tile.currentPos.distanceTo(disturbPoint);
        if (dist < disturbRadius) {
          const repelDir = new THREE.Vector3()
            .subVectors(tile.currentPos, disturbPoint)
            .normalize();
          // Antigravity upward lift vector
          repelDir.y += 0.5;
          repelDir.normalize();

          const intensity = Math.pow(1 - dist / disturbRadius, 2) * disturbForce;
          tile.velocity.addScaledVector(repelDir, (intensity / tile.mass) * dt);

          // Add rotational turbulence
          tile.rotVelocity.x += (Math.random() - 0.5) * 8 * dt;
          tile.rotVelocity.y += (Math.random() - 0.5) * 8 * dt;
          tile.rotVelocity.z += (Math.random() - 0.5) * 8 * dt;
        }
      }

      // B. Spring restoration force towards original slot on the Spanner
      const disp = new THREE.Vector3().subVectors(tile.originPos, tile.currentPos);
      const springAcc = disp.multiplyScalar(springK);
      const dragAcc = tile.velocity.clone().multiplyScalar(-damping);

      const netAcc = springAcc.add(dragAcc);
      tile.velocity.addScaledVector(netAcc, dt);
      tile.currentPos.addScaledVector(tile.velocity, dt);

      // C. Rotational spring restoration
      const rotDiffX = tile.originRot.x - tile.currentRot.x;
      const rotDiffY = tile.originRot.y - tile.currentRot.y;
      const rotDiffZ = tile.originRot.z - tile.currentRot.z;

      tile.rotVelocity.x += (rotDiffX * rotSpringK - tile.rotVelocity.x * rotDamping) * dt;
      tile.rotVelocity.y += (rotDiffY * rotSpringK - tile.rotVelocity.y * rotDamping) * dt;
      tile.rotVelocity.z += (rotDiffZ * rotSpringK - tile.rotVelocity.z * rotDamping) * dt;

      tile.currentRot.x += tile.rotVelocity.x * dt;
      tile.currentRot.y += tile.rotVelocity.y * dt;
      tile.currentRot.z += tile.rotVelocity.z * dt;

      // Update actual mesh transform
      tile.mesh.position.copy(tile.currentPos);
      tile.mesh.rotation.copy(tile.currentRot);
    });
  };

  return {
    group,
    tiles,
    innerGlowMesh: glowGroup,
    updateAntigravity,
    triggerBlast,
  };
}

// Backward compatibility alias for any caller
export const create3DAntigravityInfinity = create3DAntigravitySpanner;

