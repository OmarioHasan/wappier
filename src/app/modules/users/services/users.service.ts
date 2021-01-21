import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}
  getAge(birthdate: Date): number {
    const timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }
}
