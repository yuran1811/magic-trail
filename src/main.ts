import './styles/index.css';
import { getRandColor, noise } from './utils';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const c = canvas.getContext('2d') as CanvasRenderingContext2D;

const NUM_PARTICLE = 200;
const PARTICLE_RADIUS = 20;
const PARTICLE_GAP = 0.01;

const timer = {
  x: 0,
  y: 0,
};

class Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  offset: number;

  constructor(x: number, y: number, radius: number, color: string, offset: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.offset = offset;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();

    this.x = noise(timer.x + this.offset) * canvas.width;
    this.y = noise(timer.y + this.offset) * canvas.height;
  }
}

const particles: Particle[] = [];

const canvasInit = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  c.fillStyle = `rgba(0, 0, 0, 0.5)`;
  c.fillRect(0, 0, canvas.width, canvas.height);
};

const init = () => {
  canvasInit();

  for (let i = 0; i < NUM_PARTICLE; i++)
    particles.push(
      new Particle(
        -PARTICLE_RADIUS * 2,
        -PARTICLE_RADIUS * 2,
        PARTICLE_RADIUS,
        getRandColor('hsl', { deg: i, amount: NUM_PARTICLE, hslOpts: { s: 50, l: 50 } }),
        i * PARTICLE_GAP
      )
    );
};

const animation = () => {
  requestAnimationFrame(animation);

  c.fillStyle = `rgba(0, 0, 0, 0.02)`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  timer.x += 0.003;
  timer.y += 0.005;

  particles.forEach((particle) => {
    particle.update();
  });
};

init();
animation();

onresize = () => {
  canvasInit();
};
