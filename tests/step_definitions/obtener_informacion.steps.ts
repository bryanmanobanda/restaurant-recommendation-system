import {defineFeature, loadFeature} from "jest-cucumber";
import request from "supertest";
import app from "../../server/app";

const feature = loadFeature("./tests/features/obtener_informacion.feature");
defineFeature(feature, test => {

    let response: request.Response;
    let restaurants: [string];

    test('Obtener informacion de un restaurante', ({given, when, then}) => {
        given(/^que tengo una (.*) de restaurantes$/, (arg0) => {
            restaurants = JSON.parse(arg0);
        });

        when(/^se elige un (\d+)$/, async (arg0: number) => {
            response = await request(app).post(`/api/information/`).send({id: restaurants[arg0]});

        });

        then(/^se muestra la informacion del (.*)$/, (arg0) => {
            expect(response.status).toBe(200);
            expect(response.body.information.id).toBe(arg0);
        });
    });

})