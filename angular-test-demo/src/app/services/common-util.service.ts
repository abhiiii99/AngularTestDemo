import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonUtilService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  public getUserDetails(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.baseUrl}/getUserData`);
  }

  public addUser(userDetails: UserDetails): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addUser`, userDetails);
  }

  public updateUserDetails(userId: string, userDetails: UserDetails): Observable<any> {
    const options = {
      params: new HttpParams().set('id', userId),
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put<any>(`${this.baseUrl}/updateUser`, userDetails, options);
  }

  public deleteUserDetails(userId: string): Observable<any> {
    const options = {
      params: new HttpParams().set('id', userId),
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete<any>(`${this.baseUrl}/deleteUser`, options);
  }
}

// TODO: To be updated with the proper schema at DB
export interface UserDetails {
  title: string;
  description: string;
}