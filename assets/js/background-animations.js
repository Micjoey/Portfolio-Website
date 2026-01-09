/*
 * Background Animation Manager
 * Manages section-based background animations with smooth transitions
 */

(function() {
	'use strict';

	// Check for reduced motion preference
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Animation types
	const ANIMATION_TYPES = ['waves', 'particles', 'geometric', 'gradient', 'mesh'];

	// Section-to-Animation Mapping
	const SECTION_MAPPING = {
		'intro': 'waves',
		'about': 'geometric',
		'work': 'particles',
		'previous-experience': 'particles',
		'ai': 'mesh',
		'projects': 'gradient',
		'technologies': 'geometric',
		'education': 'mesh',
		'contact': 'particles',
		'flagship-project': 'gradient' // Fallback for any other sections
	};

	// Configuration
	const config = {
		transitionDuration: 600, // 0.6 seconds fast fade
		intersectionThreshold: 0.3, // 30% of section visible
		scrollDebounce: 100, // Debounce rapid scroll events
		scrollFadeDelay: 1200, // Delay before fading scroll effect (ms)
		warpIntensity: 1.0, // Intensity of warp effect
		warpFadeDuration: 1000 // Duration to fade out warp (ms)
	};

	// State management
	const state = {
		current: null,
		target: null,
		transitioning: false,
		transitionQueue: [],
		observer: null,
		containers: {},
		activeSection: null,
		lastTransitionTime: 0,
		scrollState: {
			isScrolling: false,
			lastScrollY: 0,
			scrollDirection: 0, // -1 down, 1 up
			fadeTimeout: null,
			scrollVelocity: 0,
			animationContainer: null
		}
	};

	/**
	 * Generate random number between min and max
	 */
	function randomBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Get animation type for section
	 */
	function getAnimationForSection(sectionId) {
		return SECTION_MAPPING[sectionId] || SECTION_MAPPING['flagship-project'] || 'waves';
	}

	/**
	 * Initialize all animation containers
	 */
	function initContainers() {
		// Get the main animation container
		state.scrollState.animationContainer = document.querySelector('.bg-animation-container');
		
		ANIMATION_TYPES.forEach(type => {
			const container = document.querySelector(`.bg-animation-${type}`);
			if (container) {
				state.containers[type] = container;
				// Initially hide all except waves (starting animation)
				if (type !== 'waves') {
					container.style.opacity = '0';
					container.style.pointerEvents = 'none';
				}
			}
		});

		// Initialize particle system
		initParticleSystem();
	}

	/**
	 * Initialize particle system
	 */
	function initParticleSystem() {
		const container = document.getElementById('particles-container');
		if (!container) return;

		const particleCount = 30;
		const sizes = ['small', 'medium', 'large'];
		const animations = ['particle-float-1', 'particle-float-2', 'particle-float-3', 'particle-float-4'];

		// Create regular particles (stars/dots)
		for (let i = 0; i < particleCount; i++) {
			const particle = document.createElement('div');
			const size = sizes[Math.floor(Math.random() * sizes.length)];
			const animation = animations[Math.floor(Math.random() * animations.length)];
			const duration = randomBetween(20, 30);
			const delay = randomBetween(0, 15);
			const left = randomBetween(0, 100);
			const top = randomBetween(0, 100);

			particle.className = `particle particle-${size}`;
			particle.style.left = `${left}%`;
			particle.style.top = `${top}%`;
			particle.style.animation = `${animation} ${duration}s ease-in-out infinite`;
			particle.style.animationDelay = `${delay}s`;

			container.appendChild(particle);
		}

		// Create shooting stars
		initShootingStars(container);
	}

	/**
	 * Initialize shooting stars
	 */
	function initShootingStars(container) {
		const shootingStarCount = 3;
		const animations = ['shooting-star-1', 'shooting-star-2', 'shooting-star-3'];

		for (let i = 0; i < shootingStarCount; i++) {
			const shootingStar = document.createElement('div');
			const animation = animations[i % animations.length];
			const duration = randomBetween(3, 5); // Fast movement
			const delay = randomBetween(0, 8);

			shootingStar.className = 'shooting-star';
			shootingStar.style.animation = `${animation} ${duration}s linear infinite`;
			shootingStar.style.animationDelay = `${delay}s`;

			container.appendChild(shootingStar);
		}
	}

	/**
	 * Fade out current animation
	 */
	function fadeOut(animationType, callback) {
		const container = state.containers[animationType];
		if (!container) {
			if (callback) callback();
			return;
		}

		container.style.transition = `opacity ${config.transitionDuration}ms ease-in-out`;
		container.style.opacity = '0';

		setTimeout(() => {
			container.style.pointerEvents = 'none';
			if (callback) callback();
		}, config.transitionDuration);
	}

	/**
	 * Fade in next animation
	 */
	function fadeIn(animationType, callback) {
		const container = state.containers[animationType];
		if (!container) {
			if (callback) callback();
			return;
		}

		container.style.pointerEvents = 'auto';
		container.style.transition = `opacity ${config.transitionDuration}ms ease-in-out`;
		
		// Force reflow
		container.offsetHeight;
		
		container.style.opacity = '1';

		setTimeout(() => {
			if (callback) callback();
		}, config.transitionDuration);
	}

	/**
	 * Transition to animation type
	 */
	function transitionToAnimation(animationType) {
		// Prevent duplicate transitions
		if (state.transitioning && state.target === animationType) {
			return;
		}

		// If same animation, do nothing
		if (state.current === animationType && !state.transitioning) {
			return;
		}

		// Cancel any pending transitions
		if (state.transitioning) {
			// Queue this transition
			state.transitionQueue.push(animationType);
			return;
		}

		// Prevent rapid transitions
		const now = Date.now();
		if (now - state.lastTransitionTime < config.scrollDebounce && state.current) {
			state.transitionQueue.push(animationType);
			setTimeout(() => {
				if (state.transitionQueue.length > 0) {
					const next = state.transitionQueue.shift();
					transitionToAnimation(next);
				}
			}, config.scrollDebounce);
			return;
		}

		state.transitioning = true;
		state.target = animationType;
		state.lastTransitionTime = now;

		const previousAnimation = state.current;

		// If no current animation, just fade in
		if (!previousAnimation) {
			fadeIn(animationType, () => {
				state.current = animationType;
				state.target = null;
				state.transitioning = false;
				processQueue();
			});
			return;
		}

		// Fade out current
		fadeOut(previousAnimation, () => {
			// Fade in next
			fadeIn(animationType, () => {
				state.current = animationType;
				state.target = null;
				state.transitioning = false;
				processQueue();
			});
		});
	}

	/**
	 * Process transition queue
	 */
	function processQueue() {
		if (state.transitionQueue.length > 0 && !state.transitioning) {
			const next = state.transitionQueue.shift();
			transitionToAnimation(next);
		}
	}

	/**
	 * Handle section visibility changes
	 */
	function handleSectionChange(entries) {
		// Don't change animations while scrolling/warping
		if (state.scrollState.isScrolling) {
			return;
		}

		// Find the section with the highest visibility
		let maxVisibility = 0;
		let activeSection = null;

		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const visibility = entry.intersectionRatio;
				if (visibility > maxVisibility && visibility >= config.intersectionThreshold) {
					maxVisibility = visibility;
					activeSection = entry.target.id;
				}
			}
		});

		// If we found an active section, transition to its animation
		if (activeSection && activeSection !== state.activeSection) {
			state.activeSection = activeSection;
			const animationType = getAnimationForSection(activeSection);
			transitionToAnimation(animationType);
		}
	}

	/**
	 * Handle scroll events for space-time warp effect
	 */
	function handleScroll() {
		if (prefersReducedMotion) return;

		const currentScrollY = window.scrollY || window.pageYOffset;
		const scrollDelta = currentScrollY - state.scrollState.lastScrollY;
		const timeDelta = 16; // Approximate frame time
		
		// Calculate scroll velocity
		state.scrollState.scrollVelocity = Math.abs(scrollDelta) / timeDelta;
		
		// Only apply effect if scrolling is significant
		if (Math.abs(scrollDelta) < 0.5) {
			return;
		}

		// Determine scroll direction
		state.scrollState.scrollDirection = scrollDelta > 0 ? 1 : -1;

		// Start warp effect if not already scrolling
		if (!state.scrollState.isScrolling) {
			startWarpEffect();
		}

		// Update warp intensity based on scroll velocity
		updateWarpEffect();

		// Mark as scrolling
		state.scrollState.isScrolling = true;
		state.scrollState.lastScrollY = currentScrollY;

		// Clear existing fade timeout
		if (state.scrollState.fadeTimeout) {
			clearTimeout(state.scrollState.fadeTimeout);
		}

		// Set timeout to fade out warp effect
		state.scrollState.fadeTimeout = setTimeout(() => {
			fadeOutWarpEffect();
		}, config.scrollFadeDelay);
	}

	/**
	 * Start the warp effect - pause all animations
	 */
	function startWarpEffect() {
		const container = state.scrollState.animationContainer;
		if (container) {
			container.classList.add('scrolling');
		}

		// Pause all CSS animations in the current container
		const currentContainer = state.containers[state.current];
		if (currentContainer) {
			// Add warp class
			currentContainer.classList.add('bg-animation-warp');
			
			// Pause all child animations
			const animatedElements = currentContainer.querySelectorAll('.wave-layer, .particle, .geometric-shape, .gradient-layer, .mesh-blob, .wave-background');
			animatedElements.forEach(el => {
				el.style.animationPlayState = 'paused';
			});
		}
	}

	/**
	 * Update warp effect based on scroll direction and velocity
	 */
	function updateWarpEffect() {
		const currentContainer = state.containers[state.current];
		if (!currentContainer) return;

		const direction = state.scrollState.scrollDirection;
		const velocity = Math.min(state.scrollState.scrollVelocity / 8, 1.5); // Normalize velocity with higher max
		const intensity = config.warpIntensity * velocity;

		// Remove previous direction classes
		currentContainer.classList.remove('bg-animation-warp-up', 'bg-animation-warp-down');
		
		// Apply direction-based warp
		if (direction > 0) {
			// Scrolling down
			currentContainer.classList.add('bg-animation-warp-down');
		} else {
			// Scrolling up
			currentContainer.classList.add('bg-animation-warp-up');
		}

		// Adjust intensity based on velocity for more dramatic effect
		const baseScale = 1.2;
		const scale = baseScale + (intensity * 0.1);
		const blur = 15 + (intensity * 5);
		const translateY = direction * (40 + intensity * 20);
		const brightness = 1.4 + (intensity * 0.2);
		const contrast = 1.2 + (intensity * 0.1);
		const opacity = Math.max(0.85, 0.95 - (intensity * 0.1));
		
		currentContainer.style.transform = `scale(${scale}) translateY(${translateY}px) translateZ(0)`;
		currentContainer.style.filter = `blur(${blur}px) brightness(${brightness}) contrast(${contrast})`;
		currentContainer.style.opacity = opacity;
	}

	/**
	 * Fade out warp effect and resume normal animations
	 */
	function fadeOutWarpEffect() {
		state.scrollState.isScrolling = false;
		
		const container = state.scrollState.animationContainer;
		if (container) {
			container.classList.remove('scrolling');
		}

		const currentContainer = state.containers[state.current];
		if (currentContainer) {
			// Remove warp classes
			currentContainer.classList.remove('bg-animation-warp', 'bg-animation-warp-up', 'bg-animation-warp-down');
			
			// Smoothly transition back to normal
			currentContainer.style.transition = `transform ${config.warpFadeDuration}ms cubic-bezier(0.4, 0, 0.2, 1), filter ${config.warpFadeDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${config.warpFadeDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
			currentContainer.style.transform = 'scale(1) translateY(0) translateZ(0)';
			currentContainer.style.filter = 'blur(0) brightness(1) contrast(1)';
			currentContainer.style.opacity = '1';
			
			// Resume all child animations after transition
			setTimeout(() => {
				const animatedElements = currentContainer.querySelectorAll('.wave-layer, .particle, .geometric-shape, .gradient-layer, .mesh-blob, .wave-background');
				animatedElements.forEach(el => {
					el.style.animationPlayState = 'running';
				});
				
				// Re-evaluate section after warp ends to transition to correct animation
				if (state.observer) {
					const sections = document.querySelectorAll('section[id]');
					sections.forEach(section => {
						const rect = section.getBoundingClientRect();
						const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
						if (isVisible && section.id !== state.activeSection) {
							state.activeSection = section.id;
							const animationType = getAnimationForSection(section.id);
							if (animationType !== state.current) {
								transitionToAnimation(animationType);
							}
						}
					});
				}
			}, config.warpFadeDuration);
		}
	}

	/**
	 * Initialize scroll handler
	 */
	function initScrollHandler() {
		if (prefersReducedMotion) return;

		let ticking = false;
		
		function onScroll() {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		}

		// Throttled scroll listener
		window.addEventListener('scroll', onScroll, { passive: true });
		
		// Initialize scroll state
		state.scrollState.lastScrollY = window.scrollY || window.pageYOffset;
	}

	/**
	 * Initialize Intersection Observer
	 */
	function initObserver() {
		if (!('IntersectionObserver' in window)) {
			// Fallback: use waves
			transitionToAnimation('waves');
			return;
		}

		const options = {
			root: null,
			rootMargin: '-20% 0px -20% 0px', // Trigger when section is in middle 60% of viewport
			threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
		};

		state.observer = new IntersectionObserver(handleSectionChange, options);

		// Observe all sections with IDs
		const sections = document.querySelectorAll('section[id]');
		sections.forEach(section => {
			state.observer.observe(section);
		});
	}

	/**
	 * Initialize the animation system
	 */
	function init() {
		if (prefersReducedMotion) {
			// For reduced motion, just show waves and don't transition
			const wavesContainer = document.querySelector('.bg-animation-waves');
			if (wavesContainer) {
				wavesContainer.style.opacity = '1';
			}
			return;
		}

		initContainers();

		// Start with waves (default for intro)
		state.current = 'waves';
		state.activeSection = 'intro';
		const wavesContainer = state.containers.waves;
		if (wavesContainer) {
			wavesContainer.style.opacity = '1';
			wavesContainer.style.pointerEvents = 'auto';
		}

		// Initialize scroll handler
		initScrollHandler();

		// Initialize Intersection Observer
		initObserver();
	}

	/**
	 * Cleanup function
	 */
	function cleanup() {
		if (state.observer) {
			state.observer.disconnect();
			state.observer = null;
		}
		state.transitionQueue = [];
	}

	// Initialize on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	// Cleanup on page unload
	window.addEventListener('beforeunload', cleanup);

	// Export for manual control if needed
	window.BackgroundAnimations = {
		transition: transitionToAnimation,
		getCurrent: () => state.current,
		getActiveSection: () => state.activeSection,
		cleanup: cleanup
	};

})();
