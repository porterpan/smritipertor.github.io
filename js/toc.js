// build time:Fri Oct 18 2019 21:09:34 GMT+0800 (GMT+08:00)
define(function(){var i=function(){var i=yiliaConfig.toc[0];var t=yiliaConfig.toc[1];if($(".left-col").is(":hidden")){$("#tocButton").attr("value",t)}$("#tocButton").click(function(){if($("#toc").is(":hidden")){$("#tocButton").attr("value",i);$("#toc").slideDown(320);$(".switch-btn, .switch-area").fadeOut(300)}else{$("#tocButton").attr("value",t);$("#toc").slideUp(350);$(".switch-btn, .switch-area").fadeIn(500)}})}();var t=function(){if(!$(".toc").length){$("#toc, #tocButton").hide();$(".switch-btn, .switch-area").show()}}();var c=$("#toc .toc-item:has(> .toc-child)");var o=c.children(".toc-link");c.prepend("<i class='fa fa-caret-down'></i><i class='fa fa-caret-right'></i>");var s=function(){$("#toc .toc-item > i").click(function(){$(this).siblings(".toc-child").slideToggle(100);$(this).toggleClass("hide");$(this).siblings("i").toggleClass("hide")})}();var a=function(){o.dblclick(function(){$(this).siblings(".toc-child").hide(100);$(this).siblings("i").toggleClass("hide")});o.click(function(){var i=$(this).siblings(".toc-child");if(i.is(":hidden")){i.show(100);$(this).siblings("i").toggleClass("hide")}})}();var e=function(){var i=$(".toc-item > .fa-caret-right");var t=$(".toc-item > .fa-caret-down");var c=o.next(".toc-child");i.addClass("hide");var s=$("#toc .toc-title");if(o.length){s.addClass("clickable");s.click(function(){if(c.is(":hidden")){c.show(150);i.removeClass("hide");t.addClass("hide")}else{c.hide(100);i.addClass("hide");t.removeClass("hide")}});if($(".left-col").is(":hidden")){$("#container .toc-article .toc").css("padding-left","1.4em");$("#container .toc-article .toc-title").css("display","initial")}}}();var n=function(i){if(i){var t=$(".toc li a");t.each(function(){var i=$(this).find(".toc-text").text();if(this.offsetWidth<this.scrollWidth){$(this).attr("title",i);if(!!$().tooltip){$(this).tooltip()}}});var c=!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);if(c){$("#toc .toc-item i").css("bottom",".1em")}}};n(yiliaConfig.toc[2])});
//rebuild by neat 