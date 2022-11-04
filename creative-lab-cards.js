$(document).ready(init);
function init() {

/* FIRST CARDS MOBILE START */

const mediaQuery = window.matchMedia('(max-width: 991px)');
$(".first-accordion_item").removeClass("active")
if (mediaQuery.matches) {
    $(".first-cards-accordion_content-wrap").slideUp()
    $(".project-link").slideUp()
}

$(".first-accordion_item").click(function() {
    if (mediaQuery.matches) {
    $(this).toggleClass("active")
    $(this).find(".project-link").slideDown()
    $(this).find(".first-cards-accordion_content-wrap").stop().slideToggle(600)
    $(this).siblings(".first-accordion_item").find(".project-link").slideUp()
    $(this).siblings(".first-accordion_item").find(".first-cards-accordion_content-wrap").stop().slideUp(600)
    $(this).siblings(".first-accordion_item").removeClass("active")
    }
})

$(window).resize(function(){
    if (mediaQuery.matches) {
    if ($('.first-accordion_item.active').length > 0) {
    } else {
        $(".first-cards-accordion_content-wrap").slideUp()
        $(".project-link").slideUp()
    }
    } else {
    $(".first-accordion_item").removeClass("active")
    $(".first-cards-accordion_content-wrap").slideDown()
    $(".project-link").slideDown()
    }
});

/* FIRST CARDS MOBILE END */


/* SECOND CARDS SCROLL ANIMATION START */

let scrollElemWrapper = $('.second-cards-wrapper'),
    trigger = $('.second-cards-section'),
    mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {

    let specializedServicesScroll = gsap.to(scrollElemWrapper, { 
    x: () => -(($('.second-cards-item').length - 1) * $('.second-cards-item').outerWidth(true) + $('.second-cards-item:last').outerWidth(true) - $('.second-cards-container').width()),   
    scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: "bottom bottom",
        ease:'none',
        duration: 1000,
        invalidateOnRefresh: true,
        scrub: true
    }
    }); 
});

/* SECOND CARDS SCROLL ANIMATION END */


/* FIFTH CARDS SCROLL ANIMATION START */

let fifthCardsEven = $('.fifth-cards-item:nth-child(even)'),
    fifthCardsOdd = $('.fifth-cards-item:nth-child(odd)'),
    fifthCardsScrollTrigger = $('#fifth-cards-scroll-trigger');

//see "mm" variable in the SECOND CARD animation
mm.add("(min-width: 768px)", () => {

    let scrollParallaxEvenCards = gsap.to(fifthCardsEven, { 
    y: "3rem",
    scrollTrigger: {
        trigger: fifthCardsScrollTrigger,
        start: "top bottom",
        end: "bottom top",
        ease:'none',
        duration: 1000,
        invalidateOnRefresh: true,
        scrub: true
    }
    });

    let scrollParallaxOddCards = gsap.to(fifthCardsOdd, { 
    y: "-1rem",
    scrollTrigger: {
        trigger: fifthCardsScrollTrigger,
        start: "top bottom",
        end: "bottom top",
        ease:'none',
        duration: 1000,
        invalidateOnRefresh: true,
        scrub: true
    }
    });

}); 

/* FIFTH CARDS SCROLL ANIMATION END */

/* SIXTH CARDS SCROLL ANIMATION START */

let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".sixth-card", "skewY", "deg"),
    clamp = gsap.utils.clamp(-20, 20); 

let sixthCardsTrigger = ScrollTrigger.create({
    onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
    }
    }
});

let sixthAnimation = gsap.set(".sixth-card", {transformOrigin: "right center", force3D: true});

/* SIXTH CARDS SCROLL ANIMATION END */

}

// test