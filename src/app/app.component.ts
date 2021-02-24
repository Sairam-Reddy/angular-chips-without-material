import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Output,
  VERSION
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ChipsData } from "./chips/chips-data";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public form: FormGroup;
  public items: Array<string>;

  public constructor(fb: FormBuilder, private data: ChipsData) {
    this.items = data.programmingLanguages;

    this.form = fb.group({
      chips: fb.array([])
    });
  }
}
