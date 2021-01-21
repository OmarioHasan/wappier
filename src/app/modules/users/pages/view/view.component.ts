import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  fileDetails: any = {
    clientDoc: {},
  };
  openEditAppForm = false;
  appId: string;
  @ViewChild('appName') appName: ElementRef;

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
    // this.appIcon = event.target.files[0];
    this.fileDetails.clientMandateForm = event.srcElement.files[0];
  }
  addApp(appName: string): void {
    // let formData: FormData = new FormData();
    // formData.append('clientDoc', this.fileDetails.clientDoc);
    // console.log('form data', formData);
    // this.apiService
    //   .addApp(this.userId, appName, formData)
    //   .subscribe((addResponse: UserResponse) => {
    //     console.log('add users', addResponse);
    //     // this.user = addResponse.data;
    //   });
  }
  enableEditApp(appId: string, appName: string): void {
    this.openEditAppForm = true;
    setTimeout(() => {
      this.appName.nativeElement.value = appName;
      this.appName.nativeElement.focus();
      this.appId = appId;
    }, 1);
  }
  editApp(): void {
    this.apiService
      .editApp(this.userId, this.appId, this.appName.nativeElement.value)
      .subscribe((editResponse: UserResponse) => {
        console.log('add users', editResponse);
        this.user = editResponse.data;
        this.openEditAppForm = false;
      });
  }
}
