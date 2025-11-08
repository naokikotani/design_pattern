class FileProperties
  include FileIO

  def initialize
    @props = {}
  end

  def read_from_file(filename)
    File.readlines(filename, chomp: true).each do |line|
      next if line.start_with?('#') || line.strip.empty?
      key, value = line.split('=', 2)
      @props[key.strip] = value.strip if key && value
    end
  end

  def write_to_file(filename)
    File.open(filename, 'w') do |f|
      f.puts "# written by FileProperties"
      f.puts "# #{Time.now}"
      @props.each do |k, v|
        f.puts "#{k}=#{v}"
      end
    end
  end

  def set_value(key, value)
    @props[key] = value
  end

  def get_value(key)
    @props[key]
  end
end
