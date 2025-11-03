class BookShelf < Iterable
  def initialize(max_size)
    @books = Array.new(max_size)
    @last = 0
  end

  def get_book_at(index)
    books[index]
  end

  def append_book(book)
    books[last] = book
    last += 1
  end

  def iterator
    BookShelfIterator.new(self)
  end

  private

  attr_reader :books, :last
end
