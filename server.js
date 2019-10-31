// Construir el servidor en server.js

//1º importamos la librería Express
let express = require("express");

//2º Iniciamos el servidor
let app = express();

//3º Escuchamos las peticiones potenciales
app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

//4º Para que empiece, necesitamos poner en la terminal: $ node server.js
