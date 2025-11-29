class RandomDisplay < CountDisplay
  def random_display(times)
    random_times = rand(times)
    multi_display(random_times)
  end
end
