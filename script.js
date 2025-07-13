const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');

const game = new Chess();

const onDragStart = (source, piece) => {
  if (game.game_over() || 
     (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
     (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

const onDrop = (source, target) => {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  updateStatus();
};

const onSnapEnd = () => {
  board.position(game.fen());
};

const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDragStart,
  onDrop,
  onSnapEnd
});

const updateStatus = () => {
  let status = '';
  const moveColor = game.turn() === 'w' ? 'White' : 'Black';

  if (game.in_checkmate()) {
    status = `Game over, ${moveColor} is in checkmate.`;
  } else if (game.in_draw()) {
    status = 'Game over, drawn position.';
  } else {
    status = `${moveColor} to move`;

    if (game.in_check()) {
      status += `, ${moveColor} is in check.`;
    }
  }

  statusEl.innerHTML = status;
};

updateStatus();
