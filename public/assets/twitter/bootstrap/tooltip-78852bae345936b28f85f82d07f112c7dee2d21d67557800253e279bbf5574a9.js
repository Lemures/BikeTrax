/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(e){"use strict";function t(t){return this.each(function(){var r=e(this),i=r.data("bs.tooltip"),o="object"==typeof t&&t;(i||"destroy"!=t)&&(i||r.data("bs.tooltip",i=new n(this,o)),"string"==typeof t&&i[t]())})}var n=function(e,t){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",e,t)};n.VERSION="3.2.0",n.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},n.prototype.init=function(t,n,r){this.enabled=!0,this.type=t,this.$element=e(n),this.options=this.getOptions(r),this.$viewport=this.options.viewport&&e(this.options.viewport.selector||this.options.viewport);for(var i=this.options.trigger.split(" "),o=i.length;o--;){var a=i[o];if("click"==a)this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this));else if("manual"!=a){var s="hover"==a?"mouseenter":"focusin",l="hover"==a?"mouseleave":"focusout";this.$element.on(s+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,e.proxy(this.leave,this))}}this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},n.prototype.getDefaults=function(){return n.DEFAULTS},n.prototype.getOptions=function(t){return t=e.extend({},this.getDefaults(),this.$element.data(),t),t.delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t},n.prototype.getDelegateOptions=function(){var t={},n=this.getDefaults();return this._options&&e.each(this._options,function(e,r){n[e]!=r&&(t[e]=r)}),t},n.prototype.enter=function(t){var n=t instanceof this.constructor?t:e(t.currentTarget).data("bs."+this.type);return n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n)),clearTimeout(n.timeout),n.hoverState="in",n.options.delay&&n.options.delay.show?void(n.timeout=setTimeout(function(){"in"==n.hoverState&&n.show()},n.options.delay.show)):n.show()},n.prototype.leave=function(t){var n=t instanceof this.constructor?t:e(t.currentTarget).data("bs."+this.type);return n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n)),clearTimeout(n.timeout),n.hoverState="out",n.options.delay&&n.options.delay.hide?void(n.timeout=setTimeout(function(){"out"==n.hoverState&&n.hide()},n.options.delay.hide)):n.hide()},n.prototype.show=function(){var t=e.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var n=e.contains(document.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!n)return;var r=this,i=this.tip(),o=this.getUID(this.type);this.setContent(),i.attr("id",o),this.$element.attr("aria-describedby",o),this.options.animation&&i.addClass("fade");var a="function"==typeof this.options.placement?this.options.placement.call(this,i[0],this.$element[0]):this.options.placement,s=/\s?auto?\s?/i,l=s.test(a);l&&(a=a.replace(s,"")||"top"),i.detach().css({top:0,left:0,display:"block"}).addClass(a).data("bs."+this.type,this),this.options.container?i.appendTo(this.options.container):i.insertAfter(this.$element);var u=this.getPosition(),c=i[0].offsetWidth,p=i[0].offsetHeight;if(l){var d=a,f=this.$element.parent(),h=this.getPosition(f);a="bottom"==a&&u.top+u.height+p-h.scroll>h.height?"top":"top"==a&&u.top-h.scroll-p<0?"bottom":"right"==a&&u.right+c>h.width?"left":"left"==a&&u.left-c<h.left?"right":a,i.removeClass(d).addClass(a)}var m=this.getCalculatedOffset(a,u,c,p);this.applyPlacement(m,a);var g=function(){r.$element.trigger("shown.bs."+r.type),r.hoverState=null};e.support.transition&&this.$tip.hasClass("fade")?i.one("bsTransitionEnd",g).emulateTransitionEnd(150):g()}},n.prototype.applyPlacement=function(t,n){var r=this.tip(),i=r[0].offsetWidth,o=r[0].offsetHeight,a=parseInt(r.css("margin-top"),10),s=parseInt(r.css("margin-left"),10);isNaN(a)&&(a=0),isNaN(s)&&(s=0),t.top=t.top+a,t.left=t.left+s,e.offset.setOffset(r[0],e.extend({using:function(e){r.css({top:Math.round(e.top),left:Math.round(e.left)})}},t),0),r.addClass("in");var l=r[0].offsetWidth,u=r[0].offsetHeight;"top"==n&&u!=o&&(t.top=t.top+o-u);var c=this.getViewportAdjustedDelta(n,t,l,u);c.left?t.left+=c.left:t.top+=c.top;var p=c.left?2*c.left-i+l:2*c.top-o+u,d=c.left?"left":"top",f=c.left?"offsetWidth":"offsetHeight";r.offset(t),this.replaceArrow(p,r[0][f],d)},n.prototype.replaceArrow=function(e,t,n){this.arrow().css(n,e?50*(1-e/t)+"%":"")},n.prototype.setContent=function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},n.prototype.hide=function(){function t(){"in"!=n.hoverState&&r.detach(),n.$element.trigger("hidden.bs."+n.type)}var n=this,r=this.tip(),i=e.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(i),i.isDefaultPrevented()?void 0:(r.removeClass("in"),e.support.transition&&this.$tip.hasClass("fade")?r.one("bsTransitionEnd",t).emulateTransitionEnd(150):t(),this.hoverState=null,this)},n.prototype.fixTitle=function(){var e=this.$element;(e.attr("title")||"string"!=typeof e.attr("data-original-title"))&&e.attr("data-original-title",e.attr("title")||"").attr("title","")},n.prototype.hasContent=function(){return this.getTitle()},n.prototype.getPosition=function(t){t=t||this.$element;var n=t[0],r="BODY"==n.tagName;return e.extend({},"function"==typeof n.getBoundingClientRect?n.getBoundingClientRect():null,{scroll:r?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop(),width:r?e(window).width():t.outerWidth(),height:r?e(window).height():t.outerHeight()},r?{top:0,left:0}:t.offset())},n.prototype.getCalculatedOffset=function(e,t,n,r){return"bottom"==e?{top:t.top+t.height,left:t.left+t.width/2-n/2}:"top"==e?{top:t.top-r,left:t.left+t.width/2-n/2}:"left"==e?{top:t.top+t.height/2-r/2,left:t.left-n}:{top:t.top+t.height/2-r/2,left:t.left+t.width}},n.prototype.getViewportAdjustedDelta=function(e,t,n,r){var i={top:0,left:0};if(!this.$viewport)return i;var o=this.options.viewport&&this.options.viewport.padding||0,a=this.getPosition(this.$viewport);if(/right|left/.test(e)){var s=t.top-o-a.scroll,l=t.top+o-a.scroll+r;s<a.top?i.top=a.top-s:l>a.top+a.height&&(i.top=a.top+a.height-l)}else{var u=t.left-o,c=t.left+o+n;u<a.left?i.left=a.left-u:c>a.width&&(i.left=a.left+a.width-c)}return i},n.prototype.getTitle=function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||("function"==typeof n.title?n.title.call(t[0]):n.title)},n.prototype.getUID=function(e){do e+=~~(1e6*Math.random());while(document.getElementById(e));return e},n.prototype.tip=function(){return this.$tip=this.$tip||e(this.options.template)},n.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},n.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},n.prototype.enable=function(){this.enabled=!0},n.prototype.disable=function(){this.enabled=!1},n.prototype.toggleEnabled=function(){this.enabled=!this.enabled},n.prototype.toggle=function(t){var n=this;t&&(n=e(t.currentTarget).data("bs."+this.type),n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n))),n.tip().hasClass("in")?n.leave(n):n.enter(n)},n.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var r=e.fn.tooltip;e.fn.tooltip=t,e.fn.tooltip.Constructor=n,e.fn.tooltip.noConflict=function(){return e.fn.tooltip=r,this}}(jQuery);