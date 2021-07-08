var block_size = 40;
var cell_empty = 0;
var cell_body = 1;
var cell_head = 2;
var left = 0;
var down = 1;
var right = 2;
var up = 3;
var board;
var visited;
var score = 0;
var remain = 1;

function calBlockSize(size, dev_width) {
	block_size = Math.floor(dev_width / size) - 8;
	block_size = Math.min(40, block_size);
}

function initBoard(size) {
	board = [];
	visited = [];

	for (var i = 0; i < size; ++i) {
		row = [];
		visited_row = [];

		for (var j = 0; j < size; ++j) {
			row.push(cell_empty);
			visited_row.push(false);
		}

		board.push(row);
		visited.push(visited_row);
	}
}

function checkAircraftValid(head_direction, i_center, j_center) {
	if (head_direction == left) {
		return board[i_center][j_center] == cell_empty &&
			board[i_center][j_center - 1] == cell_empty &&
			board[i_center - 1][j_center] == cell_empty &&
			board[i_center - 2][j_center] == cell_empty &&
			board[i_center + 1][j_center] == cell_empty &&
			board[i_center + 2][j_center] == cell_empty &&
			board[i_center][j_center + 1] == cell_empty &&
			board[i_center][j_center + 2] == cell_empty &&
			board[i_center - 1][j_center + 2] == cell_empty &&
			board[i_center + 1][j_center + 2] == cell_empty;
	} else if (head_direction == right) {
		return board[i_center][j_center] == cell_empty &&
			board[i_center][j_center + 1] == cell_empty &&
			board[i_center - 1][j_center] == cell_empty &&
			board[i_center - 2][j_center] == cell_empty &&
			board[i_center + 1][j_center] == cell_empty &&
			board[i_center + 2][j_center] == cell_empty &&
			board[i_center][j_center - 1] == cell_empty &&
			board[i_center][j_center - 2] == cell_empty &&
			board[i_center - 1][j_center - 2] == cell_empty &&
			board[i_center + 1][j_center - 2] == cell_empty;
	} else if (head_direction == up) {
		return board[i_center][j_center] == cell_empty &&
			board[i_center - 1][j_center] == cell_empty &&
			board[i_center][j_center - 1] == cell_empty &&
			board[i_center][j_center - 2] == cell_empty &&
			board[i_center][j_center + 1] == cell_empty &&
			board[i_center][j_center + 2] == cell_empty &&
			board[i_center + 1][j_center] == cell_empty &&
			board[i_center + 2][j_center] == cell_empty &&
			board[i_center + 2][j_center - 1] == cell_empty &&
			board[i_center + 2][j_center + 1] == cell_empty;
	} else if (head_direction == down) {
		return board[i_center][j_center] == cell_empty &&
			board[i_center + 1][j_center] == cell_empty &&
			board[i_center][j_center - 1] == cell_empty &&
			board[i_center][j_center - 2] == cell_empty &&
			board[i_center][j_center + 1] == cell_empty &&
			board[i_center][j_center + 2] == cell_empty &&
			board[i_center - 1][j_center] == cell_empty &&
			board[i_center - 2][j_center] == cell_empty &&
			board[i_center - 2][j_center - 1] == cell_empty &&
			board[i_center - 2][j_center + 1] == cell_empty;
	}

	return false;
}

function createAircraftImpl(size) {
	var head_direction = Math.floor(Math.random() * 4);
	var i_start = (head_direction == up) ? 1 : 2;
	var i_end = (head_direction == down) ? (size - 2) : (size - 3);
	var j_start = (head_direction == left) ? 1 : 2;
	var j_end = (head_direction == right) ? (size - 2) : (size - 3);
	var i_center = Math.floor(Math.random() * (i_end - i_start)) + i_start;
	var j_center = Math.floor(Math.random() * (j_end - j_start)) + j_start;

	if (!checkAircraftValid(head_direction, i_center, j_center)) {
		return false;
	}

	if (head_direction == left) {
		board[i_center][j_center] = cell_body;
		board[i_center][j_center - 1] = cell_head;
		board[i_center - 1][j_center] = cell_body;
		board[i_center - 2][j_center] = cell_body;
		board[i_center + 1][j_center] = cell_body;
		board[i_center + 2][j_center] = cell_body;
		board[i_center][j_center + 1] = cell_body;
		board[i_center][j_center + 2] = cell_body;
		board[i_center - 1][j_center + 2] = cell_body;
		board[i_center + 1][j_center + 2] = cell_body;
	} else if (head_direction == right) {
		board[i_center][j_center] = cell_body;
		board[i_center][j_center + 1] = cell_head;
		board[i_center - 1][j_center] = cell_body;
		board[i_center - 2][j_center] = cell_body;
		board[i_center + 1][j_center] = cell_body;
		board[i_center + 2][j_center] = cell_body;
		board[i_center][j_center - 1] = cell_body;
		board[i_center][j_center - 2] = cell_body;
		board[i_center - 1][j_center - 2] = cell_body;
		board[i_center + 1][j_center - 2] = cell_body;
	} else if (head_direction == up) {
		board[i_center][j_center] = cell_body;
		board[i_center - 1][j_center] = cell_head;
		board[i_center][j_center - 1] = cell_body;
		board[i_center][j_center - 2] = cell_body;
		board[i_center][j_center + 1] = cell_body;
		board[i_center][j_center + 2] = cell_body;
		board[i_center + 1][j_center] = cell_body;
		board[i_center + 2][j_center] = cell_body;
		board[i_center + 2][j_center - 1] = cell_body;
		board[i_center + 2][j_center + 1] = cell_body;
	} else {
		board[i_center][j_center] = cell_body;
		board[i_center + 1][j_center] = cell_head;
		board[i_center][j_center - 1] = cell_body;
		board[i_center][j_center - 2] = cell_body;
		board[i_center][j_center + 1] = cell_body;
		board[i_center][j_center + 2] = cell_body;
		board[i_center - 1][j_center] = cell_body;
		board[i_center - 2][j_center] = cell_body;
		board[i_center - 2][j_center - 1] = cell_body;
		board[i_center - 2][j_center + 1] = cell_body;
	}

	return true;
}

