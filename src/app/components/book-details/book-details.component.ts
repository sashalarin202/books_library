import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../book.service';
import { BookService } from '../../book.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  isEditing = false;
  originalData: Book;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Book & { isEditing?: boolean },
    private dialogRef: MatDialogRef<BookDetailsComponent>,
    private bookService: BookService
  ) {
    this.originalData = { ...data };
  }

  ngOnInit() {
    this.isEditing = !!this.data.isEditing
  }

  ngOnDestroy() {
    if (this.isEditing) {
      this.cancelEditing();
    }
  }

  startEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    if (!this.data.id) {
      this.data.id = this.generateId();
      this.bookService.addBook(this.data);
    } else {
      this.bookService.updateBook(this.data);
    }
    this.isEditing = false;
    this.dialogRef.close(this.data); // Закрываем диалог и возвращаем данные
  }

  cancelEditing() {
    this.data.author = this.originalData.author;
    this.data.year = this.originalData.year;
    this.data.description = this.originalData.description;
    this.isEditing = false;
  }

  deleteBook() {
    if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
      this.bookService.deleteBook(this.data.id);
      this.close();
    }
  }

  close() {
    if (this.isEditing) {
      this.cancelEditing();
    }
    this.dialogRef.close();
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
