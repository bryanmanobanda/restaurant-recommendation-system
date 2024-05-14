import app from './app';

require('./firebase')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('SERVER ON PORT ' + PORT);
})
