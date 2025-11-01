import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://deepshop-backend-1.onrender.com/api/deepinsta/product/';
  private urlView='https://deepshop-backend-1.onrender.com/api/deepinsta/view/product/'

  constructor(private http: HttpClient) { }
  AddProduct(id: any, product: any, files: File[]): Observable<any> {
    const formData = new FormData();//formulaire numerique bch y3ml files brcha
    files.forEach(file => formData.append('files', file, file.name));
    formData.append('product', new Blob([JSON.stringify(product)], {
      type: 'application/json'
    }));
    return this.http.post(`${this.apiUrl}addProduct/by/admin/${id}`, formData);
  }
  UploadPhotosProduct(id: any, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.put(`${this.apiUrl}add/photo/${id}`, formData, { headers });
  }
  GetProductsByAdmin(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}find/byAdmin/${id}`);
  }
  getPhotosProduct(id: any) {
    return this.http.get(`${this.apiUrl}get/photo/product/${id}`, {
      responseType: 'blob'
    });
  }
  editProduct(id: any, productBody: {
    cost_price: any,
    sale_price: any,
    name: any,
    description: any,
    qte: any,
    type: any,
    product: any,
    currency: any,
    quality: any,
    brand: any,
    status: any,
    color: any,
    size: any,
    Weight: any,
    dimensions: any,
    material: any,
    author: any,
    flavor: any,
    gender: any,
    level: any,
    stock: any
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}edit/${id}`, productBody);
  }
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}delete/${id}`);
  }
  GetAllProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}find/all`);
  }
  addDiscount(id: any, discount: any) {
    return this.http.post(`${this.apiUrl}add/discount/${id}`, discount);
  }
  getProductById(id: any) {
    return this.http.get(`${this.apiUrl}get/by/id/${id}`);
  }
  AddPhoto(id: any, files: File[]): Observable<any> {
    const formData = new FormData();//formulaire numerique bch y3ml files brcha
    files.forEach(file => formData.append('files', file, file.name));
    return this.http.post(`${this.apiUrl}addPhoto/by/product/${id}`, formData);
  }
   AddView(id_product: any, id_user:any): Observable<any> {
    return this.http.post(`${this.urlView}add/${id_product}/${id_user}`, {id_product,id_user});
  }
  RemoveDiscount(id:any){
     return this.http.get(`${this.apiUrl}remove/discount/${id}`);    
  }
  getProductByType(type:any): Observable<any> {
    return this.http.get(`${this.apiUrl}find/by/type/${type}`)
  }
  detailsProduct(details:any){
    return this.http.post(`${this.apiUrl}add/details`, details);
  }
}
