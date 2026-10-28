import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface SpinAnimation {
  startedAt: number;
  from: number;
  to: number;
  duration: number;
}

export function HeroLogo3D({ className = 'car-05__logo-button' }: { className?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spinAnimationRef = useRef<SpinAnimation | null>(null);
  const spinOffsetRef = useRef(0);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerRotationRef = useRef({ x: 0, y: 0, z: 0 });
  const scheduleRenderRef = useRef<() => void>(() => undefined);
  const reducedMotionRef = useRef(false);
  const [has3dError, setHas3dError] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      reducedMotionRef.current = preference.matches;
    };
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    const canvas = canvasRef.current;
    if (!button || !canvas) return;

    let disposed = false;
    let animationFrame = 0;
    let modelReady = false;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch (error) {
      console.error('Unable to initialize the Freedive Dahab 3D logo renderer.', error);
      setHas3dError(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 5);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x18364d, 2.2));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(-2, 3, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x89ffff, 1.1);
    fillLight.position.set(3, -1, 3);
    scene.add(fillLight);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const renderFrame = () => {
      animationFrame = 0;
      if (disposed || !modelReady) return;

      const spin = spinAnimationRef.current;
      let isSpinning = false;
      if (spin) {
        const progress = Math.min(1, (performance.now() - spin.startedAt) / spin.duration);
        const easedProgress = 1 - (1 - progress) ** 3;
        spinOffsetRef.current = spin.from + (spin.to - spin.from) * easedProgress;
        if (progress >= 1) {
          spinOffsetRef.current = 0;
          spinAnimationRef.current = null;
        } else {
          isSpinning = true;
        }
      }
      const pointerTarget = pointerTargetRef.current;
      const pointerRotation = pointerRotationRef.current;
      pointerRotation.x += (-pointerTarget.y * 0.12 - pointerRotation.x) * 0.16;
      pointerRotation.y += (pointerTarget.x * 0.2 - pointerRotation.y) * 0.16;
      pointerRotation.z += (-pointerTarget.x * 0.025 - pointerRotation.z) * 0.16;
      const isPointerSettling =
        Math.abs(pointerRotation.x + pointerTarget.y * 0.12) > 0.001 ||
        Math.abs(pointerRotation.y - pointerTarget.x * 0.2) > 0.001 ||
        Math.abs(pointerRotation.z + pointerTarget.x * 0.025) > 0.001;
      modelGroup.rotation.set(
        pointerRotation.x,
        spinOffsetRef.current + pointerRotation.y,
        pointerRotation.z,
      );

      renderer.render(scene, camera);

      if (
        isSpinning || isPointerSettling
      ) {
        animationFrame = window.requestAnimationFrame(renderFrame);
      }
    };

    const scheduleRender = () => {
      if (!animationFrame && modelReady) {
        animationFrame = window.requestAnimationFrame(renderFrame);
      }
    };
    scheduleRenderRef.current = scheduleRender;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || reducedMotionRef.current) return;
      const bounds = button.getBoundingClientRect();
      pointerTargetRef.current = {
        x: Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1)),
        y: Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1)),
      };
      scheduleRender();
    };
    const handlePointerLeave = () => {
      pointerTargetRef.current = { x: 0, y: 0 };
      scheduleRender();
    };
    button.addEventListener('pointermove', handlePointerMove);
    button.addEventListener('pointerleave', handlePointerLeave);

    const resize = () => {
      const { width, height } = button.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (modelReady) renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(button);
    resize();

    new GLTFLoader().load(
      '/models/freedive-dahab-logo.glb',
      (gltf) => {
        if (disposed) return;

        const bounds = new THREE.Box3().setFromObject(gltf.scene);
        const dimensions = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const largestSide = Math.max(dimensions.x, dimensions.y, dimensions.z);
        if (!Number.isFinite(largestSide) || largestSide <= 0) {
          console.error('The Freedive Dahab 3D logo has invalid model dimensions.');
          setHas3dError(true);
          return;
        }

        gltf.scene.position.sub(center);
        gltf.scene.scale.setScalar(2 / largestSide);
        modelGroup.add(gltf.scene);
        modelReady = true;
        setIsModelReady(true);
        resize();
        scheduleRender();
      },
      undefined,
      (error) => {
        if (disposed) return;
        console.error('Unable to load the Freedive Dahab 3D logo.', error);
        setHas3dError(true);
      },
    );

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      button.removeEventListener('pointermove', handlePointerMove);
      button.removeEventListener('pointerleave', handlePointerLeave);
      resizeObserver.disconnect();
      scheduleRenderRef.current = () => undefined;
      renderer.dispose();
    };
  }, []);

  const handleActivate = () => {
    pointerTargetRef.current = { x: 0, y: 0 };
    const from = spinOffsetRef.current;
    const fullTurn = Math.PI * 2;
    const remainingTurn = (fullTurn - (from % fullTurn)) % fullTurn;
    const to = from + (remainingTurn < 0.001 ? fullTurn : remainingTurn);

    if (reducedMotionRef.current) {
      spinOffsetRef.current = 0;
      spinAnimationRef.current = null;
    } else {
      spinAnimationRef.current = {
        startedAt: performance.now(),
        from,
        to,
        duration: 1200,
      };
    }
    scheduleRenderRef.current();
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={className}
      aria-label="Freedive Dahab 3D logo. Activate to spin 360 degrees and return to its centered position."
      title="Activate to spin 360°"
      onClick={handleActivate}
    >
      <canvas
        ref={canvasRef}
        className="car-05__logo-canvas"
        aria-hidden="true"
        data-failed={has3dError}
      />
      <img
        src="/logo-freedive-dahab.png"
        alt=""
        aria-hidden="true"
        className="car-05__logo-fallback"
        data-visible={!isModelReady || has3dError}
      />
    </button>
  );
}
