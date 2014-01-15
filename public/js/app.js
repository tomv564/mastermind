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


		// clear the selection
		$('#addguess li').removeClass('selected');

		// insert as new list in guesses
		var colors = getColors();
		
		var newRow = $('#guesses').append('<li></li>');
		lastGuess = newRow;
		$('#addguess ul').clone().appendTo(newRow);

		// clear old 'add guess' list 	
		$('#addguess li').removeClass();

		updateAddGuessButton();

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

			// if there are turns left, remove one
			var turns = $('ul#turns').children();
			if (turns.length > 0) {
				turns.first().remove();
			} else {
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
		for (var i = 0; i <= 10; i++) {
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

// Instance the tour
var tour = new Tour();

// Add your steps. Not too many, you don't really want to get your users sleepy
tour.addSteps([
  {
    orphan: true, // string (jQuery selector) - html element next to which the step popover should be shown
    title: "Play Mastermind!", // string - title of the popover
    content: "Guess a 4-peg combination of 6 colors within 12 turns" // string - content of the popover
  },
  {
    element: "#answer",
    title: "The answer",
    content: "Answers may contain repeating colors, but cannot be empty. Only the server knows the answer, so no peeking!"
  },
    {
    element: "#addguess",
    title: "Your guess",
    content: "The first peg is selected, and you automatically advance to the next peg after choosing a color. You can click a peg to select a new color for it."
  },
    {
    element: "#codepicker",
    title: "Pick your colors",
    content: "A single click places that color into your selected peg. The next peg is automatically selected"
  },
    {
    element: "#addguessbutton",
    title: "Add your guess",
    content: "Once you have filled all four pegs, you can submit your guess."
  },
    {
    orphan: true,
    title: "Scoring",
    content: "For each color in the right place, you receive a black peg. For each color that is in the wrong place, you receive a white peg. These pegs are not in the order of your guessed colors. Good luck!"
  }

]);

// Initialize the tour
tour.init();

// Start the tour
tour.start();

$('#tourbutton').click(function() {tour.restart();});


    