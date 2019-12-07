// Construir el servidor en server.js

//1º importamos la librería Express
let express = require("express");

//2º Iniciamos el servidor
let app = express();

//11º Después de instalar express-formidable hacemos como antes (require)
var formidable = require("express-formidable");

//13º Para usar fs (módulo incorporado en node que nos permite almacenar datos en nuestro disco duro)
let fs = require("fs");

//5º Cremos nuestra función handler
//6º Queremos enviar un mensaje al cliente
// app.get("/", function(req, res) {
//   res.send("Yay Node Girls!");
// });

//7º Vamos a probar con otro mensaje a través de otro endpoint y como punto 9 pasarlo a static:
// app.get("/chocolate", function(req, res) {
//   res.send("Mm chocolate :O");
// });
// app.get("/node", function(req, res) {
//   res.send("This is the node section");
// });
// app.get("/girls", function(req, res) {
//   res.send("Who run the world?");
// });

//8º Para poder enviar cualquier archivo desde el servidor necesitamos express.static(), si queremos enviar la carpeta public sería:
app.use(express.static("public"));
//Esta función reemplaza las que tienen app.get

//12ª Para usar express-formidable (es un middleware de Express que extrae los datos del formulario del req y hará que estén disponibles en el punto 10):
app.use(formidable());

app.get("/get-posts", function(req, res) {
  res.sendFile(__dirname + "/data/posts.json");
});

//10º Queremos definir una ruta con POST en /create-post
app.post("/create-post", function(req, res) {
  //   console.log(req.fields);

  //   //15º Leyendo en el disco duro:
  //   //__dirname es un objeto global de Node que te da la ruta a tu directorio raíz acutal (xa cuando queremos evitar escribir rutas dinámicas o largas)
  fs.readFile(__dirname + "/data/post.json", function(error, file) {
    let parsedFile = JSON.parse(file);
    let timeStamp = Date.now();
    parsedFile[timeStamp] = req.fields.parsedFile;
    console.log(file.toString());

    var data = JSON.stringify(parsedFile);

    //     //14º Método que necesitamos para escribir en el disco duro:
    fs.writeFile(__dirname + "/data/post.json", data, function(error) {
      if (error) {
        console.log(error);
      }
    });
  });
  res.send({ redirect: req.fields.parsedFile });
});

//3º Escuchamos las peticiones potenciales: puerto y función callback
app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

//4º Para que empiece, necesitamos poner en la terminal: $ node server.js
