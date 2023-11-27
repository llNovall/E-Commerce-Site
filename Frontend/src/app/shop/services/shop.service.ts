import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  
  constructor(private httpClient : HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>('/products');
  }
}
