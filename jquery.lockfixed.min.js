/*!
 * jQuery lockfixed plugin
 * http://www.directlyrics.com/code/lockfixed/
 *
 * Copyright 2012-2015 Yvo Schaap
 * Released under the MIT license
 * http://www.directlyrics.com/code/lockfixed/license.txt
 *
 * Date: Wed April 1 2015 12:00:01 GMT
 */
(function(d,p){d.extend({lockfixed:function(a,b){b&&b.offset?(b.offset.bottom=parseInt(b.offset.bottom,10),b.offset.top=parseInt(b.offset.top,10)):b.offset={bottom:100,top:0};if((a=d(a))&&a.offset()){var n=a.css("position"),e=parseInt(a.css("marginTop"),10)||0,l=a.css("top"),h=a.offset().top,f=!1;if(!0===b.forcemargin||navigator.userAgent.match(/\bMSIE (4|5|6)\./)||navigator.userAgent.match(/\bOS ([0-9])_/)||navigator.userAgent.match(/\bAndroid ([0-9])\./i))f=!0;a.wrap("<div style='height:"+a.outerHeight()+
"px;display:"+a.css("display")+"'></div>");d(window).bind("DOMContentLoaded load scroll resize orientationchange lockfixed:pageupdate",a,function(k){if(!f||!document.activeElement||"INPUT"!==document.activeElement.nodeName){var c=0,c=a.outerHeight();k=a.outerWidth();var m=d(document).height()-b.offset.bottom,g=d(window).scrollTop();"fixed"===a.css("position")||f||(h=a.offset().top,l=a.css("top"));g>=h-(e?e:0)-b.offset.top?(c=m<g+c+e+b.offset.top&&c+b.offset.top>d(window).height()?g+c+e+b.offset.top-
m:0,f?a.css({marginTop:parseInt(g-h-c,10)+2*b.offset.top+"px"}):a.css({position:"fixed",top:b.offset.top-c+"px",width:k+"px"})):a.css({position:n,top:l,width:k+"px",marginTop:(e&&!f?e:0)+"px"})}})}}})})(jQuery);