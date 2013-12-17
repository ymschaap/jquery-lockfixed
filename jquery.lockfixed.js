﻿/*!
 * jQuery lockfixed plugin
 * http://www.directlyrics.com/code/lockfixed/
 *
 * Copyright 2012 Yvo Schaap
 * Released under the MIT license
 * http://www.directlyrics.com/code/lockfixed/license.txt
 *
 * Date: Thue Dec 12 2013 12:00:01 GMT
 */
(function($, undefined){
	$.extend({
		/**
		 * Lockfixed initiated
		 * @param {Element} el - a jquery element, DOM node or selector string
		 * @param {Object} config - offset - forcemargin
		 */
		"lockfixed": function(el, config){
			if (config && config.offset) {
				config.offset.bottom = parseInt(config.offset.bottom,10);
				config.offset.top = parseInt(config.offset.top,10);
			}else{
				config.offset = {bottom: 100, top: 0};	
			}
			var el =$(el);
			if(el && el.offset()){
				var el_top = el.offset().top,
				el_height = el.outerHeight(true),
				el_width = el.outerWidth(),
				el_position = el.css("position"),
				el_position_top = el.css("top"),
				el_margin_top = parseInt(el.css("marginTop"),10),
				max_height = $(document).height() - config.offset.bottom,
				top = 0,
				swtch = false,
				pos_not_fixed = false,
				el_right_float = el.css('float') === 'right';;
				
				/* we prefer feature testing, too much hassle for the upside */
				/* while prettier to use position: fixed (less jitter when scrolling) */
				/* iOS 5+ + Android has fixed support, but issue with toggeling between fixed and not and zoomed view */
				if (config.forcemargin === true || navigator.userAgent.match(/\bMSIE (4|5|6)\./) || navigator.userAgent.match(/\bOS ([0-9])_/) || navigator.userAgent.match(/\bAndroid ([0-9])\./i)){
					pos_not_fixed = true;
				}
	
				$(window).bind('scroll resize orientationchange load',el,function(e){
					var el_height = el.outerHeight(),
						scroll_top = $(window).scrollTop();
					
					// check height on load event (specifically) due to elements being hidden on DOM ready - is this case, the height value is incorrect)
					max_height = $(document).height() - config.offset.bottom;

					//if we have a input focus don't change this (for ios zoom and stuff)
					if(pos_not_fixed && document.activeElement && document.activeElement.nodeName === "INPUT"){
						return;	
					}	

					if (scroll_top >= (el_top-(el_margin_top ? el_margin_top : 0)-config.offset.top)){

						if(max_height < (scroll_top + el_height + el_margin_top + config.offset.top)){
							top = (scroll_top + el_height + el_margin_top + config.offset.top) - max_height;
						}else{
							top = 0;	
						}

						if (pos_not_fixed){
							el.css({'marginTop': parseInt(((el_margin_top ? el_margin_top : 0) + (scroll_top - el_top - top) + 2 * config.offset.top),10)+'px'});
						}else{
							el.css({'position': 'fixed','top':(config.offset.top-top)+'px','width':el_width +"px",'left':el_right_float ? el_left + "px" : 'auto'});
						}
					}else{
						el.css({'position': el_position,'top': el_position_top, 'width':el_width +"px", 'marginTop': (el_margin_top ? el_margin_top : 0)+"px",'left':el_right_float ? el_left + "px" : 'auto'});
					}
				});	
			}
		}
	});
})(jQuery);
