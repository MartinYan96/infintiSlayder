let slider = document.querySelector('.slider'),
    sliderTrack = document.querySelector('.slides'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next');
let sliderInterval


let posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    slides = sliderTrack.querySelectorAll('.slide'),
    slidesLength = slides.length,
    slideSize = sliderTrack.querySelector('.slide').offsetWidth,
    firstSlide = slides[0],
    slide1 = slides[1],
    slide2 = slides[2],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneSlide1 = slide1.cloneNode(true),
    cloneSlide2 = slide2.cloneNode(true),
    cloneLastSlide = lastSlide.cloneNode(true),
    index = 0,
    interval = 2000
let allowShift = true;

// Clone first and last slide
sliderTrack.appendChild(cloneFirst);
sliderTrack.appendChild(cloneSlide1);
sliderTrack.appendChild(cloneSlide2);
sliderTrack.insertBefore(cloneLastSlide, firstSlide);

// Mouse events
sliderTrack.addEventListener('mousedown', dragStart);

// Touch events
sliderTrack.addEventListener('touchstart', dragStart);
sliderTrack.addEventListener('touchend', dragEnd);
sliderTrack.addEventListener('touchmove', dragAction);

// Click events
prev.addEventListener('click', function () { shiftSlide(-1) });
next.addEventListener('click', function () { shiftSlide(1) });

// Transition events
sliderTrack.addEventListener('transitionend', checkIndex);

function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = sliderTrack.offsetLeft;

    if (e.type == 'touchstart') {
        posX1 = e.touches[0].clientX;
    } else {
        posX1 = e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
    }
}

function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
    } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
    }
    sliderTrack.style.left = (sliderTrack.offsetLeft - posX2) + "px";
}

function dragEnd(e) {
    posFinal = sliderTrack.offsetLeft;
    if (posFinal - posInitial < -threshold) {
        shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
        shiftSlide(-1, 'drag');
    } else {
        sliderTrack.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
}
function shiftSlide(dir, action) {
    sliderTrack.classList.add('shifting');

    if (allowShift) {
        if (!action) { posInitial = sliderTrack.offsetLeft; }

        if (dir == 1) {
            sliderTrack.style.left = (posInitial - slideSize) + "px";
            index++;
        } else if (dir == -1) {
            sliderTrack.style.left = (posInitial + slideSize) + "px";
            index--;
        }
    };

    allowShift = false;
}

function checkIndex() {
    sliderTrack.classList.remove('shifting');

    if (index == -1) {
        sliderTrack.style.left = -(slidesLength * slideSize) + "px";
        index = slidesLength - 1;
    }

    if (index == slidesLength) {
        sliderTrack.style.left = -(1 * slideSize) + "px";
        index = 0;
    }

    allowShift = true;
}

const sliderAutoNext = () => {
    sliderInterval = setInterval(() => {

        shiftSlide(1)
    }, interval);
}
sliderAutoNext()

// mouse events 
slider.addEventListener('mousemove', () => {
    clearInterval(sliderInterval)
})
slider.addEventListener('touchstart', () => {
    clearInterval(sliderInterval)
})
slider.addEventListener('touchmove', () => {
    clearInterval(sliderInterval)
})

slider.addEventListener('touchcancel', sliderAutoNext)
slider.addEventListener('mouseleave', sliderAutoNext)
