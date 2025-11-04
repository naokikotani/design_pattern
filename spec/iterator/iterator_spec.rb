require 'rspec'

RSpec.describe 'Iterator Pattern' do
  it 'iterates through books' do
    book_shelf = BookShelf.new(3)
    book_shelf.append_book(Book.new('Book 1'))
    book_shelf.append_book(Book.new('Book 2'))
    book_shelf.append_book(Book.new('Book 3'))

    iterator = book_shelf.iterator

    expect(iterator.next.name).to eq('Book 1')
    expect(iterator.next.name).to eq('Book 2')
    expect(iterator.next.name).to eq('Book 3')
  end
end
