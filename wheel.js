import {readUnanswered, updateAnsweredFlag, filePath} from './updateQuestions'

var allQuestions = readUnanswered(filePath)

//declaring possible options    
var options = ["Maths", "Science", "Technology", "Engineering", "Brainrot"];

for (let i = 0; i < options.length;i++){
    var found = false;
    for (let j = 0;j<allQuestions.length;j++){
        if ((allQuestions[j].Type == options[i])) { 
            found = true;    
        }
        
    }
    if (found == false){
        options.splice(options.indexOf(options[i]),1)
    }
}


//declaring start angle and the size of the arcs of the circle.
var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

//this is to trigger the spinning by using 'addEventLIstener' to listen for when the button is pressed
document.getElementById("spin").addEventListener("click", spin);


//creating a function to convert from binary to hexidecimal
function byte2Hex(n) {
var nybHexString = "0123456789ABCDEF";
return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

//formatting the hexidecimal codes to #.........
function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}


//function to generate a color and return it as an r g b value 
function getColor(item, maxitem) {
var phase = 0;
var center = 128;
var width = 127;
var frequency = Math.PI*2/maxitem;
    
red   = Math.sin(frequency*item+2+phase) * width + center;
green = Math.sin(frequency*item+0+phase) * width + center;
blue  = Math.sin(frequency*item+4+phase) * width + center;
    
return RGB2Color(red,green,blue);
}


//function to create and draw the roulette wheel
function drawRouletteWheel() {
var canvas = document.getElementById("canvas");
if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 25px Joti One';

    for(var i = 0; i < options.length; i++) {
    var angle = startAngle + i * arc;
    //ctx.fillStyle = colors[i];
    ctx.fillStyle = getColor(i, options.length);

    ctx.beginPath();
    ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
    ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
    // ctx.stroke();
    ctx.fill();

    ctx.save();
    ctx.shadowOffsetX = -1;
    ctx.shadowOffsetY = -1;
    ctx.shadowBlur    = 0;
    // ctx.shadowColor   = "rgb(220,220,220)";
    ctx.fillStyle = "black";
    ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                    250 + Math.sin(angle + arc / 2) * textRadius);
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    var result = options[i];
    ctx.fillText(result, -ctx.measureText(result).width / 2, 0);
    ctx.restore();
    } 

    //the arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
}
}


//function for determining how long the wheel spins for
function spin() {
spinAngleStart = Math.random() * 10 + 10;
spinTime = 0;
spinTimeTotal = Math.random() * 3 + 4 * 1000;
rotateWheel();
}


// function for the actual rotation of the wheel
function rotateWheel() {
spinTime += 30;
if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
}
var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
startAngle += (spinAngle * Math.PI / 180);
drawRouletteWheel();
spinTimeout = setTimeout('rotateWheel()', 30);
}

//function to stop the rotation of the wheel
function stopRotateWheel() {
clearTimeout(spinTimeout);
var degrees = startAngle * 180 / Math.PI + 90;
var arcd = arc * 180 / Math.PI;
var index = Math.floor((360 - degrees % 360) / arcd);
ctx.save();
ctx.font = 'bold 30px Joti One';
var result = options[index]

ctx.fillText(result, 250 - ctx.measureText(result).width / 2, 250 + 10);
ctx.restore();
}

//function to slow down the rotation of the wheel
function easeOut(t, b, c, d) {
var ts = (t/=d)*t;
var tc = ts*t;
return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();    
spin();


var availableQuestions = []

for (let i = 0; i < allQuestions.length;i++){
    if (options.includes(allQuestions[i].Type))
    availableQuestions = availableQuestions.concat(allQuestions[i].question)
}

var question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

var allAnswers = [] 

var correctIndex

for (let i = 0;i < allQuestions.length;i++){
    if (allQuestions[i].Question == question){
        allAnswers = (allAnswers.concat(Answer)).concat(PossibleAnswers)
        correctIndex = allAnswers.indexOf(allQuestions[i].Answer)
        updateAnsweredFlag(filePath, allQuestions[i].Question)
    }
}

var shuffledAnswers = shuffle(allAnswers)
  
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

