/* eslint-disable react/no-unknown-property */
"use client";

import * as THREE from 'three';
import { useRef, useState, useEffect, memo, ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree, ThreeElements } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  MeshTransmissionMaterial,
  Environment,
  Text
} from '@react-three/drei';
import { easing } from 'maath';

type Mode = 'lens' | 'bar' | 'cube';

export interface NavItem {
  id: string;
  label: string;
  link: string;
}

type ModeProps = Record<string, unknown>;

interface FluidGlassProps {
  mode?: Mode;
  lensProps?: ModeProps;
  barProps?: ModeProps;
  cubeProps?: ModeProps;
  navItems?: NavItem[];
  [key: string]: any;
}

export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {}, navItems = [], ...rest }: FluidGlassProps) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  const modeProps = { ...rawOverrides, ...rest };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`w-full h-full ${mode === 'lens' ? 'fixed inset-0 z-50 pointer-events-none' : 'relative z-40'}`}>
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 15 }} 
        gl={{ alpha: true, antialias: true }}
        eventPrefix="client"
      >
        <ambientLight intensity={2} />
        <Environment preset="city" />
        {mode === 'bar' && <NavItems items={navItems} />}
        <Wrapper modeProps={modeProps} />
      </Canvas>
    </div>
  );
}

type MeshProps = ThreeElements['mesh'];

interface ModeWrapperProps extends MeshProps {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  isCentered?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  isCentered = false,
  followPointer = true,
  modeProps = {},
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());
  const geoWidthRef = useRef<number>(1);

  useEffect(() => {
    const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;
    if (geo) {
      geo.computeBoundingBox();
      geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = isCentered ? 0 : followPointer ? (pointer.y * v.height) / 2 : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if ((modeProps as { scale?: number }).scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    // Always render the local scene into the FBO so the glass can refract things behind it
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  return (
    <>
      {createPortal(children, scene)}
      {/* We don't render a background plane if we only want text to be floating */}
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={nodes && nodes[geometryKey] ? (nodes[geometryKey] as THREE.Mesh).geometry : undefined}
        {...props}
      >
        {geometryKey === 'Cube' ? (
          <MeshTransmissionMaterial
            buffer={buffer.texture}
            ior={ior ?? 1.15}
            thickness={thickness ?? 5}
            anisotropy={anisotropy ?? 0.01}
            chromaticAberration={chromaticAberration ?? 0.1}
            transmission={1}
            transparent
            {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}
          />
        ) : (
          <meshPhysicalMaterial
            transparent
            opacity={0.3}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.05}
            metalness={0.1}
            ior={ior ?? 1.15}
            {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}
          />
        )}
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
  return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }: { modeProps?: ModeProps } & MeshProps) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      isCentered
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function NavItems({ items }: { items: NavItem[] }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 1.5, fontSize: 0.25 },
    tablet: { max: 1023, spacing: 2.0, fontSize: 0.35 },
    desktop: { max: Infinity, spacing: 2.5, fontSize: 0.35 }
  };
  
  const getDevice = () => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, 0, 15.1); // center aligned for header
    group.current.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (link: string) => {
    if (!link) return;
    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);
  };

  return (
    <>
      {createPortal(
        <group ref={group} renderOrder={10}>
          {items.map(({ id, label, link }) => (
            <Text
              key={id || label}
              fontSize={fontSize}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0}
              outlineBlur="20%"
              outlineColor="#000"
              outlineOpacity={0.5}
              renderOrder={10}
              onClick={e => {
                e.stopPropagation();
                handleNavigate(link || `#${id}`);
              }}
              onPointerOver={() => (document.body.style.cursor = 'pointer')}
              onPointerOut={() => (document.body.style.cursor = 'auto')}
            >
              {label}
            </Text>
          ))}
        </group>
      , group.current || new THREE.Scene())}
    </>
  );
}
