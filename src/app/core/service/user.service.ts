import { Injectable } from '@angular/core';
import {map, Observable, ReplaySubject, tap} from "rxjs";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {ServiceCommonConstants} from "../constants/service-common.constants";

const AUTH_API = 'http://localhost:8081/sportify/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
  userArr: User[] = [];
  API_URL = 'http://localhost:8081/sportify/api/test/';
  private readonly ADMINISTRATION_URL = ServiceCommonConstants.ADMINISTRATION_URL + '/user';

  constructor(private _httpClient: HttpClient) {
  }

  requestConstructor(params: any) {
    const requestParams = Object.entries(params)
      .filter(([key, value]) => value !== '' && value !== null)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return `?${requestParams}`;
  }

  set user(value: User)
  {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User>
  {
    return this._user.asObservable();
  }

  get(): Observable<User>
  {
    return this._httpClient.get<User>('api/common/user').pipe(
      tap((user) => {
        this._user.next(user);
      })
    );
  }

  update(user: User): Observable<any>
  {
    return this._httpClient.patch<User>('api/common/user', {user}).pipe(
      map((response) => {
        this._user.next(response);
      })
    );
  }

  getPublicContent(): Observable<any> {
    return this._httpClient.get(this.API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this._httpClient.get(this.API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this._httpClient.get(this.API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this._httpClient.get(this.API_URL + 'admin', { responseType: 'text' });
  }

  getUsers(): Observable<any>{
    return this._httpClient.get<any>(this.ADMINISTRATION_URL + '/all')
      .pipe(
        tap(users => this.userArr = users)
      );
  }

  getUser(id: any | undefined): Observable<User>{
    return this._httpClient.get<User>(`${this.ADMINISTRATION_URL}/${id}`);
  }

  deleteUser(id: number | undefined):Observable<User[]>{
    return this._httpClient.delete<User[]>(`${this.ADMINISTRATION_URL}/${id}`);
  }

  saveUser(user: FormData){
    return this._httpClient.post<User>(`${this.ADMINISTRATION_URL}/save`, user);
  }

  getCountUsers(): Observable<number> {
    return this._httpClient.get<number>(`${this.ADMINISTRATION_URL}/count`);
  }

  getUserTournaments(params: any): Observable<any> {
    return this._httpClient.get<any>(`${this.ADMINISTRATION_URL}/tournaments${this.requestConstructor(params)}`);
  }

  getMyTournaments(params: any): Observable<any> {
    return this._httpClient.get<any>(`${this.ADMINISTRATION_URL}/myTournaments${this.requestConstructor(params)}`);
  }

  getUserByUsername(param: any): Observable<User[]> {
    return this._httpClient.get<any>(`${this.ADMINISTRATION_URL}/filter${this.requestConstructor(param)}`)
  }
}
