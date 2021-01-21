import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { HistoryComponent } from './components/history/history.component';
import { ListComponent } from './pages/list/list.component';
import { ViewComponent } from './pages/view/view.component';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HistoryComponent,
    ListComponent,
    ViewComponent,
    UsersComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule],
})
export class UsersModule {}
