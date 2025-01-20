// ====== Global Variables ======
let g_canvas = null;
let g_gl = null;

// GLSL pointers
let g_aPosition = null;
let g_uFragColor = null;
let g_uPointSize = null;

let g_shapes = [];

let g_selectedColor = [0.5, 0.5, 0.5, 1.0];
let g_selectedSize  = 10.0;
let g_selectedSegments = 10;

let g_selectedShape = "point";

// ====== Grass (bottom) ======
const grassTriangles = [
  {
    coords: [ -1.0, -1.0,  -1.0, -0.4,   1.0, -1.0 ],
    color:  [ 0.2, 0.7, 0.2, 1.0 ]
  },
  {
    coords: [ -1.0, -0.4,   1.0, -0.4,   1.0, -1.0 ],
    color:  [ 0.2, 0.7, 0.2, 1.0 ]
  },
];

// ====== House  ======
const houseTriangles = [
  {
    coords: [ -0.8, -0.1,   -0.5, 0.2,   -0.2, -0.1 ],
    color:  [ 1.0, 0.0, 0.0, 1.0 ]
  },
  {
    coords: [ -0.8, -0.4,  -0.8, -0.1,  -0.2, -0.4 ],
    color:  [ 1.0, 1.0, 0.0, 1.0 ]
  },
  {
    coords: [ -0.8, -0.1,  -0.2, -0.1,  -0.2, -0.4 ],
    color:  [ 1.0, 1.0, 0.0, 1.0 ]
  },
  {
    coords: [ -0.7, -0.4,  -0.7, -0.2,  -0.6, -0.4 ],
    color:  [ 1.0, 0.0, 0.0, 1.0 ]
  },
  {
    coords: [ -0.7, -0.2,  -0.6, -0.2,  -0.6, -0.4 ],
    color:  [ 1.0, 0.0, 0.0, 1.0 ]
  },
  {
    coords: [ -0.55, -0.3,  -0.55, -0.2,  -0.45, -0.3 ],
    color:  [ 0.5, 0.8, 0.9, 1.0 ]
  },
  {
    coords: [ -0.55, -0.2,  -0.45, -0.2,  -0.45, -0.3 ],
    color:  [ 0.5, 0.8, 0.9, 1.0 ]
  },
];

// ====== Rocket ======
const rocketTriangles = [

  {
    coords: [ 0.55, 0.6,   0.60, 0.8,   0.65, 0.6 ],
    color:  [ 0.9, 0.1, 0.1, 1.0 ]
  },
  {
    coords: [ 0.55, 0.0,   0.55, 0.6,   0.65, 0.0 ],
    color:  [ 0.8, 0.8, 0.8, 1.0 ]
  },
  {
    coords: [ 0.55, 0.6,   0.65, 0.6,   0.65, 0.0 ],
    color:  [ 0.8, 0.8, 0.8, 1.0 ]
  },
  {
    coords: [ 0.55, 0.0,   0.55, -0.1,  0.58, 0.0 ],
    color:  [ 1.0, 0.5, 0.0, 1.0 ]
  },
  {
    coords: [ 0.58, 0.0,   0.55, -0.1,  0.58, -0.1 ],
    color:  [ 1.0, 0.5, 0.0, 1.0 ]
  },
  {
    coords: [ 0.62, 0.0,   0.62, -0.1,  0.65, 0.0 ],
    color:  [ 1.0, 0.5, 0.0, 1.0 ]
  },
  {
    coords: [ 0.65, 0.0,   0.62, -0.1,  0.65, -0.1 ],
    color:  [ 1.0, 0.5, 0.0, 1.0 ]
  },
  {
    coords: [ 0.57, 0.3,   0.57, 0.4,   0.63, 0.3 ],
    color:  [ 0.2, 0.5, 1.0, 1.0 ]
  },
  {
    coords: [ 0.57, 0.4,   0.63, 0.4,   0.63, 0.3 ],
    color:  [ 0.2, 0.5, 1.0, 1.0 ]
  },
];

