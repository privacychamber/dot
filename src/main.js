import './style.css';
import Alpine from 'alpinejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Initialize Alpine
window.Alpine = Alpine;
Alpine.start();

// Initialize Animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimations();
  initMarquee();
  initScrollAnimations();
  initThreeJSBackground();
  initMagneticButtons();
});

function initHeroAnimations() {
  const tl = gsap.timeline();
  
  tl.fromTo('.hero-title', 
    { y: 100, opacity: 0, rotationX: -20 },
    { y: 0, opacity: 1, rotationX: 0, duration: 1.5, ease: "power4.out", delay: 0.2 }
  )
  .fromTo('.animate-fade-in',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    "-=1"
  )
  .fromTo('.hero-btn',
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
    "-=0.8"
  );
}

function initMarquee() {
  gsap.to('.marquee-content', {
    xPercent: -50,
    ease: "none",
    duration: 10,
    repeat: -1
  });
}

function initScrollAnimations() {
  const fadeUps = document.querySelectorAll('.fade-up');
  
  fadeUps.forEach(element => {
    gsap.fromTo(element,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Manifesto parallax/fade
  gsap.fromTo('.manifesto-text',
    { opacity: 0.5, scale: 0.95 },
    {
      opacity: 1,
      scale: 1,
      scrollTrigger: {
        trigger: '.manifesto-text',
        start: "top 90%",
        end: "bottom center",
        scrub: 1
      }
    }
  );
}

function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const position = btn.getBoundingClientRect();
      const x = e.pageX - position.left - position.width / 2;
      const y = e.pageY - position.top - position.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });
}

function initThreeJSBackground() {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 2000;
  const posArray = new Float32Array(particlesCount * 3);

  for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles across a wide area
    posArray[i] = (Math.random() - 0.5) * 15;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#0047FF',
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 2;

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Slow rotation
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Mouse movement interaction (subtle parallax)
    particlesMesh.position.x += (mouseX * 0.5 - particlesMesh.position.x) * 0.05;
    particlesMesh.position.y += (-mouseY * 0.5 - particlesMesh.position.y) * 0.05;

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
