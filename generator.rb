class Generator

	@@colors = [:white, :yellow, :red, :blue, :green, :black]

	def initialize
		
	end

	
	def self.generate

		return @@colors.sample(4)
		
	end

	

end