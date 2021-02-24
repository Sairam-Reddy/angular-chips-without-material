import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Output,
  VERSION
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      chips: fb.array(["Java"])
    });
  }
}
