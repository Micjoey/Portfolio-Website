/*
 * Animation Utilities
 * Helper functions for animations, performance, and reduced motion support
 */

(function() {
	'use strict';

	// Check for reduced motion preference
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Animation configuration
	const config = {
		duration: prefersReducedMotion ? 0.1 : 0.8,
		ease: prefersReducedMotion ? 'none' : 'power1.out',
		stagger: prefersReducedMotion ? 0 : 0.08,
		scrollEase: prefersReducedMotion ? 'none' : 'power2.inOut',
		reducedMotion: prefersReducedMotion
	};

	// Export config
	window.AnimationConfig = config;

	/**
	 * Performance optimization: Use will-change for animated elements
	 */
	function optimizeForAnimation(elements) {
		if (prefersReducedMotion) return;
		
		const elementArray = Array.isArray(elements) ? elements : [elements];
		
		elementArray.forEach(el => {
			if (el && el.nodeType === 1) {
				el.style.willChange = 'transform, opacity';
				// Remove will-change after animation completes to free resources
				setTimeout(() => {
					if (el.style) {
						el.style.willChange = 'auto';
					}
				}, 2000);
			}
		});
	}

	/**
	 * Request Animation Frame throttling
	 */
	function throttleRAF(callback) {
		let ticking = false;
		
		return function(...args) {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					callback.apply(this, args);
					ticking = false;
				});
				ticking = true;
			}
		};
	}

	/**
	 * Debounce function
	 */
	function debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	/**
	 * Check if element is in viewport
	 */
	function isInViewport(element, threshold = 0) {
		if (!element) return false;
		
		const rect = element.getBoundingClientRect();
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;
		const windowWidth = window.innerWidth || document.documentElement.clientWidth;
		
		return (
			rect.top >= -threshold &&
			rect.left >= -threshold &&
			rect.bottom <= windowHeight + threshold &&
			rect.right <= windowWidth + threshold
		);
	}

	/**
	 * Split text into characters for animation
	 */
	function splitText(element) {
		if (!element || prefersReducedMotion) return element;
		
		const text = element.textContent;
		const words = text.split(' ');
		element.innerHTML = '';
		
		words.forEach((word, wordIndex) => {
			const wordSpan = document.createElement('span');
			wordSpan.style.display = 'inline-block';
			wordSpan.style.marginRight = '0.25em';
			
			word.split('').forEach((char, charIndex) => {
				const charSpan = document.createElement('span');
				charSpan.className = 'char';
				charSpan.textContent = char === ' ' ? '\u00A0' : char;
				charSpan.style.display = 'inline-block';
				wordSpan.appendChild(charSpan);
			});
			
			element.appendChild(wordSpan);
			if (wordIndex < words.length - 1) {
				element.appendChild(document.createTextNode(' '));
			}
		});
		
		return element;
	}

	/**
	 * Animation presets for GSAP
	 */
	const animationPresets = {
		fadeIn: {
			opacity: 0,
			duration: config.duration,
			ease: config.ease
		},
		fadeUp: {
			opacity: 0,
			y: 30,
			duration: config.duration,
			ease: config.ease
		},
		fadeDown: {
			opacity: 0,
			y: -30,
			duration: config.duration,
			ease: config.ease
		},
		fadeLeft: {
			opacity: 0,
			x: -30,
			duration: config.duration,
			ease: config.ease
		},
		fadeRight: {
			opacity: 0,
			x: 30,
			duration: config.duration,
			ease: config.ease
		},
		scaleIn: {
			opacity: 0,
			scale: 0.9,
			duration: config.duration,
			ease: 'back.out(1.4)'
		},
		slideInLeft: {
			opacity: 0,
			x: -50,
			duration: config.duration,
			ease: 'power2.out'
		},
		slideInRight: {
			opacity: 0,
			x: 50,
			duration: config.duration,
			ease: 'power2.out'
		}
	};

	/**
	 * Get animation preset
	 */
	function getPreset(presetName) {
		return animationPresets[presetName] || animationPresets.fadeUp;
	}

	/**
	 * Custom easing functions
	 */
	const customEasing = {
		smooth: 'power1.out',
		bounce: 'back.out(1.4)',
		elastic: 'elastic.out(1, 0.3)',
		expo: 'expo.out',
		circ: 'circ.out'
	};

	/**
	 * Get easing function
	 */
	function getEasing(easingName) {
		return customEasing[easingName] || config.ease;
	}

	/**
	 * Smooth scroll to element
	 */
	function smoothScrollTo(target, offset = 0) {
		if (prefersReducedMotion) {
			const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - offset,
					behavior: 'auto'
				});
			}
			return;
		}

		if (typeof gsap !== 'undefined' && gsap.to) {
			gsap.to(window, {
				duration: 1.2,
				scrollTo: { y: target, offsetY: offset },
				ease: config.scrollEase
			});
		} else {
			const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - offset,
					behavior: 'smooth'
				});
			}
		}
	}

	/**
	 * Initialize smooth scroll for anchor links
	 */
	function initSmoothScroll() {
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function(e) {
				const href = this.getAttribute('href');
				if (href === '#' || href === '#intro') {
					smoothScrollTo(document.body, 0);
					e.preventDefault();
					return;
				}

				const target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					const headerOffset = 80;
					smoothScrollTo(target, headerOffset);
				}
			});
		});
	}

	/**
	 * Lazy load images
	 */
	function lazyLoadImages() {
		if ('IntersectionObserver' in window) {
			const imageObserver = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const img = entry.target;
						if (img.dataset.src) {
							img.src = img.dataset.src;
							img.removeAttribute('data-src');
							observer.unobserve(img);
						}
					}
				});
			});

			document.querySelectorAll('img[data-src]').forEach(img => {
				imageObserver.observe(img);
			});
		}
	}

	/**
	 * Get scroll progress (0-1)
	 */
	function getScrollProgress() {
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		
		const maxScroll = Math.max(0, documentHeight - windowHeight);
		return maxScroll > 0 ? scrollTop / maxScroll : 0;
	}

	/**
	 * Clamp value between min and max
	 */
	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	/**
	 * Linear interpolation
	 */
	function lerp(start, end, factor) {
		return start + (end - start) * factor;
	}

	/**
	 * Map value from one range to another
	 */
	function mapRange(value, inMin, inMax, outMin, outMax) {
		return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
	}

	// Export utilities
	window.AnimationUtils = {
		optimizeForAnimation,
		throttleRAF,
		debounce,
		isInViewport,
		splitText,
		getPreset,
		getEasing,
		smoothScrollTo,
		initSmoothScroll,
		lazyLoadImages,
		getScrollProgress,
		clamp,
		lerp,
		mapRange,
		config
	};

	// Initialize smooth scroll on load
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			initSmoothScroll();
			lazyLoadImages();
		});
	} else {
		initSmoothScroll();
		lazyLoadImages();
	}

})();
