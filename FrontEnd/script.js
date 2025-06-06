// Récupération des éléments de l'API

const reponseWorks = await fetch("http://localhost:5678/api/works");
const Works = await reponseWorks.json();

const reponseCategories = await fetch ("http://localhost:5678/api/categories");
const Category = await reponseCategories.json();

// fonction Générer les Travaux

function genererTravaux(Works){
    for (let i = 0; i < Works.length; i++) {

        const article = Works[i];

        const divGallery = document.querySelector(".gallery");

        const figureGallery = document.createElement("figure");
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


const DivBtn = document.querySelector(".BtnFilter");

const BtnTous = document.createElement("button");
BtnTous.innerText = "Tous";
BtnTous.setAttribute("category-id", "all");
BtnTous.classList.add("BtnClass");
DivBtn.appendChild(BtnTous);


function genererBtn(Category){
    console.log(Category);
    for (let i =0; i < Category.length; i++){
        const article = Category[i];

        const DivBtn = document.querySelector(".BtnFilter");

        const Btn = document.createElement("button");
        Btn.innerText = article.name;
        Btn.setAttribute("category-id",Category[i].id);

        Btn.classList.add("BtnClass");
    

        DivBtn.appendChild(Btn);
        console.log(article);
    }

}

genererBtn(Category);


//Fonction boutons filtres

DivBtn.addEventListener("click", function (event) {
    const categoryid = event.target.getAttribute("category-id");
    console.log(categoryid);
    const AllImg = document.querySelectorAll(".gallery figure");
    AllImg.forEach (figure => {
        const ImgCategory = figure.getAttribute("categoryImgId");
        console.log(ImgCategory);

        if (categoryid === "all" || categoryid === ImgCategory) {
            figure.style.display = "block"; 
        } else { 
            figure.style.display = "none";
        }  
    })
    
})