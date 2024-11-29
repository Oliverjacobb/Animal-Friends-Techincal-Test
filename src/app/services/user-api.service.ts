import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User, UserResult } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private httpClient = inject(HttpClient);
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  public getUsers(results: number, page: number) : Observable<UserResult> {
    let params = new HttpParams()
      .set('results', results)
      .set('page', page);

      return this.httpClient.get<UserResult>('https://randomuser.me/api/', { params })
      .pipe(
        map((response: UserResult) => {
          const users = response.results;
          this.usersSubject.next(users);
          return response;
        })
      );
  }

  public getUserByUuid(uuid: string): Observable<User | null> {
    return this.users$.pipe(
      map(users => users.find(user => user.login.uuid === uuid) || null)
    );
  }
}
