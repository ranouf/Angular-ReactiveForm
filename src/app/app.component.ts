import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  emails: FormArray;
  fb: FormBuilder;
  form: FormGroup;

  title = 'app';

  constructor(private formBuilder: FormBuilder) {
  this.fb = formBuilder;
    this.buildForm();
  }

  buildForm(): any {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      emails: this.fb.array([ this.createItem() ])
    });
    this.emails = this.form.get('emails') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      id: null,
      email: ['', Validators.required, Validators.email],
    });
  }

  addItem(): void {
    this.emails.push(this.createItem());
  }

  onSubmit() {
    console.log(this.form.errors);
  }

  isValid(control) {
    return this.form.controls[control].invalid && this.form.controls[control].touched
  }
}
