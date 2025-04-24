import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../services/challenge.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Challenge } from '../../models/challenge';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-challenges',
  imports: [AsyncPipe, ReactiveFormsModule, MatButtonModule, NgTemplateOutlet, MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule, MatExpansionModule,CommonModule],
  templateUrl: './challenges.component.html',
  styleUrl: './challenges.component.css'
})
export class ChallengesComponent implements OnInit {
  challengeForm!: FormGroup;
isAddChallenge:boolean=false;

  allChallenges$: Observable<Challenge[]>;
  constructor(private challengeService: ChallengeService, private fb: FormBuilder) {
    this.allChallenges$ = this.challengeService.challenges$;
    this.challengeService.getAllChallenges();
  }
  ngOnInit(): void {
this.challengeForm=this.fb.group({
  title:['', [Validators.required, Validators.minLength(4)]],
 description:['', [Validators.required, Validators.minLength(4)]],
//  startDate:[],
//  endDate:[],
//  status:['', [Validators.required]],
})
  }
  get challenge(): { [key: string]: AbstractControl } {
    return this.challengeForm.controls;
  }
  setIsAddChallenge(){
    this.isAddChallenge=!this.isAddChallenge;
  }
  onSubmitAddChallenge() {
this.challengeService.addChallenge(this.challengeForm.value)
this.challengeForm.reset(); 
// console.log("in add  ch");
  }
  isChallengeActive(startDate: Date, endDate: Date): boolean {
    const currentDate = new Date();
    return currentDate >= new Date(startDate) && currentDate <= new Date(endDate);
  }
  getActiveChallenges() {
this.challengeService.getActiveChallenges();
  }
}
