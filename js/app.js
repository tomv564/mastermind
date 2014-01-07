Mastermind = new function() {

	// private variables
	var selectedItem;

	// private functions 
	var showCodePicker = function (peg) {
		selectedItem = peg.target;
		$('#codepicker').css({position:"absolute", left:peg.pageX,top:peg.pageY}).toggle();
	}

	var onCodeSelected = function (selectedColor) {
		var color = $(selectedColor.target).data('color');
		$(selectedItem).removeClass();
		$(selectedItem).addClass(color);
		$('#codepicker').toggle();
	}

	var addGuess = function () {

		// insert as new list in guesses
		var newRow = $('#guesses').append('<li></li>');
		$('#addguess ul').clone().appendTo(newRow);

		// clear old 'add guess' list 	
		$('#addguess li').removeClass();

		var turns = $('ul#turns').children();
		if (turns.length === 0) {

			// no turns left, hide game controls
			$('#addguess').hide();
			
		}

		// if there are turns left, remove one
		if (turns.length > 0) {
			turns.first().remove();
		}
	}

	var reset = function () {

		// the board should look like this:
		// 1. answer
		// 2. addguess
		// 3. 11 turns remaining.

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
		

	}

	// event handlers
	$('#addguess li').click(showCodePicker);
	$('#codepicker button').click(onCodeSelected);
	$('#addguessbutton').click(addGuess);
	$('#newgamebutton').click(reset);

	return {
		// public things

	};

}();


    