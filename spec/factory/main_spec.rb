require 'rspec'

RSpec.describe 'Factory Method Pattern' do
  let(:factory) { IdCardFactory.new }

  it do
    expect {
      @card3 = factory.create('Hanako Sato')
    }.to output(<<~EOS).to_stdout
      Hanako Satoのカードを作ります。
      [IDCard:Hanako Sato]を登録しました。
    EOS
  end

  it do
    card = IdCard.new('Hiroshi Yuki')
    expect {
      card.use
    }.to output("[IDCard:Hiroshi Yuki]を使います。\n").to_stdout
  end
end
