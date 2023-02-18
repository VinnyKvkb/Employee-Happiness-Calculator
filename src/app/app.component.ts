import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { DialogComponent } from './components/dialog/dialog.component';
import { EhcService } from './services/ehc.service';


@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  totalScore: number;
  fields: FormlyFieldConfig[] = [
    {
      type: 'stepper',
      fieldGroup: [
        {
          templateOptions: { label: '' },
          fieldGroup: [
            {
              key: 'q1',
              type: 'select',

              templateOptions: {
                placeholder: 'Select',
                label: 'Are You happy during this week ?',
                options: [
                  { value: 0, label: 'No' },
                  { value: 1, label: 'Yes' },],
                required: true,
              },
            },
          ],
        },

        {
          templateOptions: { label: '' },
          fieldGroup: [
            {
              key: 'q3',
              type: 'checkbox',

              templateOptions: {
                type: 'checkbox',
                label: 'Are you ok with your Life Partener ?',
                required: true,
              },
            },
          ],
        }, {
          templateOptions: { label: '' },
          fieldGroup: [
            {
              key: 'q4',
              type: 'radio',
              templateOptions: {
                type: 'radio',
                label: 'Are you Happy with your Salary ?',
                options: [
                  { value: 0, label: 'No' }, { value: 1, label: 'Yes' }],
                required: true,
              },
            },],
        },
        {
          templateOptions: { label: ' ' },
          fieldGroup: [
            {
              key: 'q5',
              type: 'select',

              templateOptions: {
                placeholder: 'Select',
                label: 'Are You Feeling Healthy Now ?',
                options: [
                  { value: 0, label: 'No' },
                  { value: 1, label: 'Yes' },],
                required: true,
              },
            },
          ],
        },
        {
          templateOptions: { label: '' },
          fieldGroup: [

            {
              key: 'q2',
              type: 'input',
              templateOptions: {
                placeholder: 'Enter Yes/No',
                label: 'Are you Satisfied with your Work ?',
                required: true,
              },
            },
          ],
        },
      ],
    },
  ];
  errorMsg: any;

  constructor(public dialog: MatDialog, private ehcService: EhcService) { }


  submit() {
    console.log(JSON.stringify(this.model));
    const q1 = this.model["q1"];
    const q2 = this.model["q2"];
    const q3 = this.model["q3"];
    const q4 = this.model["q4"];
    const q5 = this.model["q5"];
    if (q2 == 1 || q2.toLowerCase() == "yes") {
      this.model["q2"] = 1;
    } else if (q2 == 0 || q2.toLowerCase() == "no") {
      this.model["q2"] = 0;
    } else {
      alert("Please Enter Yes/No");
      return;
    }

    if (q3 == true) {
      this.model["q3"] = 1;
    } else {
      this.model["q3"] = 0;
    } 
    this.calculateHappinessLevels(this.model);

   
  }
  calculateHappinessLevels(answers: any) {
    this.ehcService.calculateHappinessLevels(answers).subscribe(result => this.readTheResponse(result),
      error => this.errorMsg = error);
  }
  readTheResponse(result: number): void {
    console.log("TotalScore::::::::::" + result);
    if (result != undefined || result != null) {
      this.totalScore = result;
      this.openDialog(this.totalScore);
    }else{
      alert("Employee Hapinness Calculation Failed.Try Again.");
    }
  }
  openDialog(totalScore:number): void {
    this.dialog.open(DialogComponent, {
      data: {
        animal: JSON.stringify(totalScore),
      },

    });
  }
}
