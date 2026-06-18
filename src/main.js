import './index.css';
import Alpine from 'alpinejs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {
  // Global Config
  Alpine.store('config', {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000'
  });

  // Cart Store (Advanced Shopify Plus Style)
  Alpine.store('cart', {
    items: [],
    isOpen: false,
    freeShippingThreshold: 4000,
    
    get count() {
      return this.items.length;
    },
    
    get subtotal() {
      return this.items.reduce((acc, item) => acc + item.price, 0);
    },
    
    get progressPercentage() {
      return Math.min(100, (this.subtotal / this.freeShippingThreshold) * 100);
    },
    
    get amountToFreeShipping() {
      return Math.max(0, this.freeShippingThreshold - this.subtotal);
    },
    
    add(item) {
      this.items.push(item);
      this.isOpen = true;
    },
    
    remove(index) {
      this.items.splice(index, 1);
    },
    
    clear() {
      this.items = [];
    }
  });

  // Search Modal State
  Alpine.store('search', {
    isOpen: false,
    query: ''
  });

  // Navigation & Mega Menu State
  Alpine.store('nav', {
    isMobileMenuOpen: false,
    activeMegaMenu: null,
    
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    
    openMegaMenu(menuName) {
      this.activeMegaMenu = menuName;
    },
    
    closeMegaMenu() {
      this.activeMegaMenu = null;
    }
  });
});

Alpine.start();

// Initialize GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
  // Smooth fade-up for elements
  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach((el) => {
    gsap.fromTo(el, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
});
