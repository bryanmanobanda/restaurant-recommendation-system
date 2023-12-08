#language: es
Característica: Registrar turista

  Escenario: Turista registra su información con datos válidos
  Dado el turista accede al formulario de registro
  Cuando el turista completa todos los campos obligatorios con información válida
  Y hace clic en el botón de enviar
  Entonces la información del turista se registra correctamente en la base de datos
  Y se muestra un mensaje de confirmación de registro exitoso