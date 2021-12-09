const expressConst = require('express');
const cors = require('cors');
const app = expressConst();

const BASE_API_PATH='/api/v1';
//settings
app.set('port', (process.env.MONGO_URL || 3000 ));
//middlewares, hace que dos servidores intercambien datos entre ellos
app.use(cors());
app.use(expressConst.json());
//routes
app.use('/api/v1/notas', require('./routes/notas'));

//Para saber que el pod de okteto sigue vivo.
app.get(BASE_API_PATH +"/healthz",(req,res)=>{
    res.sendStatus(200);
});

module.exports = app;