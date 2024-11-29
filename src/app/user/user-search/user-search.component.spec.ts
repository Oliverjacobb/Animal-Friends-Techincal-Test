import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSearchComponent } from './user-search.component';
import { User } from '../../models/user';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  const mockUser: User = {
    login: { uuid: '1234', username: 'user1' },
    name: { title: '', first: 'John', last: 'Doe' },
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
    name: { title: '', first: 'Joe', last: '' },
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
      imports: [UserSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setUser', () => {
    it('should emit the selected user', () => {
      spyOn(component.userSelected, 'emit');

      component.selectUser(mockUser);

      expect(component.userSelected.emit).toHaveBeenCalledWith(mockUser);
    });

    it('should set the search box value to the selected user name', () => {
      component.selectUser(mockUser);

      expect(component.SearchBox.value).toBe(`${mockUser.name.first} ${mockUser.name.last}`);
    });

    it('should set the filtered users to an empty array', () => {
      component.selectUser(mockUser);

      expect(component.filteredUsers()).toEqual([]);
    });
    
    it('should set the showResetButton to true', () => {
      component.selectUser(mockUser);

      expect(component.showResetButton()).toBeTrue();
    });
  });

  describe('resetUsers', () => {
    it('should set the search box value to empty', () => {
      component.resetUsers();

      expect(component.SearchBox.value).toBe('');
    });

    it('should emit the resetClicked event', () => {
      spyOn(component.resetClicked, 'emit');

      component.resetUsers();

      expect(component.resetClicked.emit).toHaveBeenCalled();
    });

    it('should set the showResetButton to false', () => {
      component.resetUsers();

      expect(component.showResetButton()).toBeFalse();
    });

    it('should set focus on the search input', () => {
      component.resetUsers();

      expect(document.activeElement).toBe(component.searchInput.nativeElement);
    });
  });

  describe('afterViewInit', () => {
    it('should set focus on the search input', () => {
      component.ngAfterViewInit();

      expect(document.activeElement).toBe(component.searchInput.nativeElement);
    });
  });
});
