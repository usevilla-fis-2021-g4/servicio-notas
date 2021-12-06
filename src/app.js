const expressConst = require('express');
const cors = require('cors');
const app = expressConst();
//settings
app.set('port',3000);
//middlewares, hace que dos servidores intercambien datos entre ellos
app.use(cors());
app.use(expressConst.json());
//routes
app.use('/api/notas', require('./routes/notas'));

//Para saber que el pod de okteto sigue vivo
app.get("localhost:3000/api/v1/healthz",(req,res)=>{
    res.sendStatus(200);
});

module.exports = app;