/*const app = require('./app');
require('./database');
async function main() {
    await app.listen(app.get('port'));
    console.log('Servidor en el puerto',app.get('port'));
}

main();
*/
const app = require("./app");
const dbConnect = require("./database");

var port = (process.env.PORT || 3000);

console.log("Starting API server at " + port);

dbConnect().then(
  () => {
    app.listen(port);
    console.log("Server ready!");
  },
  (err) => {
    console.log("Connection error: " + err);
  }
);