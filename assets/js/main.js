/*
 * Main JavaScript
 * Core functionality: navigation, toggles, smooth scroll
 */

(function() {
	'use strict';

	// Smooth scroll for anchor links
	function initSmoothScroll() {
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function(e) {
				const href = this.getAttribute('href');
				if (href === '#' || href === '#intro') {
					window.scrollTo({ top: 0, behavior: 'smooth' });
					e.preventDefault();
					return;
				}

				const target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					const headerOffset = 80;
					const elementPosition = target.getBoundingClientRect().top;
					const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth'
					});
				}
			});
		});
	}

	// Update active nav link on scroll
	function updateActiveNavLink() {
		const scrollPos = window.scrollY + 100;
		const navLinks = document.querySelectorAll('.nav-link[data-section]');

		navLinks.forEach(link => {
			const sectionId = link.getAttribute('data-section');
			const section = document.getElementById(sectionId);

			if (section) {
				const sectionTop = section.offsetTop;
				const sectionBottom = sectionTop + section.offsetHeight;

				if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
					navLinks.forEach(l => l.classList.remove('active'));
					link.classList.add('active');
				}
			}
		});
	}

	// Throttle scroll handler
	function throttle(func, wait) {
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

	// Previous Experience Toggle
	function initPreviousExpToggle() {
		const toggle = document.getElementById('previous-exp-toggle');
		const content = document.getElementById('previous-exp-content');
		const icon = document.getElementById('previous-exp-icon');

		if (toggle && content && icon) {
			toggle.addEventListener('click', function() {
				const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
				
				if (isExpanded) {
					content.style.display = 'none';
					icon.classList.remove('expanded');
					toggle.setAttribute('aria-expanded', 'false');
				} else {
					content.style.display = 'block';
					icon.classList.add('expanded');
					toggle.setAttribute('aria-expanded', 'true');
				}
			});

			// Keyboard support
			toggle.addEventListener('keydown', function(e) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					toggle.click();
				}
			});
		}
	}

	// Lazy load images
	function initLazyLoading() {
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

	// Initialize everything
	function init() {
		initSmoothScroll();
		initPreviousExpToggle();
		initLazyLoading();
		
		// Update nav on scroll
		const throttledUpdateNav = throttle(updateActiveNavLink, 100);
		window.addEventListener('scroll', throttledUpdateNav, { passive: true });
		
		// Initial nav update
		updateActiveNavLink();
	}

	// Run on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

})();
