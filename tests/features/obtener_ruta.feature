#language: es
Característica: Obtener ruta de un restaurante

  Esquema del escenario: Obtener ruta de un restaurante
    Dado que se tiene una <lista> de restaurantes,
    Cuando el turista solicita la ruta hacia el <restaurante> cerca de su <ubicacion>,
    Entonces se muestra la ruta a pie para llegar al <restaurante_seleccionado>

    Ejemplos:
      | lista                                                                                                                        | restaurante | restaurante_seleccionado    | ubicacion                    |
      | ["ChIJ_Tc61MWZ1ZERpqUSzRm5oIo", "ChIJC4uAxwOZ1ZERxU5CUiu9ADg", "ChIJH9nta-6Z1ZER627byO5_ksc", "ChIJ1af9TJyZ1ZERX_8eUlZYRuA"] | 0           | ChIJ_Tc61MWZ1ZERpqUSzRm5oIo | ["-0.2553811", "-78.491781"] |
      | ["ChIJ_Tc61MWZ1ZERpqUSzRm5oIo", "ChIJC4uAxwOZ1ZERxU5CUiu9ADg", "ChIJH9nta-6Z1ZER627byO5_ksc", "ChIJ1af9TJyZ1ZERX_8eUlZYRuA"] | 1           | ChIJC4uAxwOZ1ZERxU5CUiu9ADg | ["-0.2553811", "-78.491781"] |
      | ["ChIJ_Tc61MWZ1ZERpqUSzRm5oIo", "ChIJC4uAxwOZ1ZERxU5CUiu9ADg", "ChIJH9nta-6Z1ZER627byO5_ksc", "ChIJ1af9TJyZ1ZERX_8eUlZYRuA"] | 2           | ChIJH9nta-6Z1ZER627byO5_ksc | ["-0.2553811", "-78.491781"] |
      | ["ChIJ_Tc61MWZ1ZERpqUSzRm5oIo", "ChIJC4uAxwOZ1ZERxU5CUiu9ADg", "ChIJH9nta-6Z1ZER627byO5_ksc", "ChIJ1af9TJyZ1ZERX_8eUlZYRuA"] | 3           | ChIJ1af9TJyZ1ZERX_8eUlZYRuA | ["-0.2553811", "-78.491781"] |