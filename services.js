
//Import
var request = require("request");



///Fonction pour reccup' les clients    
function listerClient(callback, callbackError) {
  request('http://localhost:8080/clients/lister?start=0&size=10', { json: true }, function (err,
    res, body) {
    if (err) { return callbackError(err); }
    // body contient les données récupérées
    var resultClient = "";

    body.forEach(element => {
      resultClient += element.nom + " " + element.prenoms + "\n";
    });

    callback(resultClient);
  });
}

exports.listerClient = listerClient;

//Fonction ajout client 
function postClient(nom, prenom, callback, callbackError) {

  var url = 'http://localhost:8080/clients'
  request({
    url: url,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      'nom': nom,
      'prenoms': prenom
    },
    json: true
  }, function (err, res, body) {

    if (err) { return callbackError(err); }

    if (res.statusCode == '400') { return callback(body); }

    var result = "Client ajouté : \nuuid : " + body.uuid + "\nnom : " + body.nom + "\nprenom : " + body.prenoms;
    callback(result);
  });
}

exports.ajouterClient = postClient;