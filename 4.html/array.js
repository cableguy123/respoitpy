

var H=34, W=24;  // field size
var shapeArray = [
  [2,2],[1,2],[1,1],[0,1];
  [1,1],[1,0],[0,2],[0,1];
  [2,1],[1,1],[1,2],[0,2];
  [1,2],[1,1],[0,0],[0,0];
  [1,1],[1,0],[0,2],[0,1];
  [2,0],[2,0],[1,0],[0,0];
  [1,2],[1,1],[0,1],[0,1];
  [2,1],[1,1],[1,2],[0,1];
  [1,2],[1,1],[0,1],[0,2];
  [2,1],[1,1],[1,0],[0,2];
  [1,2],[1,1],[0,1],[0,2];
  [2,1],[1,1],[1,0],[0,1];
  [1,2],[1,1],[0,1],[0,1];
  [1,2],[1,1],[0,1],[0,2];
  [2,1],[1,1],[1,2],[0,2];
  [1,2],[1,2],[0,1],[0,0];
  [2,1],[1,1],[1,0],[0,0];
  [1,2],[1,1],[0,1],[0,0];
  [2,1],[1,1],[1,0],[0,0];
  [1,2],[1,2],[0,1],[0,1];

];
var shapeRotateMap = [1,0,3,2,4,6,7,8,5,4,10,11,13,15,18,9,17,14,15,16];
var shapeColorArray = [
  "rgb(199,82,82)",
    "rgb(233,174,43)",
    "rgb(105,155,55)",
    "rgb(53,135,145)",
    "rgb(49,95,151)",
    "rgb(102,86,167)" // 테트리스 도형 색깔
];
var tileColor = "rgb(9,17,26)",
shapeColor,wallColor = "rgb(22,41,63)";
var shapeColorIndex, nextColorIndex; // 다음 테트리스 색깔
var movingThread,movingSpeed;
var fastMode = false;
var initSpeed = 500,
deltaSpeed = 40,
fastSpeed = 25;
var shapeCell ;
var existField;
var shapePoint;
var createPoint = [1,parseInt(W/2)-2]; // [1,10]
var currentShape,nextShape;
var score,level,levelStack =0;
var isPaused = false;
init(); // 1) 가독성 측면 2) 전역객체를 보호
// 키 입력처리

