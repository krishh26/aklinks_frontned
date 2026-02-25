import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CurrencyService } from '../services/currency.service';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
import { gsap } from 'gsap';

// ScrollTrigger is a premium GSAP plugin, so we'll use fallback animations
// If you have a GSAP premium license, you can import it like:
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);
const ScrollTrigger: any = null;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('heroSection', { static: false }) heroSection?: ElementRef;
  @ViewChild('canvasContainer', { static: false }) canvasContainer?: ElementRef;
  
  private currencySubscription?: Subscription;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private animationId?: number;
  private mouseX = 0;
  private mouseY = 0;

  constructor(
    private currencyService: CurrencyService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.currencySubscription = this.currencyService.currency$.subscribe(() => {
      // Component will re-render when currency changes
    });
  }

  ngAfterViewInit(): void {
    this.init3DBackground();
    this.initScrollAnimations();
    this.initCard3DEffects();
    this.initParallaxEffects();
  }

  ngOnDestroy(): void {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (ScrollTrigger && ScrollTrigger.getAll) {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    }
  }

  formatCurrency(usdAmount: number): string {
    return this.currencyService.format(usdAmount);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update 3D camera based on mouse position
    if (this.camera) {
      this.camera.position.x += (this.mouseX * 5 - this.camera.position.x) * 0.05;
      this.camera.position.y += (this.mouseY * 5 - this.camera.position.y) * 0.05;
    }
  }

  private init3DBackground(): void {
    if (!this.canvasContainer) return;

    const container = this.canvasContainer.nativeElement;
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || 600;

    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // Add 3D particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(particlesMesh);

    // Add floating geometric shapes
    const geometry = new THREE.IcosahedronGeometry(0.3, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });

    for (let i = 0; i < 10; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      this.scene.add(mesh);
    }

    // Animation loop
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      if (particlesMesh) {
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
      }

      this.scene?.children.forEach((child: THREE.Object3D, index: number) => {
        if (child instanceof THREE.Mesh && index > 0) {
          child.rotation.x += 0.005;
          child.rotation.y += 0.005;
          child.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
        }
      });

      this.renderer?.render(this.scene!, this.camera!);
    };

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      const newWidth = container.offsetWidth || window.innerWidth;
      const newHeight = container.offsetHeight || 600;
      this.camera!.aspect = newWidth / newHeight;
      this.camera!.updateProjectionMatrix();
      this.renderer!.setSize(newWidth, newHeight);
    });
  }

  private initScrollAnimations(): void {
    if (ScrollTrigger) {
      // Animate sections on scroll using ScrollTrigger
      const sections = this.elementRef.nativeElement.querySelectorAll('section');
      
      sections.forEach((section: HTMLElement, index: number) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.1
        });
      });

      // Parallax effect for hero
      const hero = this.elementRef.nativeElement.querySelector('.hero');
      if (hero) {
        gsap.to(hero, {
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          },
          y: 100,
          scale: 0.95,
          opacity: 0.8
        });
      }
    } else {
      // Fallback: Use Intersection Observer for scroll animations
      this.initScrollAnimationsFallback();
    }
  }

  private initScrollAnimationsFallback(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.from(entry.target, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = this.elementRef.nativeElement.querySelectorAll('section');
    sections.forEach((section: Element) => observer.observe(section));
  }

  private initCard3DEffects(): void {
    const cards = this.elementRef.nativeElement.querySelectorAll(
      '.step-card, .feature-item, .solution-card, .compliance-card, .testimonial-card'
    );

    cards.forEach((card: HTMLElement) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          duration: 0.3,
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          transformStyle: 'preserve-3d'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.5,
          rotateX: 0,
          rotateY: 0,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  private initParallaxEffects(): void {
    if (ScrollTrigger) {
      // Parallax for section headers
      const headers = this.elementRef.nativeElement.querySelectorAll('.section-header');
      
      headers.forEach((header: HTMLElement) => {
        gsap.to(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true
          },
          y: -30,
          opacity: 1
        });
      });

      // Parallax for phone mockup
      const phoneMockup = this.elementRef.nativeElement.querySelector('.phone-mockup');
      if (phoneMockup) {
        gsap.to(phoneMockup, {
          scrollTrigger: {
            trigger: phoneMockup,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true
          },
          rotateY: 15,
          rotateX: 5,
          scale: 1.05
        });
      }
    } else {
      // Fallback: Simple scroll-based parallax
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const phoneMockup = this.elementRef.nativeElement.querySelector('.phone-mockup');
        if (phoneMockup) {
          const rect = phoneMockup.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = (window.innerHeight - rect.top) / window.innerHeight;
            gsap.to(phoneMockup, {
              rotateY: progress * 15,
              rotateX: progress * 5,
              scale: 1 + progress * 0.05,
              duration: 0.3
            });
          }
        }
      });
    }
  }
}