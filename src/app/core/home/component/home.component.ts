import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DiscordGroup } from 'src/app/shared/models/discord-group';
import { Infor } from 'src/app/shared/models/infor';
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
  validatedForm: boolean = false;
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
    const _firstName = this.subscriptionForm.value.firstName;
    const _lastName = this.subscriptionForm.value.lastName;
    const _email = this.subscriptionForm.value.email;
    const _phoneNumber = this.subscriptionForm.value.phoneNumber;
    const _message = this.subscriptionForm.value.message;
    const _language = this.subscriptionForm.value.preferedLanguage;
    const _promoCode = this.subscriptionForm.value.promocode;

    const object: Infor = {
      firstName: _firstName,
      lastName: _lastName,
      email: _email,
      phoneNumber: _phoneNumber,
      message: _message,
      language: _language,
      promoCode: _promoCode
    }

    localStorage.setItem('Infor', JSON.stringify(object));
  }

  retrieveInfor() {
    let retrieve: any | Infor = localStorage.getItem('Infor');
    if(retrieve != null) {
      this.subscriptionForm = this.fb.group({
        firstName: new FormControl(retrieve.firstName, Validators.required),
        lastName: new FormControl(retrieve.lastName, Validators.required),
        email: new FormControl(retrieve.email, Validators.required),
        phoneNumber: new FormControl(retrieve.phoneNumber, Validators.required),
        message: new FormControl(retrieve.message, Validators.required),
        preferedLanguage: new FormControl(retrieve.language),
        promocode: new FormControl(retrieve.promoCode),
      });
    }
  }

  ngOnInit(): void {
    this.checkDate();
    this.retrieveInfor();
  }

}
