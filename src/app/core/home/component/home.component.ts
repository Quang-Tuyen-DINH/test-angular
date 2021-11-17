import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscordGroup } from 'src/app/shared/models/discord-group';
import { data } from '../mockdata/data.discord';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  deadline: Date = new Date('May 31, 2021');
  today: Date = new Date();
  showWarning: boolean = false;
  subscriptionForm: FormGroup = this.fb.group({
    firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
    lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
    email: ['',  Validators.compose([Validators.required, Validators.email])],
    phoneNumber: ['', Validators.requiredTrue],
    message: ['', Validators.requiredTrue],
    preferedLanguage: [''],
    promocode: [''],
  });
  groupsData: DiscordGroup[] = data;
  constructor(private fb: FormBuilder) { }

  checkDate() {
    if(Date.parse(this.today.toString()) < Date.parse(this.deadline.toString())){
      this.showWarning = false;
    } else {
      this.showWarning = true;
    } 
  }

  ngOnInit(): void {
    this.checkDate();
    console.log(this.groupsData)
  }

}
