var canvas = document.querySelector("canvas");
canvas.width = 0.9 * window.innerWidth;
canvas.height = 0.9 * window.innerHeight;

var ctx = canvas.getContext("2d");

function Circle(x, y, r, sx, sy, color){
    this.x = x;
    this.y = y;
    this.r = r;
    this.sx = sx;
    this.sy = sy;
    this.color = color;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    this.checkCollisions = function(){
        if(this.x >= canvas.width - this.r || this.x <= this.r)  this.sx = -this.sx;
        if(this.y >= canvas.height - this.r || this.y <= this.r)  this.sy = -this.sy;

    }
    this.checkInteraction = function(){
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
         && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.r < 100){
             this.r += 1;
         }
         else if(this.r > 2) this.r -= 1;
         
    }
    this.update = function(){
        this.draw();
        this.checkCollisions();
        this.checkInteraction();
        this.x += this.sx;
        this.y += this.sy;
    }
}

var mouse = {
    x : undefined,
    y : undefined
};

var arrC = [];

for (var i = 0; i <= 500; i++){
    var r = 50;
    var x = Math.random() * (canvas.width - r*4) + r*2;
    var y = Math.random() * (canvas.height - r*4) + r*2;
    var speed = Math.random() * 3;
    var sx = speed * Math.floor(Math.random() * 2 - 1);
    if (sx == 0) sx = speed;
    var sy = speed * Math.floor(Math.random() * 2 - 1);
    if (sy == 0) sy = speed;
    var colR = Math.floor(Math.random() * 255);
    var colG = Math.floor(Math.random() * 255);
    var colB = Math.floor(Math.random() * 255);
    var col = "rgb(";
    col = col.concat(colR.toString(), ",", colG.toString(), ",", colB.toString(), ")");
    arrC.push(new Circle(x, y, r, sx, sy, col));
}

var isEnd = false;

function stop(){
    isEnd = true;
}
function start(){
    isEnd = false;
    animate();
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < arrC.length; i++){
        arrC[i].update();
    }
    if(isEnd) return 0;
    
    requestAnimationFrame(animate);

}

window.addEventListener('mousedown', function(){
    if(isEnd) start();
    else stop();
});

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
});


animate();