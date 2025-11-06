require 'rspec'

RSpec.describe 'Adaptor Pattern' do
  it do
    p = PrintBanner.new('Hello')
    print_weak = p.print_weak
    print_strong = p.print_strong

    expect(print_weak).to eq('(Hello)')
    expect(print_strong).to eq('*Hello*')
  end
end

