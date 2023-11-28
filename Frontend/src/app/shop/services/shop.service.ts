import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private API_URL = environment.API_URL;
  
  constructor(private httpClient : HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.API_URL + '/Products/GetAllProducts');
  }

  getProduct(id : string): Observable<Product> {

    let params : HttpParams = new HttpParams();
    params = params.set('id', id);
    return this.httpClient.get<Product>(this.API_URL + '/Products/GetProduct', {params: params});
  }
}
