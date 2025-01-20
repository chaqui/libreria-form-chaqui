import { Component, Input, OnInit, EventEmitter, Output, Inject } from '@angular/core';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Catalogs } from '../../constants/Catalogs.constants';
import { Item } from '../../Models/Item.model';
import CatalogServiceInterface from '../../services/CatalogService.interface';

@Component({
  selector: 'app-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent implements OnInit {
  constructor(@Inject('CatalogServiceInterface') private catalogsService: CatalogServiceInterface) {}

  catalogo: string = '';
  @Input() key: string = ''; // key del catalogo
  @Input() label: String = ''; // label del select
  @Input() slave: boolean = false; // si es esclavo
  @Input() refreshEvent: EventEmitter<string> = new EventEmitter<string>(); // evento para refrescar el select

  @Output() selected: EventEmitter<Item> = new EventEmitter<Item>(); // evento para seleccionar un item y se necesita actualizar el esclavo
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>(); // evento que se a seleccionado un item y se envia el id

  items: Item[] = []; // items del select

  ngOnInit(): void {
    this.getCatalog();

    if (!this.slave) {
      this.getItems();
    }
    this.getItemsWithId();
  }

  /**
   * Obtiene los items del select con el id del padre
   */
  private getItemsWithId() {
    this.refreshEvent.subscribe((id) => {
      if (id) {
        this.getItemsByParent(id);
      } else {
        this.getItems();
      }
    });
  }

  /**
   * Obtiene el catalogo del select
   */
  private getCatalog() {
    if (this.key) {
      this.catalogo = (Catalogs.getCatalogValue(this.key) || '').toString();
    }
  }

  /**
   * Obtiene los items del select
   */
  private getItems() {
    this.catalogsService.getItems(this.catalogo).subscribe((items) => {
      this.items = items;
    });
  }

  private getItemsByParent(id: string) {
    this.catalogsService
      .getItemsByParent(this.catalogo, id)
      .subscribe((items) => {
        this.items = items;
      });
  }

  selectItem(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedItem = this.items.find(
      (item) => item.id.toString() === selectElement.value
    );
    if (selectedItem) {
      this.selected.emit(selectedItem);
      this.valueChange.emit(selectElement.value);
    }
  }
}
