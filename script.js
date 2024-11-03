// Sélectionne la div où l'image sera insérée
const imageContainer = document.getElementById('image-container');

// Vérifie si le conteneur d'image existe
if (imageContainer) {
    console.log("Le conteneur d'image a été trouvé.");
} else {
    console.error("Le conteneur d'image n'a pas été trouvé.");
}

// Crée un élément image
const image = new Image(); // Crée un nouvel élément d'image
image.crossOrigin = 'anonymous'; // CORS activé pour le chargement d'images externes
image.src = 'https://jahmora.github.io/Legion-News/image1.jpg'; // Remplace par le chemin réel de ton image
image.alt = 'Description de l\'image'; // Donne une description de l'image pour l'accessibilité
image.className = 'magazine-image'; // Ajoute une classe pour le style

// Insère l'image dans la div
imageContainer.appendChild(image);
console.log("L'image a été ajoutée au conteneur.");

// Crée un élément pour afficher un message d'erreur
const errorMessage = document.querySelector('.error-message'); // Sélectionne le message d'erreur

// Vérifie si l'image se charge correctement
image.onload = function() {
    console.log("L'image s'est chargée avec succès :", image.src);

    // Création d'un canvas pour convertir l'image en WebP
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Définit les dimensions du canvas
    canvas.width = image.width;
    canvas.height = image.height;

    // Dessine l'image sur le canvas
    ctx.drawImage(image, 0, 0);

    // Convertit l'image en WebP et crée un blob
    canvas.toBlob(function(blob) {
        const webpUrl = URL.createObjectURL(blob); // Crée une URL pour le blob

        // Crée une nouvelle image pour l'image WebP
        const webpImage = new Image();
        webpImage.src = webpUrl; // Attribue l'URL de l'image WebP
        webpImage.alt = 'Image convertie au format WebP';
        webpImage.className = 'magazine-image'; // Assurez-vous d'ajouter la classe CSS ici
        imageContainer.appendChild(webpImage); // Ajoute l'image WebP au conteneur

        // Utilisation de GSAP pour l'animation de l'image WebP
        gsap.fromTo(webpImage, 
            { scale: 0.8, opacity: 0 }, // État initial : légèrement réduite et totalement transparente
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out", onComplete: showPurchaseOptions } // État final
        );

        // Supprime l'image d'origine pour éviter les doublons
        image.remove();
    }, 'image/webp'); // Spécifie le format de conversion
};

// Fonction pour afficher les options d'achat
function showPurchaseOptions() {
    console.log("Options d'achat affichées.");
    const purchaseOptions = document.getElementById('purchase-options');
    purchaseOptions.style.display = 'block'; // Affiche la section d'options d'achat

    // Déplace légèrement l'image vers la gauche
    gsap.to(webpImage, { x: -50, duration: 0.5, ease: "power2.out" });
}

// Gestion des erreurs de chargement d'image
image.onerror = function() {
    console.error("Erreur lors du chargement de l'image :", image.src);
    errorMessage.textContent = "Erreur lors du chargement de l'image. Veuillez réessayer plus tard."; // Message d'erreur
    errorMessage.style.display = 'block'; // Affiche le message d'erreur
};