// ====== Trees  ======

const leftPineTree = [

  {
    coords: [ -0.98, -0.4,   -0.98, -0.2,   -0.90, -0.4 ],
    color:  [ 0.55, 0.27, 0.07, 1.0 ]
  },
  {
    coords: [ -0.98, -0.2,   -0.90, -0.2,   -0.90, -0.4 ],
    color:  [ 0.55, 0.27, 0.07, 1.0 ]
  },
  
  {
    coords: [ -1.00, -0.2,   -0.88, -0.2,   -0.94, -0.05 ],
    color:  [ 0.2, 0.8, 0.2, 1.0 ]
  },
  {
    coords: [ -0.99, -0.07,  -0.89, -0.07,  -0.94, 0.08 ],
    color:  [ 0.2, 0.8, 0.2, 1.0 ]
  },
  {
    coords: [ -0.985, 0.05,  -0.895, 0.05,  -0.94, 0.20 ],
    color:  [ 0.2, 0.8, 0.2, 1.0 ]
  },
];

const rightPineTree = [
  {
    coords: [ 0.00, -0.4,   0.00, -0.3,   0.05, -0.4 ],
    color:  [ 0.55, 0.27, 0.07, 1.0 ]
  },
  {
    coords: [ 0.00, -0.3,   0.05, -0.3,   0.05, -0.4 ],
    color:  [ 0.55, 0.27, 0.07, 1.0 ]
  },
  {
    coords: [ -0.01, -0.3,   0.06, -0.3,   0.025, -0.18 ],
    color:  [ 0.2, 0.8, 0.2, 1.0 ]
  },
  {
    coords: [ -0.005, -0.20,  0.055, -0.20,  0.025, -0.08 ],
    color:  [ 0.2, 0.8, 0.2, 1.0 ]
  },
  {
    coords: [ 0.0, -0.11,   0.05, -0.11,   0.025, 0.02 ],
    color:  [ 0.2, 0.8, 0.2, 1.0 ]
  },
];
const pineTreesTriangles = [...leftPineTree, ...rightPineTree];

// ====== stamp for mini rocket ======
const miniRocketLocal = [
  {
    coords: [ -0.05, 0.15,   0.0, 0.25,   0.05, 0.15 ],
    color:  [ 1.0, 0.0, 0.0, 1.0 ]
  },
  {
    coords: [ -0.05, -0.05,  -0.05, 0.15,   0.05, -0.05 ],
    color:  [ 0.8, 0.8, 0.8, 1.0 ]
  },
  {
    coords: [ -0.05,  0.15,   0.05,  0.15,   0.05, -0.05 ],
    color:  [ 0.8, 0.8, 0.8, 1.0 ]
  },
  {
    coords: [ -0.05, -0.05,  -0.08, -0.1,    -0.05, -0.1 ],
    color:  [ 1.0, 0.5, 0.0, 1.0 ]
  },
  {
    coords: [  0.05, -0.05,   0.08,  -0.1,    0.05,  -0.1 ],
    color:  [ 1.0, 0.5, 0.0, 1.0 ]
  },
  {
    coords: [ -0.02, 0.0,   -0.02, 0.05,   0.02, 0.0 ],
    color:  [ 0.2, 0.5, 1.0, 1.0 ]
  },
];

// ====== MAIN ======
function main() {
  setupWebGL();
  connectVariablesToGLSL();
  initEventHandlers();

  // Black background when starting
  g_gl.clearColor(0.0, 0.0, 0.0, 1.0);
  g_gl.clear(g_gl.COLOR_BUFFER_BIT);
}

// ====== SETUP WEBGL ======
function setupWebGL() {
  g_canvas = document.getElementById("webgl");
  if (!g_canvas) {
    console.log("Failed to get <canvas> element");
    return;
  }

  g_gl = g_canvas.getContext("webgl", { preserveDrawingBuffer: true });
  if (!g_gl) {
    console.log("Failed to get WebGL context");
    return;
  }
}

