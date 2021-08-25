import {AbstractControl} from '@angular/forms';

export function passwordConfirming(c: AbstractControl) {
  if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
    return {invalid: true};
  }
  return null;
}
