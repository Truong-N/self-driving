const canvas = document.getElementById('myCanvas');

canvas.width = 200;
const ctx = canvas.getContext('2d');
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, 'KEYS');
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2)];
car.draw(ctx);
animate();
function animate() {
  traffic.forEach((item) => item.update(road.borders, []));
  car.update(road.borders, traffic);
  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);

  road.draw(ctx);

  traffic.forEach((item) => item.draw(ctx));
  car.draw(ctx);

  ctx.restore();
  requestAnimationFrame(animate);
}
