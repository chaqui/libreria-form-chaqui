import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import Validation from '../../Models/Validation.model';


@Component({
  selector: 'input-number',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.css',
  exportAs: 'inputNumber',
})
export class InputNumberComponent implements OnInit {
  control: FormControl; // Control del formulario

  @Input() value: number | undefined = 0; // Valor del input
  @Input() label: string = ''; // Etiqueta del input
  @Input() placeholder: string = ''; // Placeholder del input
  @Input() min: number = 0; // Valor mínimo del input
  @Input() max: number = 100000; // Valor máximo del input
  @Input() step: number = 1; // Paso del input
  @Input() disabled: boolean = false; // Indica si el input está deshabilitado
  @Input() inputId: string = ''; // Id del input
  @Input() required: boolean = false; // Indica si el input es requerido
  @Input() prefix: string = ''; // Prefijo del input
  @Input() postfix: string = ''; // Sufijo del input

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>(); // Evento para emitir el valor del input
  @Output() validationChange: EventEmitter<Validation> =
    new EventEmitter<Validation>(); // Evento para emitir el estado de validación del input

  constructor() {
    this.control = new FormControl(0, this.getValidators());
  }
  ngOnInit(): void {
    this.control = new FormControl(this.value, this.getValidators());
    this.validationChange.emit({
      valid: false,
      label: this.label,
    });
    // Se suscribe al evento de cambio de valor del input
    this.control.valueChanges.subscribe((value) => {
      this.valueChange.emit(value);
      this.validationChange.emit({
        valid: this.control.valid,
        label: this.label,
      });
    });

    this.control.statusChanges.subscribe(() => {
      this.validationChange.emit({
        valid: this.control.valid,
        label: this.label,
      });
    });
  }

  private getValidators() {
    const validators = [];
    if (this.min) {
      validators.push(Validators.min(this.min));
    }
    if (this.max) {
      validators.push(Validators.max(this.max));
    }
    if (this.required) {
      validators.push(Validators.required);
    }
    return validators;
  }
}
