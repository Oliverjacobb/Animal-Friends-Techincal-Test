import { Component, inject, OnInit, signal } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { User, UserResult } from '../../models/user';
import { UserSearchComponent } from '../user-search/user-search.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserSearchComponent, RouterLink, NgbPaginationModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  private userApiService = inject(UserApiService);
  public allUsers: User[] = [];
  public users = signal<User[]>([]);
  public loadingUsers = signal<boolean>(true);
  public page: number = 1;
  public hidePagination = signal<boolean>(false);

  ngOnInit(): void {
    this.retrieveUsers(1);
  }

  public onSelectUser(user: User): void {
    this.users.set(this.users().filter(u => u.login.uuid === user.login.uuid));
    this.hidePagination.set(true);
  }

  public onReset(): void {
    this.users.set(this.allUsers);
    this.hidePagination.set(false);
  }

  public onPageChange(page: number): void {
    this.page = page;
    this.retrieveUsers(page);
  }

  private retrieveUsers(page: number): void {
    this.userApiService.getUsers(10, page)
    .pipe(
      catchError((error) => {
        console.error('Error retrieving users:', error);
        return of({results: []} as UserResult);
      })
    )
    .subscribe((userResult: UserResult) => {
      this.allUsers = userResult.results;
      this.users.set(userResult.results);
      this.loadingUsers.set(false);
    });
  }
}
