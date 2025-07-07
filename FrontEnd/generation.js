
// Fonction générer travaux => génére les Travaus de l'artiste

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


// Fonction générer boutons => génére les boutons de tri des travaux

function genererBtn(Category){
    for (let i =0; i < Category.length; i++){
        const article = Category[i];

        const DivBtn = document.querySelector(".BtnFilter");

        const Btn = document.createElement("button");
        Btn.innerText = article.name;
        // Déclaration de l'ID de la category sélectionnée
        Btn.setAttribute("category-id",Category[i].id);

        Btn.classList.add("BtnClass");
    
        DivBtn.appendChild(Btn);
    }

}

// Fonction générer travaux modal => génére les travaux à l'ouverture de la modale

function genererTravauxModal(Works){
    for (let i = 0; i < Works.length; i++) {

        const article = Works[i];

        const divIcones = document.querySelector(".IconeWorks");

        const divWorks = document.createElement("div");
        divWorks.classList.add("DivWorks");
        divWorks.style.backgroundImage = `url('${article.imageUrl}')`;
        divWorks.style.backgroundSize = "cover";


        const IconDelete = document.createElement("a");
        IconDelete.classList.add("IconDelete");
        IconDelete.href = "#/";

        

        const ImgDelete = document.createElement("img");
        ImgDelete.src = "./assets/icons/Poubelle.png";
        ImgDelete.alt = "Supprimer le travail";
        ImgDelete.setAttribute("workid", article.id);
    
        

        divIcones.appendChild(divWorks);
        divWorks.appendChild(IconDelete);
        IconDelete.appendChild(ImgDelete);
    }
 
}

// Fonction générer category => génére les catégories dans la modale d'ajout de travaux




