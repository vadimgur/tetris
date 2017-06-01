//Author: Vadim

function ScorePane(where) {
	this.where = document.getElementById(where);
	this.stageId = 'stage'+ Math.floor(Math.random() * 10);
	this.scoreId = 'score'+ Math.floor(10 + (Math.random() * 10));
	this.score = 0;
	this.stage = 1;
	this.stageTimes = [1000, 700, 500, 400, 330, 250, 200, 140, 110, 95, 90, 85, 80, 75, 70]; //millis
	this.stageQualifier = 1000; //points
}

ScorePane.prototype.Init = function() {
	var htm = [];
	htm[htm.length] = '<table width=250><tr><td>';
	htm[htm.length] = '<b>Level: </b><span id="'+ this.stageId+ '">1</span>';
	htm[htm.length] = '&nbsp;&nbsp;&nbsp;&nbsp;<b>Score: </b><span id="'+ this.scoreId+ '">0</span>';
	htm[htm.length] = '</td></tr><tr><td valign=top><br><table border=1>';
	
	for (var i=0; i<4; i++) {
		htm[htm.length] = '<tr height=20>';
		for (var j=0; j<4; j++) {
			htm[htm.length] = '<td width=20 id=score';
			htm[htm.length] = ''+ j+ '_'+ i;
			htm[htm.length] = '>&nbsp;</td>';
		}
		htm[htm.length] = '</tr>';
	}			

	htm[htm.length] = '</table>';
	htm[htm.length] = '</td></tr></table>';
	this.where.innerHTML = htm.join('');
}

ScorePane.prototype.Reset = function() {
	this.score = 0;
	this.stage = 1;
	document.getElementById(this.scoreId).innerHTML = '0';
	document.getElementById(this.stageId).innerHTML = '1';
}

ScorePane.prototype.AddToScore = function(points) {
	this.score += points;
	if (this.score >= this.stage * this.stageQualifier) {
		this.stage++;
		document.getElementById(this.stageId).innerHTML = this.stage;
	}
	document.getElementById(this.scoreId).innerHTML = this.score;
}

ScorePane.prototype.GetScore = function() {
	return this.score;
}

ScorePane.prototype.GetStage = function() {
	return this.stage;
}

ScorePane.prototype.SetNextShape = function(shape) {
	for (var i=0; i<4; i++)
		for (var j=0; j<4; j++)
			document.getElementById('score'+ i+ '_'+ j).style.backgroundColor = 'white';
	for (var i=0; i<shape.cells.length; i++) {
		var c = shape.cells[i];
		document.getElementById('score'+ c.x+ '_'+ c.y).style.backgroundColor = shape.GetColor();
	}
}

ScorePane.prototype.GetStageTime = function() {
	return this.stageTimes[this.stage-1];
}