import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, Observable, of, switchMap, throwError} from "rxjs";
import {UserService} from "../service/user.service";
import {AuthUtils} from "./auth.utils";

// const AUTH_API = 'http://178.128.41.200:8081/sportify/api/auth/';
const AUTH_API = 'http://178.128.41.200:8081/sportify/api/auth/';

@Injectable()
export class AuthService {
  private _authenticated: boolean = false;
  constructor(private _httpClient: HttpClient,
              private _userService: UserService,
              private _snackBar: MatSnackBar) { }

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }
  openSnackBar() {
    this._snackBar.open('You not having access!', 'OK', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  signIn(loginRequest: any): Observable<any> {
    // Throw error, if the user is already logged in
    if ( this._authenticated ) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post(AUTH_API + 'signin', loginRequest).pipe(
      switchMap((response: any) => {

        // Store the access token in the local storage
        // this.accessToken = response.accessToken;

        // Set the authenticated flag to true
        this._authenticated = true;

        let loggedUser = {
          id: response.id,
          name: response.name,
          email: response.email,
          username: response.username
        };

        // Store the user on the user service
        this._userService.user = loggedUser;
        let authResponse = {
          user: loggedUser,
          token: response.token
        }

        // localStorage.setItem('HEADER_USER', JSON.stringify(loggedUser));
        // Return a new observable with the response
        return of(authResponse);
      })
    );
  }

  signInUsingToken(): Observable<any> {
    // Sign in using the token
    return this._httpClient.post(AUTH_API + 'sign-in-with-token', {
      accessToken: this.accessToken
    }).pipe(
      catchError(() =>

        // Return false
        of(false)
      ),
      switchMap((response: any) => {

        // Replace the access token with the new one if it's available on
        // the response object.
        //
        // This is an added optional step for better security. Once you sign
        // in using the token, you should generate a new one on the server
        // side and attach it to the response object. Then the following
        // piece of code can replace the token with the refreshed one.
        if ( response.accessToken )
        {
          this.accessToken = response.accessToken;
        }

        // Set the authenticated flag to true
        this._authenticated = true;

        // Store the user on the user service
        this._userService.user = response.user;

        // Return true
        return of(true);
      })
    );
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if ( this._authenticated )
    {
      return of(true);
    }

    // Check the access token availability
    if ( !this.accessToken )
    {
      return of(false);
    }

    // Check the access token expire date
    if ( AuthUtils.isTokenExpired(this.accessToken) )
    {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    // return this.signInUsingToken();
    return of(true);
  }

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('HEADER_USER');


    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  signUp(signUpForm: any): Observable<any> {
    return this._httpClient.post(AUTH_API + 'signup', signUpForm);
  }


}
