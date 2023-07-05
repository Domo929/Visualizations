let theta = 0;
let dt = 0.025;

let r = 100;

let w = 1500;
let h = 500;

let spacing = w / 2;

let points = [];
let slider;
let radio;

let func = forwardSawtoothFunc;

const step = "Step";
const forwardSawtooth = "Forward Sawtooth";

function setup() {
  createCanvas(w, h);
  background(0);

  slider = createSlider(1, 100, 5);

  radio = createRadio();

  radio.option(step);
  radio.option(forwardSawtooth);

  radio.selected(step);
}

function draw() {
  clear();
  background(0);
  stroke(255);
  strokeWeight(1);

  let func;
  switch (radio.value()) {
    case step:
      func = stepFunc;
      break;
    case forwardSawtooth:
      func = forwardSawtoothFunc;
      break;
    default:
      throw "illegal switch";
  }

  translate(spacing / 2, h / 2);

  let start_pt = { x: 0, y: 0 };
  let pt;

  for (let term = 0; term < slider.value(); term++) {
    pt = func(start_pt, theta, term);

    stroke(255, 100);
    strokeWeight(1);
    circle(start_pt.x, start_pt.y, pt.mag * r * 2);

    stroke(255);
    strokeWeight(5);
    point(pt.x, pt.y);
    strokeWeight(1);
    line(start_pt.x, start_pt.y, pt.x, pt.y);

    start_pt = pt;
  }

  points.unshift(pt);

  translate(spacing, 0);

  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(i, points[i].y);
  }
  endShape();

  stroke(255, 100);
  line(0, pt.y, pt.x - spacing, pt.y);

  theta = (theta + dt) % (2 * PI);
  if (points.length > 500) {
    points.pop();
  }
}

function stepFunc(start_pt, angle, term) {
  let n = term * 2 + 1;

  let mag = 4 / (n * PI);

  let x = r * mag * cos(n * theta) + start_pt.x;
  let y = r * mag * sin(n * theta) + start_pt.y;

  return { x, y, mag };
}

function forwardSawtoothFunc(start_pt, angle, term) {
  let n = 1 * term + 1;

  let mag = 2 / (n * PI);
  if (term % 2 === 1) {
    mag *= -1;
  }

  let x = r * mag * cos(n * angle) + start_pt.x;
  let y = r * mag * sin(n * angle) + start_pt.y;

  return { x, y, mag };
}
