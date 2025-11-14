class Singleton
  private_class_method :new

  def self.instance
    @singleton ||= new
  end

  def initialize
    puts "インスタンスを生成しました。"
  end
end
