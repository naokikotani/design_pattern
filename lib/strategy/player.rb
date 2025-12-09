class Player
  attr_reader :name, :wincount, :losecount, :gamecount

  def initialize(name, strategy)
    @name = name
    @strategy = strategy
    @wincount = 0
    @losecount = 0
    @gamecount = 0
  end

  # 次の手を決める（Strategy に処理を委譲）
  def next_hand
    @strategy.next_hand
  end

  # 勝った時
  def win
    @strategy.study(true)
    @wincount += 1
    @gamecount += 1
  end

  # 負けた時
  def lose
    @strategy.study(false)
    @losecount += 1
    @gamecount += 1
  end

  # 引き分け
  def even
    @gamecount += 1
  end

  def to_s
    "#{@name}: #{@gamecount} games, #{@wincount} win, #{@losecount} lose"
  end
end
