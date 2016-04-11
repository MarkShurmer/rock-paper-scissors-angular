'use strict';

describe('board controller tests', function () {
    var boardCtrl;
    var computerMover;
    var timeout;

    beforeEach(module('rpsApp'));

    beforeEach(inject(function ($controller, _ComputerMover_, $timeout, $httpBackend) {
        computerMover = _ComputerMover_;
        timeout = $timeout;
        boardCtrl = $controller('BoardController', { $timeout: timeout });
        $httpBackend.whenGET('game/board.html').respond('');
        $httpBackend.expectGET('game/board.html');
    }));

    describe('Creation', function () {

        it('should be created', function () {
            expect(boardCtrl).toBeDefined();
        });
    });
    
    describe('Move tests', function() {
        it('shouldnt set player move when invalid move choice', function()  {
            var res = boardCtrl.turn('blah');
            expect(boardCtrl.model.plays).toBe(0);
            expect(boardCtrl.model.computerWins).toBe(0);
            expect(boardCtrl.model.playerWins).toBe(0);
            expect(res).toBe('Invalid move');
        });

        it('should set player move when choice is rock', function () {
            boardCtrl.turn('rock');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(1);
        });

        it('should keep counting', function () {
            boardCtrl.turn('rock');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(1);
            boardCtrl.turn('paper');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(2);
            boardCtrl.turn('paper');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(3);
        });
    });

    describe('Win tests', function() {

        it('should set win for player for rock vs scissors', function()  {
            spyOn(computerMover, 'getMove').and.returnValue(2);
            boardCtrl.turn('rock');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(1);
            expect(boardCtrl.model.computerWins).toBe(0);
            expect(boardCtrl.model.playerWins).toBe(1);
        });

        it('should set win for player for scissors vs paper', function()  {
            spyOn(computerMover, 'getMove').and.returnValue(1);
            boardCtrl.turn('scissors');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(1);
            expect(boardCtrl.model.computerWins).toBe(0);
            expect(boardCtrl.model.playerWins).toBe(1);
        });

        it('should set win for player for paper vs rock', function()  {
            spyOn(computerMover, 'getMove').and.returnValue(0);
            boardCtrl.turn('paper');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(1);
            expect(boardCtrl.model.computerWins).toBe(0);
            expect(boardCtrl.model.playerWins).toBe(1);
        });

        it('should set win for computer for rock vs scissors', function()  {
            spyOn(computerMover, 'getMove').and.returnValue(0);
            boardCtrl.turn('scissors');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(1);
            expect(boardCtrl.model.computerWins).toBe(1);
            expect(boardCtrl.model.playerWins).toBe(0);
        });

        it('should set win for computer for scissors vs paper', function()  {
            spyOn(computerMover, 'getMove').and.returnValue(2);
            boardCtrl.turn('paper');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(1);
            expect(boardCtrl.model.computerWins).toBe(1);
            expect(boardCtrl.model.playerWins).toBe(0);
        });

        it('should set win for computer for paper vs rock', function()  {
            spyOn(computerMover, 'getMove').and.returnValue(1);
            boardCtrl.turn('rock');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(1);
            expect(boardCtrl.model.computerWins).toBe(1);
            expect(boardCtrl.model.playerWins).toBe(0);
        });

        it('should set draw for rock vs rock', function()  {
            spyOn(computerMover, 'getMove').and.returnValue(0);
            boardCtrl.turn('rock');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(1);
            expect(boardCtrl.model.computerWins).toBe(0);
            expect(boardCtrl.model.playerWins).toBe(0);
        });

        it('should set draw for scissors vs scissors', function()  {
            spyOn(computerMover, 'getMove').and.returnValue(2);
            boardCtrl.turn('scissors');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(1);
            expect(boardCtrl.model.computerWins).toBe(0);
            expect(boardCtrl.model.playerWins).toBe(0);
        });

        it('should set draw for paper vs paper', function()  {
            spyOn(computerMover, 'getMove').and.returnValue(1);
            boardCtrl.turn('paper');
            timeout.flush();
            expect(boardCtrl.model.plays).toBe(1);
            expect(boardCtrl.model.computerWins).toBe(0);
            expect(boardCtrl.model.playerWins).toBe(0);
        });
    });
    
    describe('isEnabled tests', function() {
        it('paper & scissors should be disabled after passing nonsense', function() {
            boardCtrl.turn('rock');
            expect(boardCtrl.isEnabled('blah', true)).toBeFalsy();
        });

       it('paper & scissors should be disabled after human plays rock', function() {
           boardCtrl.turn('rock');
           expect(boardCtrl.isEnabled('paper', true)).toBeFalsy();
           expect(boardCtrl.isEnabled('scissors', true)).toBeFalsy();
           expect(boardCtrl.isEnabled('rock', true)).toBeTruthy();
       });

        it('paper & scissors should be disabled after computer plays rock', function() {
            spyOn(computerMover, 'getMove').and.returnValue(0);
            boardCtrl.turn('rock');
            expect(boardCtrl.isEnabled('paper', false)).toBeFalsy();
            expect(boardCtrl.isEnabled('scissors', false)).toBeFalsy();
            expect(boardCtrl.isEnabled('rock', false)).toBeTruthy();
        });

    });
});