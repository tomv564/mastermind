class Generator

	def initialize
		@colors = [:white, :yellow, :red, :blue, :green, :black]
	end

	
	def generate

		return @colors.sample(4)
		
	end

	def colors 
		return @colors
	end
	

end