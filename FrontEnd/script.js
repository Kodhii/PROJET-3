// Vérification Utilisateur Connecté ou non
const TokenKey = window.localStorage.getItem("ConnectedToken");
console.log(TokenKey);

// Si le Token de connection est null => apparence de la page "déconnectée"

if (TokenKey === null){
    const EditionDisplay = document.querySelector(".Edition");
    EditionDisplay.style.display = "none";

    const LogoutBtn = document.querySelector("#Logout");
    LogoutBtn.style.display = "none";

    const LoginBtn = document.querySelector("#Login");
    LoginBtn.style.display = "block";

    const Modif = document.querySelector(".Modif");
    Modif.style.display = "none";
    
}

// Si le token n'est pas null => Apparence de la page "connectée"

else {
    const BtnHide = document.querySelector(".BtnFilter");
    BtnHide.style.display = "none";
}

// Écoute du click sur le bouton "logout" => suppression du token

const LogoutBtn = document.querySelector("#Logout");
LogoutBtn.addEventListener("click", function () {
    window.localStorage.removeItem("ConnectedToken");
    window.location.href = "./index.html";
});


// Récupération des éléments de l'API

const reponseWorks = await fetch("http://localhost:5678/api/works");
const Works = await reponseWorks.json();

const reponseCategories = await fetch ("http://localhost:5678/api/categories");
const Category = await reponseCategories.json();

// Ajout d'une Categorie "Tous" dans le tableau

const NewCategory = {
    "id": 0,
    "name": "Tous"
  };
Category.unshift(NewCategory);


// Appel fonction Générer les Travaux

genererTravaux(Works);

// Appel fonction Generer boutons

genererBtn(Category);


// Récupération des boutons

const DivBtn = document.querySelectorAll(".BtnFilter button");

// Boucle d'écoute du click sur les boutons

for (let i = 0; i < DivBtn.length; i++) {
DivBtn[i].addEventListener("click", function (event) {
    // Récupération de l'ID du bouton cliqué (0, 1, 2, 3)
    const categoryid = event.target.getAttribute("category-id");
    const AllImg = document.querySelectorAll(".gallery figure");
    // Récupération de l'ID des figures
    AllImg.forEach (figure => {
        const ImgCategory = figure.getAttribute("categoryImgId");
    

        // Si ID = "0" => affiche toutes les figures || ID = 1, 2 ou 3 => Affiche les figures correspondante à l'ID 

        if (categoryid == 0 || categoryid === ImgCategory) {
            figure.style.display = "block"; 
        } else { 
            // Cache les figures dont l'ID n'est pas lu
            figure.style.display = "none";
        }  
    });
    
});
}



// Déclaration de la modale
let modal = document.querySelector("#modal1");


// Ouverture/Fermeture modale

