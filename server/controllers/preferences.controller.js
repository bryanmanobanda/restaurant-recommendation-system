const {firestore} = require("../firebase");

const preferencesCtrl = {};

preferencesCtrl.getPreferences = async (req, res) => {
    res.json({
        status: 'Restaurantes enviados'
    })
    
    const querySnapshot = await firestore.collection('turist').get();
    const turistas = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    console.log("Respuesta recibida", req.body)
}

preferencesCtrl.updatePreferences = async (req, res) => {
    await firestore.collection('turist').doc(req.params.id).update(req.body)
}

module.exports = preferencesCtrl;
