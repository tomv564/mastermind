Mastermind = new function() {

	// private variables
	var selectedPeg;
	var lastGuess;
	var gameId;

	// private functions 
	var onPegClicked = function (peg) {
		selectPeg(peg.target);
		//selectedPeg = peg.target;
		//$('#codepicker').css({position:"absolute", left:peg.pageX,top:peg.pageY}).toggle();
	}

	var onCodeSelected = function (selectedColor) {
		var color = $(selectedColor.target).data('color');
		$(selectedPeg).removeClass();
		$(selectedPeg).addClass(color);

		// select next peg?
		var nextPeg = $(selectedPeg).next('li')[0];
		if (nextPeg)
			selectPeg(nextPeg);


		updateAddGuessButton();
	}

	var updateAddGuessButton = function () {
		var colors = getColors();
		var canAdd = (colors && 
						colors.indexOf(undefined) === -1 &&
						colors.indexOf("") === -1 &&
						colors.indexOf("selected") === -1);
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
		else {
			var turns = $('ul#turns').children();
			if (turns.length === 0) {
				gameLost();
			}
		}

		selectPeg($('#addguess li').first());

	}

	var gameLost = function() {
		$('#lost').show();
		$('#addguess').hide();
		$('#codepicker').hide();
	}

	var gameWon = function () {
		var turns = $('ul#turns');
		turns.empty();
		$('#won').show();
		$('#addguess').hide();
		$('#codepicker').hide();
	}

	var reset = function () {

		// the board should look like this:
		// 1. answer
		// 2. addguess
		// 3. 11 turns remaining.
		$.post('/game', onGameCreated);

		$('#won').hide();
		$('#lost').hide();

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

		selectPeg($('#addguess li').first());

		// show addguess
		$('#addguess').show();
		$('#codepicker').show();

		updateAddGuessButton();

	}

	var selectPeg = function(peg) {
		selectedPeg = peg;
		$('#addguess li').removeClass('selected');
		$(selectedPeg).addClass('selected');
	}

	var onGameCreated = function(data) {
		gameId = data;
	}

	// event handlers
	$('#addguess li').click(onPegClicked);
	//var pickerHtml = $('#codepicker')[0].outerHTML;
	//$('#codepicker').remove();

	$('#addguess li').click(function(event) {selectedPeg = event.target;})
	//$('#addguess li').popover({html: true, content: pickerHtml, placement : 'bottom', animation: true});
	$('#codepicker button').on("click", onCodeSelected); // live because of popover
	$('#addguess').on("click", "button", onCodeSelected)
	$('#addguessbutton').click(addGuess);
	$('#newgamebutton').click(reset);

	reset();

	return {
		// public things, which we don't need as nothing talks to us.

	};

}();


    