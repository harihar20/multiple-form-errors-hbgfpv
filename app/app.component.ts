import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "my-app",
  template: `
    <div class="example">
      <form class="k-form" [formGroup]="form">
        <fieldset class="k-form-fieldset">
          <kendo-formfield>
            <kendo-label [for]="username" text="Username"></kendo-label>
            <kendo-textbox
              formControlName="username"
              [clearButton]="true"
              #username
            ></kendo-textbox>

            <kendo-formhint>Your Username</kendo-formhint>
            <kendo-formerror
              *ngIf="userName.invalid && userName.errors.required"
              >Error: Username is required</kendo-formerror
            >
            <kendo-formerror
              *ngIf="userName.invalid && userName.errors.minlength"
              >Error: Min length should be {{ minLength }}. Current: {{ currentLength }}</kendo-formerror
            >
            <kendo-formerror
              *ngIf="userName.invalid && userName.errors.pattern"
              >Error: Username should contain a digit</kendo-formerror
            >
          </kendo-formfield>

          <div class="k-form-buttons">
            <button class="k-button k-primary" (click)="login()">Login</button>
            <button class="k-button" (click)="clearForm()">Clear</button>
          </div>
        </fieldset>
      </form>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./styles.css"]
})
export class AppComponent {
  public minLength = 3;
  public form: FormGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(this.minLength),
      Validators.pattern(/\d/)
    ])
  });

  public login(): void {
    this.form.markAllAsTouched();
  }

  public clearForm(): void {
    this.form.reset();
  }

  public get userName(): FormControl {
    return this.form.get("username") as FormControl;
  }

  public get currentLength(): number {
    return this.userName.errors.minlength.actualLength;
  }
}
