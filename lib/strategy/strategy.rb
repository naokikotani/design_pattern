class Strategy
  def next_hand
    raise NotImplementedError
  end

  def study(win)
    raise NotImplementedError
  end
end
