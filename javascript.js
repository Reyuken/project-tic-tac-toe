document.addEventListener("DOMContentLoaded", () => {

    let board = [
        "", "", "",
        "", "", "",
        "", "", "",
    ]
    let currentPlayer = "x";
    let gameOver = false;

    //displays the board in console
    function displayBoard() {
        for (i = 0; i<9 ; i++){
            document.getElementById(`btn${i}`).innerHTML = board[i];
        }
    }
    //disable buttons
    function stopGame() {
        for (i = 0; i<9 ; i++){
            document.getElementById(`btn${i}`).disabled = true;
        }
    }
    //reset game
    document.getElementById("reset").addEventListener("click",()=>{
        for (i = 0; i<9 ; i++){
            board[i] = "";
            document.getElementById(`btn${i}`).innerHTML = board[i];
            document.getElementById(`btn${i}`).disabled = false;
        }
        console.log("reset");
        return;
    }
        
    )

    //places player move if position is empty
    function makeMove(position) {
        if (board[position] === "") {
            board[position] = currentPlayer;
            return true;
        }
        return false;
    }

    //function to loop the winpatterns and return the winning mark
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //row wins
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //column wins
            [0, 4, 8], [2, 4, 6] //diagonal wins
        ];
        for (let combo of winPatterns) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }
    //checks if every cell is full and there are no winning patterns for tie
    function checkTie() {
        return board.every(cell => cell !=="" && !checkWinner());

    }

    //player turn
    function playTurn(position) {
        if (!makeMove(position)) return;    //if move is invalid, do nothing
        displayBoard();                     //display the move in console
        const winner = checkWinner();       //runs checkWinner function
        if (winner){                        //if there is a winning pattern,
            console.log(`${winner} wins!`); // congratulate
            stopGame();                //game ends
            return;
        }

        if (checkTie()){                    //if tie
            console.log("its a tie");       //display tie
            stopGame();                //game ends
            return;
        }

        currentPlayer = currentPlayer === "x" ? "0" :"x";   //changes player from x to 0
        return currentPlayer;
    }

    //enables button interaction 
for (let buttonID=0; buttonID<9 ;buttonID++){
    document.getElementById(`btn${buttonID}`).addEventListener("click",()=>{
        playTurn(buttonID);
    });
}



})