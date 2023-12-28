#language: es
Característica: Obtener restaurantes cerca de una ubicación

  Esquema del escenario: Obtener restaurantes cerca de una ubicación
    Dado que se tiene la <ubicacion> del turista
    Cuando realiza la búsqueda de restaurantes
    Entonces se muestran restaurantes abiertos
    Y dentro de un radio de 5km de su ubicación
    Ejemplos:
      | ubicacion             |
      | -0.2553811,-78.491781 |
      | 40.7128,-74.0060      |
      | -34.6037,-58.3816     |
      | 40.4168,-3.7038       |