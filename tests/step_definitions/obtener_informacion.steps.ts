import { loadFeature, defineFeature } from "jest-cucumber";
import request from "supertest";
import app from "../../server/app";

const feature = loadFeature("./tests/features/obtener_informacion.feature");
defineFeature(feature, test => {

    let response: request.Response;

    test('Obtener informacion de un restaurante', ({ given, when, then }) => {
        given(/^que tengo una (.*) de restaurantes$/, (arg0) => {
// crear una lista de restaurantes
        });

        when(/^se elige un (.*)$/, (arg0) => {
// elegir un id
        });

        then('se muestra la informacion del restaurante elegido', () => {
//expect 200 consulta

        });
    });

})