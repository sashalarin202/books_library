import { Injectable, signal } from '@angular/core';

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  description?: string;
  img_src?:string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books = signal<Book[]>(this.mockBooks());

  private mockBooks(): Book[] {
    return [
      { id: '1', title: 'Book One', author: 'Author One', year: 2021, description: 'Description One', img_src: 'https://bookclub.ua/images/db/goods/k/62541_124791_k.jpg'},
      { id: '2', title: 'Book Two', author: 'Author Two', year: 2022, description: 'Description Two', img_src: 'https://bookclub.ua/images/db/goods/k/62545_124795_k.jpg'},
      { id: '3', title: 'Book Three', author: 'Author Three', year: 2023, description: 'Description Three', img_src: 'https://bookclub.ua/images/db/goods/k/61167_121268_k.jpg'},
      { id: '4', title: 'Book Four', author: 'Author Four', year: 2020, description: 'Description Four', img_src: 'https://bookclub.ua/images/db/goods/k/62536_124786_k.jpg'},
      { id: '5', title: 'Book Five', author: 'Author Five', year: 2019, description: 'Description Five', img_src: 'https://bookclub.ua/images/db/goods/k/62454_124782_k.jpg'}
    ];
  }

  addBook(book: Book) {
    this.books.update(books => {
      const updatedBooks = [...books, book];
      return updatedBooks;
    });
  }

  updateBook(updatedBook: Book) {
    this.books.update(books =>
      books.map(book => (book.id === updatedBook.id ? updatedBook : book))
    );
  }

  deleteBook(id: string) {
    this.books.update(books => books.filter(book => book.id !== id));
  }
}
