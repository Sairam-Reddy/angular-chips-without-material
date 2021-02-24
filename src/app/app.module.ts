import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { ChipsComponent } from "./chips/chips.component";
import { ChipsData } from "./chips/chips-data";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [AppComponent, ChipsComponent],
  bootstrap: [AppComponent],
  providers: [ChipsData]
})
export class AppModule {}
