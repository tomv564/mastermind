Mastermind = new function() {

	// private variables
	var selectedPeg;
	var lastGuess;
	var gameId;

	// private functions 
	var showCodePicker = function (peg) {
		selectedPeg = peg.target;
		$('#codepicker').css({position:"absolute", left:peg.pageX,top:peg.pageY}).toggle();
	}

	var onCodeSelected = function (selectedColor) {
		var color = $(selectedColor.target).data('color');
		$(selectedPeg).removeClass();
		$(selectedPeg).addClass(color);
		$('#codepicker').toggle();
		updateAddGuessButton();
	}

	var updateAddGuessButton = function () {
		var colors = getColors();
		var canAdd = (colors && 
						colors.indexOf(undefined) === -1 &&
						colors.indexOf("") === -1);
		$('#addguessbutton').prop('disabled', !canAdd);
	}

	var getColors = function () {
		var colors = [];
		$('#addguess li').each(function (index, item) {colors.push($(item).attr('class'));})
		return colors;
	}


	var addGuess = function () {

		// insert as new list in guesses
		var colors = getColors();
		
		var newRow = $('#guesses').append('<li></li>');
		lastGuess = newRow;
		$('#addguess ul').clone().appendTo(newRow);

		// clear old 'add guess' list 	
		$('#addguess li').removeClass();

		var turns = $('ul#turns').children();
		if (turns.length === 0) {

			// no turns left, hide game controls
			$('#addguess').hide();
			
		}

		updateAddGuessButton();

		// if there are turns left, remove one
		if (turns.length > 0) {
			turns.first().remove();
		}

		$.post('/game/' + gameId + '/guesses', {'colors[]': colors}).done(onGuessAdded);

	}

	var onGuessAdded = function(data) {

		var scorePegs = $('<ul class="score list-unstyled"></ul>');

		var correct= 0;
		for (var i = 0; i < data.length; i++) {
			scorePegs.append('<li class="' + data[i] + '">&nbsp;</li>');
			if (data[i] === "black")
				correct++;
		};

		lastGuess.append(scorePegs);

		if (correct === 4)
			gameWon();
	}

	var gameWon = function () {
		var turns = $('ul#turns');
		turns.empty();
		$('#won').show();
		$('#addguess').hide();
	}

	var reset = function () {

		// the board should look like this:
		// 1. answer
		// 2. addguess
		// 3. 11 turns remaining.
		$.post('/game', onGameCreated);

		$('#won').hide();

		// remove picks
		$('#addguess li').removeClass();

		// remove guesses.
		$('#guesses').empty();

		// empty turns
		var turns = $('ul#turns');
		turns.empty();

		// reload 11 empty turns.
		var emptyturn = '<li><ul class="code list-unstyled"><li/><li/><li/><li/></ul></li>';
		for (var i = 0; i < 11; i++) {
			turns.append(emptyturn);
		};

		// show addguess
		$('#addguess').show();

		updateAddGuessButton();
		

	}

	var onGameCreated = function(data) {
		gameId = data;
	}

	// event handlers
	$('#addguess li').click(showCodePicker);
	$('#codepicker button').click(onCodeSelected);
	$('#addguessbutton').click(addGuess);
	$('#newgamebutton').click(reset);

	return {
		// public things, which we don't need as nothing talks to us.

	};

}();


    