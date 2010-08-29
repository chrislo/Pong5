var canvas = document.getElementById('game');
var board = canvas.getContext('2d');

var paddle = (function() {
  var currentPosition = 120;
  var paddleHeight = 50;
  return {
    moveUp: function() {
      if ( currentPosition - 20 >= 0 ) { 
        currentPosition = currentPosition - 20;
      }
    },
    moveDown: function() {
      if ( (currentPosition + paddleHeight + 20) <= canvas.height ) { 
        currentPosition = currentPosition + 20;
      }
    },
    draw: function() {
      board.fillRect(20, currentPosition, 20, paddleHeight);    
    }
  };
})();

var ball = (function() {
  var currentX = 200;
  var currentY = 150;                                    
  var currentdX = 5; 
  var currentdY = 5;

  function checkCollision() {
    checkWallCollision();
  }                                    
  function checkWallCollision() {
    if (currentX < 0 || currentX > canvas.width) { 
      currentdX = -currentdX; 
      currentdY = +currentdY; 
    }
    else if (currentY < 0 || currentY > canvas.height) { 
      currentdX = +currentdX; 
      currentdY = -currentdY; 
    }
  }
  function calculateNewPosition() {
    currentX = currentX + currentdX;
    currentY = currentY + currentdY;
  }

  return {
    move: function() {
      checkCollision();                                    
      calculateNewPosition();
      board.fillRect(currentX, currentY, 5, 5);
    },
  }

})();

function init() {
  setInterval(tick, 40);
  document.onkeydown = processKeyEvent; 
}

function clear(c) {
  c.clearRect(0, 0, canvas.width, canvas.height);
}

function tick() {
  clear(board);
  paddle.draw();
  ball.move();
}

function processKeyEvent(e) {
  // http://unixpapa.com/js/key.html
  if(e.keyCode == '38') { paddle.moveUp(); } // up arrow
  if(e.keyCode == '40') { paddle.moveDown(); } // down arrow 
}

