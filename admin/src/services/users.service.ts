import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../models/user';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl=environment.apiUrl;

  private usersSubject:BehaviorSubject<Users[]>=new BehaviorSubject<Users[]>([]);
allUsers$:Observable<Users[]>;
  constructor(private http:HttpClient) {
    this.allUsers$=this.usersSubject.asObservable();
   }
getAllUsers(){
  this.http.get<Users[]>(`${this.apiUrl}/api/User`).subscribe({
    next:(data)=>{
      this.usersSubject.next(data);
    }
  })
}
deleteUser(userId:number){
  this.http.patch(`${this.apiUrl}/api/User/DeleteUser/${userId}`,{}).subscribe({
    next:(res)=>{
      this.getAllUsers();
    },error:(e)=>{
      
    }
  })
}


}
