/*const { expect } = require('chai');
const sinon = require('sinon');
const preferencesCtrl = require('../controllers/preferences.controller');
const firestore = require('firebase/firestore'); // Asegúrate de importar Firestore de la manera correcta

describe('updatePreferences', () => {
  it('should update user preferences', async () => {
    // Datos simulados
    const req = {
      params: { id: 'ck5o2mBKYpJXPlg5DdsB' },
      body: { cuisine: ['mexicana'], price_level: [2,1] } // Campo de preferencia y su valor a actualizar
    };
    const res = {};

    // Stub de la función de actualización de Firestore para simular su comportamiento
    const updateStub = sinon.stub(firestore.collection('turist').doc('ck5o2mBKYpJXPlg5DdsB'), 'update').resolves({});

    // Llamada a la función del controlador
    await preferencesCtrl.updatePreferences(req, res);

    // Verificación de que la función de actualización de Firestore fue llamada con los parámetros correctos
    expect(updateStub.calledOnceWith(req.body)).to.be.true;

    // Restaurar el stub
    updateStub.restore();
  });
});
*/

const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');
const preferencesCtrl = require('../controllers/preferences.controller');

let preferencesRef;

describe('Preferencias del Turista', function () {
    before(async function () {
        preferencesRef = await guardarPreferencias({
            cuisine: ['mexicana'],
            price_level: [1, 3]
        });
    });

    after(async function () {
        await preferencesRef.delete().catch(() => {});
    });

    it('Debería almacenar las preferencias del turista en la base de datos', async function () {
        const preferences = await preferencesCtrl.updatePreferences
        const preferencesSnapshot = await preferencesRef.get();
        const preferencesData = preferencesSnapshot.data();

        expect(preferencesData).to.exist;
        expect(preferencesData.rating).to.equal(4.5);
        expect(preferencesData.horario).to.equal('tarde');
        expect(preferencesData.nivelPrecio).to.equal('medio');
    });

    // Agrega más pruebas aquí si es necesario
});