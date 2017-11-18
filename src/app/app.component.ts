import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;

  title = 'app';

  constructor(private fb: FormBuilder) {
    this.buildForm(fb);
  }

  buildForm(fb: FormBuilder): any {
    this.form = fb.group({
      firstName: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.form.errors);
  }

  isValid(control) {
    return this.form.controls[control].invalid && this.form.controls[control].touched
  }
}
