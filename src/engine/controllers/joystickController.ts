import nipplejs from "nipplejs";
let timeout: any;
let direction = "right";
var manager = nipplejs.create({
  zone: document.getElementById("zone_joystick"),
  mode: "static",
  position: { left: "100px", bottom: "100px" },
  color: "#619103",
  restOpacity: 1
});

manager.on("end", () => {
  if (timeout) {
    clearInterval(timeout);
  }
  towers.push(floatingTower);
});

manager.on("start", () => {
  floatingTower = { x: 0, y: 100 };
});

manager.on("dir", (evt: any, data: any) => {
  direction = data.direction.angle;
});

manager.on("move", (evt: any, data: any) => {
  if (timeout) {
    clearInterval(timeout);
  }
  const ratio = height / width;
  let speed = 0.2;
  let intervall = 1000 / 120;
  let x = 5 * speed * (ratio / 2);
  let y = 5 * speed;

  switch (direction) {
    case "right": {
      floatingTower.x += floatingTower.x + x >= width - 20 ? 0 : x;
      timeout = setInterval(() => {
        floatingTower.x += floatingTower.x + x >= width - 20 ? 0 : x;
      }, intervall);
      break;
    }
    case "left": {
      floatingTower.x -= floatingTower.x - x <= 0 ? 0 : x;
      timeout = setInterval(() => {
        floatingTower.x -= floatingTower.x - x <= 0 ? 0 : x;
      }, intervall);
      break;
    }
    case "up": {
      floatingTower.y -= floatingTower.y - y <= 40 ? 0 : y;
      timeout = setInterval(() => {
        floatingTower.y -= floatingTower.y - y <= 40 ? 0 : y;
      }, intervall);
      break;
    }
    case "down": {
      floatingTower.y += floatingTower.y + y >= height - 40 ? 0 : y;
      timeout = setInterval(() => {
        floatingTower.y += floatingTower.y + y >= height - 40 ? 0 : y;
      }, intervall);
      break;
    }
  }
});
