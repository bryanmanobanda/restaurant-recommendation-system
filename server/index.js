const app = require('./app')
require('./firebase')

//Settings
app.set('port', process.env.PORT || 3000);

const cors= require('cors');

const whitelist = [
    "http://localhost:4200",
]


const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
};

app.use(cors(corsOptions));

//Routes
app.use(require('./routes/place.routes'));

//Starting Server
app.listen(app.get('port'), () => {
    console.log('SERVER ON PORT 3000');
})
