import { Component, ElementRef, VERSION } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements ControlValueAccessor {
  public constructor(private elementRef: ElementRef) {}
  public onChange: any;

  public writeValue(obj: any): void {}

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {}

  public searchTerm: string = "";
  public selectedItems: Array<string> = [];
  public items: Array<string> = [
    "Java",
    "Angular",
    "JavaScript",
    "Python",
    "PHP"
  ];
  public searchResults: Array<string> = [];

  public get searchPlaceholder(): string {
    return this.searchTerm ? "" : "Type a Programming Language";
  }

  public get searchQuery(): string {
    return this.searchTerm;
  }

  public set searchQuery(updatedString: string) {
    this.searchTerm = updatedString;
    if (this.searchTerm.length > 0) {
      this.querySearchResults();
    } else {
      this.reset();
    }
  }

  public removeItem(value: string): void {
    const index: number = this.selectedItems.findIndex(
      (x: string) => x === value
    );
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      this.focusInput();
    }
  }

  public addItem(value: string): void {
    const index: number = this.selectedItems.findIndex(
      (x: string) => x === value
    );
    if (index === -1) {
      this.selectedItems.push(value);
      this.reset();
      this.focusInput();
    }
  }

  public removeLastItem(): void {
    if (!this.searchTerm) {
      this.selectedItems.splice(-1, 1);
      this.focusInput();
    }
  }

  public addFirstItem(): void {
    if (this.searchResults.length === 1) {
      this.selectedItems.push(this.searchResults[0]);
      this.reset();
      this.focusInput();
    }
  }

  public focusResults(): void {
    const searchpanel: any = this.elementRef.nativeElement.querySelector(
      ".result-item"
    );
    if (searchpanel) {
      searchpanel.focus();
    }
  }

  private querySearchResults(): void {
    this.searchResults = this.items.filter(
      (x: string) =>
        x.toLowerCase().startsWith(this.searchTerm.toLowerCase()) &&
        !this.selectedItems.includes(x)
    );
  }

  private focusInput(): void {
    const inputData: any = this.elementRef.nativeElement.querySelector(
      ".search-input__data"
    );
    if (inputData) {
      inputData.focus();
    }
  }

  private reset(): void {
    this.searchQuery = "";
    this.searchResults = [];
  }
}
