class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;
    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = { x: this.left, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const topRight = { x: this.right, y: this.top };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }
  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.laneCount - 1) * laneWidth
    );
    // laneCount = 3, this.width=200
    // laneWidth=this.width/this.laneCount = 200/3 = 66.66
    // if laneIndex = 0,
    // this.left+laneWidth/2+laneIndex*laneWidth = 0+66.66/2+0*66.66 =33.33
    // if laneIndex = 1,
    // this.left+laneWidth/2+laneIndex*laneWidth = 0+66.66/2+1*66.66 =33.33 + 66.66 = 100
    // if laneIndex = 2,
    // this.left+laneWidth/2+laneIndex*laneWidth = 0+66.66/2+2*66.66 =33.33 + 133.32 = 166.65
  }
  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';

    for (let i = 1; i <= this.laneCount - 1; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount);

      ctx.setLineDash([20, 20]);

      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();

      ctx.setLineDash([]);
      this.borders.forEach((border) => {
        ctx.beginPath();
        ctx.moveTo(border[0].x, border[0].y);
        ctx.lineTo(border[1].x, border[1].y);
        ctx.stroke();
      });
    }
  }
}
// x=100, width=200, laneCount = 3
// this.left = x - width / 2 = 100 - 200 /2 = 100 - 100 = 0
// this.right = x + width / 2 = 100 + 200 / 2 = 100 + 100 = 200
// i = 0
// t = i / this.laneCount = 0 / 3 = 0
// A + (B - A) * t = 0 + (200 - 0) * 0 = 0
// i = 1
// t = i / this.laneCount = 1 / 3 = 0.3333
// A + (B - A) * t = 0 + (200 - 0) * .3333 = 66.66
// i = 2
// t = i / this.laneCount = 2 / 3 = 0.6666
// A + (B - A) * t = 0 + (200 - 0) * .6666 = 133.32
// i = 3
// t = i / this.laneCount = 3 / 3 = 1
// A + (B - A) * t = 0 + (200 - 0) * 1 = 200
