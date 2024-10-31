import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService, Book } from '../../book.service';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  imports: [
    MatListModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
  books = computed(() => this.bookService.books());

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  openBookForm() {
    const newBookData = { title: '', author: '', year: 0, description: '', img_src: ''};
    this.dialog.open(BookDetailsComponent,{ data: { ...newBookData, isEditing: true }  });
  }

  startEdit(book: Book) {
    this.dialog.open(BookDetailsComponent, { data: { ...book, isEditing: true } });
}

  openBookDetails(book: Book) {
    this.dialog.open(BookDetailsComponent, { data: { ...book, isEditing: false } });
  }

  deleteBook(id: string) {
    if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
      this.bookService.deleteBook(id);
    }
  }
}
