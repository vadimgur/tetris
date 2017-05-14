//Author: Vadim

function GameController(ref) {
	this.ref = ref;
	this.shapeGenerator = new ShapeGenerator();
	this.stoned = {};
	this.draw = [];
}

GameController.prototype.SetScorePane = function(pane) {
	this.score = pane;
}

GameController.prototype.SetMessenger = function(msgr) {
	this.msgr = msgr;
}

GameController.prototype.Start = function() {
	this.msgr.Hide();
	if (typeof(this.tm) != 'undefined')
		clearTimeout(this.tm);
		
	this.score.Reset();
	this.currentStageTime = this.score.GetStageTime();
	this.stoned = {};
	for (var i=0; i<gX; i++)
		for (var j=0; j<gY; j++)
			document.getElementById(''+ i+ '_'+ j).style.backgroundColor = 'white';
	
	this.currentShape = this.shapeGenerator.Generate(3, -1);
	this.nextShape = this.shapeGenerator.Generate(3, -1);
	this.score.SetNextShape(this.nextShape);
	document.body.onkeydown = CClick;
	this.Move();
}


GameController.prototype.Draw = function() {
	for (var i=0; i<this.draw.length; i++)
		this.draw[i].style.backgroundColor = 'white';
	this.draw = [];
	
	for (var i=0; i<this.currentShape.cells.length; i++) {
		var c = this.currentShape.cells[i];
		var ind = ''+ (this.currentShape.getX()+c.x)+ '_'+ (this.currentShape.getY()+c.y);
		var d = document.getElementById(ind);
		if (d) {
			d.style.backgroundColor = this.currentShape.GetColor();
			this.draw[this.draw.length] = d;
		}
	}
}

GameController.prototype.Move = function() {
	this.moving = true;
	if (this.CanDraw()) {
		this.currentShape.Move(this.currentShape.getX(), this.currentShape.getY()+1);
		this.Draw();
		this.tm = setTimeout(this.ref+ '.Move()', this.currentStageTime);
		this.moving = false;
	} else {
		
		if (this.currentShape.getY() == 0) {
			this.moving = true;
			delete this.tm;
			this.msgr.Display('Game Over');
			return;
		}

		for (var i=0; i<this.draw.length; i++)
			this.stoned[''+ this.draw[i].id] = this.draw[i].style.backgroundColor;
		this.draw = [];
		
		this.Scan();
		this.score.AddToScore(10);
		this.currentStageTime = this.score.GetStageTime();
		this.SwapShapes();
		this.Move();
	}
}

GameController.prototype.SwapShapes = function() {
	this.currentShape = this.nextShape;
	this.nextShape = this.shapeGenerator.Generate(3, -1);
	this.score.SetNextShape(this.nextShape);
}

GameController.prototype.CanDraw = function() {
	var border = this.currentShape.getDownBorder();		
	for (var i=0; i<border.length; i++)
		if (border[i].y==(gY-1) || this.stoned[''+ border[i].x+ '_'+ (border[i].y+1)]) {
			return false;
		}
	return true;
}

GameController.prototype.Scan = function() {
	var howMany = 0;
	for (var j=gY-1; j>=0; j--) {
		var wholerow = true;
		for (var i=0; i<gX; i++) {
			var ind = ''+ i+ '_'+ j;
			if (!this.stoned[ind]) {
				wholerow = false;
				break;
			}
		}
		if (wholerow) {
			this.CleanRow(j++);
			howMany++;
		}
	}
	if (howMany)
		this.score.AddToScore(((2 * howMany) - 1) * 100);
}

GameController.prototype.CleanRow = function(row) {
	var shouldDoAbove = false;
	for (var i=0; i<gX; i++) {
		var ind = ''+ i+ '_'+ row;
		var above = ''+ i+ '_'+ (row-1);
		delete this.stoned[ind];
		var d = document.getElementById(ind);
		if (this.stoned[above]) {
			shouldDoAbove = true;
			d.style.backgroundColor = this.stoned[above];
			document.getElementById(above).style.backgroundColor = 'white';
			this.stoned[ind] = this.stoned[above];
		} else {
			d.style.backgroundColor = 'white';
		}
	}
	if (shouldDoAbove)
		this.CleanRow(row-1);
}

GameController.prototype.Playing = function() {
	return typeof(this.tm) != 'undefined';
}

GameController.prototype.Pause = function() {
	if (!this.pause) {
		if (typeof(this.tm) != 'undefined')
			clearTimeout(this.tm);
		this.msgr.Display('Paused');
	} else {
		this.tm = setTimeout(this.ref+ '.Move()', this.currentStageTime);
	}
	this.pause = !this.pause;
}

GameController.prototype.ShootDown = function() {
	if (typeof(this.tm) != 'undefined')
		clearTimeout(this.tm);
	delete this.tm;
	var border = this.currentShape.getDownBorder();
	
	var y = this.currentShape.getY();
	var whereY = gY-1;
	for (var c=0; c<border.length; c++) {
		var i = border[c].y;

		for (; i<gY+1; i++)
			if (this.stoned[''+ border[c].x+ '_'+ i] || i == gY) {
				whereY = Math.min(y + ((i-1)-border[c].y), whereY);
				break;
			}
	}
	this.currentShape.Move(this.currentShape.getX(), whereY);
	this.Draw();
	this.Move();
}

GameController.prototype.CanRotate = function() {
	var cells = this.currentShape.RotatePreview();
	for (var i=0; i<cells.length; i++) {
		var x = this.currentShape.getX() + cells[i].x;
		var y = this.currentShape.getY() + cells[i].y;
		if (this.stoned[''+ x+ '_'+ y] ||
				x < 0 || x >= gX || y >= gY)
			return false;
	}
	return true;
}

GameController.prototype.CatchClick = function() {
	event.cancelBubble = true;
	switch(event.keyCode) {
		case 37:
			var border = this.currentShape.getLeftBorder();
			for (var i=0; i<border.length; i++)
				if (!border[i].x || this.stoned[''+ (border[i].x-1)+ '_'+ border[i].y])
					return;
			this.currentShape.Move(this.currentShape.getX()-1, this.currentShape.getY());
			break;
		case 39:
			var border = this.currentShape.getRightBorder();
			for (var i=0; i<border.length; i++)
				if (border[i].x==(gX-1) || this.stoned[''+ (border[i].x+1)+ '_'+ border[i].y])
					return;
			this.currentShape.Move(this.currentShape.getX()+1, this.currentShape.getY());
			break;
		case 38:
			if (!this.moving && this.CanRotate())
				this.currentShape.Rotate();
			break;
		case 32:
			this.ShootDown();
			break;
		case 27:
		case 13:
			if (this.Playing())
				this.Pause();
			break;
		default:
			return;
	}
	this.Draw();
}
