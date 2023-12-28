#language: es
Característica: Obtener informacion de un restaurante

  Esquema del escenario: Obtener informacion de un restaurante
    Dado que tengo una <lista> de restaurantes
    Cuando se elige un <restaurante>
    Entonces se muestra la informacion del <restaurante_elegido>
    Ejemplos:
      | lista                                                                                                                        | restaurante | restaurante_elegido         |
      | ["ChIJVyB9BnYpQg0RlWl7m3X88lM", "ChIJAzoYDi0pQg0R5b-KzzELbf4", "ChIJD9GKIn8oQg0RdhelKaP9Ac4", "ChIJIaM-yx4mQg0RJNdZGUJoTLM"] | 0           | ChIJVyB9BnYpQg0RlWl7m3X88lM |
      | ["ChIJVyB9BnYpQg0RlWl7m3X88lM", "ChIJAzoYDi0pQg0R5b-KzzELbf4", "ChIJD9GKIn8oQg0RdhelKaP9Ac4", "ChIJIaM-yx4mQg0RJNdZGUJoTLM"] | 1           | ChIJAzoYDi0pQg0R5b-KzzELbf4 |
      | ["ChIJVyB9BnYpQg0RlWl7m3X88lM", "ChIJAzoYDi0pQg0R5b-KzzELbf4", "ChIJD9GKIn8oQg0RdhelKaP9Ac4", "ChIJIaM-yx4mQg0RJNdZGUJoTLM"] | 2           | ChIJD9GKIn8oQg0RdhelKaP9Ac4 |
      | ["ChIJVyB9BnYpQg0RlWl7m3X88lM", "ChIJAzoYDi0pQg0R5b-KzzELbf4", "ChIJD9GKIn8oQg0RdhelKaP9Ac4", "ChIJIaM-yx4mQg0RJNdZGUJoTLM"] | 3           | ChIJIaM-yx4mQg0RJNdZGUJoTLM |