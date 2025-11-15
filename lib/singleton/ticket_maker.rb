class TicketMaker
  private_class_method :new

  def self.instance
    @singleton ||= new
  end

  def initialize
    @ticket = 1000
  end

  def next_ticket_number
    @ticket += 1
  end
end
