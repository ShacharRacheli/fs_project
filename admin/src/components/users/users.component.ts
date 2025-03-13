import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { Users } from '../../models/user';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-users',
  imports: [AsyncPipe, ReactiveFormsModule, MatButtonModule, MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatCardModule, MatExpansionModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  allUsers$:Observable<Users[]>;
  constructor(private userService:UsersService){
    this.allUsers$=this.userService.allUsers$;
    this.userService.getAllUsers();
  }
  ngOnInit(): void {
  }
deleteUser(userID:number){
  this.userService.deleteUser(userID);
}addUser(userID:number){
  this.userService.deleteUser(userID);
}
}
