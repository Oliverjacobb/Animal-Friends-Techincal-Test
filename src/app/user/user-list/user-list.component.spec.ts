import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { User } from '../../models/user';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  const mockUser: User = {
    login: { uuid: '1234', username: 'user1' },
    name: { title: '', first: '', last: '' },
    gender: '',
    picture: { large: '', medium: '', thumbnail: '' },
    email: '',
    location: { street: { number: 0, name: '' }, city: '', state: '', country: '', postcode: 0, coordinates: { latitude: '', longitude: '' }, timezone: { offset: '', description: '' } },
    dob: { date: '', age: 0 },
    nat: '',
    registered: { date: '', age: 0 },
    phone: '',
    cell: ''
  };

  const mockUser2: User = {
    login: { uuid: '5678', username: 'user2' },
    name: { title: '', first: '', last: '' },
    gender: '',
    picture: { large: '', medium: '', thumbnail: '' },
    email: '',
    location: { street: { number: 0, name: '' }, city: '', state: '', country: '', postcode: 0, coordinates: { latitude: '', longitude: '' }, timezone: { offset: '', description: '' } },
    dob: { date: '', age: 0 },
    nat: '',
    registered: { date: '', age: 0 },
    phone: '',
    cell: ''
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('selectUser', () => {
    it('should filter the selected user and update users', () => {
      component.users.set([mockUser, mockUser2]);
    
      component.onSelectUser(mockUser);
    
      expect(component.users()).toEqual([mockUser]);
    });

    it('should hide the pagination when a user is selected', () => {
      component.onSelectUser(mockUser);
    
      expect(component.hidePagination()).toBeTrue();
    })
  });

  describe('resetUsers', () => {
    it('should reset users to allUsers when onReset is called', () => {
      component.allUsers = [mockUser, mockUser2];
      component.users.set([mockUser]);

      component.onReset();

      expect(component.users()).toEqual(component.allUsers);
    });

    it('should show the pagination when users are reset', () => {
      component.onReset();
    
      expect(component.hidePagination()).toBeFalse();
    })
  });

  describe('onPageChange', () => {
    it('should update the page when onPageChange is called', () => {
      component.onPageChange(5);

      expect(component.page).toBe(5);
    });
  });
});
