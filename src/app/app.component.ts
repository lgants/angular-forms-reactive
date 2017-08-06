import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  // FormControl - 1st argument: initial value, 2nd argument validators, 3rd argument potential async validators
  ngOnInit() {
    // don't invoke Validator methods such as required, only pass the reference and angular will execute when input changes
    // formArray can be initialized with an array of controls
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {

  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    // tells TS everything within outer parantheses is treated as FormArray
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }
  // tells TS key should be type string and value should be type boolean
  // if validation is successful, it should return null
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value)) {
      return {'nameIsForbidden': true};
    } else {
      null;
    }
  }
}
