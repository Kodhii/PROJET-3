
//RECUPERATION DU FORMULAIRE

const FormulaireLogin = document.querySelector(".login");

// EVENTLISTENER DE L'EVENT SUBMIT
FormulaireLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    // Recuperation des valeurs email & password

    const RecupLogin = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=mdp]").value,
    };
    const ChargeUtile = JSON.stringify(RecupLogin);
    console.log(ChargeUtile);

    // ENVOI A L'API

    

    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: ChargeUtile,
    })

    // GESTION DU RETOUR DE L'API  
    
    .then((response) => {
      if (!response.ok) {
        // Si le statut de la réponse n'est pas OK, lance une erreur

        const Erreur = document.querySelector("#Error")
        Erreur.innerText = "Erreur dans l’identifiant ou le mot de passe";
        return false;

      } 
      // Si le statut de la réponse est OK, Redirection vers la page d'accueil
      
      const ResponseJson = response.json();
      console.log(ResponseJson);

      return ResponseJson;
      
    })
    .then((data) => {
      console.log(data);
      window.localStorage.setItem("ConnectedToken", data.token);
      const TokenKey = window.localStorage.getItem("ConnectedToken");
      console.log(TokenKey);
      window.location.href = "./index.html";
    })
});