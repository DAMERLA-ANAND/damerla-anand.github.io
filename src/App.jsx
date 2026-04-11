import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// IMPORTANT:
// Replace this URL with your deployed backend URL after hosting on Render/Railway.
// While running locally, use http://localhost:3000.
const API_BASE = 'https://YOUR-BACKEND-URL-HERE.onrender.com';

const EVENT_KEYS = ['mangalasnanam', 'pellikuthuru', 'pelli'];

const EVENT_BUTTON_TEXT = {
  mangalasnanam: "I'm Coming to Mangalasnanam! 🙏",
  pellikuthuru: "I'm Coming to Pellikuthuru Veduka! 🙏",
  pelli: "I'm Coming to Pelli! 🙏"
};

function Deepam({ mirrored = false, size = 44 }) {
  return (
    <svg
      className={`deepam ${mirrored ? 'mirrored' : ''}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <g fill="none" stroke="none">
        <path d="M20 54h24l-2-6H22z" fill="var(--temple-gold)" />
        <path
          d="M25 48h14c2-7 3-13 0-19h-8c-3 6-2 12 0 19z"
          fill="url(#deepamGold)"
        />
        <ellipse cx="32" cy="25" rx="6" ry="10" className="flame" fill="var(--kumkum)" />
        <ellipse cx="32" cy="22" rx="3" ry="6" className="flame" fill="var(--turmeric)" />
        <rect x="30" y="12" width="4" height="10" rx="2" fill="var(--temple-gold)" />
      </g>
      <defs>
        <linearGradient id="deepamGold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--gold-light)" />
          <stop offset="1" stopColor="var(--gold-dark)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Ganesha({ size = 58, color = 'var(--burgundy)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <path
        fill={color}
        d="M39 8c-11 0-20 9-20 20 0 5 2 10 5 13-7 3-12 10-12 18 0 7 5 13 12 13h31c7 0 13-6 13-13 0-9-6-16-14-18 3-3 5-8 5-13 0-11-9-20-20-20zm0 10c6 0 10 4 10 10 0 3-1 6-3 8-4 4-6 9-6 15v7h-3v-7c0-6-2-11-6-15-2-2-3-5-3-8 0-6 4-10 11-10zm-8 42h18c-1 3-5 5-9 5s-8-2-9-5z"
      />
    </svg>
  );
}

function LotusDivider({ width = 120, stroke = 'var(--temple-gold)' }) {
  return (
    <svg width={width} height="22" viewBox="0 0 120 22" aria-hidden="true">
      <line x1="2" y1="11" x2="45" y2="11" stroke={stroke} strokeWidth="1.2" opacity="0.8" />
      <path
        d="M60 4c2 4 2 8 0 12-2-4-2-8 0-12zm-8 3c3 3 4 6 4 9-4-1-6-4-8-7 1-1 2-1 4-2zm16 0c2 1 3 1 4 2-2 3-4 6-8 7 0-3 1-6 4-9z"
        fill={stroke}
      />
      <line x1="75" y1="11" x2="118" y2="11" stroke={stroke} strokeWidth="1.2" opacity="0.8" />
    </svg>
  );
}

function Monogram() {
  return (
    <svg width="110" height="80" viewBox="0 0 200 120" aria-hidden="true">
      <text
        x="50"
        y="84"
        fontFamily="Playfair Display"
        fontSize="72"
        fontWeight="700"
        fill="var(--lotus-pink)"
      >
        S
      </text>
      <path
        d="M103 64c8-14 20-14 28 0-10 8-18 8-28 0zm-8 6c6-8 10-10 16-12-2 9-6 14-16 12zm32-12c6 2 10 4 16 12-10 2-14-3-16-12z"
        fill="var(--lotus-pink)"
      />
      <text
        x="126"
        y="84"
        fontFamily="Playfair Display"
        fontSize="72"
        fontWeight="700"
        fill="var(--tulsi-green)"
      >
        A
      </text>
    </svg>
  );
}

function App() {
  const splashRef = useRef(null);
  const splashRingRef = useRef(null);
  const splashGaneshRef = useRef(null);
  const heroCanvasRef = useRef(null);
  const venueCanvasRef = useRef(null);
  const navRef = useRef(null);
  const flowerCanvasRef = useRef(null);
  const weddingMotionRef = useRef(null);
  const weddingPhotoRef = useRef(null);

  const [showSplash, setShowSplash] = useState(true);
  const [showCounters, setShowCounters] = useState(true);
  const [isMobileHomeView, setIsMobileHomeView] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );
  const [displayCounts, setDisplayCounts] = useState({
    mangalasnanam: '—',
    pellikuthuru: '—',
    pelli: '—'
  });
  const [confirmedButtons, setConfirmedButtons] = useState({
    mangalasnanam: false,
    pellikuthuru: false,
    pelli: false
  });

  const countTimersRef = useRef({});

  function animateCountUp(eventKey, targetCount) {
    const target = Number.isFinite(Number(targetCount)) ? Math.max(0, Number(targetCount)) : 0;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));

    clearInterval(countTimersRef.current[eventKey]);
    setDisplayCounts((prev) => ({ ...prev, [eventKey]: 0 }));

    countTimersRef.current[eventKey] = setInterval(() => {
      current = Math.min(current + step, target);
      setDisplayCounts((prev) => ({ ...prev, [eventKey]: current }));
      if (current >= target) {
        clearInterval(countTimersRef.current[eventKey]);
      }
    }, 30);
  }

  function setButtonConfirmed(eventKey) {
    setConfirmedButtons((prev) => ({ ...prev, [eventKey]: true }));
  }

  async function loadAttendanceCounts() {
    EVENT_KEYS.forEach((eventKey) => {
      if (localStorage.getItem(`attended_${eventKey}`)) {
        setButtonConfirmed(eventKey);
      }
    });

    try {
      const res = await fetch(`${API_BASE}/api/attendance`);
      const data = await res.json();

      EVENT_KEYS.forEach((eventKey) => {
        animateCountUp(eventKey, data[eventKey]);
      });
    } catch (error) {
      setShowCounters(false);
    }
  }

  async function markAttending(eventKey) {
    if (localStorage.getItem(`attended_${eventKey}`)) {
      setButtonConfirmed(eventKey);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/attend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: eventKey })
      });

      const data = await res.json();
      if (typeof data.count === 'number') {
        animateCountUp(eventKey, data.count);
      }

      localStorage.setItem(`attended_${eventKey}`, 'true');
      setButtonConfirmed(eventKey);
    } catch (error) {
      localStorage.setItem(`attended_${eventKey}`, 'true');
      setButtonConfirmed(eventKey);
    }
  }

  useEffect(() => {
    loadAttendanceCounts();
    return () => {
      Object.values(countTimersRef.current).forEach((timer) => clearInterval(timer));
    };
  }, []);

  useEffect(() => {
    const mobileMedia = window.matchMedia('(max-width: 767px)');

    const handleMediaChange = (event) => {
      setIsMobileHomeView(event.matches);
    };

    setIsMobileHomeView(mobileMedia.matches);
    mobileMedia.addEventListener('change', handleMediaChange);

    return () => {
      mobileMedia.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    const applyMotionPreference = () => {
      gsap.globalTimeline.paused(media.matches);
      if (!media.matches) {
        gsap.globalTimeline.timeScale(window.innerWidth < 768 ? 0.7 : 1);
      }
    };

    applyMotionPreference();
    media.addEventListener('change', applyMotionPreference);
    window.addEventListener('resize', applyMotionPreference);

    return () => {
      media.removeEventListener('change', applyMotionPreference);
      window.removeEventListener('resize', applyMotionPreference);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle('is-solid', window.scrollY > 80);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowSplash(false);
      return undefined;
    }

    const splashCtx = gsap.context(() => {
      gsap.fromTo(
        splashGaneshRef.current,
        { scale: 0, rotate: -180, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' }
      );

      gsap.fromTo(
        splashRingRef.current,
        { strokeDashoffset: 314 },
        { strokeDashoffset: 0, duration: 1.8, ease: 'power2.out' }
      );

      gsap.fromTo('.splash-blessing', { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.4 });

      gsap.to(splashRef.current, {
        delay: 2,
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.6,
        ease: 'power3.in',
        onComplete: () => setShowSplash(false)
      });

      gsap.fromTo(
        '.home-view-frame',
        { y: 36, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, delay: 0.45, duration: 1, ease: 'power3.out' }
      );
    });

    return () => splashCtx.revert();
  }, []);

  useEffect(() => {
    if (isMobileHomeView) return undefined;

    const container = heroCanvasRef.current;
    if (!container) return undefined;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 1200 ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x3d0a0a);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a0808, 0.022);

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 160);
    camera.position.set(0, 8, 32);

    const stoneMaterial = new THREE.MeshPhongMaterial({ color: 0x2a1008, emissive: 0x0a0400 });
    const goldMaterial = new THREE.MeshPhongMaterial({
      color: 0xc8960c,
      emissive: 0x3a2000,
      specular: 0xe8c060,
      shininess: 60
    });

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(24, 1, 10), stoneMaterial);
    plinth.position.set(0, 0, 0);
    scene.add(plinth);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 50),
      new THREE.MeshPhongMaterial({ color: 0x1a0800, side: THREE.DoubleSide })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    scene.add(ground);

    const tiers = [
      { width: 7, height: 2.5, depth: 3.5 },
      { width: 5.8, height: 2.0, depth: 3.0 },
      { width: 4.6, height: 1.8, depth: 2.5 },
      { width: 3.4, height: 1.6, depth: 2.0 },
      { width: 2.4, height: 1.4, depth: 1.6 },
      { width: 1.4, height: 1.0, depth: 1.0 }
    ];

    const buildGopuram = (x, scale = 1) => {
      const group = new THREE.Group();
      group.position.x = x;
      group.scale.set(scale, scale, scale);

      let currentY = 0.5;

      tiers.forEach((tier) => {
        const block = new THREE.Mesh(
          new THREE.BoxGeometry(tier.width, tier.height, tier.depth),
          stoneMaterial
        );
        block.position.y = currentY + tier.height / 2;
        group.add(block);

        const decoCount = Math.max(4, Math.min(6, Math.round(tier.width)));
        for (let i = 0; i < decoCount; i += 1) {
          const deco = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.4, 0.5), stoneMaterial);
          deco.position.set(
            -tier.width / 2 + 0.7 + (i * (tier.width - 1.4)) / Math.max(1, decoCount - 1),
            currentY + tier.height * 0.4,
            tier.depth / 2 + 0.18
          );
          group.add(deco);
        }

        currentY += tier.height;
      });

      const vimana = new THREE.Mesh(
        new THREE.CylinderGeometry(0.85, 0.85, 2.1, 16, 1, false, 0, Math.PI),
        stoneMaterial
      );
      vimana.rotation.z = Math.PI / 2;
      vimana.position.y = currentY + 0.5;
      group.add(vimana);

      const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.5, 14), goldMaterial);
      finial.position.y = currentY + 1.55;
      group.add(finial);

      scene.add(group);
      return group;
    };

    buildGopuram(0, 1);
    buildGopuram(-9, 0.6);
    buildGopuram(9, 0.6);

    const particleCount = window.innerWidth < 1200 ? 110 : 150;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 1] = Math.random() * 20 - 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0xc8960c, size: 0.06 });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0x3a1800, 1);
    const sunLight = new THREE.DirectionalLight(0xd4a030, 1.6);
    sunLight.position.set(8, 20, 12);
    const lampGlow = new THREE.PointLight(0xff6600, 2.5, 30);
    lampGlow.position.set(0, 2, 6);
    const sideWarm = new THREE.PointLight(0x8b3000, 1);
    sideWarm.position.set(-10, 8, 0);

    scene.add(ambientLight, sunLight, lampGlow, sideWarm);

    const cameraTween = gsap.to(camera.position, {
      z: 20,
      duration: 4,
      ease: 'power2.out'
    });

    const scrollTween = gsap.to(camera.rotation, {
      y: 0.15,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    let rafId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      rafId = requestAnimationFrame(render);
      const time = clock.getElapsedTime();

      camera.position.x = Math.sin(time * 0.25) * 3;
      camera.lookAt(0, 6, 0);

      lampGlow.intensity = Math.sin(time * 2) * 0.4 + 2.5;

      const positions = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i += 1) {
        positions[i * 3 + 1] += 0.003;
        if (positions[i * 3 + 1] > 18) {
          positions[i * 3 + 1] = -12;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    render();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      cameraTween.kill();
      scrollTween.kill();

      scene.traverse((obj) => {
        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isMobileHomeView]);

  useEffect(() => {
    const container = venueCanvasRef.current;
    if (!container) return undefined;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xead8c0);

    const camera = new THREE.PerspectiveCamera(48, container.clientWidth / container.clientHeight, 0.1, 120);
    camera.position.set(0, 6, 18);

    const wallMat = new THREE.MeshPhongMaterial({ color: 0xede0c8 });
    const towerMat = new THREE.MeshPhongMaterial({ color: 0x4a3020 });
    const goldMat = new THREE.MeshPhongMaterial({ color: 0xc8960c, emissive: 0x3a2000, shininess: 45 });

    const facade = new THREE.Mesh(new THREE.BoxGeometry(16, 8, 8), wallMat);
    facade.position.y = 4;
    scene.add(facade);

    const buildTower = (x) => {
      const g = new THREE.Group();
      g.position.x = x;
      const t1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.3, 2.4), towerMat);
      t1.position.y = 1.15;
      const t2 = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.8, 1.9), towerMat);
      t2.position.y = 3.2;
      const t3 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.5, 1.4), towerMat);
      t3.position.y = 4.85;
      const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.9, 12), goldMat);
      finial.position.y = 6.1;
      g.add(t1, t2, t3, finial);
      scene.add(g);
    };

    buildTower(-5.5);
    buildTower(5.5);

    const archLeft = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.6, 0.3), goldMat);
    archLeft.position.set(-1.8, 1.8, 4.05);
    const archRight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.6, 0.3), goldMat);
    archRight.position.set(1.8, 1.8, 4.05);
    const archTop = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.3, 0.3), goldMat);
    archTop.position.set(0, 3.6, 4.05);
    scene.add(archLeft, archRight, archTop);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(34, 24),
      new THREE.MeshPhongMaterial({ color: 0x2a1000, side: THREE.DoubleSide })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    scene.add(ground);

    const ambient = new THREE.AmbientLight(0x7d5a30, 1.2);
    const interiorGlow = new THREE.PointLight(0xff8030, 2.4, 25);
    interiorGlow.position.set(0, 4, 1.5);
    const keyLight = new THREE.DirectionalLight(0xf5d09a, 1.2);
    keyLight.position.set(8, 14, 10);
    scene.add(ambient, interiorGlow, keyLight);

    let rafId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      rafId = requestAnimationFrame(render);
      const t = clock.getElapsedTime();
      camera.position.x = Math.sin(t * 0.5) * 10;
      camera.position.z = Math.cos(t * 0.5) * 18;
      camera.lookAt(0, 3, 0);
      renderer.render(scene, camera);
    };

    render();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);

      scene.traverse((obj) => {
        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    gsap.from('.event-card', {
      scrollTrigger: {
        trigger: '#events',
        start: 'top 75%'
      },
      duration: 0.9,
      y: 50,
      opacity: 0,
      rotateX: 10,
      transformPerspective: 1000,
      stagger: 0.18,
      ease: 'power3.out'
    });

    document.querySelectorAll('.section-heading, .venue-details, .person-card, .how-we-met').forEach((element) => {
      gsap.from(element, {
        scrollTrigger: { trigger: element, start: 'top 80%' },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    document.querySelectorAll('.split-heading').forEach((heading) => {
      if (heading.dataset.splitDone === 'true') return;

      const chars = Array.from(heading.textContent || '');
      heading.textContent = '';

      chars.forEach((char) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.textContent = char === ' ' ? '\u00A0' : char;
        heading.appendChild(span);
      });

      heading.dataset.splitDone = 'true';

      gsap.from(heading.querySelectorAll('span'), {
        scrollTrigger: { trigger: heading, start: 'top 80%' },
        rotationX: 90,
        y: 30,
        opacity: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: 'back.out(1.4)'
      });
    });

    document.querySelectorAll('.kolam-path').forEach((kolam) => {
      try {
        const length = kolam.getTotalLength();
        kolam.style.strokeDasharray = String(length);
        kolam.style.strokeDashoffset = String(length);

        gsap.to(kolam, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: kolam,
            start: 'top 80%'
          }
        });
      } catch (error) {
        // no-op for unsupported SVG elements
      }
    });

    gsap.to('.bride-wrap', {
      y: -50,
      scrollTrigger: {
        trigger: '#couple',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.to('.groom-wrap', {
      y: 50,
      scrollTrigger: {
        trigger: '#couple',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }, []);

  useEffect(() => {
    if (!weddingMotionRef.current || !weddingPhotoRef.current) {
      return undefined;
    }

    const orbs = weddingMotionRef.current.querySelectorAll('.motion-orb');
    const petals = weddingMotionRef.current.querySelectorAll('.motion-petal');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        weddingMotionRef.current,
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#rsvp',
            start: 'top 78%'
          }
        }
      );

      gsap.to(weddingMotionRef.current, {
        y: -8,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to(weddingPhotoRef.current, {
        scale: 1.08,
        x: 16,
        y: -8,
        rotate: 1.2,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to(orbs, {
        x: (index) => (index % 2 === 0 ? 20 : -18),
        y: (index) => (index % 2 === 0 ? -24 : 18),
        opacity: (index) => 0.2 + index * 0.06,
        duration: (index) => 4.2 + index * 0.7,
        repeat: -1,
        yoyo: true,
        stagger: 0.16,
        ease: 'sine.inOut'
      });

      gsap.to(petals, {
        y: -110,
        x: (index) => (index % 2 === 0 ? -30 : 30),
        rotate: (index) => (index % 2 === 0 ? -22 : 22),
        opacity: 0,
        scale: 0.45,
        duration: 3.4,
        repeat: -1,
        stagger: 0.42,
        ease: 'sine.out'
      });
    }, weddingMotionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return undefined;

    if (window.matchMedia('(hover: none)').matches) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return undefined;
    }

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rafId = 0;

    const onMove = (event) => {
      mx = event.clientX;
      my = event.clientY;
    };

    const animateCursor = () => {
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;

      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;

      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;

      rafId = requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', onMove);
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (isMobileHomeView) return undefined;

    const canvas = flowerCanvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const particleTotal = window.innerWidth < 1200 ? 20 : 30;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const types = ['jasmine', 'marigold', 'lotus'];
    const particles = Array.from({ length: particleTotal }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speedX: (Math.random() - 0.5) * 1.6,
      speedY: 0.6 + Math.random() * 1.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      opacity: 0.2 + Math.random() * 0.3,
      type: types[Math.floor(Math.random() * types.length)],
      size: 5 + Math.random() * 7
    }));

    const drawPetal = (x, y, w, h, rotation, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const drawFlower = (particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);

      if (particle.type === 'jasmine') {
        for (let i = 0; i < 5; i += 1) {
          drawPetal(
            Math.cos((i / 5) * Math.PI * 2) * particle.size * 0.35,
            Math.sin((i / 5) * Math.PI * 2) * particle.size * 0.35,
            particle.size * 0.38,
            particle.size * 0.2,
            (i / 5) * Math.PI * 2,
            '#FDF8F0'
          );
        }
      }

      if (particle.type === 'marigold') {
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = '#E8A000';
        ctx.fill();

        for (let i = 0; i < 8; i += 1) {
          drawPetal(
            Math.cos((i / 8) * Math.PI * 2) * particle.size * 0.4,
            Math.sin((i / 8) * Math.PI * 2) * particle.size * 0.4,
            particle.size * 0.24,
            particle.size * 0.15,
            (i / 8) * Math.PI * 2,
            '#D4671A'
          );
        }
      }

      if (particle.type === 'lotus') {
        for (let i = 0; i < 6; i += 1) {
          drawPetal(
            Math.cos((i / 6) * Math.PI * 2) * particle.size * 0.42,
            Math.sin((i / 6) * Math.PI * 2) * particle.size * 0.42,
            particle.size * 0.3,
            particle.size * 0.18,
            (i / 6) * Math.PI * 2,
            '#D4607A'
          );
        }
      }

      ctx.restore();
    };

    let rafId = 0;

    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.y += particle.speedY;
        particle.x += particle.speedX + Math.sin(time * 0.001 + particle.y * 0.01) * 0.4;
        particle.rotation += particle.rotSpeed;

        if (particle.y > canvas.height + 20) {
          particle.y = -20;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < -20) {
          particle.x = canvas.width + 20;
        }
        if (particle.x > canvas.width + 20) {
          particle.x = -20;
        }

        drawFlower(particle);
      });

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [isMobileHomeView]);

  return (
    <div className="site-shell">
      {showSplash && (
        <div className="splash" ref={splashRef}>
          <div className="splash-inner">
            <div className="splash-ganesha" ref={splashGaneshRef}>
              <Ganesha size={60} color="var(--gold-light)" />
            </div>
            <p className="splash-blessing">Om Shree Ganeshaya Namah</p>
            <svg width="140" height="140" viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(200,150,12,0.2)" strokeWidth="4" />
              <circle
                ref={splashRingRef}
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="var(--temple-gold)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset="314"
              />
            </svg>
          </div>
        </div>
      )}

      {!isMobileHomeView && <canvas className="flower-overlay" ref={flowerCanvasRef} />}
      <div id="cursor-dot" />
      <div id="cursor-ring" />

      <header className="top-nav" ref={navRef}>
        <input id="nav-toggle" className="nav-toggle" type="checkbox" />
        <div className="nav-row">
          <Deepam />

          <nav className="desktop-links left">
            <a href="#mangalasnanam">Mangalasnanam</a>
            <a href="#pellikuthuru">Pellikuthuru Veduka</a>
          </nav>

          <h1 className="nav-title">Lakshmi Naga Saisree ❈ Sri Anoop</h1>

          <nav className="desktop-links right">
            <a href="#pelli">Pelli</a>
            <a href="#couple">Couple</a>
            <a href="#venue">Venue</a>
            <a href="#rsvp">Moments</a>
          </nav>

          <Deepam mirrored />

          <label className="hamburger" htmlFor="nav-toggle" aria-label="Open menu">
            <span />
            <span />
            <span />
          </label>
        </div>

        <div className="mobile-menu">
          <a href="#mangalasnanam">Mangalasnanam</a>
          <a href="#pellikuthuru">Pellikuthuru Veduka</a>
          <a href="#pelli">Pelli</a>
          <a href="#couple">Couple</a>
          <a href="#venue">Venue</a>
          <a href="#rsvp">Moments</a>
        </div>
      </header>

      <section id="hero" className={`hero-section ${isMobileHomeView ? 'hero-mobile' : 'hero-actual'}`}>
        <div className={`home-view-frame ${isMobileHomeView ? 'new_Home_Mobile_view' : 'new_Home_Actual_view'}`}>
          <img
            className="home-view-image"
            src={isMobileHomeView ? '/assets/new_Home_Mobile_view.jpg' : '/assets/new_Home_Actual_view.jpeg'}
            alt="Wedding invitation first page"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-track">
          ❈ మంగళస్నానం ❈ పెళ్లికూతురు వేడుక ❈ పెళ్లి ❈ Mangalasnanam ❈
          Pellikuthuru Veduka ❈ Pelli ❈ ❈ మంగళస్నానం ❈ పెళ్లికూతురు వేడుక ❈ పెళ్లి ❈ Mangalasnanam ❈
          Pellikuthuru Veduka ❈ Pelli ❈
        </div>
      </div>

      <section id="events" className="section events-section">
        <svg className="garland" viewBox="0 0 1200 80" aria-hidden="true">
          <path d="M10 10Q60 70 110 10T210 10T310 10T410 10T510 10T610 10T710 10T810 10T910 10T1010 10T1110 10" fill="none" stroke="var(--temple-gold)" strokeWidth="2" />
          {Array.from({ length: 22 }).map((_, i) => (
            <circle key={i} cx={30 + i * 52} cy={28 + (i % 2) * 8} r="8" fill={i % 2 ? 'var(--saree-orange)' : 'var(--turmeric)'} />
          ))}
        </svg>

        <div className="section-heading center">
          <Ganesha size={40} color="var(--burgundy)" />
          <h3 className="split-heading">Our Sacred Ceremonies</h3>
          <p className="telugu">మన పవిత్ర వేడుకలు</p>
          <LotusDivider width={100} />
        </div>

        <svg className="kolam-band" viewBox="0 0 1200 120" aria-hidden="true">
          <g stroke="rgba(200,150,12,0.35)" fill="none">
            {Array.from({ length: 60 }).map((_, i) => (
              <circle key={`dot-a-${i}`} cx={20 + i * 20} cy="20" r="2" fill="rgba(200,150,12,0.35)" />
            ))}
            {Array.from({ length: 60 }).map((_, i) => (
              <circle key={`dot-b-${i}`} cx={20 + i * 20} cy="56" r="2" fill="rgba(200,150,12,0.35)" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <path
                key={`pattern-${i}`}
                className="kolam-path"
                d={`M${20 + i * 58} 38l14-18 14 18-14 18-14-18zm14-32v64m-24-32h48`}
                strokeWidth="1"
              />
            ))}
          </g>
        </svg>

        <div className="event-grid">
          <article className="event-card" id="mangalasnanam">
            <svg className="card-corner tl" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>
            <svg className="card-corner tr" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>
            <svg className="card-corner bl" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>
            <svg className="card-corner br" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>

            <svg className="leaf left" viewBox="0 0 30 100" aria-hidden="true"><path d="M24 5C7 28 5 69 18 95c2-22 7-55 6-90z" fill="var(--tulsi-green)"/></svg>
            <svg className="leaf right" viewBox="0 0 30 100" aria-hidden="true"><path d="M24 5C7 28 5 69 18 95c2-22 7-55 6-90z" fill="var(--tulsi-green)"/></svg>

            <svg className="event-illustration" viewBox="0 0 80 80" aria-hidden="true">
              <ellipse cx="38" cy="48" rx="20" ry="10" fill="var(--temple-gold)" />
              <ellipse cx="38" cy="48" rx="15" ry="6" fill="var(--turmeric)" />
              <circle cx="58" cy="34" r="6" fill="var(--saree-orange)" />
              <circle cx="67" cy="41" r="6" fill="var(--turmeric)" />
              <circle cx="58" cy="50" r="6" fill="var(--saree-orange)" />
              <ellipse cx="26" cy="28" rx="2.5" ry="1.2" fill="var(--turmeric)" />
              <ellipse cx="18" cy="35" rx="2.5" ry="1.2" fill="var(--turmeric)" />
              <ellipse cx="22" cy="44" rx="2.5" ry="1.2" fill="var(--turmeric)" />
            </svg>

            <h4 className="telugu event-title">మంగళస్నానం</h4>
            <p className="event-sub">Mangalasnanam</p>
            <p className="event-note">Haldi Function</p>
            <hr />
            <p className="event-date">Saturday, 11th April 2026</p>
            <p className="event-time">7:30 AM Onwards</p>
            <p className="event-place-title">At Home</p>
            <p className="event-place">Sri Rama Krishna Traders</p>
            <p className="event-place">Machilipatnam</p>

            <div className="attend-block">
              <p className="attend-counter" style={{ display: showCounters ? 'block' : 'none' }}>
                <span className="count-number">{displayCounts.mangalasnanam}</span>
                <span className="count-label"> people are already on their way! 🎉</span>
              </p>
              <button
                className={`attend-btn ${confirmedButtons.mangalasnanam ? 'confirmed' : ''}`}
                onClick={() => markAttending('mangalasnanam')}
                disabled={confirmedButtons.mangalasnanam}
                id="btn-mangalasnanam"
                type="button"
              >
                {confirmedButtons.mangalasnanam ? "You're Coming! ✓" : EVENT_BUTTON_TEXT.mangalasnanam}
              </button>
            </div>
          </article>

          <article className="event-card" id="pellikuthuru">
            <svg className="card-corner tl" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>
            <svg className="card-corner tr" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>
            <svg className="card-corner bl" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>
            <svg className="card-corner br" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>

            <svg className="leaf left" viewBox="0 0 30 100" aria-hidden="true"><path d="M24 5C7 28 5 69 18 95c2-22 7-55 6-90z" fill="var(--tulsi-green)"/></svg>
            <svg className="leaf right" viewBox="0 0 30 100" aria-hidden="true"><path d="M24 5C7 28 5 69 18 95c2-22 7-55 6-90z" fill="var(--tulsi-green)"/></svg>

            <svg className="event-illustration" viewBox="0 0 80 80" aria-hidden="true">
              <ellipse cx="33" cy="22" rx="7" ry="8" fill="#f3c09f" />
              <circle cx="28" cy="19" r="1" fill="var(--deep-maroon)" />
              <path d="M24 29c8 2 12 10 12 20h-9c-4-8-5-13-3-20z" fill="var(--lotus-pink)" />
              <path d="M35 33c8 5 11 11 10 21H34c-2-8-1-14 1-21z" fill="var(--saree-orange)" />
              <path d="M25 42c6 0 9 3 10 7-4-1-7-3-10-7z" fill="var(--tulsi-green)" />
              <circle cx="39" cy="18" r="3" fill="var(--deep-maroon)" />
              <circle cx="42" cy="18" r="1.5" fill="var(--jasmine-white)" />
              <ellipse cx="57" cy="25" rx="4" ry="2" fill="var(--saree-teal)" />
              <ellipse cx="52" cy="22" rx="3" ry="1.3" fill="var(--lotus-pink)" />
              <line x1="60" y1="25" x2="66" y2="24" stroke="var(--deep-maroon)" strokeWidth="1" />
            </svg>

            <h4 className="telugu event-title">పెళ్లికూతురు వేడుక</h4>
            <p className="event-sub">Pellikuthuru Veduka</p>
            <p className="event-note">Bride-Making Ceremony</p>
            <hr className="pink" />
            <p className="event-date">Saturday, 11th April 2026</p>
            <p className="event-time">10:30 AM Onwards</p>
            <p className="event-lunch">Followed by Lunch 🍽</p>
            <p className="event-place-title">At Home</p>
            <p className="event-place">Sri Rama Krishna Traders</p>
            <p className="event-place">Machilipatnam</p>

            <div className="attend-block">
              <p className="attend-counter" style={{ display: showCounters ? 'block' : 'none' }}>
                <span className="count-number">{displayCounts.pellikuthuru}</span>
                <span className="count-label"> people are already on their way! 🎉</span>
              </p>
              <button
                className={`attend-btn ${confirmedButtons.pellikuthuru ? 'confirmed' : ''}`}
                onClick={() => markAttending('pellikuthuru')}
                disabled={confirmedButtons.pellikuthuru}
                id="btn-pellikuthuru"
                type="button"
              >
                {confirmedButtons.pellikuthuru ? "You're Coming! ✓" : EVENT_BUTTON_TEXT.pellikuthuru}
              </button>
            </div>
          </article>

          <article className="event-card" id="pelli">
            <svg className="card-corner tl" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>
            <svg className="card-corner tr" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>
            <svg className="card-corner bl" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>
            <svg className="card-corner br" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2c2 4 2 8 0 12-2-4-2-8 0-12zM4 7c4 1 6 4 6 7-4-1-6-4-6-7zm12 0c0 3-2 6-6 7 0-3 2-6 6-7z" fill="var(--temple-gold)"/></svg>

            <svg className="leaf left" viewBox="0 0 30 100" aria-hidden="true"><path d="M24 5C7 28 5 69 18 95c2-22 7-55 6-90z" fill="var(--tulsi-green)"/></svg>
            <svg className="leaf right" viewBox="0 0 30 100" aria-hidden="true"><path d="M24 5C7 28 5 69 18 95c2-22 7-55 6-90z" fill="var(--tulsi-green)"/></svg>

            <svg className="event-illustration" viewBox="0 0 80 80" aria-hidden="true">
              <path d="M8 28c18-7 26-6 34 3-10 5-20 8-34 7 2-4 2-7 0-10z" fill="var(--mauve)" />
              <path d="M72 28c-18-7-26-6-34 3 10 5 20 8 34 7-2-4-2-7 0-10z" fill="var(--temple-gold)" />
              <ellipse cx="40" cy="38" rx="10" ry="8" fill="var(--gold-light)" />
              <line x1="35" y1="46" x2="35" y2="58" stroke="var(--gold-dark)" strokeWidth="2" />
              <line x1="45" y1="46" x2="45" y2="58" stroke="var(--gold-dark)" strokeWidth="2" />
              <circle cx="35" cy="60" r="2" fill="var(--gold-dark)" />
              <circle cx="45" cy="60" r="2" fill="var(--gold-dark)" />
            </svg>

            <h4 className="telugu event-title pelli">పెళ్లి</h4>
            <p className="event-sub">Pelli — The Wedding Ceremony</p>
            <p className="event-note">Sumuhurtham</p>
            <hr className="gold" />
            <p className="event-date">Sunday, 12th April 2026</p>
            <p className="event-time-main gold-shimmer">07:11 AM</p>
            <p className="event-note">(Auspicious Muhurtham)</p>
            <p className="event-place-title">Gold Conventions</p>
            <p className="event-place">Machilipatnam</p>

            <div className="attend-block">
              <p className="attend-counter" style={{ display: showCounters ? 'block' : 'none' }}>
                <span className="count-number">{displayCounts.pelli}</span>
                <span className="count-label"> people are already on their way! 🎉</span>
              </p>
              <button
                className={`attend-btn ${confirmedButtons.pelli ? 'confirmed' : ''}`}
                onClick={() => markAttending('pelli')}
                disabled={confirmedButtons.pelli}
                id="btn-pelli"
                type="button"
              >
                {confirmedButtons.pelli ? "You're Coming! ✓" : EVENT_BUTTON_TEXT.pelli}
              </button>
            </div>
          </article>
        </div>
      </section>

      <section id="couple" className="section couple-section">
        <div className="section-heading center">
          <h3 className="split-heading light">Two Families, One Sacred Bond</h3>
          <p className="telugu light">రెండు కుటుంబాలు, ఒక పవిత్ర బంధం</p>
          <svg width="200" height="24" viewBox="0 0 200 24" aria-hidden="true">
            <path
              className="kolam-path"
              d="M10 12h60l10-8 10 8-10 8-10-8m30 0h90"
              stroke="var(--temple-gold)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        <div className="couple-grid">
          <article className="person-card bride-wrap">
            <div className="portrait-bg">
              <img src="/assets/bride.png" alt="Lakshmi Naga Saisree" className="person-image" />
            </div>
            <h4>Lakshmi Naga Saisree</h4>
            <p>D/o Sri Komperla Venkata Subba Rao</p>
            <p>&amp; Smt. Meher Jyothi</p>
          </article>

          <div className="monogram-column">
            <Monogram />
            <p className="telugu">❈ వివాహ ❈</p>
            <div className="vertical-line" />
            <svg width="90" height="26" viewBox="0 0 90 26" aria-hidden="true">
              <path d="M5 13h80M25 13l8-7 8 7-8 7-8-7zm24 0l8-7 8 7-8 7-8-7z" stroke="var(--temple-gold)" fill="none" />
            </svg>
          </div>

          <article className="person-card groom-wrap">
            <div className="portrait-bg">
              <img src="/assets/groom.png" alt="Sri Anoop" className="person-image" />
            </div>
            <h4>Sri Anoop</h4>
            <p>S/o Sri Devaganugula V R K Murthy</p>
            <p>&amp; Smt. Chandrika</p>
          </article>
        </div>

        <article className="how-we-met">
          <p>From two families rooted in tradition to one sacred journey blessed by elders and loved ones.</p>
        </article>
      </section>

      <section id="venue" className="section venue-section">
        <div className="section-heading center">
          <Ganesha size={40} color="var(--burgundy)" />
          <h3 className="split-heading">The Sacred Venue</h3>
          <p className="telugu">వేడుక స్థలం</p>
          <LotusDivider width={100} />
        </div>

        <div className="venue-grid">
          <div className="venue-canvas" ref={venueCanvasRef} />

          <div className="venue-details">
            <h4>Gold Conventions</h4>
            <p className="place">Machilipatnam, Andhra Pradesh</p>

            <p className="date">Wedding Day: Sunday, 12th April 2026</p>
            <p className="time">Auspicious Time: 07:11 AM sharp</p>

            <details>
              <summary>By Air</summary>
              <p>
                Vijayawada Airport (VGA) is approximately 65 km away, about 1 hour by car.
                Taxis and cabs are readily available at the airport.
              </p>
            </details>

            <details>
              <summary>By Train</summary>
              <p>
                Machilipatnam Railway Station (MTM) is 3 km from Gold Conventions.
                Several trains connect from Vijayawada, Hyderabad, and Chennai.
              </p>
            </details>

            <details>
              <summary>By Road</summary>
              <p>
                Located on NH-216 in Machilipatnam city centre. Ample parking available at the venue.
                GPS: Machilipatnam, Krishna District, AP.
              </p>
            </details>
          </div>
        </div>

        <div className="map-wrap">
          <iframe
            src="https://www.google.com/maps?q=Gold+Conventions+Machilipatnam&output=embed"
            width="100%"
            height="300"
            style={{ border: 0, filter: 'sepia(0.3) saturate(0.8)' }}
            loading="lazy"
            title="Gold Conventions Machilipatnam"
          />
        </div>
      </section>

      <section id="rsvp" className="section rsvp-section">
        <div className="section-heading center">
          <Ganesha size={40} color="var(--gold-light)" />
          <h3 className="split-heading light">Wedding Moments in Motion</h3>
          <p className="telugu light">మన వివాహ క్షణాలు</p>
          <p className="rsvp-deadline">A moving glimpse that feels alive, warm, and cinematic.</p>
          <LotusDivider width={110} stroke="var(--temple-gold)" />
        </div>

        <div className="wedding-motion-stage" ref={weddingMotionRef}>
          <span className="motion-orb orb-1" />
          <span className="motion-orb orb-2" />
          <span className="motion-orb orb-3" />

          {Array.from({ length: 8 }).map((_, index) => (
            <span
              key={index}
              className="motion-petal"
              style={{ left: `${12 + index * 11}%`, animationDelay: `${index * 0.4}s` }}
              aria-hidden="true"
            />
          ))}

          <figure className="wedding-photo-frame">
            <img
              ref={weddingPhotoRef}
              src="/assets/wedding_ph.jpg"
              alt="Lakshmi Naga Saisree and Sri Anoop wedding portrait"
              className="wedding-moving-photo"
            />
            <span className="photo-light-sweep" aria-hidden="true" />
          </figure>

          <p className="motion-caption">
            A living frame from our special day, drifting softly like a hand-painted memory.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-leaves" aria-hidden="true">
          <svg viewBox="0 0 60 140"><path d="M54 7C15 32 5 95 24 132c3-31 17-73 30-125z" fill="var(--tulsi-green)" /></svg>
          <svg viewBox="0 0 60 140"><path d="M54 7C15 32 5 95 24 132c3-31 17-73 30-125z" fill="var(--tulsi-green)" /></svg>
        </div>

        <svg className="saptapadi" viewBox="0 0 160 140" aria-hidden="true">
          <g stroke="var(--temple-gold)" strokeWidth="2" fill="none">
            <circle cx="48" cy="28" r="8" />
            <path d="M48 36v30m0 0l-12 20m12-20l12 20m-22-34l22 0" />
            <circle cx="112" cy="28" r="8" />
            <path d="M112 36v30m0 0l-12 20m12-20l12 20m-22-34l22 0" />
            <path d="M60 52c8 0 16 0 24 0" />
          </g>
          <path d="M80 78l-12 18h24z" fill="var(--kumkum)" />
          {Array.from({ length: 7 }).map((_, i) => (
            <ellipse key={i} cx={36 + i * 14} cy={116 + (i % 2) * 2} rx="4" ry="2" fill="var(--temple-gold)" />
          ))}
        </svg>

        <p className="footer-bless">Om Shree Ganeshaya Namah</p>
        <h4 className="gold-shimmer">Lakshmi Naga Saisree</h4>
        <p className="footer-weds">weds</p>
        <h4 className="gold-shimmer">Sri Anoop</h4>
        <p className="footer-time">12th April 2026 · 07:11 AM</p>
        <p className="footer-place">Gold Conventions, Machilipatnam</p>

        <svg width="220" height="18" viewBox="0 0 220 18" aria-hidden="true">
          <path d="M5 9h210M85 9l12-7 12 7-12 7-12-7zm24 0l12-7 12 7-12 7-12-7z" stroke="rgba(200,150,12,0.6)" fill="none" />
        </svg>

        <p className="telugu footer-telugu">శుభ వివాహ శుభాకాంక్షలు</p>
        <p className="footer-note">With love &amp; blessings from both families</p>
      </footer>

      <div className="floating-actions" aria-label="Quick actions">
        <a
          className="floating-action upload-action"
          href="https://drive.google.com/drive/folders/1IFuUxncp3Db7z_hfS4VQfYpGrbl01y5N"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Upload Photos"
          data-tooltip="Upload Photos"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.3 5.2h2.3l1.1-1.6h4.6l1.1 1.6h2.3A2.3 2.3 0 0 1 20 7.5v10.2a2.3 2.3 0 0 1-2.3 2.3H6.3A2.3 2.3 0 0 1 4 17.7V7.5a2.3 2.3 0 0 1 2.3-2.3Zm5.7 3.2a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 2a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Z" fill="currentColor" />
          </svg>
        </a>

        <a
          className="floating-action live-action"
          href="https://youtube.com/live/rtLaQ1Mbuy0?feature=shared"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch Live"
          data-tooltip="Watch Live"
        >
          <img
            className="live-icon-image"
            src="/assets/youtube-icon-illustration-youtube-app-logo-social-media-icon_561158-3674.avif"
            alt=""
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
