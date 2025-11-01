import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'https://deepshop-backend-1.onrender.com/api/deepshop/fav/';

  constructor(private http: HttpClient) { }


  AddFavByUser(id_product: any, id_user: any,favBody:any): Observable<any> {
    return this.http.post(`${this.apiUrl}add/user/${id_product}/${id_user}`, {favBody});
  }
  AddFavByAdmin(id_product: any, id_admin: any,favBody:any): Observable<any> {
    return this.http.post(`${this.apiUrl}add/admin/${id_product}/${id_admin}`, {favBody});
  }
  getFavByProduct(id_product: any,): Observable<any> {
    return this.http.get(`${this.apiUrl}get/product/${id_product}`);
  }
  getFavByUser(id_user: any,): Observable<any> {
    return this.http.get(`${this.apiUrl}get/user/${id_user}`);
  }
  getFavByAdmin(id_admin: any,): Observable<any> {
    return this.http.get(`${this.apiUrl}get/admin/${id_admin}`);
  }
  getFavByUserAndProduct(id_user: any, id_product: any): Observable<any> {
    return this.http.get(`${this.apiUrl}Get/By/User/product/${id_user}/${id_product}`);
  }
  getFavByAdminAndProduct(id_admin: any, id_product: any): Observable<any> {
    return this.http.get(`${this.apiUrl}Get/By/admin/product/${id_admin}/${id_product}`);
  }
}
