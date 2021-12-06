const expressConst = require('express');
const cors = require('cors');
const app = expressConst();
//settings
app.set('port',6000);
//middlewares, hace que dos servidores intercambien datos entre ellos
app.use(cors());
app.use(expressConst.json());
//routes
app.use('/api/notas', require('./routes/notas'));

module.exports = app;