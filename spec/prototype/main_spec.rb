require 'rspec'

RSpec.describe Manager do
  describe 'Prototype pattern' do
    let(:manager) { Manager.new }

    before do
      upen = UnderlinePen.new('-')
      mbox = MessageBox.new('*')
      sbox = MessageBox.new('/')

      manager.register('strong message', upen)
      manager.register('warning box', mbox)
      manager.register('slash box', sbox)
    end

    it do
      p1 = manager.create('strong message')
      expect { p1.use('Hello, world.') }.to output(<<~TEXT).to_stdout
        Hello, world.
        -------------
      TEXT
    end

    it do
      p2 = manager.create('warning box')
      expect { p2.use('Hello, world.') }.to output(<<~TEXT).to_stdout
        ***************
        *Hello, world.*
        ***************
      TEXT
    end

    it do
      p3 = manager.create('slash box')
      expect { p3.use('Hello, world.') }.to output(<<~TEXT).to_stdout
        ///////////////
        /Hello, world./
        ///////////////
      TEXT
    end
  end
end
