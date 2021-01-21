import { UsersService } from '@modules/users/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ListAnimation } from '@shared/list-animation';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [ListAnimation],
})
export class HistoryComponent implements OnInit {
  changes: { change: string; time: string }[] = [];
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.historySubject.subscribe((change: string) => {
      this.changes.unshift({
        change,
        time: `${new Date().getHours()} : ${new Date().getMinutes()}`,
      });
    });
  }
}
