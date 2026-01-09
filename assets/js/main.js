/*
	Macallan Savett's Profile
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Constants
	var ANIMATION_DELAY = 100;
	var SCROLL_SPEED = 1000;
	var SCROLL_OFFSET_TOP = '-20vh';
	var SCROLL_OFFSET_BOTTOM = '-20vh';
	var SPOTLIGHT_OFFSET_TOP = '-10vh';
	var SPOTLIGHT_OFFSET_BOTTOM = '-10vh';

	// Breakpoints.
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ null,      '480px'  ]
	});

	// Enable IE flexbox workarounds.
	if (browser.name === 'ie') {
		$body.addClass('is-ie');
	}

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, ANIMATION_DELAY);
	});

	// Forms: Activate non-input submits.
	$('form').on('click', '.submit', function(event) {
		event.stopPropagation();
		event.preventDefault();
		$(this).parents('form').submit();
	});

	// Sidebar navigation.
	if ($sidebar.length > 0) {
		var $sidebar_a = $sidebar.find('a');

		$sidebar_a
			.addClass('scrolly')
			.on('click', function() {
				var $this = $(this);
				var href = $this.attr('href');

				// External link? Bail.
				if (!href || href.charAt(0) !== '#') {
					return;
				}

				// Deactivate all links.
				$sidebar_a.removeClass('active');

				// Activate link and lock it (so Scrollex doesn't try to activate other links).
				$this
					.addClass('active')
					.addClass('active-locked');
			})
			.each(function() {
				var $this = $(this);
				var id = $this.attr('href');
				var $section = $(id);

				// No section for this link? Bail.
				if ($section.length < 1) {
					return;
				}

				// Scrollex.
				$section.scrollex({
					mode: 'middle',
					top: SCROLL_OFFSET_TOP,
					bottom: SCROLL_OFFSET_BOTTOM,
					initialize: function() {
						$section.addClass('inactive');
					},
					enter: function() {
						$section.removeClass('inactive');

						// No locked links? Deactivate all links and activate this section's one.
						if ($sidebar_a.filter('.active-locked').length === 0) {
							$sidebar_a.removeClass('active');
							$this.addClass('active');
						}
						// Otherwise, if this section's link is the one that's locked, unlock it.
						else if ($this.hasClass('active-locked')) {
							$this.removeClass('active-locked');
						}
					}
				});
			});
	}

	// Scrolly smooth scrolling.
	$('.scrolly').scrolly({
		speed: SCROLL_SPEED,
		offset: function() {
			// If <=large, >small, and sidebar is present, use its height as the offset.
			if (breakpoints.active('<=large')
				&& !breakpoints.active('<=small')
				&& $sidebar.length > 0) {
				return $sidebar.height();
			}
			return 0;
		}
	});

	// Spotlights.
	$('.spotlights > section')
		.scrollex({
			mode: 'middle',
			top: SPOTLIGHT_OFFSET_TOP,
			bottom: SPOTLIGHT_OFFSET_BOTTOM,
			initialize: function() {
				$(this).addClass('inactive');
			},
			enter: function() {
				$(this).removeClass('inactive');
			}
		})
		.each(function() {
			var $this = $(this);
			var $image = $this.find('.image');
			var $img = $image.find('img');
			var imageSrc = $img.attr('src');
			var position = $img.data('position');

			// Assign image.
			if (imageSrc) {
				$image.css('background-image', 'url(' + imageSrc + ')');
			}

			// Set background position.
			if (position) {
				$image.css('background-position', position);
			}

			// Hide <img>.
			$img.hide();
		});

	// Features.
	$('.features')
		.scrollex({
			mode: 'middle',
			top: SCROLL_OFFSET_TOP,
			bottom: SCROLL_OFFSET_BOTTOM,
			initialize: function() {
				$(this).addClass('inactive');
			},
			enter: function() {
				$(this).removeClass('inactive');
			}
		});

})(jQuery);