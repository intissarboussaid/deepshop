import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://deepshop-backend-1.onrender.com/api/deepinsta/user';
  constructor(private http: HttpClient) { }

 updateInformations(id: any,  adminBody:{nom:any,prenom:any,phone:any,adresse:any,local:any,date_naissance:any,site:any,sexe:any,nationnalité:any,instagramme:any,facebook:any,tiktok:any,description:any}): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/All/Informations/${id}`,adminBody);
  }
  
  getUser(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUserPhoto(id_user: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put(`${this.apiUrl}/update/photo/${id_user}`, formData);
  }
  getPhotoUser(id: any) {
    return this.http.get(`${this.apiUrl}/photo/${id}`, {
      responseType: 'blob' // Important for binary data like images
    });
  }
}
