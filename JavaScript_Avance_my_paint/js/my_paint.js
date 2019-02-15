var ctxb;
var canvasBack;
var canvasHeight;
canvasBack = document.getElementById("back-canvas");
ctxb = canvasBack.getContext("2d");

var canvasWidth = document.getElementById("canvas-width");
canvasHeight = document.getElementById("canvas-height");

var canvasPosition;

var i;

var mouseX;
var mouseY;
var mouseXl;
var mouseYl;
mouseXl = document.getElementById("mouseX");
mouseYl = document.getElementById("mouseY");

var tools = [];
var sizes = [];
var circleSize;
var properties;
var startY;
var lineSize;

tools.pencil = document.getElementById("pencil");
tools.eraser = document.getElementById("eraser");
tools.circle = document.getElementById("circle");
tools.circle_fill = document.getElementById("circle_fill");
tools.rect = document.getElementById("rect");
tools.rect_fill = document.getElementById("rect_fill");
tools.line = document.getElementById("line");

sizes.small = document.getElementById("small");
sizes.middle = document.getElementById("middle");
sizes.big = document.getElementById("big");

var eraserSize = 8;
circleSize = 8;

var canvasClear = document.getElementById("clear-canvas");
properties = document.getElementById("properties");

var startX = 100;
startY = 100;

window.onload = function () {
    "use strict";
    canvasPosition = canvasBack.getBoundingClientRect();
};

canvasWidth.onchange = function () {
    "use strict";
    canvasBack.width = canvasWidth.value;
};

canvasHeight.onchange = function () {
    "use strict";
    canvasBack.height = canvasHeight.value;
};

canvasBack.onmousemove = function (e) {
    "use strict";
    mouseX = e.clientX - canvasPosition.left;
    mouseY = e.clientY - canvasPosition.top;
    mouseXl.innerHTML = mouseX;
    mouseYl.innerHTML = mouseY;
};

canvasClear.onclick = function () {
    "use strict";
    canvasBack.width = canvasBack.width;
};

sizes.small.onclick = function () {
    "use strict";
    ctxb.lineWidth = 1;
    eraserSize = 8;
    circleSize = 8;
    lineSize = 8;

};

sizes.middle.onclick = function () {
    "use strict";
    ctxb.lineWidth = 5;
    eraserSize = 16;
    circleSize = 16;
    lineSize = 16;
};

sizes.big.onclick = function () {
    "use strict";
    ctxb.lineWidth = 15;
    eraserSize = 32;
    circleSize = 32;
    lineSize = 32;
};

var processing = false;
var operations = [];

operations.mousedown = function () {
    "use strict";
    processing = true;
    ctxb.beginPath();
};

operations.mousemove = function () {
    "use strict";
    processing = true;
};

operations.mouseup = function () {
    "use strict";
    processing = false;
};

operations.mouseout = function () {
    "use strict";
    processing = false;
};

operations.click = function () {
    "use strict";
    processing = false;
};

canvasBack.addEventListener("mousedown", function () {
    "use strict";
    operations.mousedown();
});

canvasBack.addEventListener("mouseup", function () {
    "use strict";
    operations.mouseup();
});

canvasBack.addEventListener("mousemove", function () {
    "use strict";
    operations.mousemove();
});

canvasBack.addEventListener("mouseout", function () {
    "use strict";
    operations.mouseout();
});

canvasBack.addEventListener("click", function () {
    "use strict";
    operations.click();
});

tools.pencil.addEventListener("click", function () {
    "use strict";
    tools = "pencil";
    pencilDrawing();
});

tools.eraser.addEventListener("click", function () {
    "use strict";
    tools = "eraser";
    eraserDrawing();
});

tools.circle.addEventListener("click", function () {
    "use strict";
    tools = "circle";
    circleDrawing();
});

tools.circle_fill.addEventListener("click", function () {
    "use strict";
    tools = "circle_fill";
    circleFillDrawing();
});

tools.line.addEventListener("click", function () {
    "use strict";
    tools = "line";
    i = 1;
    lineDrawing();
});

function pencilDrawing() {
    "use strict";
    operations.mousemove = function () {
        if (processing && tools === "pencil") {
            ctxb.lineTo(mouseX, mouseY);
            ctxb.stroke();
        }
    };
}

function eraserDrawing() {
    "use strict";
    operations.mousemove = function () {
        if (processing && tools === "eraser") {
            ctxb.clearRect(mouseX, mouseY, eraserSize, eraserSize);
            ctxb.closePath();
        }
    };
}

function circleDrawing() {
    "use strict";
    operations.mouseup = function () {
        if (processing === true && tools === "circle") {
            ctxb.arc(mouseX, mouseY, circleSize, 0, 2 * Math.PI);
            ctxb.stroke();
            ctxb.closePath();
        }
    };
}

function circleFillDrawing() {
    "use strict";
    operations.mouseup = function () {
        if (processing === true && tools === "circle_fill") {
            ctxb.arc(mouseX, mouseY, circleSize, 0, 2 * Math.PI);
            ctxb.fill();
            ctxb.closePath();
        }
    };
}

function lineDrawing() {
    "use strict";
    if (tools === "line") {
        operations.mousedown = function runLine () {
            if (processing === true && i === 1) {
                ctxb.beginPath();
                ctxb.moveTo(mouseX, mouseY);
            }
            operations.mouseup = function iUp() {
                i = i + 1;
            };
            if (i === 2) {
                ctxb.lineTo(mouseX, mouseY);
                ctxb.stroke();
                i = 0;
                ctxb.closePath();
            }
        };
    }
}

color.onchange = function (e) {
    "use strict";
    ctxb.strokeStyle = e.srcElement.value;
    ctxb.fillStyle = e.srcElement.value;
};