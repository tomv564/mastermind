require 'securerandom'

class Game
	@answer = []
	attr_reader :id
	@@scorepegs = [:black, :white, :blank]
	
	def initialize(answer)
		validate_code(answer)
		@answer = answer
		@id = SecureRandom.hex(4)
	end

	def guess(code)
		validate_code(code)
		scores = []
		used = []

		# mark the correct positions
		code.each_with_index { |peg, index|  

		 	if @answer[index] == peg
		 		scores.push :black
		 		used[index] = true # can no longer be used.
		 		code[index] = nil # can no longer be used.
			end
		}

		# mark the correct colors
		code.each_with_index { |peg, index|  

			
			# all indices of the same color that are not used.
			occurrances = @answer.each_index.select{ |i| @answer[i] == peg && !used[i]}
			
			if occurrances.length < 1
				next
			end

			index = occurrances.first
			used[index] = true
			scores.push :white

		}

		# add missing blanks.
		(4 - scores.length).times { scores.push :blank }

		scores.sort_by { |a|  @@scorepegs.index(a) }
		
	end

	def validate_code(code)
		#answer must be an array of length 4 with pins.
		raise ArgumentError if code.nil?
		raise ArgumentError if code.length != 4
	end

end
