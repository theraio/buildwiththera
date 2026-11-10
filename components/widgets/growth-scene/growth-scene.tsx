"use client";

import * as THREE from "three";

import {
  CAMERA_DISTANCE,
  CAMERA_FOV,
  COLOR_TOKENS,
  GLOW_LENGTH,
  GROWTH_AT_TOP,
  GROWTH_PER_VIEWPORT,
  PRIMARY_ROOTS,
  TIP_LENGTH,
} from "./constants";
import { useEffect, useRef } from "react";

import { GrowthSceneProps } from "./types";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RootPath } from "./types";
import { createRootSystem, ramp } from "./utils";
import { prefersReducedMotion } from "~/utils/gsap";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const RADIAL_SEGMENTS = [18, 10, 6];
// Roots with a lead start grown in; the intro begins below their first births.
const INTRO_FROM = -Math.max(...PRIMARY_ROOTS.map((root) => root.lead));

/** Soft radial falloff for the particles and the background glows. */
function createGlowTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.3)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
  }
  return new THREE.CanvasTexture(canvas);
}

/**
 * Tileable bark grain for the bump map: long fibres and fissures along the
 * root (canvas y), short cross wrinkles around it (canvas x).
 */
function createBarkTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (context) {
    const { width, height } = canvas;
    context.fillStyle = "rgb(128,128,128)";
    context.fillRect(0, 0, width, height);
    // Draws a wavy stroke at every wrapped offset, so the texture tiles.
    const stroke = (x: number, y: number, dx: number, dy: number) => {
      for (const ox of [-width, 0, width]) {
        for (const oy of [-height, 0, height]) {
          context.beginPath();
          context.moveTo(x + ox, y + oy);
          context.quadraticCurveTo(
            x + ox + dx / 2 + (Math.random() - 0.5) * (6 + Math.abs(dx)),
            y + oy + dy / 2,
            x + ox + dx,
            y + oy + dy,
          );
          context.stroke();
        }
      }
    };
    context.lineCap = "round";
    for (let i = 0; i < 1400; i++) {
      const shade = 50 + Math.random() * 170;
      context.strokeStyle = `rgba(${shade},${shade},${shade},0.35)`;
      context.lineWidth = 1 + Math.random() * 2;
      stroke(
        Math.random() * width,
        Math.random() * height,
        (Math.random() - 0.5) * 4,
        20 + Math.random() * 110,
      );
    }
    context.strokeStyle = "rgba(20,20,20,0.55)";
    for (let i = 0; i < 30; i++) {
      context.lineWidth = 1.5 + Math.random() * 2;
      stroke(
        Math.random() * width,
        Math.random() * height,
        (Math.random() - 0.5) * 14,
        40 + Math.random() * 180,
      );
    }
    // Soften the strokes into grain rather than engraved lines.
    context.filter = "blur(0.8px)";
    context.drawImage(canvas, 0, 0);
    context.filter = "none";
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** Bark tiles along a root: one tile per this many world units. */
const BARK_TILE = 0.3;

/**
 * Merges every root into one tube mesh. Each vertex carries its arc birth and
 * its ring centre, so the shader can grow the roots without touching buffers.
 */
function createRootGeometry(roots: RootPath[]): THREE.BufferGeometry {
  let vertexCount = 0;
  let indexCount = 0;
  for (const root of roots) {
    const radial = RADIAL_SEGMENTS[root.level];
    // One extra vertex per ring closes the bark texture's seam.
    vertexCount += root.points.length * (radial + 1);
    indexCount += (root.points.length - 1) * radial * 6;
  }
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const centers = new Float32Array(vertexCount * 3);
  const births = new Float32Array(vertexCount);
  const uvs = new Float32Array(vertexCount * 2);
  const indices = new Uint32Array(indexCount);

  const point = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const binormal = new THREE.Vector3();
  const direction = new THREE.Vector3();
  let vertex = 0;
  let index = 0;

  roots.forEach((root, rootIndex) => {
    const radial = RADIAL_SEGMENTS[root.level];
    const { points } = root;
    const last = points.length - 1;
    const phase = rootIndex * 1.7;
    let arc = 0;
    // Parallel transport keeps the rings from twisting along the root.
    normal.set(0, 0, 1);
    for (let i = 0; i <= last; i++) {
      const before = points[Math.max(0, i - 1)];
      const after = points[Math.min(last, i + 1)];
      tangent
        .set(after[0] - before[0], after[1] - before[1], after[2] - before[2])
        .normalize();
      normal.addScaledVector(tangent, -normal.dot(tangent)).normalize();
      binormal.crossVectors(tangent, normal);
      if (i > 0)
        arc += Math.hypot(
          points[i][0] - point.x,
          points[i][1] - point.y,
          points[i][2] - point.z,
        );
      point.set(...points[i]);
      const first = vertex;
      for (let j = 0; j <= radial; j++) {
        const angle = (j / radial) * Math.PI * 2;
        // Gnarled, uneven cross sections: lumps along the root, never a clean tube.
        const lump =
          1 +
          0.1 * Math.sin(arc * 23 + phase) * Math.cos(angle * 2 + arc * 7) +
          0.06 * Math.sin(arc * 61 + angle * 3 + phase * 2) +
          0.05 * Math.cos(angle + arc * 4 + phase);
        const radius = root.radii[i] * lump;
        direction
          .copy(normal)
          .multiplyScalar(Math.cos(angle))
          .addScaledVector(binormal, Math.sin(angle));
        direction.toArray(normals, vertex * 3);
        point.toArray(centers, vertex * 3);
        positions[vertex * 3] = point.x + direction.x * radius;
        positions[vertex * 3 + 1] = point.y + direction.y * radius;
        positions[vertex * 3 + 2] = point.z + direction.z * radius;
        births[vertex] = root.births[i];
        uvs[vertex * 2] = j / radial;
        uvs[vertex * 2 + 1] = arc / BARK_TILE;
        vertex++;
      }
      if (i === last) continue;
      for (let j = 0; j < radial; j++) {
        const a = first + j;
        const b = a + 1;
        const ring = radial + 1;
        // Counter-clockwise seen from outside, so the outer wall is the front face.
        indices.set([a, b, a + ring, b, b + ring, a + ring], index);
        index += 6;
      }
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setAttribute("aCenter", new THREE.BufferAttribute(centers, 3));
  geometry.setAttribute("aBirth", new THREE.BufferAttribute(births, 1));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  return geometry;
}

function GrowthScene({ className }: GrowthSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      // No WebGL: the ink ground and the copy carry the page on their own.
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    // No tone mapping: every curve crushes the ink ground the page sits on.
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const styles = getComputedStyle(container);
    const token = (name: string) =>
      new THREE.Color(styles.getPropertyValue(name).trim() || "#ffffff");
    const ground = token(COLOR_TOKENS.ground);
    const tip = token(COLOR_TOKENS.tip);

    const scene = new THREE.Scene();
    scene.background = ground;
    // Roots behind the copy recede into the ground colour.
    scene.fog = new THREE.Fog(
      ground,
      CAMERA_DISTANCE + 0.2,
      CAMERA_DISTANCE + 2.2,
    );
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.05, 20);
    camera.position.z = CAMERA_DISTANCE;

    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.35).texture;
    scene.environment = environment;
    const [blue, violet] = COLOR_TOKENS.glows.map(token);
    const rimLeft = new THREE.DirectionalLight(blue, 2.4);
    rimLeft.position.set(-3, 1, -1.5);
    const rimRight = new THREE.DirectionalLight(violet, 1.8);
    rimRight.position.set(3, -0.5, -1.5);
    const key = new THREE.DirectionalLight(0xffffff, 0.5);
    key.position.set(1, 2, 3);
    scene.add(rimLeft, rimRight, key);

    // Rough graphite bark: the sheen catches the blue and violet rims, the
    // grain breaks up every highlight.
    const bark = createBarkTexture();
    const uniforms = {
      uGrowth: { value: INTRO_FROM },
      uTipColor: { value: tip.clone().multiplyScalar(1.4) },
    };
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x1c1c21,
      roughness: 0.45,
      bumpMap: bark,
      bumpScale: 4,
      metalness: 0,
      sheen: 0.2,
      sheenRoughness: 0.45,
      sheenColor: 0x6f8cff,
      envMapIntensity: 0.18,
    });
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
attribute float aBirth;
attribute vec3 aCenter;
uniform float uGrowth;
varying float vFront;`,
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
float grown = clamp((uGrowth - aBirth) / ${TIP_LENGTH.toFixed(3)}, 0.0, 1.0);
// Concave taper: the growing tip draws out into a fine thread, like a real root tip.
transformed = aCenter + (transformed - aCenter) * pow(grown, 1.6);
vFront = aBirth <= uGrowth ? 1.0 - clamp((uGrowth - aBirth) / ${GLOW_LENGTH.toFixed(3)}, 0.0, 1.0) : 0.0;`,
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
uniform vec3 uTipColor;
varying float vFront;`,
        )
        .replace(
          "#include <emissivemap_fragment>",
          `#include <emissivemap_fragment>
totalEmissiveRadiance += uTipColor * pow(vFront, 2.5);`,
        );
    };
    const roots = new THREE.Mesh(new THREE.BufferGeometry(), material);
    roots.frustumCulled = false;
    scene.add(roots);

    const glowTexture = createGlowTexture();

    const decor = new THREE.Group();
    scene.add(decor);

    const size = { width: 0, height: 0, aspect: 0, depth: 0 };
    const disposeDecor = () => {
      decor.children.forEach((child) => {
        const object = child as THREE.Points | THREE.Sprite;
        object.geometry.dispose();
        (object.material as THREE.Material).dispose();
      });
      decor.clear();
    };

    /** Roots, soil motes and colour fields for the current viewport and page length. */
    const build = () => {
      const halfWidth = size.aspect / 2;
      roots.geometry.dispose();
      roots.geometry = createRootGeometry(
        createRootSystem({ halfWidth, depth: size.depth }),
      );
      // The first compile saw an empty geometry and shades in blocks; recompile.
      material.needsUpdate = true;
      disposeDecor();

      const random = Math.random;
      const count = Math.round(size.depth * 70);
      const motes = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const z = -2.4 + random() * 2.6;
        const spread = halfWidth * ((CAMERA_DISTANCE - z) / CAMERA_DISTANCE);
        motes.set(
          [(random() * 2 - 1) * spread, 0.5 - random() * (size.depth + 1), z],
          i * 3,
        );
      }
      const moteGeometry = new THREE.BufferGeometry();
      moteGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(motes, 3),
      );
      decor.add(
        new THREE.Points(
          moteGeometry,
          new THREE.PointsMaterial({
            size: 0.012,
            map: glowTexture,
            color: 0xffffff,
            transparent: true,
            opacity: 0.45,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          }),
        ),
      );

      // Colour fields deep behind the roots, one per stretch of the page.
      const fields: [THREE.Color, number, number][] = [
        [blue, -0.55, -0.9],
        [violet, 0.6, -size.depth * 0.45],
        [tip, 0, -size.depth + 0.2],
      ];
      for (const [color, x, y] of fields) {
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glowTexture,
            color,
            transparent: true,
            opacity: 0.1,
            depthWrite: false,
            fog: false,
            blending: THREE.AdditiveBlending,
          }),
        );
        sprite.position.set(x * size.aspect, y, -3.5);
        sprite.scale.setScalar(4.5);
        decor.add(sprite);
      }
    };

    let rebuildTimer = 0;
    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;
      size.width = clientWidth;
      size.height = clientHeight;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();

      const depth = document.documentElement.scrollHeight / clientHeight;
      const changed =
        Math.abs(camera.aspect / (size.aspect || 1) - 1) > 0.08 ||
        Math.abs(depth - size.depth) > 0.3;
      if (!changed) return;
      window.clearTimeout(rebuildTimer);
      rebuildTimer = window.setTimeout(
        () => {
          size.aspect = camera.aspect;
          size.depth = depth;
          build();
        },
        size.depth ? 250 : 0,
      );
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    // The page grows once the story pins and fonts load.
    resizeObserver.observe(document.body);

    const reducedMotion = prefersReducedMotion();
    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reducedMotion) window.addEventListener("pointermove", onPointerMove);

    const scrolled = () => window.scrollY / (size.height || window.innerHeight);
    let depthShown = scrolled();
    let intro = reducedMotion ? 1 : 0;
    let elapsed = 0;

    const update = (delta: number) => {
      elapsed += delta;
      intro = Math.min(1, intro + delta / 1.8);
      const target = scrolled();
      const follow = (rate: number) =>
        reducedMotion ? 1 : 1 - Math.exp(-delta * rate);
      // A touch of lag gives the field weight against the copy above it.
      depthShown += (target - depthShown) * follow(8);
      // Over the last screen the network finishes growing around the close.
      const finish = ramp(depthShown, size.depth - 2, size.depth - 1) * 1.2;
      const growthTarget =
        INTRO_FROM +
        (GROWTH_AT_TOP +
          depthShown * GROWTH_PER_VIEWPORT +
          finish -
          INTRO_FROM) *
          easeOut(intro);
      uniforms.uGrowth.value +=
        (growthTarget - uniforms.uGrowth.value) * (intro < 1 ? 1 : follow(2.5));

      tilt.x += (pointer.x - tilt.x) * follow(2);
      tilt.y += (pointer.y - tilt.y) * follow(2);
      camera.position.set(
        tilt.x * 0.05,
        -depthShown - tilt.y * 0.03,
        CAMERA_DISTANCE,
      );

      if (!reducedMotion) decor.position.x = Math.sin(elapsed * 0.08) * 0.02;

      renderer.render(scene, camera);
    };

    let frameId = 0;
    let last = performance.now();
    const loop = (now: number) => {
      update(Math.min((now - last) / 1000, 0.05));
      last = now;
      frameId = requestAnimationFrame(loop);
    };
    const setRunning = () => {
      cancelAnimationFrame(frameId);
      if (!document.hidden) {
        last = performance.now();
        frameId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", setRunning);
    resize();
    setRunning();

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(rebuildTimer);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", setRunning);
      window.removeEventListener("pointermove", onPointerMove);
      disposeDecor();
      roots.geometry.dispose();
      material.dispose();
      bark.dispose();
      glowTexture.dispose();
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className={className} />;
}

export default GrowthScene;
