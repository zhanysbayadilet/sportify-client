import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from "../model/category";
import {ServiceCommonConstants} from "../constants/service-common.constants";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryArr: Category[] = [];
  category: Category | undefined;
  private readonly apiUrl = ServiceCommonConstants.ADMINISTRATION_URL + '/category'

  constructor(private http: HttpClient) { }

  requestConstructor(params: any) {
    let requestParams = '?';
    for (const param in params) {
      requestParams += (params[param] === '' || params[param] === null)
        ? '' : (param + '=' + params[param] + '&')
    }
    return requestParams;
  }

  getCategories(params: any): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/all${this.requestConstructor(params)}`);
  }

  getCategory(id: number): Observable<Category>{
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  deleteCategory(id: number | undefined):Observable<Category[]>{
    return this.http.delete<Category[]>(`${this.apiUrl}/${id}`);
  }

  saveCategory(category: Category):Observable<Object> {
    return this.http.post(`${this.apiUrl}/save`, category);
  }
}
