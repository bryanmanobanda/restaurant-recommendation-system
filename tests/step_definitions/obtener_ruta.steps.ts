import {defineFeature, loadFeature} from "jest-cucumber";
import request from "supertest";
import app from "../../server/app";

const feature = loadFeature("./tests/features/obtener_ruta.feature");

defineFeature(feature, test => {

    let response: request.Response;
    let restaurants: [string];

    test('Obtener ruta de un restaurante', ({given, when, then}) => {
        given(/^que se tiene una (.*) de restaurantes,$/, (arg0) => {
            restaurants = JSON.parse(arg0);
        });

        when(/^el turista solicita la ruta hacia el (.*) cerca de su (.*),$/, async (arg0, arg1) => {
            const ubication = JSON.parse(arg1);
            const data = {
                "location": {"latLng": {"latitude": ubication[0], "longitude": ubication[1]}},
                placeId: restaurants[arg0]
            }
            response = await request(app).post(`/api/routes`).send(data);
        });

        then(/^se muestra la ruta a pie para llegar al (.*)$/, (arg0) => {
            expect(response.status).toBe(200);
            expect(response.body.route.id).toBe(arg0);
            expect(response.body.route.distanceMeters).toBeTruthy();
            expect(response.body.route.duration).toBeTruthy();
            expect(response.body.route.polyline).toBeTruthy();
        });
    });

});