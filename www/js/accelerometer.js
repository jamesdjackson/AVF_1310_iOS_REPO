/**
 * Created by jamesjackson on 10/23/13.
 */

var canvas;
var context;
var ball;

var prevX =150;
var prevY =150;
var offSet =0.05;

var accelTimer;

function omAcclerometerLoad() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    ball = document.getElementById('ball');
    ball.onload = function() {
        var options = { frequency: 100 };
        accelTimer =
            navigator.accelerometer.watchAcceleration(moveBall, stopBall, options);
    };
    ball.src = "images/ball.png";
}

function moveBall (acceleration) {
    var x = acceleration.x * 100;
    var y = acceleration.y * 100;

    var newX = x * offSet + (1 - offSet) * prevX;
    var newY = y * offSet + (1 - offSet) * prevY;

    prevX = newX;
    prevY = newY;

    drawImage (newX, newY);
}

function stopBall (error) {
    navigator.accelerometer.clearWatch(accelTimer);

    alert("Cannot retireve acceleration data!")
}

function drawImage (x, y) {
    context.clearRect(0, 0, 350, 350);
    context.drawImage(ball, 0, 0, 100, 81, x, y, 100, 81);
}

