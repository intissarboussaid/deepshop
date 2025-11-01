import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiUrl = 'https://deepshop-backend-1.onrender.com/api/deepinsta/commentaire/';

  constructor(private http: HttpClient) { }


  AddCommentaireByUser(id_product:any, id_user:any,Commentaire:any): Observable<any> {
    return this.http.post(`${this.apiUrl}add/by/user/${id_product}/${id_user}`, Commentaire);
  }
AddCommentaireByAdmin(id_product:any, id_user:any,Commentaire:any): Observable<any> {
    return this.http.post(`${this.apiUrl}add/by/admin/${id_product}/${id_user}`, Commentaire);
  }
  getCommentaireByProduct(id_product:any,): Observable<any> {
    return this.http.get(`${this.apiUrl}get/product/${id_product}`);
  }
  getCommentaireByUser(id_user:any,): Observable<any> {
    return this.http.get(`${this.apiUrl}get/user/${id_user}`);
  }
  getAllCommentairesToAdmin(id_admin:any,): Observable<any> {
    return this.http.get(`${this.apiUrl}get/admin/commentaires/${id_admin}`);
  }
}
