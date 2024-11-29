import { AfterViewInit, Component, ElementRef, EventEmitter, input, OnDestroy, OnInit, Output, signal, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { startWith } from 'rxjs/internal/operators/startWith';
import { debounceTime, distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss'
})
export class UserSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  public SearchBox = new FormControl();
  public filteredUsers = signal<User[]>([]);
  public searchableUsers = input<User[]>([]);
  public showResetButton = signal<boolean>(false);
  private destroy$ = new Subject<void>();

  @Output() userSelected = new EventEmitter<User>();
  @Output() resetClicked = new EventEmitter();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  component: any;

  ngOnInit(): void {
    this.SearchBox.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      filter(value => typeof value === 'string'),
      takeUntil(this.destroy$)
    ).subscribe(value => this.filterUsers(value))
  }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private filterUsers(query: string): void {
    if (query.length < 3) {
      this.filteredUsers.set([]);
      return;
    }

    query = query.toLowerCase();

    this.filteredUsers.set(
      this.searchableUsers().filter(user => {
        return user.name.first.toLowerCase().includes(query) ||
               user.name.last.toLowerCase().includes(query);
      })
    );
  }

  public selectUser(user: User): void {
    this.userSelected.emit(user);
    this.SearchBox.setValue(`${user.name.first} ${user.name.last}`);
    this.filteredUsers.set([]); 
    this.showResetButton.set(true);
  }

  public resetUsers(): void {
    this.SearchBox.setValue('');
    this.resetClicked.emit();
    this.showResetButton.set(false);
    this.searchInput.nativeElement.focus();
  }
}
