class WinningStrategy < Strategy
  def initialize(seed)
    @random = Random.new(seed)
    @won = false
    @prev_hand = nil
  end

  def next_hand
    unless @won
      @prev_hand = Hand.get_hand(@random.rand(3))
    end
    @prev_hand
  end

  def study(win)
    @won = win
  end
end
