import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../book.service';
import { BookService } from '../../book.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  isEditing = false;
  originalData: Book;
  bookForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Book & { isEditing?: boolean },
    private dialogRef: MatDialogRef<BookDetailsComponent>,
    private bookService: BookService,
    private fb: FormBuilder
  ) {
    this.originalData = { ...data };

    this.bookForm = this.fb.group({
      id: [this.data.id],
      title: [this.data.title, Validators.required],
      img_src: [this.data.img_src],
      author: [this.data.author, Validators.required],
      year: [this.data.year, [Validators.required, Validators.min(0)]],
      description: [this.data.description],
    });
  }

  ngOnInit() {
    this.isEditing = !!this.data.isEditing;
  }

  ngOnDestroy() {
    if (this.isEditing) {
      this.cancelEditing();
    }
  }

  startEditing() {
    this.isEditing = true;
    this.bookForm.patchValue(this.originalData);
  }

  saveChanges() {
    if (!this.bookForm.valid) return;

    const formData: Book = this.bookForm.value;

    if (!formData.id) {
      formData.id = this.generateId();
      this.bookService.addBook(formData);
    } else {
      this.bookService.updateBook(formData);
    }
    this.isEditing = false;
    this.dialogRef.close(formData);
  }

  cancelEditing() {
    this.bookForm.patchValue(this.originalData);
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
