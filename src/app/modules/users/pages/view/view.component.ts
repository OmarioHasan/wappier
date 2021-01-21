import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@core/http/api.service';
import { UserResponse, User } from '@modules/users/interfaces/user';
import { UsersService } from '@modules/users/services/users.service';
import { ListAnimation } from '@shared/list-animation';
import {
  DropzoneModule,
  DropzoneComponent,
  DropzoneDirective,
  DropzoneConfigInterface,
} from 'ngx-dropzone-wrapper';

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

  openAppForm = false;
  appId: string;
  editMode = false;
  editUser = false;
  userForm: FormGroup;
  @ViewChild('appName') appName: ElementRef;
  @ViewChild(DropzoneComponent) drpzone: DropzoneComponent;

  DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: `http://lab.wappier.com`,
    params: { app: '' },
    paramName: 'icons',
    headers: {
      'api-token': '484ac54f-e25a-4a8d-ade8-ce425d796fbd',
    },
  };
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl({ value: '' }, Validators.required),
      country: new FormControl({ value: '' }, Validators.required),
      birthday: new FormControl({ value: '' }, Validators.required),
    });
    this.userForm.disable();
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.DEFAULT_DROPZONE_CONFIG.url = `http://lab.wappier.com/user/${this.userId}/app/`;
    this.getUserDetails();
  }
  trackById(index: number, user: User): string {
    return user._id;
  }

  getUserDetails(): void {
    this.openAppForm = false;
    this.editMode = false;
    this.apiService
      .getUser(this.userId)
      .subscribe((userResponse: UserResponse) => {
        this.user = userResponse.data;
        this.userForm.patchValue({
          name: this.user.name,
          country: this.user.country,
          birthday: this.usersService.getAge(this.user.birthday),
        });
      });
  }

  deleteApp(appId: string): void {
    this.apiService
      .deleteApp(this.userId, appId)
      .subscribe((deleteResponse: UserResponse) => {
        console.log('delete users', deleteResponse.data);
        this.user = deleteResponse.data;
        this.usersService.historySubject.next(
          `User ${this.user.name} Edited - apps deleted`
        );
      });
  }

  addApp(): void {
    this.drpzone.directiveRef.dropzone().processQueue();
  }

  enableEditApp(appId: string, appName: string): void {
    this.openAppForm = true;
    this.editMode = true;
    setTimeout(() => {
      this.appName.nativeElement.value = appName;
      this.appName.nativeElement.focus();
      this.appId = appId;
      this.DEFAULT_DROPZONE_CONFIG.url = `http://lab.wappier.com/user/${this.userId}/app/${appId}`;
      this.DEFAULT_DROPZONE_CONFIG.params = { app: appName };
      this.DEFAULT_DROPZONE_CONFIG.method = 'PUT';
    }, 1);
  }
  editApp(): void {
    this.drpzone.directiveRef.dropzone().processQueue();
  }
  addSuccess(): void {
    this.getUserDetails();
    this.usersService.historySubject.next(
      `User ${this.user.name} Edited - apps added`
    );
  }
  editSuccess(): void {
    this.getUserDetails();
    this.usersService.historySubject.next(
      `User ${this.user.name} Edited - apps change`
    );
  }

  deleteUser(): void {
    this.apiService.deleteUser(this.userId).subscribe(() => {
      this.usersService.historySubject.next(`User ${this.user.name} deleted`);
      this.router.navigate(['../']);
    });
  }
  startEditUser(): void {
    this.editUser = true;
    this.userForm.enable();
  }
  editUserData(): void {
    this.apiService.editUser(this.userId, this.userForm.value).subscribe(() => {
      this.usersService.historySubject.next(`User ${this.user.name} Edited`);
      this.userForm.disable();
      this.getUserDetails();
    });
  }
}
