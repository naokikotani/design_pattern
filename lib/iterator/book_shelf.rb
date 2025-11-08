class BookShelf < Iterable
  def initialize
    @books = []
  end

  def get_book_at(index)
    @books[index]
  end

  def append_book(book)
    @books << book
  end

  def iterator
    BookShelfIterator.new(self)
  end

  def length
    @books.size
  end

  private

  attr_reader :books
end
