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
      +--------------+
      |Hello, Japan.|
      +--------------+
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
    d3.multiDisplay(5)

    expect(stdout.string).to eq <<~EOS
      +----------------+
      |Hello, Universe.|
      +----------------+
      |Hello, Universe.|
      |Hello, Universe.|
      |Hello, Universe.|
      |Hello, Universe.|
      |Hello, Universe.|
      +----------------+
    EOS
  end
end
