//Author: Vadim

function ShapeGenerator() {
	this.types = [Square, Line, Resh, ReverseResh, ZigZag, ReverseZigZag, TBar];
	this.shapes = [];
}
ShapeGenerator.prototype.Generate = function(x, y) {
	var index = Math.floor(this.types.length * Math.random());
	var newShape = new this.types[index]();
	newShape.Move(x, y);
	this.shapes[this.shapes.length] = newShape;
	return newShape;
}
