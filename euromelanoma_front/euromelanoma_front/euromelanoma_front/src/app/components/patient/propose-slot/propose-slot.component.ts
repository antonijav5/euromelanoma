import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-propose-slot',
  templateUrl: './propose-slot.component.html',
  styleUrl: './propose-slot.component.css'
})
export class ProposeSlotComponent {
  cities = [
    { id: 1, name: 'Beograd' },
    { id: 2, name: 'Novi Sad' },
    { id: 3, name: 'Niš' },
  ]; // Ovo treba biti dinamički popunjeno iz backend-a
  appointmentForm: any;

  constructor(
    public dialogRef: MatDialogRef<ProposeSlotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.appointmentForm = this.fb.group({
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    } else {
      alert('Molimo vas popunite sve podatke.');
    }
  }
}
