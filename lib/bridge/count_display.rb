class CountDisplay < Display
  def multi_display(times)
    open
    times.times { print }
    close
  end
end
