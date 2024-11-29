import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../models/user';
import { UserApiService } from '../../services/user-api.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { TimezonePipe } from '../timezone.pipe';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, RouterOutlet, RouterLink, TimezonePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  public user!: User;
  private userApiService = inject(UserApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');

    if (uuid) {
      this.userApiService.getUserByUuid(uuid).subscribe(user => {
        if (user) {
          this.user = user;
        } else {
          // This is for when you refresh on this route.
          // I cannot see a way to get the same single user by id from the API.
          // Obviously in real world the API would have a get user by id endpoint or similar.
          // I did think about caching the user initially but for the sake of this task I didn't.
          this.router.navigate(['users']);
        }
      });
    }
  }
}
