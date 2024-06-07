import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { iUser } from '../../Models/i-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private authSvc: AuthService, private router: Router) {}
  newUser: Partial<iUser> = {};
  register() {
    this.authSvc.register(this.newUser).subscribe(() => {});
    this.router.navigate(['/auth/login']);
  }
}
