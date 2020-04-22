
//Import

const request = require("request-promise-native");

class Service {
  ///Fonction pour reccup' les clients    
  export listerClient() {
    return request('http://localhost:8080/clients/lister?start=0&size=10', { json: true }).then(body => {
      let resultClient = "";
      // body contient les données récupérées
      body.forEach(element => {
        resultClient += `${element.nom}   ${element.prenoms} \n`;
      });
      return resultClient;
    })
  }

  //Fonction ajout client 
  export postClient(nom, prenom) {

    return request({
      url: 'http://localhost:8080/clients',
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: {
        'nom': nom,
        'prenoms': prenom
      },
      json: true
    }).then(body => {
      return `Client correctement ajouté : \nuuid : ${body.uuid} \nnom : ${body.nom} \nprenom : ${body.prenoms}`
    });
  }
}
