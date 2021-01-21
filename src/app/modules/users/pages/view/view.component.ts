import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/http/api.service';
import { UserResponse, User } from '@modules/users/interfaces/user';
import { UsersService } from '@modules/users/services/users.service';
import { ListAnimation } from '@shared/list-animation';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  animations: [ListAnimation],
})
export class ViewComponent implements OnInit {
  user: User;
  userId: string;
  appIcon: File;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.apiService
      .getUser(this.userId)
      .subscribe((userResponse: UserResponse) => {
        console.log('users', userResponse.data);
        this.user = userResponse.data;
      });
  }
  trackById(index: number, user: User): string {
    return user._id;
  }

  deleteApp(appId: string): void {
    this.apiService
      .deleteApp(this.userId, appId)
      .subscribe((deleteResponse: UserResponse) => {
        console.log('delete users', deleteResponse.data);
        this.user = deleteResponse.data;
      });
  }
  onFileChanged(event) {
    this.appIcon = event.target.files[0];
  }
  addApp(appName: string): void {
    const uploadData = new FormData();
    uploadData.append('myFile', this.appIcon, this.appIcon.name);
    console.log('form data', this.appIcon);

    this.apiService
      .addApp(this.userId, appName, uploadData)
      .subscribe((addResponse: UserResponse) => {
        console.log('add users', addResponse);
        // this.user = addResponse.data;
      });
  }
}
