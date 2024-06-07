import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../Models/i-user';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.scss',
})
export class AllUserComponent {
  users: iUser[] = [];

  constructor(private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.users$.subscribe((users) => {
      this.users = users;
    });
    this.authSvc.loadAllUsers();
  }
}