function connectVariablesToGLSL() {
  const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform float u_PointSize;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = u_PointSize;
    }
  `;
  const FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
      gl_FragColor = u_FragColor;
    }
  `;

  if (!initShaders(g_gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to init shaders.");
    return;
  }

  g_aPosition = g_gl.getAttribLocation(g_gl.program, "a_Position");
  if (g_aPosition < 0) {
    console.log("Failed to get a_Position");
    return;
  }

  g_uFragColor = g_gl.getUniformLocation(g_gl.program, "u_FragColor");
  if (!g_uFragColor) {
    console.log("Failed to get u_FragColor");
    return;
  }

  g_uPointSize = g_gl.getUniformLocation(g_gl.program, "u_PointSize");
  if (!g_uPointSize) {
    console.log("Failed to get u_PointSize");
    return;
  }
}

// ====== EVENT HANDLERS ======
function initEventHandlers() {
  // Mouse: click or drag
  g_canvas.onmousedown = (ev) => { handleClick(ev); };
  g_canvas.onmousemove = (ev) => {
    if (ev.buttons === 1) handleClick(ev);
  };

  // R/G/B sliders
  document.getElementById("redSlider").oninput = function() {
    g_selectedColor[0] = parseFloat(this.value);
  };
  document.getElementById("greenSlider").oninput = function() {
    g_selectedColor[1] = parseFloat(this.value);
  };
  document.getElementById("blueSlider").oninput = function() {
    g_selectedColor[2] = parseFloat(this.value);
  };

  // Color Wheel
  // If user picks a color here last, it overrides the R/G/B sliders
  document.getElementById("colorPicker").oninput = function() {
    let hex = this.value; 
    let r_hex = hex.substring(1, 3);
    let g_hex = hex.substring(3, 5);
    let b_hex = hex.substring(5, 7);

    let r = parseInt(r_hex, 16) / 255.0;
    let g = parseInt(g_hex, 16) / 255.0;
    let b = parseInt(b_hex, 16) / 255.0;
    g_selectedColor = [r, g, b, 1.0];
  };

  // Size & Circle Segments
  document.getElementById("sizeSlider").oninput = function() {
    g_selectedSize = parseFloat(this.value);
  };
  document.getElementById("segmentsSlider").oninput = function() {
    g_selectedSegments = parseInt(this.value);
  };

  // Shape selection
  document.getElementById("pointButton").onclick = function() {
    g_selectedShape = "point";
  };
  document.getElementById("triangleButton").onclick = function() {
    g_selectedShape = "triangle";
  };
  document.getElementById("circleButton").onclick = function() {
    g_selectedShape = "circle";
  };
  document.getElementById("stampRocketButton").onclick = function() {
    g_selectedShape = "miniRocket";
  };

  // Clear
  document.getElementById("clearButton").onclick = function() {
    g_shapes = [];
    g_gl.clearColor(0.0, 0.0, 0.0, 1.0);
    g_gl.clear(g_gl.COLOR_BUFFER_BIT);
  };

  // Draw Scene
  document.getElementById("drawSceneButton").onclick = function() {
    drawMyScene();
  };
}

function handleClick(ev) {
  let [x, y] = convertCoordinatesEventToGL(ev);

  if (g_selectedShape === "miniRocket") {
    stampMiniRocketAt(x, y, g_selectedColor);
    return;
  }

  // Otherwise do normal shapes: point, triangle, circle
  let shape;
  if (g_selectedShape === "point") {
    shape = new Point();
  } else if (g_selectedShape === "triangle") {
    shape = new Triangle();
  } else if (g_selectedShape === "circle") {
    shape = new Circle();
    shape.segments = g_selectedSegments;
  } else {
    return; 
  }

  shape.position = [x, y];
  shape.color    = g_selectedColor.slice(); 
  shape.size     = g_selectedSize;

  g_shapes.push(shape);
  renderAllShapes();
}

