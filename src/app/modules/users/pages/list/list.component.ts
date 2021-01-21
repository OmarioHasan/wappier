import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/http/api.service';
import { UsersResponse, User } from '@modules/users/interfaces/user';
import { ListAnimation } from '@shared/list-animation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [ListAnimation],
})
export class ListComponent implements OnInit {
  users: User[] = [];
  currentSortState: { key: string; asc: boolean } = { key: '', asc: false };
  constructor(
    private apiService: ApiService,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((usersResponse: UsersResponse) => {
      console.log('users', usersResponse);
      this.users = usersResponse.data;
    });
  }
  sort(type: string): void {
    if (this.currentSortState.key !== type) {
      this.currentSortState.asc = false;
    }
    this.currentSortState = { key: type, asc: !this.currentSortState.asc };
    this.users = this.users.sort((a: User, b: User) => {
      if (a[type] < b[type]) {
        return this.currentSortState.asc ? -1 : 1;
      }
      if (a[type] > b[type]) {
        return this.currentSortState.asc ? 1 : -1;
      }
      return 0;
    });
  }

  trackById(index: number, user: User): string {
    return user._id;
  }
}
