import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ViewApiService {
  private apiUrl=environment.apiUrl
  constructor(private http: HttpClient) {}
  // Hotel API
  postHotelsdata(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-hotel`, data);
  }
  getHotelsdata(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-hotel-list`);
  }

  //  Food API
  getFood(hotelId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-food-list/${hotelId}`);
  }

  postFood(foodId: string, data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/add-food-list/${foodId}`,
      data
    );
  }
}
