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
      { id: '1', title: 'Шістка Атласа', author: 'Оливи Блейк', year: 2021, description: 'Заради знань убий', img_src: 'https://bookclub.ua/images/db/goods/k/62541_124791_k.jpg'},
      { id: '2', title: 'Крадійка книжок', author: 'Маркус Зузак', year: 2022, description: 'Вражаюча історія, яку розповідає... Смерть!', img_src: 'https://bookclub.ua/images/db/goods/k/62545_124795_k.jpg'},
      { id: '3', title: 'Панк 57', author: 'Пенелопа Дуглас', year: 2023, description: 'Від авторки бестселерів New York Times, USA Today та Wall Street Journal', img_src: 'https://bookclub.ua/images/db/goods/k/61167_121268_k.jpg'},
      { id: '4', title: 'І все змінилось', author: 'С. Редферн', year: 2020, description: 'Одна мить назавжди змінила 11 життів. І тільки вона бачить, що відбувається насправді', img_src: 'https://bookclub.ua/images/db/goods/k/62536_124786_k.jpg'},
      { id: '5', title: 'Птахи та інші', author: 'Дафна дю Морье', year: 2019, description: 'Перевидання в оновленому оформленні', img_src: 'https://bookclub.ua/images/db/goods/k/62454_124782_k.jpg'}
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
