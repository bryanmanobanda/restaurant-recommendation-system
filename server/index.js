const app = require('./app')
require('./firebase')

//Settings
app.set('port', process.env.PORT || 3000);
//Routes
app.use(require('./routes/place.routes'));

//Starting Server
app.listen(app.get('port'), () => {
    console.log('SERVER ON PORT 3000');
})
