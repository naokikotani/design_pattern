require 'rspec'

RSpec.describe 'Template Method Pattern' do
  it do
    d1 = CharDisplay.new('H')
    d2 = StringDisplay.new('Hello, World.')

    expect_d1 = '<<HHHHH>>'
    expect_d2 = <<~EOF
                  +-------------+
                  |Hello, World.|
                  |Hello, World.|
                  |Hello, World.|
                  |Hello, World.|
                  |Hello, World.|
                  +-------------+
                EOF

    expect(d1.display).to eq(expect_d1)
    expect(d2.display).to eq(expect_d2)
  end
end
