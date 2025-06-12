// Récupération des éléments de l'API

const reponseWorks = await fetch("http://localhost:5678/api/works");
const Works = await reponseWorks.json();

const reponseCategories = await fetch ("http://localhost:5678/api/categories");
const Category = await reponseCategories.json();

const TokenKey = window.localStorage.getItem("ConnectedToken");
console.log(TokenKey);

// Ajout d'une Categorie "Tous" dans le tableau

const NewCategory = {
    "id": 0,
    "name": "Tous"
  };
Category.unshift(NewCategory);

// fonction Générer les Travaux

function genererTravaux(Works){
    for (let i = 0; i < Works.length; i++) {

        const article = Works[i];

        const divGallery = document.querySelector(".gallery");

        const figureGallery = document.createElement("figure");
        // Déclaration de l'ID des éléments figure
        figureGallery.setAttribute("categoryImgId", article.categoryId);

        const imgWorks = document.createElement("img");
        imgWorks.src = article.imageUrl;
        imgWorks.alt = article.title;
        

        const imgCaption = document.createElement("figcaption");
        imgCaption.innerText = article.title;



        divGallery.appendChild(figureGallery);
        figureGallery.appendChild(imgWorks);
        figureGallery.appendChild(imgCaption);

    }
}

genererTravaux(Works);


// Création des boutons

// Récupération Class "BtnFilter accueillant les boutons"



// Fonction Generer boutons (boucle for)

function genererBtn(Category){
    console.log(Category);
    for (let i =0; i < Category.length; i++){
        const article = Category[i];

        const DivBtn = document.querySelector(".BtnFilter");

        const Btn = document.createElement("button");
        Btn.innerText = article.name;
        // Déclaration de l'ID de la category sélectionnée
        Btn.setAttribute("category-id",Category[i].id);

        Btn.classList.add("BtnClass");
    

        DivBtn.appendChild(Btn);
        console.log(Btn);
    }

}

genererBtn(Category);

const DivBtn = document.querySelectorAll(".BtnFilter button");

for (let i = 0; i < DivBtn.length; i++) {
DivBtn[i].addEventListener("click", function (event) {
    // Récupération de l'ID du boutons cliqué (0, 1, 2, 3)
    const categoryid = event.target.getAttribute("category-id");
    console.log(categoryid);
    const AllImg = document.querySelectorAll(".gallery figure");
    // Récupération de l'ID des figures
    AllImg.forEach (figure => {
        const ImgCategory = figure.getAttribute("categoryImgId");
    

        // Si ID = "0" = affiche toutes les figures || ID = 1 ,2 ou 3 = Affiche les figures correspondante à l'ID 

        if (categoryid == 0 || categoryid === ImgCategory) {
            figure.style.display = "block"; 
        } else { 
            // Cache les figures dont l'ID n'est pas lu
            figure.style.display = "none";
        }  
    });
    
});
}