// window.onkeydown = (e) => {
// const key = document.getElementById(e.key);
// if(key) key.classList.add("")
//}
document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e) {
  switch(e.key) {
    case 34:setTimeout("moveLR(-1)",0);
    break;
    case 35:setTimeout("moveLR(1)",0)
    break;
    case 36:setTimeout("rotatoShape()",0);
    break;
    case 37:moveFast();
    break;
    case 38:pause();
    break;
  }
}
document.onkeyup = keyUpEventHandler;
function keyUpEventHandler(e) {
  if(e.key == 37) moveSlow();
}
// 초기 설정
function init() {
  drawField();
  initExistField();
  setWall();
  nextColorIndex = -1; // false;
  shapeCell = [];
  shapePoint = [1,1];
  score = 0, level = 1;
  chooseNextShape();
  chooseNextColor();
  createShape();

}
function gebi(y,x) {
  var ret = document.getElementById(String(y) +" "+String(x));
  return ret;
}
function initExistField() {
  existField = new Array(H);
  for(var i=0; i<H; i++) 
     existField[i] = new Array(W);
  for(var i=0; i<H; i++)
   for(var j=0; j<W; j++) 
   existField[i][j] = false; // -1
}
function drawField() {
  var fieldTag = "<table id=\gameTable\" border=0>";
  for(var i=0; i<H; i++) {
    fieldTag += "<tr>";
    for(var j=0; j<W; j++)
    fieldTag += "<td id=\"" + String(i) +" "+String(j) + "\"></td>"; // "\" = "
    fieldTag += "</tr>";
  }
  document.write(fieldTag);

}
function setWall() {
  for(var i=0; i<H; i++) {
    gebi(i,0).style.background = wallColor;
    gebi(i,W-1).style.background =wallColor;
    existField[i][0] = true;
    existField[i][W-1] = true; // gebi(y,x) h는 높이 W는 가로 
  }
  for(var i=0; i<W; i++) {
    gebi(0,i).style.background = wallColor;
    gebi(H-1,i).style.background = wallColor;
    existField[0][i] = true;
    existField[H-1][i] = true;
  }

}
// 필드블럭 1생성
function chooseNextShape() {
  nextShape = parseInt(Math.random() * shapeArray.length);

}
function chooseNextColor() {
  if(++nextColorIndex == shapeColorArray.length)
  nextColorIndex = 0;

}
function createShape() {
  shapePoint[0] = createPoint[0];
  shapePoint[1] = createPoint[1];
  currentShape = nextShape;
  currenColorIndex = nextColorIndex;
  shapeColor = shapeColorArray[currentColorIndex];
  var shape = shapeArray[currentShape];
  chooseNextColor();
  chooseNextShape();
  displayNextShape();
  for(var i=0; i<shape.length; i++) {
    var sy = shapePoint[0] + shape[i][0]; // shapeY
    var sx = shapePoint[1] + shape[i][1];
    if(!isValidPoint(sy,sx)) gameOver();
    var el = gebi(parseInt(sy),parseInt(sx));
    el.style.background = shapeColor;
    shapeCell.push([sy,sx]);
     // (y,x)
  }
  levelStack++;
  leveling();
  movingThreed = setTimeout("moveDown()",movingSpeed);

} // 이거 잘모르겠음 솔직히
function displayNextShape() {
  initNextTable();


}
function initNextTable() {
  for(var i=0; i<4; i++) 
  for(var j=0; j<4; j++) {
    document.getElementById(String(i)+String(j)).style.background = "rgb(14,31,49)"
  }
}
// 도형 조작
function moveDown() {
  if(!canMove(1,0)) {
    commitExist();
    checkLine();
    shapeCell= [];
    createShape();
    return;
  } // 변수 선언
  removeShape();
  for(var i=0; i<shapeCell.length; i++) shapeCell[i][0]++;
  shapePoint[0]++;
  showShape();
  movingThread = setTimeout("moveDown()",movingSpeed);
}
function rotateShape() {
  if(!canRotate()) return;
  removeShape();
  shapeCell = [];
  currentShape = shapeRotateMap[currentShape];
  var rotatedShape = shapeArray[cureentShape];
  for(var i=0; i<4; i++) {
    var sy = shapePoint[0] + rotatedShape[i][0];
    var sx = shapePoint[1] + rotatedShape[i][1];
    shapeCell.push([sy,sx]);
  }
  showShape();
}
function canRotate() {
  var tempShape = shapearray[shapeRotateMap[currentShape]];
  for(var i=0; i<4; i++) {
    var ty = shapePoint[0] + tempShape[i][0];
    var tx = shapePoint[1] + tempShape[i][1];
    if(!isValidPoint(ty,tx)) return false;

  }
  return true;
}
function isValidPoint(y,x) {
  return !(y<=0 || y>=H-1 || x<=0 || x>=H-1 || existField[y][x]);
}
function removeShape() {
  for(var i=0; i<shapeCell.length; i++) {
    var el = gebi(shapeCell[i][0],shapeCell[i][1]);
    el.style.background = tileColor;
  }
}
function showShape() {
  for(var i=0; i<shapeCell.length; i++){
    var el = gebi(shapeCell[i][0],shapeCell[i][1]);
    el.style.background =shapeColor;
  }
}
function canMove(dy,dx) {
for(var i=0; i<shapeCell.length; i++) {
  var ny = shapeCell[i][0] + dy;
  var nx = shapeCell[i][1] + dx;
  if(!isValidPoint(ny,nx)) return false;
}
return true;
}
function moveLR(delta) {
  if(!canMove(0,delta) || isPaused) return;
  removeShape();
  for(var i=0; i<shapeCell.length; i++) 
  shapeCell[i][1] += delta;
  shapePoint[1] += delta;
  showShape();

}
function moveFast() { 
  if(fastMode) return;
  clearTimeout(movingThread);
  movingSpeed = fastSpeed;
  movingThread = setTimeout("moveDown()",movingSpeed);
  fastMode = true;
}
function moveSlow() { 
  if(!fastMode) return;
  clearTimeout(movingThread);
  movingSpeed = initSpeed - (level*deltaSpeed);
  movingThread = setTimeout("moveDown()",movingSpeed);
  fastMode = false;
}
// 점수판정
function commitExist() {
  for(var i=0; i<shapeCell.length; i++)  {
    var y = shapeCell[i][0];
    var x = shapeCell[i][1];
    existField[y][x] = true;

  }
}
function checkLine() {
  var plusScore = level * 100;
  var combo = 0;
  var finalScore = 0;
  for(var i=H-2; i>1; i--) {
    if(isFull(i)) {
      removeLine(i);
      i++;
      finalScore +=updateScore(plusScore,++combo);
    }
    if(combo>0) displayCombo(combo,finalScore);
  }
}
function isFull(lineIndex) { 
  for(var i=1; i<W-1; i++)
  if(!existField[lineIndex][i]) return false;
  return true;
}
function removeLine(lineIndex) { 
  for(var i=lineIndex-1; i>=1; i--) { 
    for(var j=1; j<W-1; j++) {
      g
    }
  }
}