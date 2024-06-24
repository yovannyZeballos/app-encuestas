import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function alMenosUnoSeleccionadoValidator(): ValidatorFn {
  return (formArray: AbstractControl): ValidationErrors | null => {
    const algunoSeleccionado = (formArray as FormArray).controls.some(control => control.value.seleccionado);
    return algunoSeleccionado ? null : { 'alMenosUnoSeleccionado': true };
  };
}