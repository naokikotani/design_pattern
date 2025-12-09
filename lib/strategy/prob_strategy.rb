class ProbStrategy
  def initialize(seed)
    @random = Random.new(seed)
    @prev_hand_value = 0
    @current_hand_value = 0
    @history = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  end

  # 次の手を確率的に選択
  def next_hand
    bet = @random.rand(get_sum(@current_hand_value))
    handvalue = 0

    if bet < @history[@current_hand_value][0]
      handvalue = 0
    elsif bet < @history[@current_hand_value][0] + @history[@current_hand_value][1]
      handvalue = 1
    else
      handvalue = 2
    end

    @prev_hand_value = @current_hand_value
    @current_hand_value = handvalue

    Hand.get_hand(handvalue)
  end

  # 履歴の合計値を計算
  def get_sum(handvalue)
    @history[handvalue].sum
  end

  # 勝った時… prev → current を増やす
  # 負けた時… prev → (current+1)%3 と (current+2)%3 を増やす
  def study(win)
    if win
      @history[@prev_hand_value][@current_hand_value] += 1
    else
      @history[@prev_hand_value][(@current_hand_value + 1) % 3] += 1
      @history[@prev_hand_value][(@current_hand_value + 2) % 3] += 1
    end
  end
end
