class Game
	@answer = []
	
	def initialize(answer)
		validate_code(answer)
		@answer = answer
	end

	def guess(code)
		validate_code(code)
		scores = []

		# logic: for each peg: 
		code.each_with_index { |peg,index| 
			
			# in the set or not?
			score = @answer.include?(peg) ? :white : :blank

			# correct: black
			score = :black if @answer[index] == peg

			# assign score
			#scores[index] = score
		}

		return scores
	end

	def validate_code(code)
		#answer must be an array of length 4 with pins.
		raise ArgumentError if code.nil?
		raise ArgumentError if code.length != 4
	end

end
