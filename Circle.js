class Circle {
    constructor() {
      this.type     = "circle";
      this.position = [0.0, 0.0];
      this.color    = [1.0, 1.0, 1.0, 1.0];
      this.size     = 10.0;  // circle radius scale
      this.segments = 10;    // # of slices
    }
  
    render() {
      // Color
      g_gl.uniform4f(g_uFragColor,
                     this.color[0],
                     this.color[1],
                     this.color[2],
                     this.color[3]);
  
      let verts = [];
      // center
      verts.push(this.position[0], this.position[1]);
  
      let r = this.size / 200.0;
      for (let i = 0; i <= this.segments; i++) {
        let angle = (i * 2.0 * Math.PI) / this.segments;
        let x = this.position[0] + r * Math.cos(angle);
        let y = this.position[1] + r * Math.sin(angle);
        verts.push(x, y);
      }
  
      let vertexBuffer = g_gl.createBuffer();
      g_gl.bindBuffer(g_gl.ARRAY_BUFFER, vertexBuffer);
      g_gl.bufferData(g_gl.ARRAY_BUFFER, new Float32Array(verts), g_gl.DYNAMIC_DRAW);
  
      g_gl.vertexAttribPointer(g_aPosition, 2, g_gl.FLOAT, false, 0, 0);
      g_gl.enableVertexAttribArray(g_aPosition);
  
      let vertexCount = this.segments + 2;
      g_gl.drawArrays(g_gl.TRIANGLE_FAN, 0, vertexCount);
    }
  }
  