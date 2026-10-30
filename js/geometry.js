/**
 * ==============================================================================
 * GEOMETRY.JS - High-Performance Interactive Constellation & Particle Engine
 * Zero external dependencies. Instant load. 60-120 FPS hardware accelerated.
 * ==============================================================================
 */

class ModernGeometryEngine {
  constructor() {
    this.canvas = document.getElementById('geometry-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: true });

    this.width = (this.canvas.width = window.innerWidth);
    this.height = (this.canvas.height = window.innerHeight);

    // Mouse & Interaction State
    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
      targetX: this.width * 0.5,
      targetY: this.height * 0.5,
      radius: 140
    };

    // Ambient Constellation Nodes
    this.nodes = [];
    this.maxNodes = window.innerWidth < 768 ? 45 : 80;
    this.maxLineDist = window.innerWidth < 768 ? 95 : 135;

    // Interactive Click Sparks
    this.sparks = [];

    this.init();
  }

  init() {
    this.initConstellationNodes();
    this.setupEvents();
    this.animate();
  }

  initConstellationNodes() {
    this.nodes = [];
    for (let i = 0; i < this.maxNodes; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.15
      });
    }
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
      this.initConstellationNodes();
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
    }, { passive: true });

    window.addEventListener('click', (e) => {
      this.createClickSparks(e.clientX, e.clientY);
    });
  }

  createClickSparks(x, y) {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = Math.random() * 2.8 + 1.2;
      this.sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1.0,
        color: i % 2 === 0 ? '#00f2fe' : '#7000ff'
      });
    }
  }

  renderConstellation() {
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > this.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.height) node.vy *= -1;

      // Gentle cursor repulsion
      const dx = this.mouse.x - node.x;
      const dy = this.mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouse.radius) {
        const force = (1 - dist / this.mouse.radius) * 1.2;
        node.x -= (dx / dist) * force;
        node.y -= (dy / dist) * force;
      }

      // Draw subtle node dot
      this.ctx.fillStyle = `rgba(0, 242, 254, ${node.alpha * 0.75})`;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Delicate connecting lines
      for (let j = i + 1; j < this.nodes.length; j++) {
        const other = this.nodes[j];
        const lineDx = node.x - other.x;
        const lineDy = node.y - other.y;
        const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

        if (lineDist < this.maxLineDist) {
          const alpha = (1 - lineDist / this.maxLineDist) * 0.16;
          this.ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          this.ctx.lineWidth = 0.75;
          this.ctx.beginPath();
          this.ctx.moveTo(node.x, node.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.stroke();
        }
      }
    }
  }

  renderSparks() {
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 0.025;

      if (s.alpha <= 0) {
        this.sparks.splice(i, 1);
        continue;
      }

      this.ctx.strokeStyle = s.color;
      this.ctx.globalAlpha = s.alpha;
      this.ctx.lineWidth = 1.4;
      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(s.x - s.vx * 2, s.y - s.vy * 2);
      this.ctx.stroke();
      this.ctx.globalAlpha = 1.0;
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    this.renderConstellation();
    this.renderSparks();

    requestAnimationFrame(() => this.animate());
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.geometryEngine = new ModernGeometryEngine();
  });
} else {
  window.geometryEngine = new ModernGeometryEngine();
}
