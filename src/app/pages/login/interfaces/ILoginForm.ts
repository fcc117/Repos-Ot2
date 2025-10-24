import { FormControl } from '@angular/forms';

export interface ILoginForm {
  UserName: FormControl<string | null>;
  Password: FormControl<string | null>;
}
