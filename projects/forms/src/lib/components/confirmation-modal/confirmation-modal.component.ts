import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
})
export class ConfirmationModalComponent {
  @Input() isModalVisible: boolean = false; // Indica si el modal está visible
  @Input() title: string = ''; // Título del modal
  @Input() contenido: string = ''; // Contenido del modal
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>(); // Evento que se dispara cuando se confirma la acción
  @Output() closeModel: EventEmitter<void> = new EventEmitter<void>(); // Evento que se dispara cuando se cierra el modal
  /**
   * Cerrar el modal
   */
  cerrarModal() {
    this.closeModel.emit();
  }

  confirmar() {
    this.onConfirm.emit();
  }
}
