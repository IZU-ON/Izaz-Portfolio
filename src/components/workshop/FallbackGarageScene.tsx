import React, { useEffect, useRef, useState, useCallback } from 'react';
import { VisualSettings } from '../../types';
import { RotateCcw, Sparkles, Compass, Move3d } from 'lucide-react';

interface FallbackGarageSceneProps {
  visualSettings: VisualSettings;
  onOpenAdminAuth: () => void;
  onSpannerBlastTriggered?: () => void;
}

export const FallbackGarageScene: React.FC<FallbackGarageSceneProps> = ({
  visualSettings,
  onOpenAdminAuth,
  onSpannerBlastTriggered,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
  const [isBlasting, setIsBlasting] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Rotation & Drag state
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const spannerAngleRef = useRef({ yaw: 0, pitch: 0 });
  const spannerVelRef = useRef({ yaw: 0.008, pitch: 0 });

  // Antigravity tiles on the spanner
  const tilesRef = useRef<Array<{
    baseX: number;
    baseY: number;
    baseZ: number;
    w: number;
    h: number;
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    rot: number;
    vrot: number;
    isCenterName?: boolean;
  }>>([]);

  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    size: number;
  }>>([]);

  // Initialize Segmented Spanner Tiles
  useEffect(() => {
    const tiles: typeof tilesRef.current = [];

    // 1. Central Handle tiles (multiple columns and rows)
    const handleRows = 18;
    const handleCols = 4;
    const handleLen = 220;

    for (let r = 0; r < handleRows; r++) {
      const y = -handleLen / 2 + (r / (handleRows - 1)) * handleLen;
      if (Math.abs(y) < 32) continue; // Cutout for center name badge

      for (let c = 0; c < handleCols; c++) {
        const x = (c - (handleCols - 1) / 2) * 14;
        tiles.push({
          baseX: x,
          baseY: y,
          baseZ: (Math.abs(c - 1.5) > 1 ? -4 : 4),
          w: 11,
          h: 10,
          x,
          y,
          z: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          rot: 0,
          vrot: 0,
        });
      }
    }

    // 2. Top Ring Wrench tiles
    const ringRadius = 55;
    const ringSegments = 22;
    for (let i = 0; i < ringSegments; i++) {
      const angle = (i / ringSegments) * Math.PI * 2;
      const x = Math.cos(angle) * ringRadius;
      const y = -145 + Math.sin(angle) * ringRadius;
      tiles.push({
        baseX: x,
        baseY: y,
        baseZ: 0,
        w: 12,
        h: 11,
        x,
        y,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        rot: angle,
        vrot: 0,
      });
    }

    // 3. Bottom Open Jaw Wrench tiles
    for (let i = 0; i < 7; i++) {
      // Left jaw prong
      const progress = i / 6;
      tiles.push({
        baseX: -32 - progress * 10,
        baseY: 130 + progress * 55,
        baseZ: 0,
        w: 12,
        h: 10,
        x: -32 - progress * 10,
        y: 130 + progress * 55,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        rot: 0.2,
        vrot: 0,
      });
      // Right jaw prong
      tiles.push({
        baseX: 32 + progress * 10,
        baseY: 130 + progress * 55,
        baseZ: 0,
        w: 12,
        h: 10,
        x: 32 + progress * 10,
        y: 130 + progress * 55,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        rot: -0.2,
        vrot: 0,
      });
    }

    tilesRef.current = tiles;
  }, []);

  // Blast shockwave
  const triggerBlast = useCallback(() => {
    setIsBlasting(true);
    if (onSpannerBlastTriggered) onSpannerBlastTriggered();

    // Perturb tiles
    tilesRef.current.forEach((tile) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 8 + Math.random() * 16;
      tile.vx = Math.cos(angle) * speed;
      tile.vy = Math.sin(angle) * speed - 6; // antigravity lift
      tile.vrot = (Math.random() - 0.5) * 0.4;
    });

    // Spawn sparks
    const canvas = canvasRef.current;
    if (canvas) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      for (let i = 0; i < 140; i++) {
        const a = Math.random() * Math.PI * 2;
        const spd = 2 + Math.random() * 8;
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * spd,
          vy: Math.sin(a) * spd - 2,
          life: 1.0,
          maxLife: 1.0,
          color: Math.random() > 0.4 ? '#facc15' : '#e2e8f0',
          size: 2 + Math.random() * 4,
        });
      }
    }

    setTimeout(() => setIsBlasting(false), 1600);
  }, [onSpannerBlastTriggered]);

  const handleResetAngle = useCallback(() => {
    spannerAngleRef.current = { yaw: 0, pitch: 0 };
    spannerVelRef.current = { yaw: 0.008, pitch: 0 };
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      animId = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      // Dark metallic workshop background
      const bgGrad = ctx.createRadialGradient(cx, cy, 40, cx, cy, Math.max(width, height) * 0.7);
      bgGrad.addColorStop(0, '#111722');
      bgGrad.addColorStop(1, '#06090e');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Floor perspective hazard line
      ctx.save();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = -width; x < width * 2; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(cx + (x - cx) * 0.35, cy + 120);
        ctx.stroke();
      }
      ctx.restore();

      // Update Spanner Rotation
      if (!isDraggingRef.current) {
        if (autoRotate) {
          spannerAngleRef.current.yaw += spannerVelRef.current.yaw;
          spannerAngleRef.current.pitch += spannerVelRef.current.pitch;
          spannerVelRef.current.pitch *= 0.94;
          spannerVelRef.current.yaw = spannerVelRef.current.yaw * 0.96 + 0.006 * 0.04;
        }
      }

      const cosYaw = Math.cos(spannerAngleRef.current.yaw);
      const sinYaw = Math.sin(spannerAngleRef.current.yaw);

      // Antigravity mouse wiggle physics
      const mouseX = mouseRef.current.x - cx;
      const mouseY = mouseRef.current.y - cy;
      const disturbRadius = 90;

      tilesRef.current.forEach((tile) => {
        // 3D yaw projection
        const projX = tile.baseX * cosYaw;
        const projZ = tile.baseX * sinYaw;
        const targetX = projX;
        const targetY = tile.baseY;

        // Mouse disturbance
        const dx = targetX - mouseX;
        const dy = targetY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < disturbRadius && mouseRef.current.isHovering) {
          const force = (1 - dist / disturbRadius) * 4.5;
          tile.vx += (dx / (dist || 1)) * force;
          tile.vy += (dy / (dist || 1)) * force - 1.2; // antigravity loft
          tile.vrot += (Math.random() - 0.5) * 0.1;
        }

        // Spring restoration
        const springK = 0.08;
        const damp = 0.88;
        tile.vx += (targetX - tile.x) * springK;
        tile.vy += (targetY - tile.y) * springK;
        tile.vx *= damp;
        tile.vy *= damp;
        tile.x += tile.vx;
        tile.y += tile.vy;

        tile.vrot += (0 - tile.rot) * 0.08;
        tile.vrot *= 0.9;
        tile.rot += tile.vrot;
      });

      // Draw Inner Golden Glowing Neon Core
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 14;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 24;
      ctx.lineCap = 'round';

      // Inner rod
      ctx.beginPath();
      ctx.moveTo(0, -110);
      ctx.lineTo(0, 110);
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.arc(0, -145, 38, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // Draw Segmented Chrome Matrix Blocks
      ctx.save();
      ctx.translate(cx, cy);

      tilesRef.current.forEach((tile) => {
        ctx.save();
        ctx.translate(tile.x, tile.y);
        ctx.rotate(tile.rot);

        // Chrome metallic gradient
        const chromeGrad = ctx.createLinearGradient(-tile.w / 2, -tile.h / 2, tile.w / 2, tile.h / 2);
        chromeGrad.addColorStop(0, '#f8fafc');
        chromeGrad.addColorStop(0.35, '#94a3b8');
        chromeGrad.addColorStop(0.7, '#cbd5e1');
        chromeGrad.addColorStop(1, '#64748b');

        ctx.fillStyle = chromeGrad;
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 0.8;
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 6;

        ctx.fillRect(-tile.w / 2, -tile.h / 2, tile.w, tile.h);
        ctx.strokeRect(-tile.w / 2, -tile.h / 2, tile.w, tile.h);

        ctx.restore();
      });

      // Draw Signature "IZAZ AHAMAD" Precision Central Badge
      ctx.save();
      // Draw plate with 3D bevel
      const badgeW = 120;
      const badgeH = 50;
      ctx.fillStyle = '#090d16';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 16;
      ctx.fillRect(-badgeW / 2, -badgeH / 2, badgeW, badgeH);
      ctx.strokeRect(-badgeW / 2, -badgeH / 2, badgeW, badgeH);

      // Inner border
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.strokeRect(-badgeW / 2 + 3, -badgeH / 2 + 3, badgeW - 6, badgeH - 6);

      // Text: IZAZ AHAMAD
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 10;
      ctx.fillText('IZAZ AHAMAD', 0, -6);

      // Subtitle: PRECISION SPANNER
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 8px monospace';
      ctx.shadowBlur = 4;
      ctx.fillText('PRECISION 3D SPANNER', 0, 10);

      ctx.restore();
      ctx.restore(); // restore translate(cx, cy)

      // Animate Particles
      if (particlesRef.current.length > 0) {
        ctx.save();
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.2; // gravity
          p.life -= 0.02;

          if (p.life <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life / p.maxLife;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    };

    render();

    // Pointer events for drag to rotate
    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isHovering: true,
      };

      if (isDraggingRef.current) {
        const dx = e.clientX - prevPointerRef.current.x;
        const dy = e.clientY - prevPointerRef.current.y;
        prevPointerRef.current = { x: e.clientX, y: e.clientY };

        spannerAngleRef.current.yaw += dx * 0.015;
        spannerAngleRef.current.pitch += dy * 0.015;
        spannerVelRef.current = {
          yaw: dx * 0.005,
          pitch: dy * 0.005,
        };
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handlePointerLeave = () => {
      mouseRef.current.isHovering = false;
      isDraggingRef.current = false;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [autoRotate]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden cursor-grab active:cursor-grabbing">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* 3D Spanner Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 bg-[#0d121c]/85 backdrop-blur-md border border-slate-700/60 px-3 py-1.5 rounded-full shadow-lg text-xs font-mono text-slate-300">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full transition-colors ${
            autoRotate ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Move3d className="w-3.5 h-3.5" />
          <span>{autoRotate ? 'Auto-Spin: ON' : 'Auto-Spin: OFF'}</span>
        </button>

        <button
          onClick={handleResetAngle}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset View</span>
        </button>

        <button
          onClick={triggerBlast}
          disabled={isBlasting}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBlasting ? 'Blasting...' : 'Shockwave'}</span>
        </button>
      </div>

      {/* Tip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex items-center space-x-2 bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 text-xs font-mono text-slate-300 shadow-xl">
        <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Click & Drag to rotate Spanner 360°</span>
        <span className="text-slate-600">•</span>
        <span>Wiggle mouse over tiles to disturb</span>
      </div>
    </div>
  );
};
