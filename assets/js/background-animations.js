/*
 * Background Animation Manager
 * Manages seamless transitions between multiple background animation types
 */

(function() {
	'use strict';

	// Check for reduced motion preference
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Animation types
	const ANIMATION_TYPES = ['waves', 'particles', 'geometric', 'gradient', 'mesh'];

	// Configuration
	const config = {
		minInterval: 15000, // 15 seconds
		maxInterval: 45000, // 45 seconds
		transitionDuration: 2500, // 2.5 seconds fade
		reducedMotionInterval: 60000 // 60 seconds for reduced motion
	};

	// State management
	const state = {
		current: null,
		next: null,
		transitioning: false,
		timer: null,
		containers: {}
	};

	/**
	 * Generate random number between min and max
	 */
	function randomBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Get random animation type (excluding current)
	 */
	function getRandomAnimation(exclude = null) {
		const available = ANIMATION_TYPES.filter(type => type !== exclude);
		return available[Math.floor(Math.random() * available.length)];
	}

	/**
	 * Initialize all animation containers
	 */
	function initContainers() {
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

		for (let i = 0; i < particleCount; i++) {
			const particle = document.createElement('div');
			const size = sizes[Math.floor(Math.random() * sizes.length)];
			const animation = animations[Math.floor(Math.random() * animations.length)];
			const duration = randomBetween(15, 25);
			const delay = randomBetween(0, 10);
			const left = randomBetween(0, 100);
			const top = randomBetween(0, 100);

			particle.className = `particle particle-${size}`;
			particle.style.left = `${left}%`;
			particle.style.top = `${top}%`;
			particle.style.animation = `${animation} ${duration}s ease-in-out infinite`;
			particle.style.animationDelay = `${delay}s`;

			container.appendChild(particle);
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
	 * Transition to next animation
	 */
	function transitionToNext() {
		if (state.transitioning) return;

		state.transitioning = true;
		state.next = getRandomAnimation(state.current);

		// Fade out current
		fadeOut(state.current, () => {
			// Fade in next
			fadeIn(state.next, () => {
				state.current = state.next;
				state.next = null;
				state.transitioning = false;
				startTimer();
			});
		});
	}

	/**
	 * Start timer for next transition
	 */
	function startTimer() {
		if (state.timer) {
			clearTimeout(state.timer);
		}

		if (prefersReducedMotion) {
			// Longer interval for reduced motion
			state.timer = setTimeout(transitionToNext, config.reducedMotionInterval);
		} else {
			// Random interval
			const interval = randomBetween(config.minInterval, config.maxInterval);
			state.timer = setTimeout(transitionToNext, interval);
		}
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

		// Start with waves
		state.current = 'waves';
		const wavesContainer = state.containers.waves;
		if (wavesContainer) {
			wavesContainer.style.opacity = '1';
			wavesContainer.style.pointerEvents = 'auto';
		}

		// Start timer for first transition
		startTimer();
	}

	/**
	 * Cleanup function
	 */
	function cleanup() {
		if (state.timer) {
			clearTimeout(state.timer);
			state.timer = null;
		}
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
		transition: transitionToNext,
		getCurrent: () => state.current,
		cleanup: cleanup
	};

})();
