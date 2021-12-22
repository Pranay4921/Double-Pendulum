let L1 = 75; L2 = 75;
let m1 = 2; m2 = 2; g = 9.81;
let theta1 = 1.5 * 3.1415926; theta2 = 0;
let omega1 = 0; omega2 = 0;
let dt = 0.01;


function f_fun(t1, t2, o1, o2) {
    temp1 = g * (2 * m1 + m2) * sin(t1);
    temp2 = m2 * g * sin(t1 - 2 * t2);
    temp3 = 2 * sin(t1 - t2) * m2 * (o2 * o2 * L2 + o1 * o1 * L1 * cos(t1 - t2));
    temp4 = 2 * m1 + m2 - m2 * cos(2 * t1 - 2 * t2);
    return -(temp1 + temp2 + temp3) / (L1 * temp4);
}

function g_fun(t1, t2, o1, o2) {
    temp1 = o1 * o1 * L1 * (m1 + m2);
    temp2 = g * (m1 + m2) * cos(t1);
    temp3 = o2 * o2 * L2 * m2 * cos(t1 - t2);
    temp4 = 2 * m1 + m2 - m2 * cos(2 * t1 - 2 * t2);
    return 2 * sin(t1 - t2) * (temp1 + temp2 + temp3) / (L2 * temp4);
}

function setup() {
    createCanvas(800, 400);

}

function draw() {
    fill(200);
    let mar = width / 100;
    rect(0, 0, width / 2, height);
    line(width / 2 + mar, height - mar, width - mar, height - mar);
    line(width / 2 + mar, height - mar, width / 2 + mar, mar);
    fill(0)
    text('theta1', width - 5 * mar, height);
    text('theta2', width / 2 + mar, mar);

    //For Left Half
    x1 = width / 4 + L1 * sin(theta1);
    y1 = height / 2 + L1 * cos(theta1);
    x2 = x1 + L2 * sin(theta2);
    y2 = y1 + L2 * cos(theta2);
    line(width / 4, height / 2, x1, y1);
    line(x1, y1, x2, y2);
    fill(0);
    circle(x1, y1, width / 100);
    circle(x2, y2, width / 100);

    //For Right Half
    the1 = theta1;
    the2 = theta2;
    if (the1 > 2 * PI) {
        the1 = the1 - 2 * PI;
    }
    if (the1 < 0) {
        the1 = the1 + 2 * PI;
    }
    if (the2 > 2 * PI) {
        the2 = the2 - 2 * PI;
    }
    if (the2 < 0) {
        the2 = the2 + 2 * PI;
    }
    let x_theta1 = width / 2 + mar + ((width / 2 - 2 * mar) / 7) * the1;
    let y_theta1 = height - mar - ((height - 2 * mar) / 7) * the2;
    circle(x_theta1, y_theta1, height / 200);


    //Euler Method
    tem1 = theta1 + dt * omega1;
    tem2 = theta2 + dt * omega2;
    tem3 = omega1 + dt * f_fun(theta1, theta2, omega1, omega2);
    tem4 = omega2 + dt * g_fun(theta1, theta2, omega1, omega2);
    theta1 = tem1;
    theta2 = tem2;
    omega1 = tem3;
    omega2 = tem4;

}