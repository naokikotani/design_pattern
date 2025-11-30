class IncreasingDisplayImpl < DisplayImpl
  def initialize(start_char, decoration, end_char, line_count)
    @start_char = start_char
    @decoration = decoration
    @end_char = end_char
    @line_count = line_count
  end

  def raw_open
    # 模様表示では開始時に何も出力しない
  end

  def raw_print
    @line_count.times do |i|
      puts "#{@start_char}#{@decoration * i}#{@end_char}"
    end
  end

  def raw_close
    # 模様表示では終了時に何も出力しない
  end
end
