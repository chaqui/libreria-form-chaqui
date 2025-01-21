import Validation from "../Models/Validation.model";


export  class FormPrincipal {
  private validations: Validation[] = []; // Validaciones


  /**
   * Función para agregar una validación
   * @param validation Validacion a agregar
   */
  protected addValidation(validation: Validation) {
    const index = this.validations.findIndex(
      (v) => v.label === validation.label
    );
    if (index !== -1) {
      this.validations[index] = validation;
    } else {
      this.validations.push(validation);
    }
  }

  /**
   * Función para validar el formulario
   * @returns {boolean} Retorna true si todas las validaciones son correctas, de lo contrario retorna false
   */
  protected validarForm() {
    try {
      this.validations.forEach((v) => {
        if (!v.valid) {
          throw new Error('Validacion incompleta');
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
