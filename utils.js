function lerp(A, B, t) {
  return A + (B - A) * t;
}
function getIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bottom != 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      };
    }
  }
  return null;
}
function polysIntersect(poly1, poly2) {
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      const touch = getIntersection(
        poly1[i],
        poly1[(i + 1) % poly1.length],
        poly2[j],
        poly2[(j + 1) % poly2.length]
      );
      if (touch) {
        return true;
      }
    }
  }
  return false;
}
function plan(normalVectorX, normalVectorY, normalVectorZ, planFromOrigin) {
  const num = Math.sqrt(
    normalVectorX * normalVectorX +
      normalVectorY * normalVectorY +
      normalVectorZ * normalVectorZ
  );
  const a = normalVectorX / num;
  const b = normalVectorY / num;
  const c = normalVectorZ / num;
  const D = planFromOrigin * num;
  console.log(num);
  console.log(`${a}x + ${b}y + ${c}z - ${D}`);
}
const lineLength = (dx, dy, dz) => Math.sqrt(dx * dx + dy * dy + dz * dz);

const angleOf3Points = (
  fromx = 0,
  fromy = 0,
  fromz = 0,
  tox1 = 5,
  toy1 = 12,
  toz1 = 0,
  tox2 = -6,
  toy2 = 8,
  toz2 = 0
) => {
  const ax = tox1 - fromx;
  const ay = toy1 - fromy;
  const az = toz1 - fromz;
  const a = lineLength(ax, ay, az);
  const bx = tox2 - fromx;
  const by = toy2 - fromy;
  const bz = toz2 - fromz;
  const b = lineLength(bx, by, bz);
  const dotProduct = ax * bx + ay * by + az * bz;
  const angle3p = Math.acos(dotProduct / (a * b));
  // console.log('a: ', a);
  // console.log('b: ', b);
  // console.log('dotProduct: ', dotProduct);
  // console.log('angle: ', (angle3p / Math.PI) * 180);
  return angle3p;
};

const normV = (
  fromx = 0,
  fromy = 0,
  fromz = 0,
  tox1 = 5,
  toy1 = 12,
  toz1 = 0,
  tox2 = -6,
  toy2 = 8,
  toz2 = 0
) => {
  const ax = tox1 - fromx;
  const ay = toy1 - fromy;
  const az = toz1 - fromz;
  const a = lineLength(ax, ay, az);
  const bx = tox2 - fromx;
  const by = toy2 - fromy;
  const bz = toz2 - fromz;
  const b = lineLength(bx, by, bz);
  const cx = ay * bz - az * by;
  const cy = az * bx - ax * bz;
  const cz = ax * by - ay * bx;
  const angle3p = angleOf3Points(
    fromx,
    fromy,
    fromz,
    tox1,
    toy1,
    toz1,
    tox2,
    toy2,
    toz2
  );
  console.log('a: ', a);
  console.log('b: ', b);
  console.log(`cross product: (${cx}, ${cy}, ${cz})`);
  console.log('angle: ', (angle3p / Math.PI) * 180);
  return angle3p;
};

// console.log(lineLength(2, 3, 4));
// angleOf3Points(0, 0, 0, 5, 12, 0, -6, 8, 0);
angleOf3Points();
normV();
