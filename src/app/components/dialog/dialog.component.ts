import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CanvasJS } from 'src/app/assets/canvas-jschart/canvas-jschart.component';

export interface DialogData {
  animal: number;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  score: number = 1;
  //constructor(public dialogRef: MatDialogRef<DialogComponent>) {}
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    this.score = this.data.animal;
    let y: number = +this.score;
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light1", // "light2", "dark1", "dark2"
      title: {
        text: "Column Chart "
      },
      data: [
        {
          type: "column",
          dataPoints: [

            { label: "Employee", y: y },
          ]
        }
      ]
    });
    chart.render();

    console.log("dailog data->" + this.score);

    let linechart = new CanvasJS.Chart("chartContainer1", {
      theme: "light1", // "light2", "dark1", "dark2"
      title: {
        text: "Line Chart"
      },
      data: [
        {
          type: "line", 
          dataPoints: [
            { label: ".", y: 0 },
            { label: "Employee", y: y },

          ]
        }
      ]
    });

    linechart.render();
  }

}
