

let board, turn, winner;
const COLORS = {
    '0': 'white',
    '1': '#F3A346',
    '-1': '#17A598'
}

const LETTERS = {
    null: ' ',
    '1': 'X',
    '-1': 'O'
}

//LETTERS[2].style.color = 'white';

let squares = document.querySelectorAll(".board div");
const msgEl = document.getElementById('msg');

//initializer function
init();
function init() {
    board = [null, null, null, null, null, null, null, null, null]
    turn = 1;
    winner = null
    render();
}

function render() {
    board.forEach(function(sqr, idx) {
        squares[idx].style.backgroundColor = COLORS[sqr];
        squares[idx].innerHTML = LETTERS[sqr];

    })
    document.querySelector('.board').addEventListener('click', handleClick);

    //render the message
    if (winner === 'T') {
        msgEl.innerHTML = "you've got a tie!"
    } else if(winner){
        msgEl.innerHTML = `Congratulations ${COLORS[winner] === '#F3A346' ? "X" : "O"} ! 🎉⚡️`;
    } else {
        msgEl.innerHTML =  `${COLORS[turn] === '#F3A346' ? "X" : "O"}'s Turn`;
    }
}




// //change turns, place player's marker, see if there is a winner
function handleClick(evt) { 
    //get index of sqaure clicked
    let idx = parseInt(evt.target.id.replace('sq', ''));
    console.log(idx);

    //check if the square is taken, return of it is
    if(board[idx]) return; 
    //set value to current player
    board[idx] = turn
    //switch players
    turn *= -1;

    //check for winner
    winner = getWinner();

    render();
}

const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function getWinner() {
    //check 8 possible wins
    for(let i = 0; i < WINNING_COMBOS.length; i++) {
        if(Math.abs(
            board[ WINNING_COMBOS[i][0] ] +
            board[ WINNING_COMBOS[i][1] ] +
            board[ WINNING_COMBOS[i][2] ]) === 3) {
                return board[WINNING_COMBOS[i][0]]
            }
    }
    if(board.includes(null)) return null;
    return 'T';
}



//code for reset button
let reset = document.getElementById('reset-button');
//event listener
reset.addEventListener('click', refresh);
//function
function refresh() {
    window.location.reload();
}