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
    window.localStorage.removeItem("ConnectedToken")
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


// fonction Générer les Travaux

genererTravaux(Works);

// Fonction Generer boutons

genererBtn(Category);


// Récupération des boutons

const DivBtn = document.querySelectorAll(".BtnFilter button");

//boucle d'écoute du click sur les boutons

for (let i = 0; i < DivBtn.length; i++) {
DivBtn[i].addEventListener("click", function (event) {
    // Récupération de l'ID du bouton cliqué (0, 1, 2, 3)
    const categoryid = event.target.getAttribute("category-id");
    console.log(categoryid);
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

const openModal = function (e) {
    e.preventDefault();
    const modalDisplay = document.querySelector(e.target.getAttribute("href"));
    modalDisplay.style.display = "flex";
    modalDisplay.removeAttribute("aria-hidden");
    modalDisplay.setAttribute("aria-modal", "true");
    modal = modalDisplay
    modalDisplay.addEventListener("click", closeModal);
    modalDisplay.querySelector(".closeModal").addEventListener("click", closeModal);


    console.log(modalDisplay);


    // Appel de la function genererTravauxModal
    genererTravauxModal(Works);



    // Envoie d'une requête de suppression du travail
    const DeleteIcon = document.querySelectorAll(".IconDelete");
    console.log(DeleteIcon);
    for (let i=0; i < DeleteIcon.length; i++) {
        DeleteIcon[i].addEventListener("click", function (e) {
            e.preventDefault();
            const RecupId = e.target.getAttribute("workid");
            console.log(RecupId);

            const RecupToken = window.localStorage.getItem("ConnectedToken");

            console.log(RecupToken);
            
            fetch('http://localhost:5678/api/works/'+RecupId, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${RecupToken}`,
                
            }
        
            })

        })
    }  
}

// Fermeture de la modale

const closeModal = function (e) {
    
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal = null
    document.querySelector(".IconeWorks").innerHTML = "";
}

// Function empechant la fermeture de la modale en cliquant à l'interieur

const modalWrappers = modal.querySelectorAll(".jsModalStop"); 
modalWrappers.forEach(
    wrapper => {
         wrapper.addEventListener("click", function(e) { e.stopPropagation(); 

        }); 
    });


// Ouverture de la modale d'ajout de travaux


const openModal2 = document.querySelector("#AddWorks");
   openModal2.addEventListener("click", function (e) {
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
    



    function sendForm(e) {
    e.preventDefault();
  
    const form = e.target;
    console.log(form);
    const formData = new FormData(form);
    

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TokenKey}`,
            'Content-Type': 'multipart/form-data'
        },  
        body: formData,

        })
  }
  
  const formAdd = document.getElementById("formAdd");
  formAdd.addEventListener("submit", sendForm);







    /*const form = document.forms.namedItem("formAdd");
    form.addEventListener("submit",(event) => {

        event.preventDefault();

        const formData = new FormData(form);
        formData.append("CustomField", "Des données supplémentaires");


        fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData,
        
        });

    })*/


   })


const Img = document.querySelector("#imgFile")

function getImg(e){

    const file = e.target.files[0];
    let url = window.URL.createObjectURL(file);
    Img.src = url

    const DivAdd = document.querySelector(".styleAddImg");
    DivAdd.style.display = "none";

    const DivFilled = document.querySelector(".imgFilled");
    DivFilled.style.display = "flex";


   }


const retourModal = document.querySelector("#retour");
   retourModal.addEventListener("click", function (e){
    e.preventDefault();
    const modal2Display = document.querySelector("#ModalAdd");
    modal2Display.style.display = "none";
    modal2Display.setAttribute("aria-hidden", "true");
    modal2Display.removeAttribute("aria-modal");

    const modal1Hide = document.querySelector("#ModalDEL");
    modal1Hide.style.display = "flex";
    modal1Hide.removeAttribute("aria-hidden");
    modal1Hide.setAttribute("aria-modal", "true");
   })


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



function genererCat(Category){
    for (let i = 1; i < Category.length; i++){
        
        const article = Category[i];

        const ParentCat = document.querySelector("#Category");

        const option = document.createElement("option");
        option.value = article.id;
        option.innerText = article.name;

        console.log(option);

        ParentCat.appendChild(option);
    }
    
}
