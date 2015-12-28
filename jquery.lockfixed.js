﻿/*!
 * jQuery lockfixed plugin
 * http://www.directlyrics.com/code/lockfixed/
 *
 * Copyright 2012-2015 Yvo Schaap
 * Released under the MIT license
 * http://www.directlyrics.com/code/lockfixed/license.txt
 *
 * Date: Mon December 28 2015 14:56:01 GMT+1
 */
(function($, undefined) {
	$.extend({
		/**
		 * Lockfixed initiated
		 * @param {Element} el - a jquery element, DOM node or selector string
		 * @param {Object} config - offset - forcemargin
		 */
		"lockfixed": function(el, config) {
			if (config && config.offset) {
				config.offset.bottom = parseInt(config.offset.bottom, 10);
				config.offset.top = parseInt(config.offset.top, 10);
			} else {
				config.offset = {
					bottom: 100,
					top: 0
				};
			}
			var el = $(el);
			if (el && el.offset()) {
				var el_position = el.css("position"),
					el_margin_top = parseInt(el.css("marginTop"), 10) || 0,
					el_position_top = el.css("top"),
					el_top = el.offset().top,
					pos_not_fixed = false;


				//We prefer feature testing, too much hassle for the upside 
				//while prettier to use position: fixed (less jitter when scrolling)
				//iOS 5+ && Android does has fixed support, but results in issue with toggeling between fixed and viewport zoom

				if (config.forcemargin === true || navigator.userAgent.match(/\bMSIE (4|5|6)\./) || navigator.userAgent.match(/\bOS ([0-9])_/) || navigator.userAgent.match(/\bAndroid ([0-9])\./i)) {
					pos_not_fixed = true;
				}

				// We wrap the element with the height of the lockfixed, because position: fixed removes the height leaving an empty area (and some jitter)
				el.wrap("<div style='height:" + el.outerHeight() + "px;display:" + el.css("display") + "'></div>");

				// Bind to most comment events that will need to recalculate our lockfixed position
				$(window).bind('DOMContentLoaded load scroll resize orientationchange lockfixed:pageupdate', el, function(e) {
					// if we have a input focus don't change this (for smaller screens)
					if (pos_not_fixed && document.activeElement && document.activeElement.nodeName === "INPUT") {
						return;
					}

					var top = 0,
						el_height = el.outerHeight(),
						el_width = el.outerWidth(),
						max_height = $(document).height() - config.offset.bottom,
						scroll_top = $(window).scrollTop();

					// if element is not currently fixed position, reset measurements ( this handles DOM changes in dynamic pages )
					if (el.css("position") !== "fixed" && !pos_not_fixed) {
						el_top = el.offset().top;
						el_position_top = el.css("top");
					}

					if (scroll_top >= (el_top - (el_margin_top ? el_margin_top : 0) - config.offset.top)) {

						if (max_height < (scroll_top + el_height + el_margin_top + config.offset.top) &&
							el_height + config.offset.top + config.offset.bottom > $(window).height()
						) {
							top = (scroll_top + el_height + el_margin_top + config.offset.top) - max_height;
						} else {
							top = 0;
						}

						if (pos_not_fixed) {
							el.css({
								'marginTop': (parseInt(scroll_top - el_top - top, 10) + (2 * config.offset.top)) + 'px'
							});
						} else {
							el.css({
								'position': 'fixed',
								'top': (config.offset.top - top) + 'px',
								'width': el_width + "px"
							});
						}
					} else {
						el.css({
							'position': el_position,
							'top': el_position_top,
							'width': el_width + "px",
							'marginTop': (el_margin_top && !pos_not_fixed ? el_margin_top : 0) + "px"
						});
					}
				});
			}
		}
	});
})(jQuery);