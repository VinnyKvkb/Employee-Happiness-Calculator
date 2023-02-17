import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatStepperModule } from '@angular/material/stepper';

import { AppComponent } from './app.component';
import { FormlyFieldStepper } from './stepper.type';
import { CanvasJSChart } from './assets/canvas-jschart/canvas-jschart.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
//import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormlyBootstrapModule,
    MatDialogModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: [] },
      ],
    }),
    // FormlyMatToggleModule ,
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    FormlyFieldStepper,
    CanvasJSChart,
    DialogComponent,

  ],
})
export class AppModule { }


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */