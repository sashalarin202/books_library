import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService, Book } from '../../book.service';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { animate, style, transition, trigger } from '@angular/animations';

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
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('0.5s ease-in', style({ opacity: 0, transform: 'scale(0.1)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.Default 
})
export class BookListComponent {
  books = computed(() => this.bookService.books());

  constructor(
    private bookService: BookService,
    private dialog: MatDialog
  ) {}

  trackByFn(index: number, book: Book): string {
    return book.id;
  }

  openBookDialog(book: Book, isEditing: boolean = false): void {
    this.dialog.open(BookDetailsComponent, { data: { ...book, isEditing } });
  }

  openAddBookDialog(): void {
    const newBookData: Book = {
      title: '',
      author: '',
      year: 0,
      description: '',
      img_src: '',
      id: ''
    };
    this.openBookDialog(newBookData, true);
  }

  openEditBookDialog(book: Book): void {
    this.openBookDialog(book, true);
  }

  openBookDetailsDialog(book: Book): void {
    this.openBookDialog(book, false);
  }

  deleteBook(id: string): void {
    const confirmation = confirm('Вы уверены, что хотите удалить эту книгу?');
    if (confirmation) {
      try {
        this.bookService.deleteBook(id);
      } catch (error) {
        console.error('Ошибка при удалении книги:', error);
      }
    }
  }
}
