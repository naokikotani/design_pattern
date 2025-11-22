class Director
  attr_reader :builder

  def initialize(builder)
    @builder = builder
  end

  def construct
    builder.make_title('旅行の持ち物リスト')
    builder.make_string('必需品')
    builder.make_items(['パスポート', '航空券', '財布', 'スマートフォン'])
    builder.make_string('衣類')
    builder.make_items(['着替え', '下着', 'パジャマ', '上着'])
    builder.make_string('洗面用具')
    builder.make_items(['歯ブラシ', 'シャンプー', 'タオル', '化粧品'])
    builder.close
  end
end
