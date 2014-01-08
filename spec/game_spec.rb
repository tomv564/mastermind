require_relative '../game'

describe Game do 
	it "requires an answer" do
		expect{Game.new}.to raise_error(ArgumentError)
	end		
	it "requires four choices in answer" do
		expect{Game.new Array.new}.to raise_error(ArgumentError)
	end		
	it "accepts a valid answer" do 
		validAnswer = [:white, :white, :white, :white]
		Game.new validAnswer
	end
	it "rejects invalid guesses" do
		validAnswer = [:white, :white, :white, :white]
		game = Game.new validAnswer
		expect{game.guess Array.new}.to raise_error(ArgumentError)
	end
	it "allows 12 guesses" do
		validAnswer = [:white, :white, :white, :white]
		game = Game.new validAnswer
		guess = [:black, :black, :black, :black]
		12.times { game.guess(guess) }
	end	
	it "scores a complete miss" do 
		validAnswer = [:white, :white, :white, :white]
		game = Game.new validAnswer
		guess = [:black, :black, :black, :black]
		score = game.guess(guess)
		expect(score).to match_array([:blank, :blank, :blank, :blank])
	end
	it "scores a correct answer" do 
		validAnswer = [:white, :white, :white, :white]
		game = Game.new validAnswer
		guess = [:white, :white, :white, :white]
		score = game.guess(guess)
		expect(score).to match_array([:black, :black, :black, :black])
	end
	it "scores a partially correct answer" do
		validAnswer = [:white, :black, :blue, :green]
		game = Game.new validAnswer
		guess = [:white, :yellow, :red, :green]
		score = game.guess(guess)
		expect(score).to match_array([:black, :blank, :blank, :black])
	end
	it "scores pegs in the wrong position" do
		validAnswer = [:white, :black, :blue, :green]
		game = Game.new validAnswer
		guess = [:red, :white, :red, :red]
		score = game.guess(guess)
		expect(score).to match_array([:blank, :white, :blank, :blank])
	end
	it "scores pegs mixed in correct and wrong positions" do
		validAnswer = [:white, :black, :blue, :green]
		game = Game.new validAnswer
		guess = [:white, :white, :green, :red]
		score = game.guess(guess)
		expect(score).to match_array([:black, :white, :blank, :blank])
	end
	it "does not score extra white pegs" do 
		validAnswer = [:white, :white, :black, :black]
		game = Game.new validAnswer
		guess = [:white, :white, :white, :black]
		score = game.guess(guess)
		expect(score).to match_array([:black, :black, :black, :blank])
	end
	it "does not score extra white pegs II" do
		validAnswer = [:green, :black, :yellow, :green]
		game = Game.new validAnswer
		guess = [:black, :green, :yellow, :black]
		score = game.guess(guess)
		expect(score).to match_array([:black, :white, :white, :blank])
	end


end