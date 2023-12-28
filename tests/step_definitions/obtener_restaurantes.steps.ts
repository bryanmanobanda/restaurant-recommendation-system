import {defineFeature, loadFeature} from "jest-cucumber";
import request from "supertest";
import app from "../../server/app";

const feature = loadFeature("./tests/features/obtener_restaurantes.feature");

defineFeature(feature, test => {

    let response: request.Response;
    let location = ""

    test('Obtener restaurantes cerca de una ubicación', ({given, when, and, then}) => {
        given(/^que se tiene la (.*) del turista$/, (arg0) => {
            location = arg0
        });

        when('realiza la búsqueda de restaurantes', async () => {
            response = await request(app).get(`/api/restaurants/${location}`);

        });

        then('se muestran restaurantes abiertos', () => {
            expect(response.status).toBe(200);
            response.body.restaurants.forEach((restaurante: any) => {
                expect(restaurante.openNow).toBe(true);
            });
        });

        and(/^dentro de un radio de (\d+)km de su ubicación$/, (arg0) => {
            response.body.restaurants.forEach((restaurante: any) => {
                const distanciaRestaurante = calcularDistancia(location, restaurante.location);
                expect(distanciaRestaurante).toBeLessThanOrEqual(5);
            });
        });
    });

});

function calcularDistancia(locationA: string, locationB: any): number {
    const [latA, longA] = locationA.split(',').map(parseFloat);
    return Math.sqrt((locationB.latitude - latA) ** 2 + (locationB.longitude - longA) ** 2);
}