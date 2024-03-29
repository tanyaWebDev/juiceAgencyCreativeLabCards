/*import * as THREE from 'three';
import { TWEEN } from 'three/addons/libs/tween.module.min.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'; */

$(document).ready(init);
function init() {
  const mediaQueryDesktop = window.matchMedia("(min-width: 992px)");
  const mediaQueryTablet = window.matchMedia("(max-width: 991px)");
  const mediaQueryHorizontalMobile = window.matchMedia("(max-width: 767px)");

  /* FIRST CARDS MOBILE START */

  $(".first-accordion_item").removeClass("active");
  if (mediaQueryTablet.matches) {
    $(".first-cards-accordion_content-wrap").slideUp();
    $(".project-link").slideUp();
  }

  $(".first-accordion_item").click(function () {
    if (mediaQueryTablet.matches) {
      $(this).toggleClass("active");
      $(this).find(".project-link").slideDown();
      $(this)
        .find(".first-cards-accordion_content-wrap")
        .stop()
        .slideToggle(600);
      $(this).siblings(".first-accordion_item").find(".project-link").slideUp();
      $(this)
        .siblings(".first-accordion_item")
        .find(".first-cards-accordion_content-wrap")
        .stop()
        .slideUp(600);
      $(this).siblings(".first-accordion_item").removeClass("active");
    }
  });

  $(window).resize(function () {
    if (mediaQueryTablet.matches) {
      if ($(".first-accordion_item.active").length > 0) {
      } else {
        $(".first-cards-accordion_content-wrap").slideUp();
        $(".project-link").slideUp();
      }
    } else {
      $(".first-accordion_item").removeClass("active");
      $(".first-cards-accordion_content-wrap").slideDown();
      $(".project-link").slideDown();
    }
  });

  /* FIRST CARDS MOBILE END */

  /* SECOND CARDS SCROLL ANIMATION START */

  const scrollSection = $(".second-cards-section");
  const scrollItems = $(".second-cards-item");
  function scrollSectionHeight() {
    if (mediaQueryHorizontalMobile.matches) {
      scrollSection.css("height", "auto");
    } else {
      scrollSection.css("height", 100 * scrollItems.length + "vh");
    }
  }
  scrollSectionHeight();

  $(window).resize(function () {
    scrollSectionHeight();
  });

  let scrollElemWrapper = $(".second-cards-wrapper"),
    mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    let specializedServicesScroll = gsap.to(scrollElemWrapper, {
      x: () =>
        -(
          (scrollItems.length - 1) * scrollItems.outerWidth(true) +
          $(".second-cards-item:last").outerWidth(true) -
          $(".second-cards-container").width()
        ),
      scrollTrigger: {
        trigger: scrollSection,
        start: "top top",
        end: "bottom bottom",
        ease: "none",
        duration: 1000,
        invalidateOnRefresh: true,
        scrub: true,
      },
    });
  });

  /* SECOND CARDS SCROLL ANIMATION END */

  /* THIRD, FOURTH CARDS START */
  //see grid attributes to change animation

  let grid = ".gsap-grid";
  let gridItem = ".gsap-card";
  let gridImagewrapper = ".gsap-img-anim";

  const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

  const getTranslationDistance = (
    element1,
    element2,
    spread = 80,
    maxDistance = 500
  ) => {
    const elCenter = {
      x: element1.offsetLeft + element1.offsetWidth / 2,
      y: element1.offsetTop + element1.offsetHeight / 2,
    };
    const elCenter2 = {
      x: element2.offsetLeft + element2.offsetWidth / 2,
      y: element2.offsetTop + element2.offsetHeight / 2,
    };

    spread = Math.max(
      map(getDistance(element1, element2), 0, maxDistance, spread, 0),
      0
    );

    const angle = Math.atan2(
      Math.abs(elCenter2.y - elCenter.y),
      Math.abs(elCenter2.x - elCenter.x)
    );

    let x = Math.abs(Math.cos(angle) * spread);
    let y = Math.abs(Math.sin(angle) * spread);

    return {
      x: elCenter.x < elCenter2.x ? x * -1 : x,
      y: elCenter.y < elCenter2.y ? y * -1 : y,
    };
  };

  const getDistance = (element1, element2) => {
    const elCenter = {
      x: element1.offsetLeft + element1.offsetWidth / 2,
      y: element1.offsetTop + element1.offsetHeight / 2,
    };
    const elCenter2 = {
      x: element2.offsetLeft + element2.offsetWidth / 2,
      y: element2.offsetTop + element2.offsetHeight / 2,
    };
    return Math.hypot(elCenter.x - elCenter2.x, elCenter.y - elCenter2.y);
  };

  class Item {
    DOM = {
      el: null,
      image: null,
    };

    constructor(DOM_el) {
      this.DOM.el = DOM_el;
      this.DOM.image = this.DOM.el.querySelector("" + gridImagewrapper + "");
    }
  }

  class SpreadGrid {
    DOM = {
      el: null,
      items: null,
    };

    expanded = -1;
    previousExpanded = -1;

    constructor(DOM_el) {
      this.DOM.el = DOM_el;
      this.DOM.items = [...this.DOM.el.querySelectorAll("" + gridItem + "")];
      this.items = [];
      this.DOM.items.forEach((item) => this.items.push(new Item(item)));

      // Options passed in data attributes and defaults.
      this.options = {};
      this.options.duration = Number(this.DOM.el.dataset.duration) || 0.8;
      this.options.ease = this.DOM.el.dataset.ease || "power4";
      this.options.scale = Number(this.DOM.el.dataset.scale) || 2;
      this.options.skew = Number(this.DOM.el.dataset.skew) || 0;
      this.options.maxRotation = Number(this.DOM.el.dataset.maxRotation) || 0;
      this.options.spread = Number(this.DOM.el.dataset.spread) || 80;
      this.options.maxDistance = Number(this.DOM.el.dataset.maxDistance) || 500;

      this.initEvents();
    }

    initEvents() {
      for (const item of this.items) {
        item.DOM.el.addEventListener("click", () => this.expand(item));
      }
    }

    expand(item) {
      if (this.tl) {
        this.tl.kill();
      }

      const itemIdx = this.items.indexOf(item);

      this.previousExpanded =
        this.expanded !== -1 && this.expanded !== itemIdx ? this.expanded : -1;
      this.expanded = this.expanded === itemIdx ? -1 : itemIdx;

      this.tl = gsap
        .timeline({
          defaults: {
            duration: this.options.duration,
            ease: this.options.ease,
          },
        })
        .addLabel("start", 0)
        .addLabel("end", this.options.duration)
        .set(
          item.DOM.el,
          {
            zIndex: this.expanded === -1 ? 1 : 999,
          },
          this.expanded === -1 ? "end" : "start"
        );

      if (this.options.skew) {
        this.tl
          .to(
            item.DOM.el,
            {
              duration: this.options.duration * 0.4,
              ease: "sine.in",
              scale: 1 + (this.options.scale - 1) / 2,
              skewX:
                this.expanded === -1
                  ? -1 * this.options.skew
                  : this.options.skew,
              skewY:
                this.expanded === -1
                  ? -1 * this.options.skew
                  : this.options.skew,
              x: 0,
              y: 0,
              rotation: 0,
            },
            "start"
          )
          .to(
            item.DOM.el,
            {
              duration: this.options.duration * 0.6,
              ease: "power4",
              scale: this.expanded === -1 ? 1 : this.options.scale,
              skewX: 0,
              skewY: 0,
            },
            `start+=${this.options.duration * 0.4}`
          );
      } else {
        this.tl.to(
          item.DOM.el,
          {
            scale: this.expanded === -1 ? 1 : this.options.scale,
            x: 0,
            y: 0,
            rotation: 0,
          },
          "start"
        );
      }

      // Close previous one
      if (this.previousExpanded !== -1) {
        const prevItem = this.items[this.previousExpanded];
        const delay = 0; //map(getDistance(prevItem.DOM.el, item.DOM.el), 0, 1500, 0, 0.2);

        this.tl
          .set(
            prevItem.DOM.el,
            {
              zIndex: 1,
              delay: delay,
            },
            "start"
          )
          .to(
            prevItem.DOM.el,
            {
              scale: 1,
              x: 0,
              y: 0,
              rotation: 0,
              delay: delay,
            },
            "start"
          );
      }

      // All items except the clicked one
      const filteredArray = this.items.filter((otherItem) => otherItem != item);

      for (let otherItem of filteredArray) {
        const { x, y } =
          this.expanded === -1
            ? { x: 0, y: 0 }
            : getTranslationDistance(
                otherItem.DOM.el,
                item.DOM.el,
                this.options.spread,
                this.options.maxDistance
              );
        const delay = 0; //this.expanded === -1 ? 0 : map(getDistance(otherItem.DOM.el, item.DOM.el), 0, 1500, 0, 0.2);

        const zIndex = Math.round(
          map(getDistance(otherItem.DOM.el, item.DOM.el), 0, 100000, 998, 1)
        );

        const rotationInterval = this.options.maxRotation
          ? Math.max(
              Math.round(
                map(
                  getDistance(otherItem.DOM.el, item.DOM.el),
                  0,
                  500,
                  this.options.maxRotation,
                  0
                )
              ),
              0
            )
          : 0;

        this.tl
          .set(
            otherItem.DOM.el,
            {
              zIndex: this.expanded === -1 ? 1 : zIndex,
              delay: delay,
            },
            this.expanded === -1 ? "end" : "start"
          )
          .to(
            otherItem.DOM.el,
            {
              x: x,
              y: y,
              rotation:
                this.expanded === -1
                  ? 0
                  : gsap.utils.random(rotationInterval * -1, rotationInterval),
              delay: delay,
            },
            "start"
          );
      }
    }
  }

  [...document.querySelectorAll("" + grid + "")].forEach(
    (grid) => new SpreadGrid(grid)
  );

  /* THIRD, FOURTH CARDS END */

  /* FIFTH CARDS SCROLL ANIMATION START */

  let fifthCardsEven = $(".fifth-cards-item:nth-child(even)"),
    fifthCardsOdd = $(".fifth-cards-item:nth-child(odd)"),
    fifthCardsScrollTrigger = $("#fifth-cards-scroll-trigger");

  mm.add("(min-width: 768px)", () => {
    let scrollParallaxEvenCards = gsap.to(fifthCardsEven, {
      y: "3rem",
      scrollTrigger: {
        trigger: fifthCardsScrollTrigger,
        start: "top bottom",
        end: "bottom top",
        ease: "none",
        duration: 1000,
        invalidateOnRefresh: true,
        scrub: true,
      },
    });

    let scrollParallaxOddCards = gsap.to(fifthCardsOdd, {
      y: "-1rem",
      scrollTrigger: {
        trigger: fifthCardsScrollTrigger,
        start: "top bottom",
        end: "bottom top",
        ease: "none",
        duration: 1000,
        invalidateOnRefresh: true,
        scrub: true,
      },
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
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: "power3",
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        });
      }
    },
  });

  let sixthAnimation = gsap.set(".sixth-card", {
    transformOrigin: "right center",
    force3D: true,
  });

  /* SIXTH CARDS SCROLL ANIMATION END */

  /* SEVENTH CARDS SCROLL ANIMATION START */

  mm.add("(min-width: 768px)", () => {
    gsap.defaults({
      ease: "power3",
    });

    gsap.set(".seventh-cards--item", {
      y: 100,
    });

    ScrollTrigger.batch(".seventh-cards--item", {
      start: "top bottom-=100px",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          backgroundSize: "100%",
          stagger: 0.15,
        }),
      onLeaveBack: (batch) =>
        gsap.to(batch, {
          opacity: 0,
          y: 100,
          backgroundSize: "0%",
          stagger: 0.1,
        }),
    });

    ScrollTrigger.addEventListener("refreshInit", () =>
      gsap.set(".seventh-cards--item", {
        y: 0,
        backgroundSize: "0%",
      })
    );
  });
  /* SEVENTH CARDS SCROLL ANIMATION END */

  /* EIGHTH CARDS SCROLL ANIMATION START */
  document.getElementById("eighth-cards__list").onmousemove = (e) => {
    for (const card of document.getElementsByClassName("eighth-cards__item")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };
  /* EIGHTH CARDS SCROLL ANIMATION END */

  /* TWELFTH CAEDS DRAGGABLE ANIMATION START */

  gsap.registerPlugin(Draggable);

  let totalRows = 3;
  let gap = 16;
  let rowSize =
    document.querySelector(".twelfth-cards__list").offsetWidth / totalRows;
  let totalCols = Math.floor(
    document.querySelectorAll(".twelfth-card__item").length / totalRows
  );
  let containerHeight =
    document.querySelector(".twelfth-card__item").offsetHeight * totalCols +
    gap * (totalRows - 1) +
    "px";
  document.querySelector(".twelfth-cards__list").style.height = containerHeight;
  let colSize =
    document.querySelector(".twelfth-cards__list").offsetWidth / totalCols;
  let container = document.querySelector(".twelfth-cards__list");
  let listItems = gsap.utils.toArray(".twelfth-card__item");

  let clampCol = gsap.utils.clamp(0, totalCols - 1);
  let clampRow = gsap.utils.clamp(0, totalRows - 1);

  let cells = [];

  // Map cell locations to array
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      cells.push({
        row: row,
        col: col,
        x:
          col *
          (document.querySelector(".twelfth-cards__list").offsetWidth /
            totalRows),
        y:
          row *
          ((document.querySelector(".twelfth-cards__list").offsetHeight + gap) /
            totalRows),
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
    sortables.forEach((sortable) => container.appendChild(sortable.element));

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
      paused: true,
    });

    let dragger = new Draggable(element, {
      onDragStart: downAction,
      onRelease: upAction,
      onDrag: dragAction,
      cursor: "inherit",
    });

    // let position = element._gsTransform;
    let getProp = gsap.getProperty(element);

    // Public properties and methods
    let sortable = {
      cell: cells[index],
      dragger: dragger,
      element: element,
      index: index,
      setIndex: setIndex,
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
        y: sortable.cell.y,
      });
    }

    return sortable;
  }

  // Changes an elements's position in array
  function arrayMove(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

  /* TWELFTH CAEDS DRAGGABLE ANIMATION END */

  /* THIRTEENTH CARDS 3D ANIMATION START */

  var shouldRunAnimation = true;
  var thirteenthCard,
    thirteenthCardContent,
    thirteenthCards,
    dragDistancePerRotation,
    thirteenthRadius,
    thirteenthDiv,
    thirteenthProgressWrap,
    thirteenthSpin,
    startProgress;

  window.addEventListener("resize", applyLayout);
  applyLayout();

  function applyLayout() {
    if (screen.width >= 992) {
      // Initialize animation and draggable functionality for the cards
      if (!thirteenthCards) {
        shouldRunAnimation = true;
        thirteenthCard = document.querySelector(".thirteenth-cards__list");
        thirteenthCardContent = document.querySelector(".three-d-card");
        thirteenthCard.style.height =
          Math.ceil((thirteenthCardContent.offsetHeight / 3) * 2) + "px";
        thirteenthCard.style.marginBottom =
          Math.ceil(thirteenthCardContent.offsetHeight / 3) + "px";

        thirteenthCards = gsap.utils.toArray(".three-d-card");
        dragDistancePerRotation = 3000;
        thirteenthRadius = 520;
        thirteenthDiv = document.createElement("div");
        thirteenthProgressWrap = gsap.utils.wrap(0, 1);
        thirteenthSpin = gsap.fromTo(
          thirteenthCards,
          {
            rotationY: (i) => (i * 360) / thirteenthCards.length,
          },
          {
            rotationY: "-=360",
            duration: 40,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50% " + -thirteenthRadius + "px",
          }
        );
        startProgress = 0;
        Draggable.create(thirteenthDiv, {
          trigger: ".thirteenth-cards__list",
          type: "x",
          onPress() {
            gsap.killTweensOf(thirteenthSpin);
            thirteenthSpin.timeScale(0);
            startProgress = thirteenthSpin.progress();
          },
          onDrag: updateRotation,
          onRelease() {
            gsap.to(thirteenthSpin, {
              timeScale: 1,
              duration: 1,
            });
          },
        });
      }
    } else {
      shouldRunAnimation = false;
      // Remove animation and draggable functionality for the cards
      if (thirteenthCards) {
        gsap.killTweensOf(thirteenthSpin);
        thirteenthSpin.timeScale(0);
        startProgress = thirteenthSpin.progress();
        thirteenthSpin = null;
        thirteenthCards = null;
        thirteenthDiv = null;
        thirteenthProgressWrap = null;
      }
    }
  }

  function updateRotation() {
    let p = startProgress + (this.startX - this.x) / dragDistancePerRotation;
    thirteenthSpin.progress(thirteenthProgressWrap(p));
  }

  /* THIRTEENTH CARDS 3D ANIMATION END */

  /* FOURTEENTH CARDS ANIMATION START */

  const table = document.querySelectorAll(".fourteenth-card__item");

  let camera, scene, renderer;
  let controls;

  const objects = [];
  const targets = { table: [], grid: [] };

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 3000;

    scene = new THREE.Scene();

    // table

    for (let i = 0; i < table.length; i += 5) {
      const element = document.createElement("div");
      element.className = "element";
      element.style.backgroundColor =
        "rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")";

      const number = document.createElement("div");
      number.className = "number";
      number.textContent = i / 5 + 1;
      element.appendChild(number);

      const symbol = document.createElement("div");
      symbol.className = "symbol";
      symbol.textContent = table[i];
      element.appendChild(symbol);

      const details = document.createElement("div");
      details.className = "details";
      details.innerHTML = table[i + 1] + "<br>" + table[i + 2];
      element.appendChild(details);

      const objectCSS = new CSS3DObject(element);
      objectCSS.position.x = Math.random() * 4000 - 2000;
      objectCSS.position.y = Math.random() * 4000 - 2000;
      objectCSS.position.z = Math.random() * 4000 - 2000;
      scene.add(objectCSS);

      objects.push(objectCSS);

      //

      const object = new THREE.Object3D();
      object.position.x = table[i + 3] * 140 - 1330;
      object.position.y = -(table[i + 4] * 180) + 990;

      targets.table.push(object);
    }

    // grid

    for (let i = 0; i < objects.length; i++) {
      const object = new THREE.Object3D();

      object.position.x = (i % 5) * 400 - 800;
      object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
      object.position.z = Math.floor(i / 25) * 1000 - 2000;

      targets.grid.push(object);
    }

    //

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .getElementById("fourteenth-cards__list")
      .appendChild(renderer.domElement);

    //

    controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener("change", render);

    const buttonTable = document.getElementById("table");
    buttonTable.addEventListener("click", function () {
      transform(targets.table, 2000);
    });

    const buttonGrid = document.getElementById("grid");
    buttonGrid.addEventListener("click", function () {
      transform(targets.grid, 2000);
    });

    transform(targets.table, 2000);

    //

    window.addEventListener("resize", onWindowResize);
  }

  function transform(targets, duration) {
    TWEEN.removeAll();

    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      const target = targets[i];

      new TWEEN.Tween(object.position)
        .to(
          { x: target.position.x, y: target.position.y, z: target.position.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

      new TWEEN.Tween(object.rotation)
        .to(
          { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    }

    new TWEEN.Tween(this)
      .to({}, duration * 2)
      .onUpdate(render)
      .start();
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
  }

  function animate() {
    requestAnimationFrame(animate);

    TWEEN.update();

    controls.update();
  }

  function render() {
    renderer.render(scene, camera);
  }

  /* FOURTEENTH CARDS ANIMATION END */
}
