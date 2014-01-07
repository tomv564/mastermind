require_relative '../generator'

describe Generator do 
	it "generates four items" do
		generator = Generator.new
		code = generator.generate
		expect(code.length == 4)
	end		
	it "generates a random code " do 
		generator = Generator.new
		code1 = generator.generate
		code2 = generator.generate
		expect(code1).to_not match_array(code2)
	end

end