class FileDisplayImpl < DisplayImpl
  def initialize(filename)
    @filename = filename
    @lines = []
    @width = 0
    read_file
  end

  def raw_open
    print_line
  end

  def raw_print
    @lines.each do |line|
      puts "|#{line.ljust(@width)}|"
    end
  end

  def raw_close
    print_line
  end

  private

  def read_file
    if File.exist?(@filename)
      @lines = File.readlines(@filename, chomp: true)
      @width = @lines.map(&:length).max || 0
    else
      @lines = ["(File not found: #{@filename})"]
      @width = @lines.first.length
    end
  end

  def print_line
    print "+"
    @width.times { print "-" }
    puts "+"
  end
end
