import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { VisualSettings } from '../../types';
import {
  createWorkshopMaterials,
  create3DAntigravitySpanner,
  AntigravityInfinityController,
  create3DCar,
  create3DEngine,
  create3DToolWall,
  create3DWorkbench,
} from './garageGeometry';
import { FallbackGarageScene } from './FallbackGarageScene';
import { RotateCcw, Sparkles, Move3d, Compass } from 'lucide-react';

function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return !!(window.WebGLRenderingContext && gl);
  } catch {
    return false;
  }
}

interface WorkshopSceneProps {
  visualSettings: VisualSettings;
  onOpenAdminAuth: () => void;
  onSpannerBlastTriggered?: () => void;
}

export const WorkshopScene: React.FC<WorkshopSceneProps> = ({
  visualSettings,
  onOpenAdminAuth,
  onSpannerBlastTriggered,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLAvailable, setWebGLAvailable] = useState<boolean>(() => isWebGLSupported());
  const [isBlasting, setIsBlasting] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // References for Three.js instance
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spannerRef = useRef<THREE.Group | null>(null);
  const antigravitySpannerRef = useRef<AntigravityInfinityController | null>(null);
  const cursorLightRef = useRef<THREE.SpotLight | null>(null);

  // Drag-to-Rotate & Orbit Controls State
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const spannerRotationRef = useRef({ x: 0.15, y: -0.2 });
  const spannerRotVelocityRef = useRef({ x: 0, y: 0.005 });
  const cameraDistanceRef = useRef(7.8);
  const cameraDesiredPosRef = useRef(new THREE.Vector3(0, 2.4, 7.8));
  const cameraTargetRef = useRef(new THREE.Vector3(0, 2.1, 0));

  // Raycasting coords
  const mousePosRef = useRef({ x: 0, y: 0 });
  const raycasterRef = useRef(new THREE.Raycaster());
  const groundPlaneRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));

  // Blast Particles
  const blastParticlesRef = useRef<THREE.Points | null>(null);
  const blastVelocityRef = useRef<THREE.Vector3[]>([]);
  const blastOriginsRef = useRef<THREE.Vector3[]>([]);
  const blastStartTimeRef = useRef<number>(0);

  // Trigger the mechanical blast transformation effect
  const triggerMechanicalBlast = useCallback(() => {
    if (isBlasting || !spannerRef.current || !sceneRef.current) return;
    setIsBlasting(true);

    if (onSpannerBlastTriggered) {
      onSpannerBlastTriggered();
    }

    // Trigger antigravity controller blast
    if (antigravitySpannerRef.current) {
      antigravitySpannerRef.current.triggerBlast();
    }

    // Create mechanical particle burst
    const particleCount = 220;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const velocities: THREE.Vector3[] = [];
    const origins: THREE.Vector3[] = [];

    const spannerPos = spannerRef.current.position;

    for (let i = 0; i < particleCount; i++) {
      const x = spannerPos.x + (Math.random() - 0.5) * 1.6;
      const y = spannerPos.y + (Math.random() - 0.5) * 3.8;
      const z = spannerPos.z + (Math.random() - 0.5) * 0.8;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      origins.push(new THREE.Vector3(x, y, z));

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const speed = 2.5 + Math.random() * 5.0;

      velocities.push(
        new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed + 1.2,
          Math.cos(phi) * speed
        )
      );

      // Gold & chrome spark colors
      if (Math.random() > 0.4) {
        colors[i * 3] = 0.98;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 0.08;
      } else {
        colors[i * 3] = 0.85;
        colors[i * 3 + 1] = 0.92;
        colors[i * 3 + 2] = 1.0;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    const pSystem = new THREE.Points(geometry, material);
    sceneRef.current.add(pSystem);

    blastParticlesRef.current = pSystem;
    blastVelocityRef.current = velocities;
    blastOriginsRef.current = origins;
    blastStartTimeRef.current = performance.now();

    setTimeout(() => {
      if (blastParticlesRef.current && sceneRef.current) {
        sceneRef.current.remove(blastParticlesRef.current);
        blastParticlesRef.current.geometry.dispose();
        blastParticlesRef.current = null;
      }
      setIsBlasting(false);
    }, 1800);
  }, [isBlasting, onSpannerBlastTriggered]);

  // Reset Spanner view angle
  const handleResetAngle = useCallback(() => {
    spannerRotationRef.current = { x: 0.15, y: -0.2 };
    spannerRotVelocityRef.current = { x: 0, y: 0.005 };
    cameraDistanceRef.current = 7.8;
    cameraDesiredPosRef.current.set(0, 2.4, 7.8);
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!webGLAvailable) return;
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080b11);
    scene.fog = new THREE.FogExp2(0x080b11, 0.04);
    sceneRef.current = scene;

    // 2. Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
    camera.position.set(0, 2.4, 7.8);
    camera.lookAt(0, 2.1, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch (err) {
      console.warn('WebGL init failed, using Fallback canvas:', err);
      setWebGLAvailable(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = visualSettings.shadowsEnabled;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Materials
    const materials = createWorkshopMaterials(visualSettings.filter);

    // 5. Garage Architecture
    // Floor
    const floorGeo = new THREE.PlaneGeometry(36, 36);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x11151e,
      roughness: 0.45,
      metalness: 0.4,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.receiveShadow = true;
    floor.name = 'garage-floor';
    scene.add(floor);

    // Hazard stripe on floor
    const stripGeo = new THREE.PlaneGeometry(14, 0.22);
    stripGeo.rotateX(-Math.PI / 2);
    const stripMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.4,
      metalness: 0.2,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.25,
    });
    const strip = new THREE.Mesh(stripGeo, stripMat);
    strip.position.set(0, 0.01, 2.2);
    strip.receiveShadow = true;
    scene.add(strip);

    // Back wall
    const backWallGeo = new THREE.BoxGeometry(32, 10, 0.6);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0c1017,
      roughness: 0.85,
      metalness: 0.15,
    });
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 5, -5.5);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Industrial structural pillars
    const pillarGeo = new THREE.BoxGeometry(0.8, 10, 0.8);
    const pillarL = new THREE.Mesh(pillarGeo, materials.darkSteel);
    pillarL.position.set(-8, 5, -5.0);
    pillarL.castShadow = true;
    pillarL.receiveShadow = true;
    const pillarR = pillarL.clone();
    pillarR.position.x = 8;
    scene.add(pillarL);
    scene.add(pillarR);

    // Overhead ceiling steel girder
    const girderGeo = new THREE.BoxGeometry(30, 0.6, 0.8);
    const girder = new THREE.Mesh(girderGeo, materials.darkSteel);
    girder.position.set(0, 8.5, 0);
    scene.add(girder);

    // 6. HERO: ANTIGRAVITY SEGMENTED CHROME SPANNER
    // Precision tool composed of faceted chrome matrix tiles, inner gold glow, and "IZAZ AHAMAD" central plate
    const spannerController = create3DAntigravitySpanner(materials);
    spannerController.group.position.set(0, 2.1, 0);
    spannerController.group.rotation.x = spannerRotationRef.current.x;
    spannerController.group.rotation.y = spannerRotationRef.current.y;
    scene.add(spannerController.group);
    spannerRef.current = spannerController.group;
    antigravitySpannerRef.current = spannerController;

    // 7. Background Workshop Elements (clean, atmospheric garage environment)
    const engine = create3DEngine(materials);
    engine.position.set(-4.2, 0, -1.2);
    engine.rotation.y = 0.45;
    scene.add(engine);

    const car = create3DCar(materials);
    car.position.set(4.5, 0, -1.2);
    car.rotation.y = -0.45;
    scene.add(car);

    const toolWall = create3DToolWall(materials);
    toolWall.position.set(0, 0, -5.0);
    scene.add(toolWall);

    const workbench = create3DWorkbench(materials);
    workbench.position.set(-5.0, 0, -3.4);
    workbench.rotation.y = 0.35;
    scene.add(workbench);

    // 8. Workshop Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.48);
    scene.add(ambientLight);

    // Warm overhead lamp
    const overheadLight = new THREE.DirectionalLight(0xfff7ed, 1.2 * visualSettings.lightIntensity);
    overheadLight.position.set(0, 12, 4);
    overheadLight.castShadow = visualSettings.shadowsEnabled;
    overheadLight.shadow.mapSize.width = 2048;
    overheadLight.shadow.mapSize.height = 2048;
    overheadLight.shadow.bias = -0.0004;
    scene.add(overheadLight);

    // Amber rim light
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 0.7 * visualSettings.lightIntensity);
    rimLight.position.set(-7, 6, -5);
    scene.add(rimLight);

    // Dynamic Cursor Spotlight
    const cursorSpot = new THREE.SpotLight(
      0xffedd5,
      2.6 * visualSettings.lightIntensity,
      18,
      Math.PI / 4.2,
      0.4,
      1.2
    );
    cursorSpot.position.set(0, 5, 2.5);
    cursorSpot.castShadow = visualSettings.shadowsEnabled;
    cursorSpot.shadow.mapSize.width = 1024;
    cursorSpot.shadow.mapSize.height = 1024;
    scene.add(cursorSpot);
    cursorLightRef.current = cursorSpot;

    // 9. Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 10. Pointer Handlers for Drag-to-Rotate & Hover Wiggle
    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      setIsInteracting(true);
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mousePosRef.current = { x, y };

      if (isDraggingRef.current) {
        const deltaX = e.clientX - prevPointerRef.current.x;
        const deltaY = e.clientY - prevPointerRef.current.y;
        prevPointerRef.current = { x: e.clientX, y: e.clientY };

        // Rotate the 3D spanner directly
        spannerRotationRef.current.y += deltaX * 0.009;
        spannerRotationRef.current.x += deltaY * 0.009;

        // Clamp vertical pitch to avoid tumbling upside down
        spannerRotationRef.current.x = THREE.MathUtils.clamp(
          spannerRotationRef.current.x,
          -Math.PI / 3,
          Math.PI / 3
        );

        spannerRotVelocityRef.current = {
          x: deltaY * 0.003,
          y: deltaX * 0.004,
        };
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    const handleWheel = (e: WheelEvent) => {
      // Zoom in / out to inspect the spanner
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.005;
      cameraDistanceRef.current = THREE.MathUtils.clamp(
        cameraDistanceRef.current + zoomDelta,
        4.6,
        12.0
      );
      cameraDesiredPosRef.current.z = cameraDistanceRef.current;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // 11. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Handle Spanner Rotation & Inertia
      if (spannerRef.current) {
        if (!isDraggingRef.current) {
          if (autoRotate) {
            spannerRotationRef.current.y += spannerRotVelocityRef.current.y;
            spannerRotationRef.current.x += spannerRotVelocityRef.current.x;

            // Damping for user spin velocity back to slow gentle spin
            spannerRotVelocityRef.current.x *= 0.94;
            spannerRotVelocityRef.current.y = THREE.MathUtils.lerp(
              spannerRotVelocityRef.current.y,
              0.006,
              0.03
            );
          }
        }

        spannerRef.current.rotation.x = spannerRotationRef.current.x;
        spannerRef.current.rotation.y = spannerRotationRef.current.y;
        spannerRef.current.position.y = 2.1 + Math.sin(elapsedTime * 1.6) * 0.08;
      }

      // Raycast for Wiggling Mouse over the Spanner ("Disturb the surface")
      raycasterRef.current.setFromCamera(
        new THREE.Vector2(mousePosRef.current.x, mousePosRef.current.y),
        camera
      );

      if (antigravitySpannerRef.current) {
        // Calculate interaction point on the spanner plane (z = 0 relative to scene)
        const disturbPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const disturbPoint = new THREE.Vector3();
        raycasterRef.current.ray.intersectPlane(disturbPlane, disturbPoint);

        // If cursor is within range of the spanner, perturb the segmented chrome tiles!
        antigravitySpannerRef.current.updateAntigravity(
          disturbPoint,
          delta,
          false,
          1.2
        );
      }

      // Cursor spotlight tracking
      const groundIntersection = new THREE.Vector3();
      raycasterRef.current.ray.intersectPlane(groundPlaneRef.current, groundIntersection);
      if (cursorSpot && groundIntersection) {
        cursorSpot.position.x += (groundIntersection.x * 0.8 - cursorSpot.position.x) * 0.08;
        cursorSpot.position.z += (groundIntersection.z * 0.8 + 2.5 - cursorSpot.position.z) * 0.08;
        cursorSpot.target.position.set(groundIntersection.x, 0, groundIntersection.z);
        cursorSpot.target.updateMatrixWorld();
      }

      // Particle blast animation
      if (blastParticlesRef.current && blastVelocityRef.current.length > 0) {
        const positionsAttr = blastParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const count = blastVelocityRef.current.length;
        const elapsedSinceBlast = (performance.now() - blastStartTimeRef.current) / 1000;

        for (let i = 0; i < count; i++) {
          const origin = blastOriginsRef.current[i];
          const vel = blastVelocityRef.current[i];

          if (elapsedSinceBlast < 0.85) {
            positionsAttr.setXYZ(
              i,
              origin.x + vel.x * elapsedSinceBlast,
              origin.y + vel.y * elapsedSinceBlast - 0.5 * 9.8 * elapsedSinceBlast * elapsedSinceBlast * 0.15,
              origin.z + vel.z * elapsedSinceBlast
            );
          } else {
            const tRecoil = (elapsedSinceBlast - 0.85) / 0.85;
            const currentX = origin.x + vel.x * 0.85;
            const currentY = origin.y + vel.y * 0.85;
            const currentZ = origin.z + vel.z * 0.85;

            const reX = THREE.MathUtils.lerp(currentX, origin.x, Math.min(tRecoil * 1.8, 1));
            const reY = THREE.MathUtils.lerp(currentY, origin.y, Math.min(tRecoil * 1.8, 1));
            const reZ = THREE.MathUtils.lerp(currentZ, origin.z, Math.min(tRecoil * 1.8, 1));

            positionsAttr.setXYZ(i, reX, reY, reZ);
          }
        }
        positionsAttr.needsUpdate = true;
      }

      // Camera smooth zoom & tracking
      camera.position.lerp(cameraDesiredPosRef.current, 0.06);
      camera.lookAt(cameraTargetRef.current);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [webGLAvailable, visualSettings, autoRotate]);

  if (!webGLAvailable) {
    return (
      <FallbackGarageScene
        visualSettings={visualSettings}
        onOpenAdminAuth={onOpenAdminAuth}
        onSpannerBlastTriggered={onSpannerBlastTriggered}
      />
    );
  }

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full select-none overflow-hidden cursor-grab active:cursor-grabbing"
      id="three-workshop-container"
    >
      {/* 3D Spanner Interactive Controls Floating Pill */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 bg-[#0d121c]/85 backdrop-blur-md border border-slate-700/60 px-3 py-1.5 rounded-full shadow-lg text-xs font-mono text-slate-300">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full transition-colors ${
            autoRotate ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-slate-400 hover:text-white'
          }`}
          title="Toggle Auto Spin"
        >
          <Move3d className="w-3.5 h-3.5" />
          <span>{autoRotate ? 'Auto-Spin: ON' : 'Auto-Spin: OFF'}</span>
        </button>

        <button
          onClick={handleResetAngle}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Reset Spanner Angle"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset View</span>
        </button>

        <button
          onClick={triggerMechanicalBlast}
          disabled={isBlasting}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors disabled:opacity-50"
          title="Trigger Antigravity Shockwave Blast"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBlasting ? 'Blasting...' : 'Shockwave'}</span>
        </button>
      </div>

      {/* Reference Image Callout: "Disturb the surface" pointer */}
      <div className="absolute top-[32%] right-[22%] z-10 pointer-events-none hidden md:flex items-center space-x-2 select-none animate-in fade-in duration-500">
        <div className="flex flex-col items-end">
          <span className="text-xs font-mono text-slate-300 tracking-wider font-semibold drop-shadow-md">
            Disturb the surface
          </span>
          <span className="text-[10px] font-mono text-amber-400/90">
            Wiggle mouse to loft chrome tiles
          </span>
          <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-slate-400 to-amber-400 mt-1" />
        </div>
        <div className="relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping absolute" />
          <span className="w-2 h-2 rounded-full bg-amber-300 border border-white" />
        </div>
      </div>

      {/* Drag to Rotate Interactive Tip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex items-center space-x-2 bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 text-xs font-mono text-slate-300 shadow-xl">
        <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Click & Drag to rotate 3D Spanner 360°</span>
        <span className="text-slate-600">•</span>
        <span>Scroll to Zoom</span>
        <span className="text-slate-600">•</span>
        <span className="text-amber-400">“IZAZ AHAMAD” Center Badge</span>
      </div>
    </div>
  );
};
