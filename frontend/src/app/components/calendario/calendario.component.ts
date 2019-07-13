import { Component, ViewChild, OnInit } from "@angular/core";
import { IgxCalendarComponent, IgxDialogComponent } from "igniteui-angular";

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @ViewChild("calendar") public calendar: IgxCalendarComponent;
    @ViewChild("alert") public dialog: IgxDialogComponent;

    constructor() { }
    ngOnInit(){

    }

    public verifyRange(dates: Date[]) {
/*      if (dates.length > 5) {
        this.calendar.selectDate(dates[0]);
        this.dialog.open();
      }*/
    }
}