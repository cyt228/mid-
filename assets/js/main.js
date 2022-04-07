
(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}
		$("#rpg").mouseover(function(){
			$("#rpg img").attr("src","images/pic01-1.jpg");
		});
		$("#rpg").mouseout(function(){
			$("#rpg img").attr("src","images/pic01.jpg");
		});

		$("#eat").mouseover(function(){
			$("#eat img").attr("src","images/pic02-2.jpg");
		});
		$("#eat").mouseout(function(){
			$("#eat img").attr("src","images/pic02.jpg");
		});

		$("#date").mouseover(function(){
			$("#date img").attr("src","images/pic03-3.jpg");
		});
		$("#date").mouseout(function(){
			$("#date img").attr("src","images/pic03.jpg");
		});

		$("#num").mouseover(function(){
			$("#num img").attr("src","images/pic06-6.jpg");
		});
		$("#num").mouseout(function(){
			$("#num img").attr("src","images/pic06.jpg");
		});

		$("#heart").mouseover(function(){
			$("#heart img").attr("src","images/pic04-4.jpg");
		});
		$("#heart").mouseout(function(){
			$("#heart img").attr("src","images/pic04.jpg");
		});
		
		$("#youtube").mouseover(function(){
			$("#youtube img").attr("src","images/pic05-5.jpg");
		});
		$("#youtube").mouseout(function(){
			$("#youtube img").attr("src","images/pic05.jpg");
		});

		$("#ooxx").mouseover(function(){
			$("#ooxx img").attr("src","images/pic07-7.jpg");
		});
		$("#ooxx").mouseout(function(){
			$("#ooxx img").attr("src","images/pic07.jpg");
		});

		$("#five").mouseover(function(){
			$("#five img").attr("src","images/pic08-8.jpg");
		});
		$("#five").mouseout(function(){
			$("#five img").attr("src","images/pic08.jpg");
		});

		$("#roulette").mouseover(function(){
			$("#roulette img").attr("src","images/pic09-9.jpg");
		});
		$("#roulette").mouseout(function(){
			$("#roulette img").attr("src","images/pic09.jpg");
		});
		
})(jQuery);