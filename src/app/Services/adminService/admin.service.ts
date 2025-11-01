import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
private apiUrl = 'https://deepshop-backend-1.onrender.com/api/deepinsta/admin';
  constructor(private http: HttpClient) { }

 updateInformations(id: any,  adminBody:{nom:any,prenom:any,phone:any,adresse:any,local:any,date_naissance:any,site:any,sexe:any,nationnalité:any,instagramme:any,facebook:any,tiktok:any,description:any}): Observable<any> {
    return this.http.put(`https://deepshop-backend-1.onrender.com/api/deepinsta/admin/update/Informations/${id}`,adminBody);
  }
  getAdmin(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
    getPhotoAdmin(id: any) {
    return this.http.get(`${this.apiUrl}/photo/${id}`, {
      responseType: 'blob' // Important for binary data like images
    });
  }
  updateAdminPhoto(id_admin: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put(`${this.apiUrl}/update/photo/${id_admin}`, formData);
  }
}
