require 'rspec'

RSpec.describe Singleton do
  it "最初の呼び出しでのみインスタンス生成メッセージを出力する" do
    expect {
      Singleton.instance
    }.to output("インスタンスを生成しました。\n").to_stdout

    expect {
      Singleton.instance
    }.not_to output.to_stdout
  end

  it "同じインスタンスを返すこと" do
    obj1 = Singleton.instance
    obj2 = Singleton.instance

    expect(obj1).to eq(obj2)
  end
end
