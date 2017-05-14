//Author: Vadim

function Shape(cells) {
	this.x = 0;
	this.y = 0;
	this.angle = 0;
	this.originals = cells;
	this.cells = this.originals[this.angle];
}

Shape.prototype.CalculateBorders = function() {
	this.leftborder = [];
	this.rightborder = [];
	this.downborder = [];
	var left={}, right={}, down={};
	for (var i=0; i<this.cells.length; i++) {
		var x = this.x + this.cells[i].x;
		var y = this.y + this.cells[i].y;
		if (typeof(left[y]) == 'undefined' || left[y].x > x)
			left[y] = {x: x, y: y};
		if (typeof(right[y]) == 'undefined' || right[y].x < x)
			right[y] = {x: x, y: y};
		if (typeof(down[x]) == 'undefined' || down[x].y < y)
			down[x] = {x: x, y: y};
	}
	for (var i in left) this.leftborder[this.leftborder.length] = left[i];
	for (var i in right) this.rightborder[this.rightborder.length] = right[i];
	for (var i in down) this.downborder[this.downborder.length] = down[i];
}

Shape.prototype.Move = function(x, y) {
	this.setX(x);
	this.setY(y);
	this.CalculateBorders();
}

Shape.prototype.getX = function() {
	return this.x;
}

Shape.prototype.getY = function() {
	return this.y;
}

Shape.prototype.setX = function(x) {
	this.x = x;
}

Shape.prototype.setY = function(y) {
	this.y = y;
}

Shape.prototype.getLeftBorder = function() {
	return this.leftborder;
}

Shape.prototype.getRightBorder = function() {
	return this.rightborder;
}

Shape.prototype.getDownBorder = function() {
	return this.downborder;
}

Shape.prototype.GetNextAngle = function() {
	return this.angle? this.angle - 1: 3
}

Shape.prototype.RotatePreview = function() {
	return this.originals[this.GetNextAngle()];
}

Shape.prototype.Rotate = function() {
	this.angle = this.GetNextAngle();
	this.cells = this.originals[this.angle];
	this.CalculateBorders();
}


function Square(){}
Square.prototype = new Shape([
	[{x:0, y:0}, {x:1, y:0}, {x:0, y:1}, {x:1, y:1}],
	[{x:0, y:0}, {x:1, y:0}, {x:0, y:1}, {x:1, y:1}],
	[{x:0, y:0}, {x:1, y:0}, {x:0, y:1}, {x:1, y:1}],
	[{x:0, y:0}, {x:1, y:0}, {x:0, y:1}, {x:1, y:1}]
]);
Square.prototype.GetColor = function() {
	return 'orange';
}

function Line(){}
Line.prototype = new Shape([
	[{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}],
	[{x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:0, y:3}],
	[{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}],
	[{x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:0, y:3}]
]);
Line.prototype.GetColor = function() {
	return 'red';
}

function Resh(){}
Resh.prototype = new Shape([
	[{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:1, y:2}],
	[{x:2, y:0}, {x:0, y:1}, {x:1, y:1}, {x:2, y:1}],
	[{x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:1, y:2}],
	[{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:0, y:1}]
]);
Resh.prototype.GetColor = function() {
	return 'green';
}

function ReverseResh(){}
ReverseResh.prototype = new Shape([
	[{x:0, y:0}, {x:1, y:0}, {x:0, y:1}, {x:0, y:2}],
	[{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:2, y:1}],
	[{x:0, y:2}, {x:1, y:0}, {x:1, y:1}, {x:1, y:2}],
	[{x:0, y:0}, {x:0, y:1}, {x:1, y:1}, {x:2, y:1}]
]);
ReverseResh.prototype.GetColor = function() {
	return 'purple';
}

function ZigZag(){}
ZigZag.prototype = new Shape([
	[{x:0, y:0}, {x:0, y:1}, {x:1, y:1}, {x:1, y:2}],
	[{x:1, y:0}, {x:2, y:0}, {x:0, y:1}, {x:1, y:1}],
	[{x:0, y:0}, {x:0, y:1}, {x:1, y:1}, {x:1, y:2}],
	[{x:1, y:0}, {x:2, y:0}, {x:0, y:1}, {x:1, y:1}]
]);
ZigZag.prototype.GetColor = function() {
	return 'black';
}

function ReverseZigZag(){}
ReverseZigZag.prototype = new Shape([
	[{x:0, y:1}, {x:0, y:2}, {x:1, y:0}, {x:1, y:1}],
	[{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:1}],
	[{x:0, y:1}, {x:0, y:2}, {x:1, y:0}, {x:1, y:1}],
	[{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:1}]
]);
ReverseZigZag.prototype.GetColor = function() {
	return 'brown';
}

function TBar(){}
TBar.prototype = new Shape([
	[{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:1, y:1}],
	[{x:0, y:1}, {x:1, y:0}, {x:1, y:1}, {x:1, y:2}],
	[{x:1, y:0}, {x:0, y:1}, {x:1, y:1}, {x:2, y:1}],
	[{x:0, y:0}, {x:1, y:1}, {x:0, y:1}, {x:0, y:2}]
]);
TBar.prototype.GetColor = function() {
	return 'blue';
}
