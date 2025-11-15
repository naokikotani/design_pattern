require 'rspec'

RSpec.describe TicketMaker do
  describe ".instance" do
    it do
      obj1 = TicketMaker.instance
      obj2 = TicketMaker.instance

      expect(obj1).to equal(obj2)
    end
  end

  describe "#next_ticket_number" do
    it do
      tm = TicketMaker.instance
      tm2 = TicketMaker.instance

      num1 = tm.next_ticket_number
      num2 = tm.next_ticket_number
      num3 = tm.next_ticket_number

      expect(num1).to eq(1001)
      expect(num2).to eq(1002)
      expect(num3).to eq(1003)
      expect(tm2.next_ticket_number).to eq(1004)
    end
  end
end
