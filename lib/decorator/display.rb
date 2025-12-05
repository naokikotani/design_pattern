module Decorator
  class Display
    def get_columns
      raise NotImplementedError
    end

    def get_rows
      raise NotImplementedError
    end

    def get_row_text(row)
      raise NotImplementedError
    end

    def show
      (0...get_rows).each do |row|
        puts get_row_text(row)
      end
    end
  end
end
