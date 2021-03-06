import { Component, ViewChild } from '@angular/core';
import { Employee } from './models/employee';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormPosterService } from './shared/form-poster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('primaryLanguage') primaryLanguage;
  public employeeModel;
  public hasPrimaryLanguageError = true;
  public primaryLanguages = ['English', 'Hindi', 'Sanskrit'];

  constructor(private formPosterService: FormPosterService) { }

  ngOnInit(): void {
    this.employeeModel = new Employee('kumar', 'Abhi', true, 'W2', 'Hindi');
    this.primaryLanguageValidation(this.employeeModel.primaryLanguage);
    // console.log(this.employeeModel);
  }

  public firstLetterUpperCase(value: string) {
    if (value && value.length > 0) {
      this.employeeModel.firstName = value.charAt(0).toLocaleUpperCase() + value.substring(1, value.length);
    }
  }

  public primaryLanguageValidation(value) {
    // console.log(this.primaryLanguage.value);
    if (value === 'default') {
      // this.primaryLanguage.controls=false;
      this.hasPrimaryLanguageError = true;
    } else {

      this.hasPrimaryLanguageError = false;
    }
  }

  public submitForm(form: NgForm) {
    this.primaryLanguageValidation(this.employeeModel.primaryLanguage);
    if (form.valid && !this.hasPrimaryLanguageError) {
      console.log(form.value);
      this.formPosterService.postFormData(form.value).subscribe(response => console.log(response), error => console.log('Post Error'));
    }
  }
}
