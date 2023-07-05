let width = 2000;
let height = 1250;

let deg;
let max_gen;
let start_len;

let len_ratio;
let c;

function setup() {
    c = createCanvas(width, height);
    background(255);
    fill(255);
    angleMode(DEGREES);

    deg = 30;
    max_gen = 15;

    start_len = 300;
    let start_thickness = max_gen / 2;

    len_ratio = 0.75;

    fractal_gen(width / 2, height, start_len, 90, start_thickness, 0)
}

function draw() {
}

function fractal_gen(x, y, len, ang, thickness, gen) {
    // if we reach max_gen, we're done
    if (gen === max_gen) {
        return;
    }

    // draw our line outward
    let x2 = x + len * cos(ang);
    // negative because our canvas origin is top left
    let y2 = y - len * sin(ang);

    strokeWeight(floor(thickness));
    line(x, y, x2, y2);

    //call our function again for the left child
    fractal_gen(x2, y2, len * len_ratio, ang + deg, thickness - 0.5, gen + 1);

    //call our function again for the right child
    fractal_gen(x2, y2, len * len_ratio, ang - deg, thickness - 0.5, gen + 1);
}

function filename() {
    return "fractal_tree_" + deg + "_" + max_gen + "_" + start_len + "_" + len_ratio;
}

function keyTyped() {
    if (key === 's') {
        saveCanvas(c, filename(), 'png');
    }
}
