// récupération des modules externe
var readline = require("readline");
var services = require("./services.js");
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Fonction d'affichage du menu
function start() {
  console.log("\n1. Lister les clients\n2. Ajouter un client\n3. Rechercher un client\n99. Sortir");
  saisie();
}

function saisie() {
  // récupération de la saisie utilisateur
  rl.question("Choississez une action : ", function (saisie) {
    switch (saisie) {
      case '1':
        console.log("\nListe des clients : ");

        services.listerClient(function (Clients) {
          console.log(Clients);
          start();
        }, function (error) {
          console.log("\nErreur : " + error + "\n");
          start();
        });
        break;
      case '2':
        rl.question("Nom du client : ", function (nom) {
          rl.question("Prenom du client : ", function (prenom) {
            services.ajouterClient(nom, prenom, function (message) {
              console.log("\n" + message + "\n");
              start();
            }, function (error) {
              console.log("\nErreur : " + error + "\n");
              start();
            });
          });
        });
        break;
      case '99': console.log("Vous sortez de l'application... Aurevoir");
        rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
        break;
      default:
        console.log("Choix invalide.\n")
        start();
    }

  });
}

//Exports
exports.start = start;
