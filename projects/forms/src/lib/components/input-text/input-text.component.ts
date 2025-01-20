import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import Validation from '../../Models/Validation.model';

@Component({
  selector: 'input-text',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() maxlength: number = 100;
  @Input() minlength: number = 0;
  @Input() pattern: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() inputId: string = '';
  @Input() value: any;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() validationChange: EventEmitter<Validation> =
    new EventEmitter<Validation>();
  control: FormControl;

  constructor() {
    this.control = new FormControl('', this.getValidators());
  }

  ngOnInit(): void {
    this.control = new FormControl(this.value || '', this.getValidators());
    this.validationChange.emit({
      valid: false,
      label: this.label,
    });
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
    this.disabled ? this.control.disable() : this.control.enable();
  }

  private getValidators() {
    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    if (this.minlength) {
      validators.push(Validators.minLength(this.minlength));
    }
    if (this.maxlength) {
      validators.push(Validators.maxLength(this.maxlength));
    }
    if (this.pattern) {
      validators.push(Validators.pattern(this.pattern));
    }
    return validators;
  }
}
