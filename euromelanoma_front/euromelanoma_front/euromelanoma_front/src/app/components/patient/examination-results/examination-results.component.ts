import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PatientService } from 'src/app/services/patient.service';
import { ProposeSlotComponent } from '../propose-slot/propose-slot.component';

@Component({
  selector: 'app-examination-results',
  templateUrl: './examination-results.component.html',
  styleUrl: './examination-results.component.css',
})
export class ExaminationResultsComponent {
  riskScore!: number;
  highRiskThreshold = 10;
  selectedCity!: string;
  phoneNumber!: string;
  appointmentScheduled = false;

  cities: any[] = [];

  @ViewChild('scheduleDialog')
  scheduleDialog!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    // Pretpostavimo da je riskScore izračunat na osnovu unosa
    this.riskScore = this.data.score; // primer visokog rizika
    this.patientService.getAvaliableCities().subscribe((res: any) => {
      if (res.success) {
        this.cities = res.resultList;
      }
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  openScheduleDialog(): void {
    const dialogRef = this.dialog.open(ProposeSlotComponent, {
      width: '610px',
      data: {
        patientId: this.data.patientId,
        score: this.data.score,
        id: this.data.id,
      },
    });
  }
}
