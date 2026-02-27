// ============================================
// OLD WORLD 3D - Three.js: papers, stamps, particles
// ============================================

import * as THREE from 'three';

let scene, camera, renderer, canvas;
let papers = [];
let particles = [];
let animationId = null;
let isActive = false;

export function initOldWorld3D() {
  canvas = document.getElementById('old-world-canvas');
  if (!canvas) return;

  setupScene();
  setupLights();

  // Listen for section changes
  window.addEventListener('sectionchange', (e) => {
    if (e.detail.section === 'old-world') {
      isActive = true;
      if (!animationId) animate();
    } else {
      isActive = false;
    }
  });

  // Listen for burst events from timeline
  window.addEventListener('ow3d:burst', (e) => {
    if (!isActive) return;
    createPaperBurst(e.detail.phase);
  });

  // Listen for reset
  window.addEventListener('ow3d:reset', () => {
    resetScene();
  });

  // Handle resize
  window.addEventListener('resize', onResize);
}

function setupScene() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;
  camera.position.y = 5;

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
}

function setupLights() {
  const ambientLight = new THREE.AmbientLight(0x444444, 0.5);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffeedd, 0.8);
  dirLight.position.set(10, 20, 15);
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0xdc2626, 0.3, 50);
  pointLight.position.set(-10, 10, 10);
  scene.add(pointLight);
}

function createPaperMesh() {
  const geometry = new THREE.PlaneGeometry(2, 2.8);
  const material = new THREE.MeshPhongMaterial({
    color: 0xf5f0e8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9
  });

  // Add some variation
  material.color.setHex(
    0xf5f0e8 + Math.floor(Math.random() * 0x0a0a0a)
  );

  const mesh = new THREE.Mesh(geometry, material);

  // Add "lines" with a smaller darker plane
  const lineGeo = new THREE.PlaneGeometry(1.4, 0.04);
  const lineMat = new THREE.MeshBasicMaterial({ color: 0xc4b9a8, transparent: true, opacity: 0.6 });

  for (let i = 0; i < 5; i++) {
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.position.y = 0.8 - i * 0.35;
    line.position.z = 0.01;
    mesh.add(line);
  }

  return mesh;
}

function createPaperBurst(phase) {
  const count = 6 + phase * 2;

  for (let i = 0; i < count; i++) {
    const paper = createPaperMesh();

    // Start from center, burst outward
    paper.position.set(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2 + 5,
      (Math.random() - 0.5) * 5
    );

    paper.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    paper.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        -0.02 - Math.random() * 0.05,
        (Math.random() - 0.5) * 0.3
      ),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.03
      ),
      lifetime: 0,
      maxLifetime: 200 + Math.random() * 200
    };

    scene.add(paper);
    papers.push(paper);
  }

  // Create dust particles
  createDustParticles(phase);

  // Create stamp effect for phases with stamps
  if (phase === 1 || phase === 3) {
    createStampEffect();
  }
}

function createDustParticles(phase) {
  const particleCount = 20 + phase * 10;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 15 - 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

    // Warm dust colors
    colors[i * 3] = 0.8 + Math.random() * 0.2;
    colors[i * 3 + 1] = 0.7 + Math.random() * 0.2;
    colors[i * 3 + 2] = 0.5 + Math.random() * 0.2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geometry, material);
  points.userData = {
    lifetime: 0,
    maxLifetime: 150,
    isParticle: true
  };

  scene.add(points);
  particles.push(points);
}

function createStampEffect() {
  // Red flash plane
  const geometry = new THREE.PlaneGeometry(4, 3);
  const material = new THREE.MeshBasicMaterial({
    color: 0xdc2626,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending
  });

  const stamp = new THREE.Mesh(geometry, material);
  stamp.position.set(0, 3, 15);
  stamp.userData = {
    lifetime: 0,
    maxLifetime: 30,
    isStamp: true
  };

  scene.add(stamp);
  particles.push(stamp);
}

function animate() {
  if (!isActive) {
    animationId = null;
    return;
  }

  animationId = requestAnimationFrame(animate);

  // Update papers
  for (let i = papers.length - 1; i >= 0; i--) {
    const paper = papers[i];
    const ud = paper.userData;

    paper.position.add(ud.velocity);
    paper.rotation.x += ud.rotationSpeed.x;
    paper.rotation.y += ud.rotationSpeed.y;
    paper.rotation.z += ud.rotationSpeed.z;

    // Gravity
    ud.velocity.y -= 0.0005;

    // Fade out
    ud.lifetime++;
    if (ud.lifetime > ud.maxLifetime * 0.7) {
      const fadeProgress = (ud.lifetime - ud.maxLifetime * 0.7) / (ud.maxLifetime * 0.3);
      paper.material.opacity = 0.9 * (1 - fadeProgress);
    }

    // Remove when done
    if (ud.lifetime >= ud.maxLifetime) {
      scene.remove(paper);
      paper.geometry.dispose();
      paper.material.dispose();
      papers.splice(i, 1);
    }
  }

  // Update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.userData.lifetime++;

    if (p.userData.isParticle) {
      // Move particles upward slowly
      const positions = p.geometry.attributes.position.array;
      for (let j = 1; j < positions.length; j += 3) {
        positions[j] += 0.02;
      }
      p.geometry.attributes.position.needsUpdate = true;
    }

    if (p.userData.isStamp) {
      // Flash and fade
      const progress = p.userData.lifetime / p.userData.maxLifetime;
      p.material.opacity = 0.3 * (1 - progress);
    }

    // Fade out
    const fadeStart = p.userData.maxLifetime * 0.6;
    if (p.userData.lifetime > fadeStart) {
      const fadeProgress = (p.userData.lifetime - fadeStart) / (p.userData.maxLifetime * 0.4);
      p.material.opacity = Math.max(0, p.material.opacity * (1 - fadeProgress * 0.1));
    }

    if (p.userData.lifetime >= p.userData.maxLifetime) {
      scene.remove(p);
      if (p.geometry) p.geometry.dispose();
      if (p.material) p.material.dispose();
      particles.splice(i, 1);
    }
  }

  // Subtle camera sway
  camera.position.x = Math.sin(Date.now() * 0.0003) * 2;
  camera.position.y = 5 + Math.cos(Date.now() * 0.0004) * 1;
  camera.lookAt(0, 3, 0);

  renderer.render(scene, camera);
}

function resetScene() {
  // Remove all papers
  papers.forEach(p => {
    scene.remove(p);
    p.geometry.dispose();
    p.material.dispose();
  });
  papers = [];

  // Remove all particles
  particles.forEach(p => {
    scene.remove(p);
    if (p.geometry) p.geometry.dispose();
    if (p.material) p.material.dispose();
  });
  particles = [];
}

function onResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
