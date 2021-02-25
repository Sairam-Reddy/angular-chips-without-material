import { HttpClient } from "@angular/common/http";
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
  VERSION
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ChipsData } from "./chips/chips-data";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public formControl: FormControl;
  public items: Array<string>;

  public constructor(
    fb: FormBuilder,
    private data: ChipsData,
    private httpClient: HttpClient
  ) {
    // this.items = data.programmingLanguages;

    this.formControl = new FormControl([]);
  }

  public ngOnInit(): void {
    this.httpClient
      .get<any>("assets/programming-launguages.json")
      .subscribe(data => (this.items = data.launguages));
  }
}