const openModal = async function (e) {
    e.preventDefault();
    const modalDisplay = document.querySelector(e.target.getAttribute("href"));
    modalDisplay.style.display = "flex";
    modalDisplay.removeAttribute("aria-hidden");
    modalDisplay.setAttribute("aria-modal", "true");
    modal = modalDisplay
    modalDisplay.addEventListener("click", closeModal);
    modalDisplay.querySelector(".closeModal").addEventListener("click", closeModal);
    



    // Appel de la fonction genererTravauxModal
    const newWorksResponse = await fetch("http://localhost:5678/api/works");
    const newWorks = await newWorksResponse.json();
    document.querySelector(".IconeWorks").innerHTML="";
    genererTravauxModal(newWorks);



    // Envoie d'une requête de suppression du travail
    const DeleteIcon = document.querySelectorAll(".IconDelete");
    for (let i=0; i < DeleteIcon.length; i++) {
        DeleteIcon[i].addEventListener("click", function (e) {
            e.preventDefault();
            const RecupId = e.target.getAttribute("workid");

            const RecupToken = window.localStorage.getItem("ConnectedToken");
            
            fetch('http://localhost:5678/api/works/'+RecupId, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${RecupToken}`,
                
            }        
            })


            .then((response) => {
                if(response.ok) {
                    console.log("Élément Supprimé avec succès");
                    return response.json;
                } else {
                    console.log("Erreur");
                }
            })
            .then((data) => {
                if(data == null){
                    
                } else {
                    closeModal(e)  
                }
            })    
        })

    }  
}

// Fermeture de la modale

const closeModal = async function (e) {
    
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal = null
    document.querySelector(".IconeWorks").innerHTML = "";
    const newWorksResponse = await fetch("http://localhost:5678/api/works");
    const newWorks = await newWorksResponse.json();
    document.querySelector(".gallery").innerHTML="";
    genererTravaux(newWorks);
}

// Fonction empechant la fermeture de la modale en cliquant à l'interieur

const modalWrappers = modal.querySelectorAll(".jsModalStop"); 
modalWrappers.forEach(
    wrapper => {
         wrapper.addEventListener("click", function(e) { e.stopPropagation(); 

        }); 
    });


// Ouverture de la modale d'ajout de travaux

const openModal2 = function (e) {
    e.preventDefault();
    const modal1Hide = document.querySelector("#ModalDEL");
    modal1Hide.style.display = "none";
    modal1Hide.setAttribute("aria-hidden", "true");
    modal1Hide.removeAttribute("aria-modal");
    
    

    const modal2Display = document.querySelector("#ModalAdd");
    modal2Display.style.display = "flex";
    modal2Display.removeAttribute("aria-hidden");
    modal2Display.setAttribute("aria-modal", "true");
    modal2Display.querySelector(".closeModal").addEventListener("click", closeModal);


    if (document.querySelector("#Category").options.length < 2) {
        genererCat(Category);
    }

    
    
    document.getElementById("img").addEventListener('change', getImg);

    
    
// Appel de la fonction d'ajout

  const formAdd = document.getElementById("formAdd");
  formAdd.addEventListener("submit", sendForm);


   }

// listener du click "Ajouter une photo"

const clickOpenModal2 = document.querySelector("#AddWorks");
clickOpenModal2.addEventListener("click", openModal2);

// Affichage de l'image lors de la séléction d'ajout travaux

function getImg(e){

    const file = e.target.files[0];
    const Img = document.querySelector("#imgFile");
    let url = window.URL.createObjectURL(file);
    Img.src = url;

    const DivAdd = document.querySelector(".styleAddImg");
    DivAdd.style.display = "none";

    const DivFilled = document.querySelector(".imgFilled");
    DivFilled.style.display = "flex";


}


// Fonction ajout des travaux

async function sendForm(e) {
    e.preventDefault();
 
    // Recupération des valeurs du formulaire

    const img = document.getElementById("img").files[0];
    const title = document.getElementById("title").value;
    const cat = document.getElementById("Category");
    const categoryId = cat.options[cat.selectedIndex].value;
    
    const formData = new FormData;
    formData.append("image", img);
    formData.append("title", title);
    formData.append("category", categoryId);

    console.log(img);
    console.log(title);
    console.log(categoryId);
    
    // Envoie à l'API
    

    await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TokenKey}`,

        },  
        body: formData,

        })

        // Traitement de la réponse

        // Si réponse OK => retour console "Élement ajouté + titre"
        .then((response) => {
            if (response.ok) {
            console.log("Élement Ajouté : ", title);
            return response.json();
                // Si réponse pas OK => retour console erreur
        } else {
            console.error("Erreur:", response.status);
        }
        })

        // Si on récupère des données => fermeture et nettoyage de la modale

        .then((data) => {
                if(data == null){
                    
                } else {
                    closeModal(e); 
                }
            })
        .then(() => {
            const img = document.getElementById("imgFile");
            img.src = "assets/icons/Paysage.png";

            const DivAdd = document.querySelector(".styleAddImg");
            DivAdd.style.display = "flex";

            const DivFilled = document.querySelector(".imgFilled");
            DivFilled.style.display = "none";

            retourModal(e);
        
            formAdd.reset();
        })  
        
  }



// Fonction flèche de retour modale

const retourModal = function (e){
    e.preventDefault();
    const modal2Display = document.querySelector("#ModalAdd");
    modal2Display.style.display = "none";
    modal2Display.setAttribute("aria-hidden", "true");
    modal2Display.removeAttribute("aria-modal");

    const modal1Hide = document.querySelector("#ModalDEL");
    modal1Hide.style.display = "flex";
    modal1Hide.removeAttribute("aria-hidden");
    modal1Hide.setAttribute("aria-modal", "true");
}

//listener du click sur la flèche de retour

const clickRetourModal = document.querySelector("#retour");
clickRetourModal.addEventListener("click", retourModal);

// Listener du click sur le boutons "modifier"

document.querySelectorAll(".jsModal").forEach (a => {
    a.addEventListener("click", openModal)
});

// Écoute de la touche échap du clavier afin de fermer la modale

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeModal(e)
    }
});

// Fonction générant les catégorie du menu déroulant

function genererCat(Category){
    for (let i = 1; i < Category.length; i++){
        
        const article = Category[i];

        const ParentCat = document.querySelector("#Category");

        const option = document.createElement("option");
        option.value = article.id;
        option.innerText = article.name;

        ParentCat.appendChild(option);
    }
    
}