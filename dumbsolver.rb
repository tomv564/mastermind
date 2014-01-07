class DumbSolver

def ininitalize()
	@colors = [:white, :yellow, :red, :green, :blue, :black]
end

def solve(game)

	score = []

	currentColor = 0

	begin 
		guess = replace_if_not_black(guess, score, @colors[currentColor])
		score = game.guess guess 
		currentColor++
	end while !is_solved(score)

end

def replace_if_not_black(guess, score, color)
	
	# if any blacks, keep them
	score.each_with_index { |peg, index|
		guess[index] = color unless peg == :black
	}

end

def is_solved(score)
	return score == [:black,:black,:black,:black]
end


end