// ====== stamp for mini rocket ======
function stampMiniRocketAt(x, y, color) {
  let scale = g_selectedSize / 100.0; 

  miniRocketLocal.forEach((tri) => {
    let shape = new Triangle();
    // Cse the chosen color for the entire rocket
    shape.color = color.slice();

    let newCoords = [];
    for (let i = 0; i < tri.coords.length; i += 2) {
      let lx = tri.coords[i];
      let ly = tri.coords[i + 1];
      let worldX = x + lx * scale;
      let worldY = y + ly * scale;
      newCoords.push(worldX, worldY);
    }
    shape.setVertices(newCoords);

    g_shapes.push(shape);
  });

  renderAllShapes();
}

// Extend Triangle with setVertices
Triangle.prototype.setVertices = function(arrayXY) {
  this.customVertices = new Float32Array(arrayXY);
};

let oldTriangleRender = Triangle.prototype.render;
Triangle.prototype.render = function() {
  if (this.customVertices) {
    g_gl.uniform4f(g_uFragColor, this.color[0], this.color[1], this.color[2], this.color[3]);

    let vertexBuffer = g_gl.createBuffer();
    g_gl.bindBuffer(g_gl.ARRAY_BUFFER, vertexBuffer);
    g_gl.bufferData(g_gl.ARRAY_BUFFER, this.customVertices, g_gl.DYNAMIC_DRAW);

    g_gl.vertexAttribPointer(g_aPosition, 2, g_gl.FLOAT, false, 0, 0);
    g_gl.enableVertexAttribArray(g_aPosition);

    g_gl.drawArrays(g_gl.TRIANGLES, 0, 3);
  } else {
    oldTriangleRender.call(this);
  }
};

function renderAllShapes() {
  g_gl.clearColor(0.0, 0.0, 0.0, 1.0);
  g_gl.clear(g_gl.COLOR_BUFFER_BIT);

  for (let i = 0; i < g_shapes.length; i++) {
    g_shapes[i].render();
  }
}

// ====== DRAW THE WHOLE SCENE ======
function drawMyScene() {
  //  sky
  g_gl.clearColor(0.4, 0.7, 1.0, 1.0);
  g_gl.clear(g_gl.COLOR_BUFFER_BIT);

  // grass
  drawTriangleArray(grassTriangles);

  // house
  drawTriangleArray(houseTriangles);

  // rocket
  drawTriangleArray(rocketTriangles);

  // pine Trees
  drawTriangleArray(pineTreesTriangles);
}

function drawTriangleArray(triArray) {
  triArray.forEach((tri) => {
    g_gl.uniform4f(g_uFragColor, tri.color[0], tri.color[1], tri.color[2], tri.color[3]);

    let buf = g_gl.createBuffer();
    g_gl.bindBuffer(g_gl.ARRAY_BUFFER, buf);
    g_gl.bufferData(g_gl.ARRAY_BUFFER, new Float32Array(tri.coords), g_gl.DYNAMIC_DRAW);

    g_gl.vertexAttribPointer(g_aPosition, 2, g_gl.FLOAT, false, 0, 0);
    g_gl.enableVertexAttribArray(g_aPosition);

    g_gl.drawArrays(g_gl.TRIANGLES, 0, 3);
  });
}

// ====== UTILS ======
function convertCoordinatesEventToGL(ev) {
  let rect = g_canvas.getBoundingClientRect();
  let x_in_canvas = ev.clientX - rect.left;
  let y_in_canvas = ev.clientY - rect.top;

  let x = (x_in_canvas - g_canvas.width / 2)  / (g_canvas.width / 2);
  let y = (g_canvas.height / 2 - y_in_canvas) / (g_canvas.height / 2);
  return [x, y];
}
