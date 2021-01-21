import { ProgressBarService } from './../../services/progress-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public progressBarService: ProgressBarService) {}

  ngOnInit(): void {}
}
