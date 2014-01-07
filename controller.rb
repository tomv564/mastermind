require 'sinatra'
require 'json'
require_relative 'game'
require_relative 'generator'

configure do 
	set :games, Hash.new
end

get '/' do 

	redirect '/index.html'
end

post '/game' do
	# create a new game
	answer = Generator.generate
	game = Game.new answer

	settings.games[game.id] = game
	puts settings.games.length

	content_type :json
	game.id.to_json
end

post '/game/:id/guesses' do
	
	# find the game
	puts "finding game by id " + params[:id]
	puts settings.games.length

	game = settings.games[params[:id]]

	# parse the parameters
	#TODO: request validation and proper responses.
 	puts params
	colors = params[:colors]
	guess = colors.map {|c| c.to_sym }

	# add a guess
	score = game.guess guess

	# return the score
	content_type :json
	score.to_json

end