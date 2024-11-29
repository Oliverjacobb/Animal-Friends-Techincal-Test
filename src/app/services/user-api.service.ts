import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResult } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private httpClient = inject(HttpClient);

  public getUsers(results: number, page: number) : Observable<UserResult> {
    let params = new HttpParams()
      .set('results', results)
      .set('page', page);

    return this.httpClient.get<UserResult>('https://randomuser.me/api/', { params });
  }
}
