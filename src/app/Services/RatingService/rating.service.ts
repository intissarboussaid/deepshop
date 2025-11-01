import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private apiUrl = 'https://deepshop-backend-1.onrender.com/api/deepinsta/rating/';

  constructor(private http: HttpClient) { }


  AddRating(id_product: any, id_user: any, starts: any): Observable<any> {
    return this.http.post(`${this.apiUrl}add/${id_product}/${id_user}`, starts);
  }
  AddRatingByAdmin(id_product: any, id_admin: any, starts: any): Observable<any> {
    return this.http.post(`${this.apiUrl}add/by/admin/${id_product}/${id_admin}`, starts);
  }

  getRatingByProduct(id_product: any,): Observable<any> {
    return this.http.get(`${this.apiUrl}get/product/${id_product}`);
  }
  getRatingByUser(id_user: any,): Observable<any> {
    return this.http.get(`${this.apiUrl}get/user/${id_user}`);
  }
  getRatingByUserAndProduct(id_user: any, id_product: any): Observable<any> {
    return this.http.get(`${this.apiUrl}Get/By/User/product/${id_user}/${id_product}`);
  }
  getRatingByAdminAndProduct(id_admin: any, id_product: any): Observable<any> {
    return this.http.get(`${this.apiUrl}Get/By/admin/product/${id_admin}/${id_product}`);
  }
  getRatingByStarts(id_product: any, starts: any): Observable<any> {
    return this.http.get(`${this.apiUrl}Get/By/starts/${id_product}/${starts}`);
  }
}
