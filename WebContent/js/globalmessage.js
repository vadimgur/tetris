//Author: Vadim

function GlobalMessage(where) {
	this.me = document.getElementById(where);
	this.me.style.top = -201;
	this.me.style.left = -201;
	this.msgId = 'msg'+ where;

	var htm = '<table border=1 width=260 height=70 bgcolor="red"><tr>';
	htm += '<td align=center valign=center>';
	htm += '<div id="'+ this.msgId+ '" style="color:yellow; font-weight:bold; font-size:20pt; font-family: Verdana">kuku</div>';
	htm += '</td></tr></table>';	

	document.getElementById(where).innerHTML = htm;
}

GlobalMessage.prototype.Display = function (msg) {
	this.me.style.top = 200;
	this.me.style.left = 70;
	document.getElementById(this.msgId).innerHTML = msg;
	this.whatCaughtBefore = document.body.onkeydown;
	document.body.onkeydown = ClickyClicky;
}

GlobalMessage.prototype.Hide = function () {
	this.me.style.top = -201;
	this.me.style.left = -201;
	if (this.whatCaughtBefore) {
		document.body.onkeydown = this.whatCaughtBefore;
		this.whatCaughtBefore();
	}
}

function ClickyClicky() {
	if (event.keyCode == 13 || event.keyCode == 27)
		gameover.Hide();
}