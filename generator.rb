class Generator

	@@colors = [:white, :yellow, :red, :blue, :green, :black]

	def initialize
		
	end

	
	def self.generate
		answer = []
		4.times { |n| answer.push @@colors.sample }
		answer
		#return @@colors.sample(4)
		
	end

	

end