require 'rspec'

RSpec.describe "Decorator Pattern Output" do
  # b1 = new StringDisplay("Hello, world.")
  describe "b1" do
    it "prints Hello, world. without decoration" do
      b1 = Decorator::StringDisplay.new("Hello, world.")
      expect { b1.show }.to output("Hello, world.\n").to_stdout
    end
  end

  # b2 = new SideBorder(b1, '#')
  describe "b2" do
    it "adds # borders to left and right" do
      b1 = Decorator::StringDisplay.new("Hello, world.")
      b2 = Decorator::SideBorder.new(b1, "#")
      expect { b2.show }.to output("#Hello, world.#\n").to_stdout
    end
  end

  # b3 = new FullBorder(b2)
  describe "b3" do
    it "adds full border around the text" do
      b1 = Decorator::StringDisplay.new("Hello, world.")
      b2 = Decorator::SideBorder.new(b1, "#")
      b3 = Decorator::FullBorder.new(b2)

      expected = <<~TEXT
        +---------------+
        |#Hello, world.#|
        +---------------+
      TEXT

      expect { b3.show }.to output(expected).to_stdout
    end
  end

  # b4 = crazy nested decorater
  describe "b4" do
    it "adds nested borders correctly" do
      b4 =
        Decorator::SideBorder.new(
          Decorator::FullBorder.new(
            Decorator::FullBorder.new(
              Decorator::SideBorder.new(
                Decorator::FullBorder.new(
                  Decorator::StringDisplay.new("Hello, world.")
                ),
                "*"
              )
            )
          ),
          "/"
        )

      expected = <<~TEXT
        /+-------------------+/
        /|+-----------------+|/
        /||*+-------------+*||/
        /||*|Hello, world.|*||/
        /||*+-------------+*||/
        /|+-----------------+|/
        /+-------------------+/
      TEXT

      expect { b4.show }.to output(expected).to_stdout
    end
  end
end
