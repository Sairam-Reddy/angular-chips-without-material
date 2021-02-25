import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  VERSION
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

@Component({
  selector: "app-chips",
  templateUrl: "./chips.component.html",
  styleUrls: ["./chips.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsComponent),
      multi: true
    }
  ]
})
export class ChipsComponent implements ControlValueAccessor {
  public constructor(private elementRef: ElementRef) {}

  @Input()
  public items: Array<string> = [];

  @Input()
  formControl: FormControl;
  @Output()
  public selectedItemsChange: EventEmitter<Array<string>> = new EventEmitter<
    Array<string>
  >();

  public onChange: Function;

  registerOnChange(fn: any): void {}
  public registerOnTouched(fn: any): void {}

  writeValue(value: Array<string>): void {
    this.values = value;
  }

  public searchTerm: string = "";
  public selectedItems: Array<string> = [];

  public searchResults: Array<string> = [];

  public focusElement: number = -1;

  get values(): Array<string> {
    return this.selectedItems;
  }

  set values(value: Array<string>) {
    this.selectedItems = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

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
      this.searchResults = [];
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

  public onLocationFocus(): void {
    this.focusElement = 0;
  }
  public onLocationBlur(): void {
    this.focusElement = -1;
  }

  public onArrowUp(): void {
    if (this.focusElement > 0) {
      this.focusElement--;
    }
  }

  public onArrowDown(): void {
    if (this.focusElement <= this.searchResults.length - 2) {
      this.focusElement++;
    } else {
      this.focusElement = 0;
    }
  }

  public addCurrentItem(): void {
    if (this.focusElement >= 0) {
      const currrentItem: string = this.searchResults[this.focusElement];
      this.addItem(currrentItem);
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
