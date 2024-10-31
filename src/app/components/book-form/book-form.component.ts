import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Book } from '../../book.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,

  ]
})

export class BookFormComponent {
  bookForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book | null,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      author: [data?.author || '', Validators.required],
      year: [data?.year || '', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      description: [data?.description || '']
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onSubmit() {
    if (this.bookForm.valid) {
      this.dialogRef.close({
        ...this.bookForm.value,
        year: +this.bookForm.value.year,
        id: this.data ? this.data.id : Math.random().toString(36).substring(2, 15)
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}