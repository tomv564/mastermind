require_relative '../generator'

describe Generator do 
	it "generates four items" do
		code = Generator.generate
		expect(code.length == 4)
	end		
	it "generates a random code " do 
		
		code1 = Generator.generate
		code2 = Generator.generate
		expect(code1).to_not match_array(code2)
	end

end