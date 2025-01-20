
class Triangle {
    constructor() {
      this.type     = "triangle";
      this.position = [0.0, 0.0]; 
      this.color    = [1.0, 1.0, 1.0, 1.0];
      this.size     = 10.0; // interpret as a radius or scale
    }
  
    render() {
      // Use uniform color
      g_gl.uniform4f(g_uFragColor,
                     this.color[0],
                     this.color[1],
                     this.color[2],
                     this.color[3]);
  
      let x = this.position[0];
      let y = this.position[1];
      let r = this.size / 200.0;   // scale factor
  
      let x1 = x;      let y1 = y + r;
      let x2 = x - r;  let y2 = y - r;
      let x3 = x + r;  let y3 = y - r;
  
      let vertices = new Float32Array([ x1, y1, x2, y2, x3, y3 ]);
  
      let vertexBuffer = g_gl.createBuffer();
      g_gl.bindBuffer(g_gl.ARRAY_BUFFER, vertexBuffer);
      g_gl.bufferData(g_gl.ARRAY_BUFFER, vertices, g_gl.DYNAMIC_DRAW);
  
      g_gl.vertexAttribPointer(g_aPosition, 2, g_gl.FLOAT, false, 0, 0);
      g_gl.enableVertexAttribArray(g_aPosition);
  
      // Draw
      g_gl.drawArrays(g_gl.TRIANGLES, 0, 3);
    }
  }
  