/*
 * Animation Controller for Portfolio Website
 * Uses GSAP for smooth, performant animations
 */

(function() {
	'use strict';

	// Register GSAP plugins
	if (typeof gsap !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	// Check for reduced motion preference
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Animation configuration
	const config = {
		duration: prefersReducedMotion ? 0.1 : 0.6,
		ease: 'power2.out',
		stagger: prefersReducedMotion ? 0 : 0.1
	};

	// Performance optimization: Use will-change for animated elements
	function optimizeForAnimation(elements) {
		if (prefersReducedMotion) return;
		
		elements.forEach(el => {
			if (el) {
				el.style.willChange = 'transform, opacity';
				// Remove will-change after animation completes to free resources
				setTimeout(() => {
					el.style.willChange = 'auto';
				}, 2000);
			}
		});
	}

	// Initialize animations when DOM is ready
	function initAnimations() {
		if (prefersReducedMotion) {
			// Minimal animations for reduced motion
			return;
		}

		initHeroAnimations();
		initScrollAnimations();
		initScrollProgress();
		initHeaderScrollAnimation();
		initMicroInteractions();
		initWorkExperienceTimeline();
	}

	// Hero Section Animations
	function initHeroAnimations() {
		const heroSection = document.getElementById('intro');
		if (!heroSection) return;

		const heroContent = heroSection.querySelector('.inner');
		const heroTitle = heroSection.querySelector('h1');
		const heroSubtitle = heroSection.querySelector('p');
		const heroButtons = heroSection.querySelectorAll('.button');
		const socialLinks = heroSection.querySelectorAll('.links a');

		// Set initial states
		gsap.set([heroTitle, heroSubtitle, ...heroButtons, ...socialLinks], {
			opacity: 0,
			y: 30
		});

		// Optimize hero elements for animation
		optimizeForAnimation([heroTitle, heroSubtitle, ...heroButtons, ...socialLinks]);

		// Create timeline for hero animations
		const heroTimeline = gsap.timeline({ delay: 0.3 });

		heroTimeline
			.to(heroTitle, {
				opacity: 1,
				y: 0,
				duration: config.duration,
				ease: config.ease
			})
			.to(heroSubtitle, {
				opacity: 1,
				y: 0,
				duration: config.duration,
				ease: config.ease
			}, '-=0.3')
			.to(heroButtons, {
				opacity: 1,
				y: 0,
				duration: config.duration,
				stagger: 0.1,
				ease: config.ease
			}, '-=0.2')
			.to(socialLinks, {
				opacity: 1,
				y: 0,
				duration: config.duration,
				stagger: 0.1,
				ease: config.ease,
				rotation: 0
			}, '-=0.2');

		// Initial state for social icons (rotate in)
		gsap.set(socialLinks, { rotation: -180 });
	}

	// Scroll-triggered animations for sections
	function initScrollAnimations() {
		// Animate project cards
		const projectCards = document.querySelectorAll('#two .project-card');
		if (projectCards.length > 0) {
			optimizeForAnimation(Array.from(projectCards));
			gsap.utils.toArray(projectCards).forEach((card, index) => {
				gsap.fromTo(card, {
					opacity: 0,
					y: 50,
					scale: 0.95
				}, {
					opacity: 1,
					y: 0,
					scale: 1,
					duration: config.duration,
					ease: config.ease,
					scrollTrigger: {
						trigger: card,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					}
				});
			});
		}

		// Animate tech section cards
		const techCards = document.querySelectorAll('#technologies .modern-card');
		if (techCards.length > 0) {
			gsap.utils.toArray(techCards).forEach((card, index) => {
				const direction = index % 2 === 0 ? -50 : 50;
				gsap.fromTo(card, {
					opacity: 0,
					x: direction,
					scale: 0.95
				}, {
					opacity: 1,
					x: 0,
					scale: 1,
					duration: config.duration,
					ease: config.ease,
					scrollTrigger: {
						trigger: card,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					}
				});
			});
		}

		// Animate tech badges with stagger
		const techBadges = document.querySelectorAll('.tech-badge');
		if (techBadges.length > 0) {
			techBadges.forEach((badgeContainer) => {
				const badges = badgeContainer.parentElement.querySelectorAll('.tech-badge');
				gsap.fromTo(badges, {
					opacity: 0,
					scale: 0.8
				}, {
					opacity: 1,
					scale: 1,
					duration: 0.3,
					stagger: 0.05,
					ease: 'back.out(1.7)',
					scrollTrigger: {
						trigger: badgeContainer.parentElement,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					}
				});
			});
		}

		// Animate AI section cards
		const aiCards = document.querySelectorAll('#ai .modern-card');
		if (aiCards.length > 0) {
			gsap.utils.toArray(aiCards).forEach((card) => {
				gsap.fromTo(card, {
					opacity: 0,
					y: 40,
					rotationX: 15
				}, {
					opacity: 1,
					y: 0,
					rotationX: 0,
					duration: config.duration,
					ease: config.ease,
					scrollTrigger: {
						trigger: card,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					}
				});
			});
		}

		// Animate work experience cards
		const workCards = document.querySelectorAll('#work-experience .modern-card');
		if (workCards.length > 0) {
			gsap.utils.toArray(workCards).forEach((card, index) => {
				gsap.fromTo(card, {
					opacity: 0,
					x: index % 2 === 0 ? -30 : 30,
					y: 20
				}, {
					opacity: 1,
					x: 0,
					y: 0,
					duration: config.duration,
					ease: config.ease,
					scrollTrigger: {
						trigger: card,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					}
				});
			});
		}

		// Animate contact section cards
		const contactCards = document.querySelectorAll('#five .modern-card');
		if (contactCards.length > 0) {
			gsap.fromTo(contactCards, {
				opacity: 0,
				scale: 0.8,
				y: 30
			}, {
				opacity: 1,
				scale: 1,
				y: 0,
				duration: config.duration,
				stagger: 0.15,
				ease: 'back.out(1.7)',
				scrollTrigger: {
					trigger: '#five',
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			});
		}

		// Animate section headings
		const sectionHeadings = document.querySelectorAll('section h2');
		sectionHeadings.forEach((heading) => {
			gsap.fromTo(heading, {
				opacity: 0,
				y: -20
			}, {
				opacity: 1,
				y: 0,
				duration: config.duration,
				ease: config.ease,
				scrollTrigger: {
					trigger: heading,
					start: 'top 90%',
					toggleActions: 'play none none reverse'
				}
			});
		});
	}

	// Scroll progress indicator
	function initScrollProgress() {
		const progressBar = document.getElementById('scroll-progress');
		if (!progressBar) return;

		// Respect reduced motion preference
		if (prefersReducedMotion) {
			progressBar.style.display = 'none';
			return;
		}

		let ticking = false;

		function updateProgress() {
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			
			// Handle edge case: page shorter than viewport
			const maxScroll = Math.max(0, documentHeight - windowHeight);
			const scrollPercent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
			
			// Clamp between 0 and 100
			const clampedPercent = Math.min(100, Math.max(0, scrollPercent));
			progressBar.style.width = clampedPercent + '%';
			
			ticking = false;
		}

		function requestUpdate() {
			if (!ticking) {
				window.requestAnimationFrame(updateProgress);
				ticking = true;
			}
		}

		window.addEventListener('scroll', requestUpdate, { passive: true });
		window.addEventListener('resize', requestUpdate, { passive: true });
		updateProgress(); // Initial state
	}

	// Header scroll animation
	function initHeaderScrollAnimation() {
		const header = document.getElementById('modern-header');
		if (!header) return;

		if (prefersReducedMotion) {
			// Keep header static for reduced motion
			return;
		}

		let ticking = false;
		let isScrolled = false;

		function updateHeader() {
			const scrollY = window.scrollY;
			const shouldBeScrolled = scrollY > 100;
			
			// Only animate if state changed
			if (shouldBeScrolled !== isScrolled) {
				isScrolled = shouldBeScrolled;
				
				if (shouldBeScrolled) {
					gsap.to(header, {
						padding: '0.75rem 2rem',
						background: 'rgba(10, 14, 39, 0.98)',
						boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
						duration: 0.3,
						ease: 'power2.out'
					});
				} else {
					gsap.to(header, {
						padding: '1rem 2rem',
						background: 'rgba(10, 14, 39, 0.95)',
						boxShadow: 'none',
						duration: 0.3,
						ease: 'power2.out'
					});
				}
			}

			ticking = false;
		}

		window.addEventListener('scroll', function() {
			if (!ticking) {
				window.requestAnimationFrame(updateHeader);
				ticking = true;
			}
		}, { passive: true });
	}

	// Micro-interactions
	function initMicroInteractions() {
		// Button ripple effects
		const buttons = document.querySelectorAll('.button');
		buttons.forEach((button) => {
			button.addEventListener('click', function(e) {
				const ripple = document.createElement('span');
				const rect = button.getBoundingClientRect();
				const size = Math.max(rect.width, rect.height);
				const x = e.clientX - rect.left - size / 2;
				const y = e.clientY - rect.top - size / 2;

				ripple.style.cssText = `
					position: absolute;
					width: ${size}px;
					height: ${size}px;
					border-radius: 50%;
					background: rgba(255, 255, 255, 0.3);
					left: ${x}px;
					top: ${y}px;
					pointer-events: none;
					transform: scale(0);
				`;

				button.style.position = 'relative';
				button.style.overflow = 'hidden';
				button.appendChild(ripple);

				gsap.to(ripple, {
					scale: 2,
					opacity: 0,
					duration: 0.6,
					ease: 'power2.out',
					onComplete: () => ripple.remove()
				});
			});
		});

		// Card hover animations (3D tilt)
		const cards = document.querySelectorAll('.project-card, .modern-card');
		cards.forEach((card) => {
			card.addEventListener('mousemove', function(e) {
				if (prefersReducedMotion) return;
				
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				const centerX = rect.width / 2;
				const centerY = rect.height / 2;
				const rotateX = (y - centerY) / 20;
				const rotateY = (centerX - x) / 20;

				gsap.to(card, {
					rotationX: rotateX,
					rotationY: rotateY,
					transformPerspective: 1000,
					duration: 0.3,
					ease: 'power2.out'
				});
			});

			card.addEventListener('mouseleave', function() {
				gsap.to(card, {
					rotationX: 0,
					rotationY: 0,
					duration: 0.5,
					ease: 'power2.out'
				});
			});
		});

		// Tech badge hover animations
		const techBadges = document.querySelectorAll('.tech-badge');
		techBadges.forEach((badge) => {
			badge.addEventListener('mouseenter', function() {
				gsap.to(badge, {
					scale: 1.1,
					y: -3,
					duration: 0.2,
					ease: 'power2.out'
				});
			});

			badge.addEventListener('mouseleave', function() {
				gsap.to(badge, {
					scale: 1,
					y: 0,
					duration: 0.2,
					ease: 'power2.out'
				});
			});
		});

		// Social icon animations
		const socialIcons = document.querySelectorAll('.links a, .icons a');
		socialIcons.forEach((icon) => {
			icon.addEventListener('mouseenter', function() {
				gsap.to(icon, {
					scale: 1.2,
					rotation: 10,
					duration: 0.3,
					ease: 'back.out(1.7)'
				});
			});

			icon.addEventListener('mouseleave', function() {
				gsap.to(icon, {
					scale: 1,
					rotation: 0,
					duration: 0.3,
					ease: 'power2.out'
				});
			});
		});
	}

	// Work experience timeline animation
	function initWorkExperienceTimeline() {
		const workCards = document.querySelectorAll('#work-experience .modern-card');
		if (workCards.length === 0) return;

		// Create timeline line effect
		workCards.forEach((card, index) => {
			const listItems = card.querySelectorAll('ul li');
			
			// Animate list items sequentially
			gsap.fromTo(listItems, {
				opacity: 0,
				x: -20
			}, {
				opacity: 1,
				x: 0,
				duration: 0.4,
				stagger: 0.1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: card,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			});
		});
	}

	// Initialize on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAnimations);
	} else {
		initAnimations();
	}

})();
