class Hand
  attr_reader :name, :handvalue

  private_class_method :new

  def initialize(name, handvalue)
    @name = name
    @handvalue = handvalue
  end

  ROCK     = new("グー", 0)
  SCISSORS = new("チョキ", 1)
  PAPER    = new("パー", 2)
  HANDS = [ROCK, SCISSORS, PAPER]

  # 値からenum定数を返す
  def self.get_hand(handvalue)
    HANDS[handvalue]
  end

  # this が h より強いなら true
  def stronger_than?(h)
    fight(h) == 1
  end

  # this が h より弱いなら true
  def weaker_than?(h)
    fight(h) == -1
  end

  # 勝敗判定
  # 引き分け: 0, this 勝ち: 1, h 勝ち: -1
  def fight(h)
    return 0 if self == h
    return 1 if ((@handvalue + 1) % 3) == h.handvalue

    -1
  end

  def to_s
    @name
  end
end
