var block_size = 40;
var cell_empty = 0;
var cell_body = 1;
var cell_head = 2;
var left = 0;
var down = 1;
var right = 2;
var up = 3;
var board;
var finish = false;

function calBlockSize(size, dev_width) {
	block_size = Math.floor(dev_width / size) - 8;
	block_size = Math.min(40, block_size);
}

function initBoard(size) {
	board = [];

	for (var i = 0; i < size; ++i) {
		row = [];

		for (var j = 0; j < size; ++j) {
			row.push(cell_empty);
		}

		board.push(row);
	}
}

function createAircraft(size, aircraft_size) {
	var head_direction = Math.floor(Math.random() * 4);
	var i_start = ((head_direction == up) ? 1 : 3) - 1;
	var i_end = ((head_direction == down) ? (size - 1) : (size - 3)) - 1;
	var j_start = ((head_direction == left) ? 1 : 3) - 1;
	var j_end = ((head_direction == right) ? (size - 1) : (size - 3)) - 1;
	var i_center = Math.floor(Math.random() * (i_end - i_start)) + i_start;
	var j_center = Math.floor(Math.random() * (j_end - j_start)) + j_start;

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
}

function gridEventHandle(event) {
	var grid = document.getElementById('grid');
	var ctx = grid.getContext('2d');
    var gridLeft = grid.offsetLeft + grid.clientLeft;
	var gridTop = grid.offsetTop + grid.clientTop;
	var i = Math.floor((event.pageY - gridTop) / (block_size + 4));
	var j = Math.floor((event.pageX - gridLeft) / (block_size + 4));
	var color_mapping = [
		'#eceff1',
		'#1565c0',
		'#c2185b'
	];
	var color = color_mapping[board[i][j]];


	if (finish) {
		startGame();
		return;
	}

	ctx.beginPath();
	ctx.rect(j * (block_size + 4), i * (block_size + 4), block_size, block_size);
	ctx.fillStyle = color;
	ctx.fill();

	finish = (board[i][j] == cell_head);
}

function drawGrid(size) {
	var grid = document.getElementById('grid');
	var ctx = grid.getContext('2d');

	ctx.canvas.width = size * (block_size + 4);
	ctx.canvas.height = size * (block_size + 4);
	ctx.fillStyle = "#546e7a";
	ctx.beginPath();
	for (var x = 0, i = 0; i < size; x += (block_size + 4), i++) {
		for (var y = 0, j=0; j < size; y += (block_size + 4), j++) {
			ctx.rect(x, y, block_size, block_size);
		}
	}
	ctx.fill();
	ctx.closePath();

	grid.addEventListener('click', gridEventHandle, false);
}

function startGame() {
	finish = false;
	calBlockSize(10, (window.innerWidth > 0) ? window.innerWidth : screen.width);
	drawGrid(10);
	initBoard(10);
	createAircraft(10);
}
