document.addEventListener('DOMContentLoaded', function() {
            // Get elements
            const playerInputSection = document.getElementById('player-input');
            const gameBoardSection = document.getElementById('game-board');
            const messageDiv = document.getElementById('message');
            const board = document.getElementById('board');
            const submitBtn = document.getElementById('submit');
            const resetBtn = document.getElementById('reset');
            
            // Game state variables
            let currentPlayer = 1;
            let player1Name = '';
            let player2Name = '';
            let gameBoard = ['', '', '', '', '', '', '', '', ''];
            let gameActive = false;
            let moveCount = 0;
            
            // Winning combinations
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                [0, 4, 8], [2, 4, 6]             // diagonals
            ];
            
            // Start game when submit button is clicked
            submitBtn.addEventListener('click', startGame);
            
            // Reset game when reset button is clicked
            resetBtn.addEventListener('click', resetGame);
            
            // Function to start the game
            function startGame() {
                player1Name = document.getElementById('player1').value || 'Player 1';
                player2Name = document.getElementById('player2').value || 'Player 2';
                
                // Hide input section and show game board
                playerInputSection.style.display = 'none';
                gameBoardSection.style.display = 'block';
                resetBtn.style.display = 'none';
                
                // Initialize game
                gameActive = true;
                moveCount = 0;
                currentPlayer = 1;
                gameBoard = ['', '', '', '', '', '', '', '', ''];
                
                // Clear the board
                document.querySelectorAll('.cell').forEach(cell => {
                    cell.textContent = '';
                    cell.classList.remove('x', 'o', 'winning-cell');
                });
                
                // Display initial message
                updateMessage();
                
                // Add event listeners to cells
                document.querySelectorAll('.cell').forEach(cell => {
                    cell.addEventListener('click', cellClicked);
                });
            }
            
            // Function to handle cell clicks
            function cellClicked(e) {
                const cell = e.target;
                const cellId = parseInt(cell.id) - 1;
                
                // Check if cell is already taken or game is not active
                if (gameBoard[cellId] !== '' || !gameActive) {
                    return;
                }
                
                // Update game board
                gameBoard[cellId] = currentPlayer === 1 ? 'x' : 'o';
                cell.textContent = currentPlayer === 1 ? 'X' : 'O';
                cell.classList.add(currentPlayer === 1 ? 'x' : 'o');
                
                moveCount++;
                
                // Check for win or draw
                if (checkWin()) {
                    endGame(false);
                } else if (moveCount === 9) {
                    endGame(true);
                } else {
                    // Switch player
                    currentPlayer = currentPlayer === 1 ? 2 : 1;
                    updateMessage();
                }
            }
            
            // Function to check for a win
            function checkWin() {
                for (const pattern of winPatterns) {
                    const [a, b, c] = pattern;
                    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                        // Highlight winning cells
                        pattern.forEach(index => {
                            document.getElementById((index + 1).toString()).classList.add('winning-cell');
                        });
                        return true;
                    }
                }
                return false;
            }
            
            // Function to update message
            function updateMessage() {
                const playerName = currentPlayer === 1 ? player1Name : player2Name;
                messageDiv.textContent = `${playerName}, you're up`;
            }
            
            // Function to end the game
            function endGame(isDraw) {
                gameActive = false;
                
                if (isDraw) {
                    messageDiv.textContent = "It's a draw!";
                } else {
                    const winnerName = currentPlayer === 1 ? player1Name : player2Name;
                    messageDiv.textContent = `${winnerName} congratulations you won!`;
                }
                
                resetBtn.style.display = 'block';
            }
            
            // Function to reset the game
            function resetGame() {
                // Show input section and hide game board
                playerInputSection.style.display = 'block';
                gameBoardSection.style.display = 'none';
                
                // Clear input fields
                document.getElementById('player1').value = '';
                document.getElementById('player2').value = '';
            }
        });