import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  warningText: string = "However, please note that it is now";
  subscriptionForm: FormGroup = this.fb.group({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
    preferedLanguage: new FormControl(''),
    promocode: new FormControl(''),
  });
  groupsData: DiscordGroup[] = data;
  constructor(private fb: FormBuilder) { }

  @HostListener("window:resize", []) updateWarningText() {
    if (window.innerWidth >= 960) {
      this.warningText = "However, please note that it is now";
    } else if (window.innerWidth <= 480) {
      this.warningText = "";
    }
  }

  checkDate() {
    if(Date.parse(this.today.toString()) < Date.parse(this.deadline.toString())){
      this.showWarning = false;
    } else {
      this.showWarning = true;
    } 
  }

  storeInfos() {
    console.log(this.subscriptionForm.value);
  }

  ngOnInit(): void {
    this.checkDate();
  }

}
