'use strict';

angular.module('rpsApp').controller('BoardController', ['ComputerMover', '$timeout',
    function (ComputerMover, $timeout) {
        var boardController = this;

        boardController.model = {
            plays: 0,
            playerWins: 0,
            computerWins: 0,
            legalMoves: ['rock', 'paper', 'scissors'], // what moves are allowed
            winningMove: ['scissors', 'rock', 'paper'], // what moves beats corresponding one in legalmoves
            isPlayerShown: [true, true, true], // controls which player piece is shown
            isComputerShown: [false, false, false] // controls which computer piece is shown
        };

        /**
         * takes a turn for the player
         * @param move
         * @returns message if invalid
         */
        boardController.turn = function (move) {
            // check that move is valid
            var playerMove = boardController.model.legalMoves.indexOf(move);
            if (playerMove === -1) {
                return 'Invalid move';
            }

            // valid , so hide player pieces & computer pieces
            boardController.model.isPlayerShown[0] = false;
            boardController.model.isPlayerShown[1] = false;
            boardController.model.isPlayerShown[2] = false;
            boardController.model.isComputerShown[0] = false;
            boardController.model.isComputerShown[1] = false;
            boardController.model.isComputerShown[2] = false;

            boardController.model.playerPlay = move;

            // now get computer move
            var computerMove = ComputerMover.getMove();
            boardController.model.computerPlay = boardController.model.legalMoves[computerMove];

            // show chosen pieces now
            boardController.model.isComputerShown[computerMove] = true;
            boardController.model.isPlayerShown[playerMove] = true;

            // default result
            boardController.model.result = 'Draw';

            // wait a second
            $timeout(function () {
                // check winner
                if (boardController.model.legalMoves[computerMove] === boardController.model.winningMove[playerMove]) {
                    // players move was winning one
                    boardController.model.playerWins++;
                    boardController.model.result = 'Player wins';
                } else {
                    if (boardController.model.legalMoves[playerMove] === boardController.model.winningMove[computerMove]) {
                        boardController.model.computerWins++;
                        boardController.model.result = 'Computer wins';
                    }
                }

                boardController.model.plays++;
                boardController.model.isPlayerShown[0] = true;
                boardController.model.isPlayerShown[1] = true;
                boardController.model.isPlayerShown[2] = true;
            }, 1000);

        };

        /**
         * works out whether piece should be enabled
         * @param move
         * @param isPlayer
         * @returns boolean
         */
        boardController.isEnabled = function (move, isPlayer) {
            var move = boardController.model.legalMoves.indexOf(move);

            if (move === -1) {
                return false;
            }

            if (isPlayer) {
                return boardController.model.isPlayerShown[move];
            }

            return boardController.model.isComputerShown[move];
        };

    }]);