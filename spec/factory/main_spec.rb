require 'rspec'

RSpec.describe 'Factory Method Pattern with Serial Numbers' do
  let(:factory) { IdCardFactory.new }

  it 'カード作成時に通し番号が付き、対応表が更新される' do
    expect {
      card1 = factory.create('Hiroshi Yuki')
      card2 = factory.create('Tomura')
    }.to output(<<~EOS).to_stdout
      Hiroshi Yukiのカードを作ります。
      [IDCard:Hiroshi Yuki#1]を登録しました。
      Tomuraのカードを作ります。
      [IDCard:Tomura#2]を登録しました。
    EOS

    expect(factory.owners).to eq({1 => 'Hiroshi Yuki', 2 => 'Tomura'})
  end

  it 'カードを使うと出力される' do
    card = IdCard.new('Hanako Sato', 3)
    expect {
      card.use
    }.to output("[IDCard:Hanako Sato#3]を使います。\n").to_stdout
  end
end
