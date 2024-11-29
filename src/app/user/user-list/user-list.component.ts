import { Component, inject, OnInit, signal } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { User, UserResult } from '../../models/user';
import { UserSearchComponent } from '../user-search/user-search.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterOutlet } from '@angular/router';

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

  ngOnInit(): void {
    this.retrieveUsers(1);
  }

  public selectUser(user: User): void {
    this.users.set(this.users().filter(u => u.login.uuid === user.login.uuid));
  }

  public onReset(): void {
    this.users.set(this.allUsers);
  }

  public onPageChange(page: number): void {
    this.page = page;
    this.retrieveUsers(page);
  }

  private retrieveUsers(page: number): void {
    this.userApiService.getUsers(10, page).subscribe((userResult: UserResult) => {
      this.allUsers = userResult.results;
      this.users.set(userResult.results);
      this.loadingUsers.set(false);
    });
  }
}
