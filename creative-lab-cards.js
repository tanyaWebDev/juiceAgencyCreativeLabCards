$(document).ready(init);
function init() {

/* FIRST CARDS MOBILE START */

const mediaQueryTablet = window.matchMedia('(max-width: 991px)');
const mediaQueryHorizontalMobile = window.matchMedia('(max-width: 767px)');
$(".first-accordion_item").removeClass("active")
if (mediaQueryTablet.matches) {
$(".first-cards-accordion_content-wrap").slideUp()
$(".project-link").slideUp()
}

$(".first-accordion_item").click(function() {
if (mediaQueryTablet.matches) {
$(this).toggleClass("active")
$(this).find(".project-link").slideDown()
$(this).find(".first-cards-accordion_content-wrap").stop().slideToggle(600)
$(this).siblings(".first-accordion_item").find(".project-link").slideUp()
$(this).siblings(".first-accordion_item").find(".first-cards-accordion_content-wrap").stop().slideUp(600)
$(this).siblings(".first-accordion_item").removeClass("active")
}
})

$(window).resize(function(){
if (mediaQueryTablet.matches) {
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

const scrollSection = $('.second-cards-section');
const scrollItems = $('.second-cards-item');
function scrollSectionHeight() {
if (mediaQueryHorizontalMobile.matches) {
scrollSection.css('height', 'auto');
} else {
scrollSection.css('height', (100 * scrollItems.length + 'vh'));
}
}
scrollSectionHeight()

$(window).resize(function(){
scrollSectionHeight()
})

let scrollElemWrapper = $('.second-cards-wrapper'),
mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {

let specializedServicesScroll = gsap.to(scrollElemWrapper, { 
x: () => -((scrollItems.length - 1) * scrollItems.outerWidth(true) + $('.second-cards-item:last').outerWidth(true) - $('.second-cards-container').width()),   
scrollTrigger: {
trigger: scrollSection,
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

/* SEVENTH CARDS SCROLL ANIMATION START */

mm.add("(min-width: 768px)", () => {

gsap.defaults({
    ease: "power3"
});

gsap.set(".seventh-cards--item", {
    y: 100
});


ScrollTrigger.batch(".seventh-cards--item", {
    start: "top bottom-=100px",
    onEnter: batch => gsap.to(batch, {
        opacity: 1, 
        y: 0, 
        backgroundSize:"100%", 
        stagger: 0.15
    }),
    onLeaveBack:batch => gsap.to(batch, {
        opacity: 0, 
        y: 100, 
        backgroundSize:"0%", 
        stagger: 0.1
    })
});

ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".seventh-cards--item", {
    y: 0, 
    backgroundSize:"0%"
}));

});
/* SEVENTH CARDS SCROLL ANIMATION END */

/* EIGHTH CARDS SCROLL ANIMATION START */
document.getElementById("eighth-cards__list").onmousemove = e => {
    for(const card of document.getElementsByClassName("eighth-cards__item")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
  
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }
  /* EIGHTH CARDS SCROLL ANIMATION END */

  /* TWELVETH CAEDS DRAGGABLE ANIMATION START */

console.clear();

gsap.registerPlugin(Draggable);

let rowSize   = 150;
let colSize   = 250;
let totalRows = 3;
let totalCols = 3;

let clampCol = gsap.utils.clamp(0, totalCols - 1);
let clampRow = gsap.utils.clamp(0, totalRows - 1);

let cells = [];

// Map cell locations to array
for (let row = 0; row < totalRows; row++) {
  for (let col = 0; col < totalCols; col++) {
    cells.push({
      row: row,
      col: col,
      x: col * colSize,
      y: row * rowSize
    });
  }
}

let container = document.querySelector(".twelveth-cards__list");
let listItems = gsap.utils.toArray(".list-itemtwelveth-card__item");
let sortables = listItems.map(Sortable); // Array of sortables
let total     = sortables.length;

gsap.to(container, { autoAlpha: 1, duration: 0.5 });

function changeIndex(item, to, sameRow, sameCol) {
    
  // Check if adjacent to new position
  if ((sameRow && !sameCol) || (!sameRow && sameCol)) {
    
    // Swap positions in array
    var temp = sortables[to];
    sortables[to] = item;
    sortables[item.index] = temp;
    
  } else {
    
    // Change position in array
    arrayMove(sortables, item.index, to);
  }
    
  // Simple, but not optimized way to change element's position in DOM. Not always necessary. 
  sortables.forEach(sortable => container.appendChild(sortable.element)); 
    
  // Set index for each sortable
  sortables.forEach((sortable, index) => sortable.setIndex(index));
}

function Sortable(element, index) {
    
  let content = element.querySelector(".item-content");
  let order   = element.querySelector(".order");
  
  let animation = gsap.to(content, {
    duration: 0.3,
    boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
    force3D: true,
    scale: 1.1,
    paused: true
  });
  
  let dragger = new Draggable(element, {        
    onDragStart: downAction,
    onRelease: upAction,
    onDrag: dragAction,
    cursor: "inherit"
  });
  
  // let position = element._gsTransform;
  let getProp = gsap.getProperty(element);
  
  // Public properties and methods
  let sortable = {
    cell:     cells[index],
    dragger:  dragger,
    element:  element,
    index:    index,
    setIndex: setIndex
  };
  
  gsap.set(element, { 
    x: sortable.cell.x, 
    y: sortable.cell.y, 
  });    
  
  function setIndex(index) {
    
    let cell  = cells[index];
    // var dirty = position.x !== cell.x || position.y !== cell.y;
    let dirty = getProp("x") !== cell.x || getProp("y") !== cell.y;
    
    sortable.cell = cell;
    sortable.index = index;    
    order.textContent = index + 1;
        
    // Don't layout if you're dragging
    if (!dragger.isDragging && dirty) layout();
  }
    
  function downAction() {
    animation.play();
    this.update();
  }
  
  function dragAction() {
        
    let col = clampCol(Math.round(this.x / colSize));
    let row = clampRow(Math.round(this.y / rowSize));
       
    let cell = sortable.cell;    
    let sameCol = col === cell.col;
    let sameRow = row === cell.row;
    
    // Check if position has changed
    if (!sameRow || !sameCol) {
      
      // Calculate the new index
      var index = totalCols * row + col;
      
      // Update the model
      changeIndex(sortable, index, sameRow, sameCol);
    }
  }
    
  function upAction() {
    animation.reverse();
    layout();
  }
  
  function layout() {    
    gsap.to(element, { 
      duration: 0.3,
      x: sortable.cell.x, 
      y: sortable.cell.y
    });  
  }
      
  return sortable;
}

// Changes an elements's position in array
function arrayMove(array, from, to) {
  array.splice(to, 0, array.splice(from, 1)[0]);
}

  /* TWELVETH CAEDS DRAGGABLE ANIMATION END */
}