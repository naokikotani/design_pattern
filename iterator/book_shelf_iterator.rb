class BookShelfIterator < Iterator
  class BookNotFoundError < StandardError; end

  def initialize(book_shelf)
    @book_shelf = book_shelf
    @index = 0
  end

  def has_next
    return true if index < book_shelf.last

    false
  end

  def next
    raise BookNotFoundError unless has_next

    book = book_shelf.get_book_at(index)
    index += 1

    book
  end

  private

  attr_reader :book_shelfk, index
end
