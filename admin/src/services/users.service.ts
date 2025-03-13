import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSubject:BehaviorSubject<Users[]>=new BehaviorSubject<Users[]>([]);
allUsers$:Observable<Users[]>;
  constructor(private http:HttpClient) {
    this.allUsers$=this.usersSubject.asObservable();
   }
getAllUsers(){
  this.http.get<Users[]>(`http://localhost:5070/api/User`).subscribe({
    next:(data)=>{
      this.usersSubject.next(data);
    }
  })
}
deleteUser(userId:number){
  this.http.patch(`http://localhost:5070/api/User/DeleteUser/${userId}`,{}).subscribe({
    next:(res)=>{
      this.getAllUsers();
    },error:(e)=>{
      
    }
  })
}


}
