canvas.addEventListener("mousedown", function(e) {
  towers.push(getCursorPosition(canvas, e));
});
canvas.addEventListener("mousemove", function(e) {
  floatingTower = getCursorPosition(canvas, e);
});
