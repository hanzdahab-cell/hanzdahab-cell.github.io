import { useEffect, useRef, useState, type PointerEvent } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface PointerTilt {
  x: number;
  y: number;
  active: boolean;
}

export function HeroLogo3D({ className = 'car-05__logo-button' }: { className?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<PointerTilt>({ x: 0, y: 0, active: false });
  const spinVelocityRef = useRef(0);
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

      const pointer = pointerRef.current;
      const targetX = pointer.active && !reducedMotionRef.current ? pointer.y * 0.22 : 0;
      const targetY = pointer.active && !reducedMotionRef.current ? pointer.x * 0.42 : 0;
      const deltaX = targetX - modelGroup.rotation.x;
      const deltaY = targetY - modelGroup.rotation.y;

      modelGroup.rotation.x += deltaX * 0.14;
      modelGroup.rotation.y += deltaY * 0.14;

      if (spinVelocityRef.current > 0.001) {
        modelGroup.rotation.y += spinVelocityRef.current;
        spinVelocityRef.current *= reducedMotionRef.current ? 0.76 : 0.93;
      } else {
        spinVelocityRef.current = 0;
      }

      renderer.render(scene, camera);

      if (
        pointer.active ||
        Math.abs(deltaX) > 0.001 ||
        Math.abs(deltaY) > 0.001 ||
        spinVelocityRef.current > 0
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
      resizeObserver.disconnect();
      scheduleRenderRef.current = () => undefined;
      renderer.dispose();
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      y: ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
      active: true,
    };
    scheduleRenderRef.current();
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
    scheduleRenderRef.current();
  };

  const handleActivate = () => {
    spinVelocityRef.current = reducedMotionRef.current ? 0.07 : 0.24;
    scheduleRenderRef.current();
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={className}
      aria-label="Freedive Dahab 3D logo. Activate to spin."
      title="Move to tilt or tap to spin"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
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
