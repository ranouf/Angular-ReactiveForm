import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';

// tslint:disable-next-line:max-line-length
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fb: FormBuilder;
  form: FormGroup;

  get emails(): FormArray {
    return this.form.get('emails') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.fb = formBuilder;
    this.buildForm();
  }

  buildForm(): any {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      emails: this.fb.array([])
    });
    this.addItem();
  }

  createItem(): FormGroup {
    return this.fb.group({
      // id: null,
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    });
  }

  addItem(): void {
    this.emails.push(this.createItem());
  }

  deleteItem(index: number): void {
    this.emails.removeAt(index);
  }

  onSubmit() {
    console.log(this.form.errors);
  }

  isItemFilled(index: number) {
    const emailItem = this.emails.controls[index].value;
    return emailItem.email && emailItem.email.length > 0;
  }

  isEmailValid(index: number) {
    return !this.emails.controls[index].hasError('pattern');
  }

  clear(index: number) {
    const emailItem = this.emails.controls[index].value;
    emailItem.email = '';
  }

  isValid(control) {
    return this.form.controls[control].invalid && this.form.controls[control].touched;
  }
}
