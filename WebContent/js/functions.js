//Author: Vadim

var gc, sc, gX, gY, gameover;

function Init(x, y) {
	gX = x;
	gY = y;
	var htm = ['<table border=1>'];
	var tr = '<tr height=20>';
	var td = '<td width=20 id=';
	var ctr = '</tr>';
	var ctd = '</td>';
	
	for (var i=0; i<y; i++) {
		htm[htm.length] = tr;
		for (var j=0; j<x; j++) {
			htm[htm.length] = td;
			htm[htm.length] = j;
			htm[htm.length] = '_';
			htm[htm.length] = i;
			htm[htm.length] = '>';
			htm[htm.length] = '&nbsp;';
			htm[htm.length] = ctd;
		}
		htm[htm.length] = ctr;
	}
	htm[htm.length] = '</table>';
	document.getElementById('court').innerHTML = htm.join('');
	sc = new ScorePane('score');
	sc.Init();
	gameover = new GlobalMessage('gameover');

	// test webserver
	$.ajax({
	    url: "test",
	    type: "get",
	    dataType: "json",
	    success: function(data, status) {
            //alert("Data: " + data + "\nStatus: " + status);
        }
    });
}

function Start() {
	document.getElementById('startbtn').blur();
	if (!gc) {
		gc = new GameController('gc');
		gc.SetScorePane(sc);
		gc.SetMessenger(gameover);
	}
	gc.Start();
}

function CClick() {
	gc.CatchClick();
}


