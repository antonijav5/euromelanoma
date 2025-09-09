// patients-by-city.component.ts

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';

interface CityData {
  cityID: number;
  cityName: string;
  country: string;
  totalPatients: number;
  appointments: number;
  completedAppointments: number;
  pendingAppointments: number;
  activeDoctors: number;
  availableSlots: number;
}

@Component({
  selector: 'app-patients-by-city',
  templateUrl: './patients-by-city.component.html',
  styleUrls: ['./patients-by-city.component.css'],
})
export class PatientsByCityComponent implements OnInit {
  citiesData: CityData[] = [];
  filteredCitiesData = new MatTableDataSource<CityData>([]);
  showDetailedView: boolean = false;
  isLoading: boolean = true;

  tableColumns: string[] = [
    'city',
    'patients',
    'appointments',
    'doctors',
    'utilization',
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCitiesData();
  }

  loadCitiesData(): void {
    this.isLoading = true;

    Promise.all([
      this.adminService.GetCities().toPromise(),
      this.adminService.GetPatients().toPromise(),
      this.adminService.GetAllAppointments().toPromise(),
      this.adminService.GetDoctors().toPromise(),
    ])
      .then(
        ([
          citiesResponse,
          patientsResponse,
          appointmentsResponse,
          doctorsResponse,
        ]: any[]) => {
          const cities = citiesResponse.success ? citiesResponse.result : [];
          const patients = patientsResponse.success
            ? patientsResponse.result
            : [];
          const appointments = appointmentsResponse.success
            ? appointmentsResponse.result
            : [];
          const doctors = doctorsResponse.success ? doctorsResponse.result : [];

          this.citiesData = cities.map((city: any) => {
            const cityAppointments = appointments.filter(
              (apt: any) => apt.cityID === city.cityID
            );
            const cityDoctors = doctors.filter(
              (doc: any) => doc.cityID === city.cityID
            );
            console.log(cityAppointments);

            return {
              cityID: city.cityID,
              cityName: city.name,
              country: city.country || 'Srbija',
              totalPatients: this.getPatientsCountForCity(
                city.cityID,
                appointments,
                patients
              ),
              appointments: cityAppointments.length,
              completedAppointments: cityAppointments.filter(
                (apt: any) => apt.status === 'Finished'
              ).length,
              pendingAppointments: cityAppointments.filter(
                (apt: any) => apt.status === 'Scheduled'
              ).length,
              activeDoctors: cityDoctors.length,
              availableSlots: 0,
            } as CityData;
          });

          this.citiesData.forEach((city) => {
            this.adminService
              .GetAvailableSlotsForCity(city.cityID)
              .subscribe((res: any) => {
                if (res.success) {
                  city.availableSlots = res.result.length;
                  this.filteredCitiesData.data = [...this.citiesData];
                }
              });
          });

          this.filteredCitiesData.data = this.citiesData;
          this.isLoading = false;

          this.filteredCitiesData.data = this.citiesData;
          this.isLoading = false;
        }
      )
      .catch((error) => {
        console.error('Greška pri učitavanju podataka:', error);
        this.isLoading = false;
      });
  }

  getPatientsCountForCity(
    cityID: number,
    appointments: any[],
    patients: any[]
  ): number {
    const cityAppointments = appointments.filter(
      (apt: any) => apt.cityID === cityID
    );
    const patientIds = [
      ...new Set(cityAppointments.map((apt: any) => apt.patientID)),
    ];
    return patientIds.length;
  }

  getUtilization(cityData: CityData): number {
    const total = cityData.appointments + cityData.availableSlots;
    return total > 0 ? Math.round((cityData.appointments / total) * 100) : 0;
  }

  getProgressColor(utilization: number): 'primary' | 'accent' | 'warn' {
    if (utilization >= 80) return 'warn';
    if (utilization >= 50) return 'accent';
    return 'primary';
  }

  // Summary methods
  getTotalCities(): number {
    return this.citiesData.length;
  }

  getTotalPatients(): number {
    return this.citiesData.reduce((sum, city) => sum + city.totalPatients, 0);
  }

  getTotalAppointments(): number {
    return this.citiesData.reduce((sum, city) => sum + city.appointments, 0);
  }

  getAverageUtilization(): number {
    if (this.citiesData.length === 0) return 0;
    const totalUtilization = this.citiesData.reduce(
      (sum, city) => sum + this.getUtilization(city),
      0
    );
    return Math.round(totalUtilization / this.citiesData.length);
  }

  filterCities(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredCitiesData.filter = filterValue.trim().toLowerCase();
  }

  viewCityDetails(cityData: CityData): void {
    console.log('Pregled detalja za grad:', cityData);
    // Implementiraj modal ili navigaciju za detalje grada
  }

  exportCityData(cityData: CityData): void {
    console.log('Izvoz podataka za grad:', cityData);
    // Implementiraj export funkcionalnost
  }
}
