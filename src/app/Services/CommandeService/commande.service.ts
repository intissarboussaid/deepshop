import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'https://deepshop-backend-1.onrender.com/api/deepinsta/commande/';

  constructor(private http: HttpClient) { }


  AddCommande(id_product: any, id_user: any, commande: any): Observable<any> {
    return this.http.post(`${this.apiUrl}add/${id_product}/${id_user}`, commande);
  }
  GetCommandesByProduct(id_product: any): Observable<any> {
    return this.http.get(`${this.apiUrl}product/${id_product}`);
  }
  GetCommandesNotConfByUser(id_user: any): Observable<any> {
    return this.http.get(`${this.apiUrl}user/not/conf/${id_user}`);
  }
  GetCommandeById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}id/${id}`);
  }
  deleteProductFromCmd(id_product: any, id_cmd: any, id_user: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}delete/product/${id_product}/${id_cmd}/${id_user}`);
  }
  ConfCommandeByUser(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}conf/cmd/by/user/${id}`);
  }
  GetCmdConfirmedByUser(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}get/cmd/conf/by/user/${id}`);
  }
  GetCmdConfirmedByUserAndAdmin(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}get/cmd/conf/by/user/and/admin/${id}`);
  }
  GetCmdRefusedByAdmin(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}get/cmd/ref/by/admin/${id}`);
  }
  GetCmdNotConfByAdminAndConfByUser(id_admin: any) : Observable<any>{
    return this.http.get(`${this.apiUrl}get/cmds/confUser/NotConf/admin/${id_admin}`);
  }
  GetCmdsValidedByAdmin(id_admin: any) : Observable<any>{
    return this.http.get(`${this.apiUrl}get/cmds/valid/admin/${id_admin}`);
  }
  GetCmdsRefusedByAdmin(id_admin: any) : Observable<any>{
    return this.http.get(`${this.apiUrl}get/cmds/refused/admin/${id_admin}`);
  }
  ValiderCmdByAdmin(id_cmdItem: any) {
    return this.http.get(`${this.apiUrl}valider/cmd/admin/${id_cmdItem}`);
  }
  CancelCmdByAdmin(id_cmdItem: any) {
    return this.http.get(`${this.apiUrl}cancel/cmd/admin/${id_cmdItem}`);
  }
  DeleteCommande(id_cmd: any) {
    return this.http.delete(`${this.apiUrl}delete/commande/${id_cmd}`);
  }

}
