import { Component, VERSION } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements ControlValueAccessor {
  public onChange: any;

  public writeValue(obj: any): void {}

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {}

  public item: string = "";
  public selectedItems: Array<string> = ["Java"];
  public items: Array<string> = [
    "Java",
    "Angular",
    "JavaScript",
    "Python",
    "PHP"
  ];
  public searchResults: Array<string> = [];
  public showResults: boolean = false;

  public focusSearch(): void {
    this.showResults = true;
    this.reset();
  }

  public removeItem(value: string): void {
    const index: number = this.selectedItems.findIndex(
      (x: string) => x === value
    );
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
    this.reset();
  }

  public addItem(value: string): void {
    const index: number = this.selectedItems.findIndex(
      (x: string) => x === value
    );
    if (index === -1) {
      this.selectedItems.push(value);
    }
    this.reset();
  }

  private reset(): void {
    this.searchResults = this.getNonSelectedResults();
  }

  private getNonSelectedResults(): Array<string> {
    return this.items.filter((x: string) => !this.selectedItems.includes(x));
  }
}
