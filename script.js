var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height - 100;
var dx = 2;
var dy = -2;
var ballRadius = 30;
var ballHeight = 100;
var ballWidth = 100;
var paddleHeight = 25;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 8;
var brickWidth = 50;
var brickHeight = 50;
var brickPadding = 2;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var bricks = [];
for (c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for (r=0; r<brickRowCount; r++) {
		bricks[c][r] = {x: 0, y:0, status: 1};
	}
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
                var image = document.getElementById('donut');
                ctx.drawImage(image, brickX, brickY, brickWidth, brickHeight);
			}
		}
	}
}

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

function drawBall() {	
    var image = document.getElementById('cat');    
    ctx.drawImage(image, x, y, ballHeight, ballWidth);
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "pink";
	ctx.fill();
	ctx.closePath();
}

function collisionDetection() {
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			var b = bricks[c][r];
			if(b.status  == 1) {
				if(x+(ballWidth/2) > b.x && x+(ballWidth/2) < b.x+brickWidth && y+(ballHeight/2) > b.y && y+(ballHeight/2) < b.y+brickHeight) {
					dy = -dy;
                    drawHappyCat();                  
					b.status = 0;
					score++;
					if(score == brickRowCount*brickColumnCount) {
						alert("YOU WIN!");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawScore () {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height);            
	drawBricks()
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();

	if(y + dy < ballWidth / 2) {
		dy = -dy;
	} else if (y + dy > canvas.height-ballHeight) {
		if(x + (ballWidth/2) > paddleX && x + (ballWidth/2) < paddleX + paddleWidth) {
			dy = -dy;
            drawCat();                                                       
		} else {
			lives--;                 
			if(!lives) {   
                drawXCat();
                // to do!!!                
				alert("GAME OVER!");                
                drawXCat();
				document.location.reload();
			} else {
				x = canvas.width/2;
				y = canvas.height-100;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width-paddleWidth)/2;
                drawCat();
			}
		}
	}
	/*if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}*/
    if(x + dx > canvas.width-ballWidth || x + dx < ballWidth) {
		dx = -dx;
	}

	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 7;
	}

	x += dx;
	y += dy;
    
	requestAnimationFrame(draw);
}

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2) {
		paddleX = relativeX - paddleWidth/2;
	}
}

function drawCat() {
    var image = document.getElementById('cat');                    
    image.src = "cat.png";
}

function drawHappyCat() {
    var image = document.getElementById('cat');                    
    image.src = "cat-happy.png"   
}

function drawXCat() {
    var image = document.getElementById('cat');                    
    image.src = "cat-dead.png";    
}

drawCat(); 
draw();
