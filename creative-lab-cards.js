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

$(".first-accordion_item").click(function () {
    if (mediaQueryTablet.matches) {
        $(this).toggleClass("active")
        $(this).find(".project-link").slideDown()
        $(this).find(".first-cards-accordion_content-wrap").stop().slideToggle(600)
        $(this).siblings(".first-accordion_item").find(".project-link").slideUp()
        $(this).siblings(".first-accordion_item").find(".first-cards-accordion_content-wrap").stop().slideUp(600)
        $(this).siblings(".first-accordion_item").removeClass("active")
    }
})

$(window).resize(function () {
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

$(window).resize(function () {
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
            ease: 'none',
            duration: 1000,
            invalidateOnRefresh: true,
            scrub: true
        }
    });
});

/* SECOND CARDS SCROLL ANIMATION END */

/* THIRD, FOURTH CARDS START */
//see grid attributes to change animation

let grid = '.gsap-grid'
let gridItem = '.gsap-card'
let gridImagewrapper = '.gsap-img-anim'



const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

const getTranslationDistance = (element1, element2, spread = 80, maxDistance = 500) => {
    const elCenter = { x: element1.offsetLeft + element1.offsetWidth / 2, y: element1.offsetTop + element1.offsetHeight / 2 };
    const elCenter2 = { x: element2.offsetLeft + element2.offsetWidth / 2, y: element2.offsetTop + element2.offsetHeight / 2 };

    spread = Math.max(map(getDistance(element1, element2), 0, maxDistance, spread, 0), 0);

    const angle = Math.atan2(Math.abs(elCenter2.y - elCenter.y), Math.abs(elCenter2.x - elCenter.x));

    let x = Math.abs(Math.cos(angle) * spread);
    let y = Math.abs(Math.sin(angle) * spread);

    return {
        x: elCenter.x < elCenter2.x ? x * -1 : x,
        y: elCenter.y < elCenter2.y ? y * -1 : y
    };
};


const getDistance = (element1, element2) => {
    const elCenter = { x: element1.offsetLeft + element1.offsetWidth / 2, y: element1.offsetTop + element1.offsetHeight / 2 };
    const elCenter2 = { x: element2.offsetLeft + element2.offsetWidth / 2, y: element2.offsetTop + element2.offsetHeight / 2 };
    return Math.hypot(elCenter.x - elCenter2.x, elCenter.y - elCenter2.y);
}

class Item {
    DOM = {
        el: null,
        image: null
    }

    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.image = this.DOM.el.querySelector("" + gridImagewrapper + "");
    }
}

class SpreadGrid {
    DOM = {
        el: null,
        items: null,
    }

    expanded = -1;
    previousExpanded = -1;


    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.items = [...this.DOM.el.querySelectorAll("" + gridItem + "")];
        this.items = [];
        this.DOM.items.forEach(item => this.items.push(new Item(item)));

        // Options passed in data attributes and defaults.
        this.options = {};
        this.options.duration = Number(this.DOM.el.dataset.duration) || 0.8;
        this.options.ease = this.DOM.el.dataset.ease || 'power4';
        this.options.scale = Number(this.DOM.el.dataset.scale) || 2;
        this.options.skew = Number(this.DOM.el.dataset.skew) || 0;
        this.options.maxRotation = Number(this.DOM.el.dataset.maxRotation) || 0;
        this.options.spread = Number(this.DOM.el.dataset.spread) || 80;
        this.options.maxDistance = Number(this.DOM.el.dataset.maxDistance) || 500;

