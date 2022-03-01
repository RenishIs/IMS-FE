import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

const imports: any = [
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTooltipModule,
  MatRadioModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatListModule,
  MatDividerModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...imports
  ],
  exports: [
    ...imports
  ]
})
export class SharedModule { }
