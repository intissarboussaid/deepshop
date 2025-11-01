import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodePromoService {

    private apiUrl = 'https://deepshop-backend-1.onrender.com/api/deepshop/codePromo/';
  constructor(private http: HttpClient) { }

  addCodePromo(idAdmin:any,idUser:any,CodePromo:any): Observable<any> {
    return this.http.post(`${this.apiUrl}add/user/${idAdmin}/${idUser}`, CodePromo);
  }
  GetPromoByAdminAndUser(id_admin: any,id_user:any): Observable<any> {
      return this.http.get(`${this.apiUrl}get/promo/admin/user/${id_admin}/${id_user}`);
    }
  submitCode(id_cmd:any,name:any): Observable<any> {
      return this.http.get(`${this.apiUrl}send/code/${id_cmd}/${name}`,);
  }
}
