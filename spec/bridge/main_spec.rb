require 'rspec'
require 'stringio'

RSpec.describe 'Bridge Pattern Display' do
  let(:stdout) { StringIO.new }
  before { @original_stdout = $stdout; $stdout = stdout }
  after  { $stdout = @original_stdout }

  it 'd1.display prints Hello, Japan' do
    d1 = Display.new(StringDisplayImpl.new("Hello, Japan."))
    d1.display

    expect(stdout.string).to eq <<~EOS
      +-------------+
      |Hello, Japan.|
      +-------------+
    EOS
  end

  it 'd2.display prints Hello, World' do
    d2 = CountDisplay.new(StringDisplayImpl.new("Hello, World."))
    d2.display

    expect(stdout.string).to eq <<~EOS
      +-------------+
      |Hello, World.|
      +-------------+
    EOS
  end

  it 'd3.display and d3.multiDisplay(5)' do
    d3 = CountDisplay.new(StringDisplayImpl.new("Hello, Universe."))
    d3.display
    d3.multi_display(5)

    expect(stdout.string).to eq <<~EOS
      +----------------+
      |Hello, Universe.|
      +----------------+
      +----------------+
      |Hello, Universe.|
      |Hello, Universe.|
      |Hello, Universe.|
      |Hello, Universe.|
      |Hello, Universe.|
      +----------------+
    EOS
  end

  describe 'RandomDisplay' do
    it 'random_display displays 0 to times-1 lines randomly' do
      srand(42) # rand(5) returns 3 with this seed
      d = RandomDisplay.new(StringDisplayImpl.new("Test"))
      d.random_display(5)
      expect(stdout.string).to eq <<~EOS
        +----+
        |Test|
        |Test|
        |Test|
        +----+
      EOS
    end

    it 'random_display can also display zero times' do
      srand(2) # rand(5) returns 0 with this seed
      d = RandomDisplay.new(StringDisplayImpl.new("Test"))
      d.random_display(5)
      expect(stdout.string).to eq <<~EOS
        +----+
        +----+
      EOS
    end
  end

  describe 'FileDisplayImpl' do
    let(:test_file) { '/tmp/bridge_test_file.txt' }

    before do
      File.write(test_file, "Hello\nWorld\nRuby")
    end

    after do
      File.delete(test_file) if File.exist?(test_file)
    end

    it 'displays file contents with border' do
      d = Display.new(FileDisplayImpl.new(test_file))
      d.display

      expect(stdout.string).to eq <<~EOS
        +-----+
        |Hello|
        |World|
        |Ruby |
        +-----+
      EOS
    end

    it 'works with CountDisplay for multi_display' do
      d = CountDisplay.new(FileDisplayImpl.new(test_file))
      d.multi_display(2)

      expect(stdout.string).to eq <<~EOS
        +-----+
        |Hello|
        |World|
        |Ruby |
        |Hello|
        |World|
        |Ruby |
        +-----+
      EOS
    end

    it 'handles non-existent file' do
      d = Display.new(FileDisplayImpl.new('/tmp/non_existent_file.txt'))
      d.display

      expect(stdout.string).to include('File not found')
    end
  end

  describe 'IncreasingDisplayImpl' do
    it 'displays pattern like Fig.9-4 (<, *, >)' do
      d = Display.new(IncreasingDisplayImpl.new('<', '*', '>', 4))
      d.display

      expect(stdout.string).to eq <<~EOS
        <>
        <*>
        <**>
        <***>
      EOS
    end

    it 'displays pattern like Fig.9-5 (|, ##, -)' do
      d = Display.new(IncreasingDisplayImpl.new('|', '##', '-', 6))
      d.display

      expect(stdout.string).to eq <<~EOS
        |-
        |##-
        |####-
        |######-
        |########-
        |##########-
      EOS
    end

    it 'works with CountDisplay for multi_display' do
      d = CountDisplay.new(IncreasingDisplayImpl.new('[', '+', ']', 3))
      d.multi_display(2)

      expect(stdout.string).to eq <<~EOS
        []
        [+]
        [++]
        []
        [+]
        [++]
      EOS
    end
  end
end
