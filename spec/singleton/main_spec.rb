require 'rspec'

RSpec.describe Singleton do
  it "同じインスタンスを返すこと" do
    obj1 = Singleton.get_instance
    obj2 = Singleton.get_instance

    expect(obj1).to eq(obj2)
  end

  it "最初の呼び出しでのみインスタンス生成メッセージを出力する" do
    expect {
      Singleton.get_instance
    }.to output("インスタンスを生成しました。\n").to_stdout

    expect {
      Singleton.get_instance
    }.not_to output.to_stdout
  end
end
