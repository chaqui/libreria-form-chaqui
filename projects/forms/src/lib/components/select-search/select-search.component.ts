import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../Models/Item.model';


@Component({
  selector: 'app-select-search',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-search.component.html',
  styleUrl: './select-search.component.css',
})
export class SelectSearchComponent implements OnInit, OnChanges {
  @Input() label: string = ''; // Se define la propiedad label
  @Input() placeholder: string = 'Search...'; // Se define la propiedad placeholder del input
  @Input() disabled: boolean = false; // habilita o deshabilita el input
  @Input() inputId: string = ''; // Se define la propiedad inputId
  @Input() required: boolean = false; //Si el campo es requerido
  @Input() options: Item[] = []; // lista de opciones
  @Input() value: Item | null = null; // valor seleccionado
  @Output() selected: EventEmitter<Item> = new EventEmitter<Item>(); // Evento que se emite cuando se selecciona una opción

  control: FormControl = new FormControl('');
  searchTerm: string = '';
  filteredOptions: Item[] = [];
  showDropdown: boolean = false;

  ngOnInit(): void {
    this.control = new FormControl('');
    this.filteredOptions = this.options;
  }

  /**
   * Función que se ejecuta cuando hay cambios en las propiedades del componente
   * @param changes  Objeto que contiene los cambios en las propiedades del componente
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].previousValue) {
      const newValue = changes['value'].currentValue;
      console.log(newValue);
      this.control.setValue(newValue.id);
      this.searchTerm = newValue.value;
    }
  }

  /**
   * Función que se ejecuta cuando se presiona una tecla en el input de búsqueda
   */
  onSearch(): void {
    this.filteredOptions = this.options.filter((option) =>
      option.value.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  /**
   * Función que se ejecuta cuando se hace click en el dropdown
   */
  hideDropdown(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  /**
   * Funcion que se ejecuta cuando se a seleccionado una opción
   * @param option  Opción seleccionada
   */
  selectOption(option: Item): void {
    this.searchTerm = option.value;
    this.control.setValue(option.id);
    this.showDropdown = false;
    this.value = option;
    this.selected.emit(option);
  }
}
