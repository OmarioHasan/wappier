import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  isLoading = false;
  constructor() {}
}
