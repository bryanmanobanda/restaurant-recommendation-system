#language: es
Característica: Registrar turista

  Escenario: Turista registra su información con datos válidos
  Dado el turista accede al formulario de registro
  Cuando el turista completa los campos de nombre y correo con información válida
  Y hace clic en el botón de enviar
  Entonces la información del turista se registra correctamente en la base de datos
  Y se muestra un mensaje de confirmación de registro exitoso

  Escenario: Turista intenta registrar información con campos vacíos
  Given el turista accede al formulario de registro
  When el turista deja uno o más campos obligatorios vacíos
  And hace clic en el botón de enviar
  Then se muestra un mensaje de error indicando que los campos obligatorios deben ser completados
  And la información del turista no se registra en la base de datos

  Scenario: Turista ingresa información inválida en el formulario
  Given el turista accede al formulario de registro
  When el turista ingresa información inválida en uno o más campos
  And hace clic en el botón de enviar
  Then se muestra un mensaje de error indicando que la información ingresada es inválida
  And la información del turista no se registra en la base de datos

  Scenario: Turista decide cancelar el registro de información
  Given el turista accede al formulario de registro
  When el turista decide cancelar la acción de registro
  Then se redirige al turista a la página principal o a la sección previa
  And ningún dato ingresado en el formulario se registra en la base de datos
