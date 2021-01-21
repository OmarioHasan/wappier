import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  historySubject = new ReplaySubject<string>();
  constructor() {}
  getAge(birthdate: Date): number {
    const timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }
}
