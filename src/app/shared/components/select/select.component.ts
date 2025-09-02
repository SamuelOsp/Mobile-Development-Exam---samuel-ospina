import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountryService } from '../../services/country/country.service';
import { Toast } from '../../providers/toast/toast';
import { Country } from 'src/app/interfaces/country.interface';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: false
})
export class SelectComponent  implements OnInit {
  countries: Country[] = [];
 selectedCountry: string = '';

  @Output() countrySelected = new EventEmitter<string>();

  constructor(private readonly countryService: CountryService, private toastSrv:Toast) { }

 async ngOnInit() {
  try {
      const response = await this.countryService.getCountries();
      this.countries = response.data;
    } catch (error) {
      await this.toastSrv.viewToast('Error fetching countries:', 3000, 'warning');
    }
  }

onSelectCountry() {
    this.countrySelected.emit(this.selectedCountry);
  }
 }


