const leftEyeTop = '-164px';
const leftEyeRight = '-90px';
const rightEyeTop = '-148px';
const rightEyeRight = '-12px';

const anchor = document.getElementById('anchor');
const rect = anchor.getBoundingClientRect();
const anchorX = (rect.x + rect.width / 2) + 27;
const anchorY = rect.y + 120;


document.addEventListener('mousemove', (ev) => {
    const eyes = document.querySelectorAll('.eye');
    if (!isEventInElement(ev, anchor)) {
        if (eyes[0].style.transform) {
            eyes[0].style.transform = '';
            eyes[0].style.top = leftEyeTop;
            eyes[0].style.right = leftEyeRight;
            eyes[1].style.transform = '';
            eyes[1].style.top = rightEyeTop;
            eyes[1].style.right = rightEyeRight;
            laserLeft.children[0].setAttribute('x2', laserLeft.children[0].getAttribute('x1'));
            laserLeft.children[0].setAttribute('y2', laserLeft.children[0].getAttribute('y1'));
        }
        return;
    };
    const mouseX = ev.clientX;
    const mouseY = ev.clientY;

    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
    const dist = distance(mouseX, mouseY, anchorX, anchorY);
    const maxDist = 30;
    const possibleDist = 500;
    // console.log(dist);


    eyes.forEach(eye => {
        eye.style.transform = `rotate(${angleDeg}deg) translate(${maxDist * (dist / possibleDist)}px)`;
    });
})

const isEventInElement = (event, element) => {
    var rect = element.getBoundingClientRect();
    var x = event.clientX;
    if (x < rect.left || x >= rect.right) return false;
    var y = event.clientY;
    if (y < rect.top || y >= rect.bottom) return false;
    return true;
}

const angle = (cx, cy, ex, ey) => {
    const dy = ey - cy;
    const dx = cx - ex;
    const rad = Math.atan2(dy, dx);
    const deg = rad * 180 / Math.PI;
    return -deg;
}

const distance = (toX, toY, fromX, fromY) => {
    const distX = toX - fromX;
    const distY = toY - fromY;
    const hypot = Math.sqrt(distX * distX + distY * distY);
    return hypot;
}