function createAircraft(size, number) {
	while (number > 0) {
		if (!createAircraftImpl(size)) {
			continue;
		}
		number -= 1;
	}
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	this.moveTo(x + r, y);
	this.arcTo(x + w, y, x + w, y + h, r);
	this.arcTo(x + w, y + h, x, y + h, r);
	this.arcTo(x, y + h, x, y, r);
	this.arcTo(x, y, x + w, y, r);
	return this;
}

function showScore(value) {
	var grid = document.getElementById('grid');
	var ctx = grid.getContext('2d');
	var titlebar_height = block_size * 1.5;
	var text = "Score: " + value;

	ctx.clearRect(0, 0, block_size * 4 + 12, titlebar_height);
	ctx.fillStyle = "#90a4ae";
	ctx.beginPath();
	ctx.roundRect(0, 0, block_size * 4 + 12, titlebar_height, 10);
	ctx.fill();
	ctx.closePath();
	ctx.font = "20pt Arial";
	ctx.fillStyle = "#263238";
	ctx.fillText(text, block_size * 2 + 6 - ctx.measureText(text).width / 2, titlebar_height / 2 + 6);
}

function showRemain(value) {
	var grid = document.getElementById('grid');
	var ctx = grid.getContext('2d');
	var titlebar_height = block_size * 1.5;
	var text = "Remain: " + value;

	ctx.clearRect(block_size * 4 + 16, 0, block_size * 4 + 12, titlebar_height);
	ctx.fillStyle = "#90a4ae";
	ctx.beginPath();
	ctx.roundRect(block_size * 4 + 16, 0, block_size * 4 + 12, titlebar_height, 10);
	ctx.fill();
	ctx.closePath();
	ctx.font = "20pt Arial";
	ctx.fillStyle = "#263238";
	ctx.fillText(text, block_size * 4 + 16 + block_size * 2 + 6 - ctx.measureText(text).width / 2, titlebar_height / 2 + 6);
}

function gridEventHandle(event) {
	var grid = document.getElementById('grid');
	var ctx = grid.getContext('2d');
	var titlebar_height = block_size * 1.5;
	var gridLeft = grid.offsetLeft + grid.clientLeft;
	var gridTop = grid.offsetTop + grid.clientTop;
	var click_x = event.pageX - gridLeft;
	var click_y = event.pageY - gridTop;
	var i;
	var j;
	var color_mapping = [
		'#eceff1', // cell_empty
		'#1565c0', // cell_body
		'#c2185b'  // cell_head
	];
	var color;

	if (click_y <= (titlebar_height + 4)) {
		if (click_x >= block_size * 8 + 32) {
			startGame();
			return;
		}
	}

	if (remain == 0) {
		startGame();
		return;
	}

	i = Math.floor((click_y - titlebar_height + 4) / (block_size + 4));
	j = Math.floor(click_x / (block_size + 4));

	color = color_mapping[board[i][j]]
	if (visited[i][j]) {
		return;
	}
	visited[i][j] = true;

	score += 1;
	showScore(score);

	ctx.beginPath();
	ctx.rect(j * (block_size + 4), i * (block_size + 4) + titlebar_height + 4, block_size, block_size);
	ctx.fillStyle = color;
	ctx.fill();

	if (board[i][j] == cell_head) {
		remain -= 1;
		showRemain(remain);
	}
}

function initGrid(size) {
	var grid = document.getElementById('grid');
	var ctx = grid.getContext('2d');
	var titlebar_height = block_size * 1.5;

	ctx.canvas.width = size * (block_size + 4);
	ctx.canvas.height = size * (block_size + 4);
	ctx.canvas.height += titlebar_height + 4;
}

function drawReset() {
	var grid = document.getElementById('grid');
	var ctx = grid.getContext('2d');
	var titlebar_height = block_size * 1.5;
	var reset_text = "Reset";

	ctx.fillStyle = "#90a4ae";
	ctx.beginPath();
	ctx.roundRect(block_size * 8 + 32, 0, block_size * 2 + 4, titlebar_height, 10);
	ctx.fill();
	ctx.closePath();

	ctx.font = "20pt Arial";
	ctx.fillStyle = "#263238";
	ctx.fillText(reset_text, block_size * 8 + 32 + block_size + 2 - ctx.measureText(reset_text).width / 2, titlebar_height / 2 + 6);
}

function drawGrid(size) {
	var grid = document.getElementById('grid');
	var ctx = grid.getContext('2d');
	var titlebar_height = block_size * 1.5;

	ctx.fillStyle = "#546e7a";
	ctx.beginPath();
	for (var x = 0, i = 0; i < size; x += (block_size + 4), i++) {
		for (var y = 0, j = 0; j < size; y += (block_size + 4), j++) {
			ctx.rect(x, y + titlebar_height + 4, block_size, block_size);
		}
	}
	ctx.fill();
	ctx.closePath();

	grid.addEventListener('click', gridEventHandle, false);
}

function startGame() {
	finish = false;
	score = 0;
	remain = 2;
	calBlockSize(10, (window.innerWidth > 0) ? window.innerWidth : screen.width);
	initBoard(10);
	createAircraft(10, remain);
	initGrid(10);
	drawReset();
	drawGrid(10);
	showScore(score);
	showRemain(remain);
}
