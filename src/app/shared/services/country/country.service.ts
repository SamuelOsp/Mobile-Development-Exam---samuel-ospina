import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Http } from '../http/http';
import { CountryResponse } from 'src/app/interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly apiUrl = environment.apiUrls.countries;
  constructor(private readonly http: Http) {}

  async getCountries(): Promise<CountryResponse> {
    return this.http.get<CountryResponse>(this.apiUrl);
  }
}
