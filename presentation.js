// récupération des modules externe
const readline = require("readline");
import { listerClient, ajouterClient } from 'Service'
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
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

        listerClient().then(Clients => {
          console.log(Clients);
          start();
        }).catch(error => {
          console.log(`\nErreur :  ${error} \n`);
          start();
        });
        break;
      case '2':
        rl.question("Nom du client : ", nom => {
          rl.question("Prenom du client : ", prenom => {
            ajouterClient(nom, prenom).then(message => {
              console.log(`\n ${message} \n`);
              start();
            }).catch(error => {
              console.log(`\nErreur : ${error} \n`);
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