        this.initEvents();
    }

    initEvents() {
        for (const item of this.items) {
            item.DOM.el.addEventListener('click', () => this.expand(item));
        }
    }

    expand(item) {

        if (this.tl) {
            this.tl.kill();
        }

        const itemIdx = this.items.indexOf(item);

        this.previousExpanded = this.expanded !== -1 && this.expanded !== itemIdx ? this.expanded : -1;
        this.expanded = this.expanded === itemIdx ? -1 : itemIdx;

        this.tl = gsap.timeline({
            defaults: {
                duration: this.options.duration,
                ease: this.options.ease
            }
        })
            .addLabel('start', 0)
            .addLabel('end', this.options.duration)
            .set(item.DOM.el, {
                zIndex: this.expanded === -1 ? 1 : 999
            }, this.expanded === -1 ? 'end' : 'start')

        if (this.options.skew) {
            this.tl.to(item.DOM.el, {
                duration: this.options.duration * .4,
                ease: 'sine.in',
                scale: 1 + (this.options.scale - 1) / 2,
                skewX: this.expanded === -1 ? -1 * this.options.skew : this.options.skew,
                skewY: this.expanded === -1 ? -1 * this.options.skew : this.options.skew,
                x: 0,
                y: 0,
                rotation: 0,
            }, 'start')
                .to(item.DOM.el, {
                    duration: this.options.duration * .6,
                    ease: 'power4',
                    scale: this.expanded === -1 ? 1 : this.options.scale,
                    skewX: 0,
                    skewY: 0,
                }, `start+=${this.options.duration * .4}`)
        } else {
            this.tl.to(item.DOM.el, {
                scale: this.expanded === -1 ? 1 : this.options.scale,
                x: 0,
                y: 0,
                rotation: 0,
            }, 'start');
        }

        // Close previous one
        if (this.previousExpanded !== -1) {
            const prevItem = this.items[this.previousExpanded];
            const delay = 0//map(getDistance(prevItem.DOM.el, item.DOM.el), 0, 1500, 0, 0.2);

            this.tl
                .set(prevItem.DOM.el, {
                    zIndex: 1,
                    delay: delay,
                }, 'start')
                .to(prevItem.DOM.el, {
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    delay: delay,
                }, 'start');
        }

        // All items except the clicked one
        const filteredArray = this.items.filter(otherItem => otherItem != item);

        for (let otherItem of filteredArray) {

            const { x, y } = this.expanded === -1 ? { x: 0, y: 0 } : getTranslationDistance(otherItem.DOM.el, item.DOM.el, this.options.spread, this.options.maxDistance);
            const delay = 0//this.expanded === -1 ? 0 : map(getDistance(otherItem.DOM.el, item.DOM.el), 0, 1500, 0, 0.2);

            const zIndex = Math.round(map(getDistance(otherItem.DOM.el, item.DOM.el), 0, 100000, 998, 1));

            const rotationInterval = this.options.maxRotation ? Math.max(Math.round(map(getDistance(otherItem.DOM.el, item.DOM.el), 0, 500, this.options.maxRotation, 0)), 0) : 0;

            this.tl
                .set(otherItem.DOM.el, {
                    zIndex: this.expanded === -1 ? 1 : zIndex,
                    delay: delay,
                }, this.expanded === -1 ? 'end' : 'start')
                .to(otherItem.DOM.el, {
                    x: x,
                    y: y,
                    rotation: this.expanded === -1 ? 0 : gsap.utils.random(rotationInterval * -1, rotationInterval),
                    delay: delay,
                }, 'start');

        }
    }
}

[...document.querySelectorAll("" + grid + "")].forEach(grid => new SpreadGrid(grid));

/* THIRD, FOURTH CARDS END */

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
            ease: 'none',
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
            ease: 'none',
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
            gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
        }
    }
});

let sixthAnimation = gsap.set(".sixth-card", { transformOrigin: "right center", force3D: true });

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
            backgroundSize: "100%",
            stagger: 0.15
        }),
        onLeaveBack: batch => gsap.to(batch, {
            opacity: 0,
            y: 100,
            backgroundSize: "0%",
            stagger: 0.1
        })
    });

    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".seventh-cards--item", {
        y: 0,
        backgroundSize: "0%"
    }));

});
/* SEVENTH CARDS SCROLL ANIMATION END */

/* EIGHTH CARDS SCROLL ANIMATION START */
document.getElementById("eighth-cards__list").onmousemove = e => {
    for (const card of document.getElementsByClassName("eighth-cards__item")) {
        const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };
}
/* EIGHTH CARDS SCROLL ANIMATION END */

/* TWELFTH CAEDS DRAGGABLE ANIMATION START */

gsap.registerPlugin(Draggable);

let container = document.querySelector(".twelfth-cards__list");
let containerItems = document.querySelector(".twelfth-card__item");
let listItems = gsap.utils.toArray(".twelfth-card__item");

const containerWidth = container.offsetWidth;
const containerItemsWidth = containerItems.offsetWidth;

const twelfthItemWidthResult = (containerWidth - containerItemsWidth * 2 - 2);

const containerHeight = container.offsetHeight;
const containerItemsHeight = containerItems.offsetHeight;
const secondElementLength = containerItems.length;

const twelfthItemHeightResult = (containerHeight - containerItemsHeight * (secondElementLength / 3) - secondElementLength);

console.log(twelfthItemHeightResult)
console.log(twelfthItemWidthResult)


let rowSize = twelfthItemHeightResult;
let colSize = twelfthItemWidthResult;
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

let sortables = listItems.map(Sortable); // Array of sortables
let total = sortables.length;

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

    let content = element.querySelector(".twelfth-card__item-content");
    let order = element.querySelector(".twelfth-card__item-number");

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
        cell: cells[index],
        dragger: dragger,
        element: element,
        index: index,
        setIndex: setIndex
    };

    gsap.set(element, {
        x: sortable.cell.x,
        y: sortable.cell.y,
    });

    function setIndex(index) {

        let cell = cells[index];
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

/* TWELFTH CAEDS DRAGGABLE ANIMATION END */
}