import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { flyInOut, expand } from '../animations/app.animation';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedBackService } from '../services/feed-back.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ],
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback[];
  contactType = ContactType;
  isSubmit: boolean;
  isload = false;
  lat = 28.562804852830876;
  lng = 77.17668262222719;
  constructor(private fb: FormBuilder, private fbservice: FeedBackService) {
    this.createForm();
  }

  ngOnInit() {
    this.isSubmit = false;
  }
  onClicked(event) {
  console.log(event);
}
  // tslint:disable-next-line:member-ordering
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  // tslint:disable-next-line:member-ordering
  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }



  onSubmit(formDirective: FormGroupDirective) {
    // this.feedback = this.feedbackForm.value;
    // console.log(this.feedback);
    this.isSubmit = true;

    this.fbservice.getFeedBack(this.feedbackForm.value).subscribe(fb => this.feedback = fb);
    setTimeout(() => { this.isSubmit = false; formDirective.resetForm(); }, 5000);

    console.log('called0' + this.isSubmit);
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
