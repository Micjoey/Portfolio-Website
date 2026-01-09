/*
 * Animation Controller
 * Polished GSAP animations with professional effects
 */

(function() {
	'use strict';

	// Wait for GSAP
	if (typeof gsap === 'undefined') {
		console.warn('GSAP not loaded');
		return;
	}

	// Register plugins
	if (typeof ScrollTrigger !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}
	if (typeof ScrollToPlugin !== 'undefined') {
		gsap.registerPlugin(ScrollToPlugin);
	}

	// Check reduced motion
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Animation config
	const config = {
		duration: prefersReducedMotion ? 0.1 : 0.8,
		ease: prefersReducedMotion ? 'none' : 'power2.out',
		stagger: prefersReducedMotion ? 0 : 0.1
	};

	/**
	 * Initialize all animations
	 */
	function initAnimations() {
		if (prefersReducedMotion) {
			// Remove animation attributes
			document.querySelectorAll('[data-animate]').forEach(el => {
				el.style.opacity = '1';
				el.style.transform = 'none';
			});
			return;
		}

		initHeroAnimations();
		initScrollAnimations();
		initMicroInteractions();
	}

	/**
	 * Hero section animations
	 */
	function initHeroAnimations() {
		const heroTitle = document.querySelector('.hero-title');
		const heroSubtitle = document.querySelector('.hero-subtitle');
		const heroActions = document.querySelectorAll('.hero-actions .button');
		const heroSocial = document.querySelectorAll('.hero-social .social-link');
		const heroInfo = document.querySelector('.hero-info');

		// Set initial states
		gsap.set([heroTitle, heroSubtitle, ...heroActions, ...heroSocial, heroInfo], {
			opacity: 0
		});

		// Create timeline
		const tl = gsap.timeline({ delay: 0.3 });

		// Animate title
		if (heroTitle) {
			tl.to(heroTitle, {
				opacity: 1,
				y: 0,
				duration: config.duration,
				ease: 'power3.out'
			});
		}

		// Animate subtitle
		if (heroSubtitle) {
			tl.to(heroSubtitle, {
				opacity: 1,
				y: 0,
				duration: config.duration,
				ease: 'power2.out'
			}, '-=0.4');
		}

		// Animate buttons
		if (heroActions.length > 0) {
			tl.to(heroActions, {
				opacity: 1,
				y: 0,
				duration: config.duration,
				stagger: config.stagger,
				ease: 'power2.out'
			}, '-=0.3');
		}

		// Animate social links
		if (heroSocial.length > 0) {
			gsap.set(heroSocial, { opacity: 0, y: 20, scale: 0.9 });
			tl.to(heroSocial, {
				opacity: 1,
				y: 0,
				scale: 1,
				duration: config.duration,
				stagger: config.stagger * 2,
				ease: 'power3.out'
			}, '-=0.3');
		}

		// Animate info
		if (heroInfo) {
			tl.to(heroInfo, {
				opacity: 1,
				y: 0,
				duration: config.duration,
				ease: 'power2.out'
			}, '-=0.2');
		}
	}

	/**
	 * Scroll-triggered animations
	 */
	function initScrollAnimations() {
		// Animate elements with data-animate
		document.querySelectorAll('[data-animate]').forEach(element => {
			const animateType = element.getAttribute('data-animate');
			const delay = parseFloat(element.getAttribute('data-delay')) || 0;

			let fromVars = { opacity: 0 };
			let toVars = {
				opacity: 1,
				duration: config.duration,
				ease: config.ease
			};

			switch(animateType) {
				case 'fade-up':
					fromVars.y = 40;
					toVars.y = 0;
					break;
				case 'fade-down':
					fromVars.y = -40;
					toVars.y = 0;
					break;
				case 'fade-left':
					fromVars.x = -40;
					toVars.x = 0;
					break;
				case 'fade-right':
					fromVars.x = 40;
					toVars.x = 0;
					break;
				case 'scale-in':
					fromVars.scale = 0.9;
					toVars.scale = 1;
					toVars.ease = 'back.out(1.2)';
					break;
				case 'slide-in-left':
					fromVars.x = -60;
					toVars.x = 0;
					break;
				case 'slide-in-right':
					fromVars.x = 60;
					toVars.x = 0;
					break;
			}

			gsap.fromTo(element, fromVars, {
				...toVars,
				delay: delay,
				scrollTrigger: {
					trigger: element,
					start: 'top 85%',
					toggleActions: 'play none none reverse'
				}
			});
		});

		// Animate cards
		const cards = document.querySelectorAll('.card');
		cards.forEach((card, index) => {
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

		// Animate badges with stagger
		document.querySelectorAll('.project-badges').forEach(container => {
			const badges = container.querySelectorAll('.badge');
			if (badges.length > 0) {
				gsap.fromTo(badges, {
					opacity: 0,
					scale: 0.8
				}, {
					opacity: 1,
					scale: 1,
					duration: 0.4,
					stagger: 0.05,
					ease: 'back.out(1.2)',
					scrollTrigger: {
						trigger: container,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					}
				});
			}
		});
	}

	/**
	 * Micro-interactions
	 */
	function initMicroInteractions() {
		if (prefersReducedMotion) return;

		// Card hover effects
		const cards = document.querySelectorAll('.card');
		cards.forEach(card => {
			card.addEventListener('mouseenter', function() {
				gsap.to(card, {
					y: -4,
					duration: 0.3,
					ease: 'power2.out'
				});
			});

			card.addEventListener('mouseleave', function() {
				gsap.to(card, {
					y: 0,
					duration: 0.3,
					ease: 'power2.out'
				});
			});
		});

		// Badge hover
		const badges = document.querySelectorAll('.badge');
		badges.forEach(badge => {
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

		// Button ripple effect
		const buttons = document.querySelectorAll('.button');
		buttons.forEach(button => {
			button.addEventListener('click', function(e) {
				const ripple = document.createElement('span');
				const rect = button.getBoundingClientRect();
				const size = Math.max(rect.width, rect.height) * 2;
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
					scale: 1,
					opacity: 0,
					duration: 0.6,
					ease: 'power2.out',
					onComplete: () => ripple.remove()
				});
			});
		});
	}

	// Initialize on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAnimations);
	} else {
		initAnimations();
	}

	// Refresh ScrollTrigger on resize
	let resizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			if (typeof ScrollTrigger !== 'undefined') {
				ScrollTrigger.refresh();
			}
		}, 250);
	}, { passive: true });

})();
