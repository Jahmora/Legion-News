// Sélectionne la div où l'image sera insérée
const imageContainer = document.getElementById('image-container');

// Vérifie si le conteneur d'image existe
if (imageContainer) {
    console.log("Le conteneur d'image a été trouvé."); // Log de vérification
} else {
    console.error("Le conteneur d'image n'a pas été trouvé."); // Log d'erreur
}

// Crée un élément image pour charger l'image .jpg
const image = new Image();
image.crossOrigin = 'anonymous'; // Permet le chargement de l'image en CORS
image.src = 'image1.jpg'; // Remplace par le chemin réel de ton image
image.alt = 'Description de l\'image'; // Donne une description de l'image pour l'accessibilité
image.className = 'magazine-image'; // Ajoute une classe pour le style

// Insère l'image dans la div
imageContainer.appendChild(image);
console.log("L'image a été ajoutée au conteneur."); // Log d'ajout

// Crée un élément pour afficher un message d'erreur
const errorMessage = document.querySelector('.error-message'); // Sélectionne le message d'erreur
imageContainer.appendChild(errorMessage); // Ajoute le message d'erreur au conteneur

// Vérifie si l'image se charge correctement
image.onload = function() {
    console.log("L'image s'est chargée avec succès :", image.src); // Log de succès

    // Crée un canvas pour dessiner l'image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Définit les dimensions du canvas
    canvas.width = image.width;
    canvas.height = image.height;

    // Dessine l'image sur le canvas
    ctx.drawImage(image, 0, 0);

    // Convertit le canvas en WebP
    canvas.toBlob(function(blob) {
        const webpUrl = URL.createObjectURL(blob);
        
        // Crée un élément image pour afficher le résultat WebP
        const webpImage = new Image();
        webpImage.src = webpUrl;
        webpImage.alt = 'Image convertie au format WebP';
        imageContainer.appendChild(webpImage); // Ajoute l'image WebP au conteneur
        
        // Utilisation de GSAP pour l'animation de l'image
        gsap.fromTo(webpImage, 
            { scale: 0.8, opacity: 0 }, // État initial : légèrement réduite et totalement transparente
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out", onComplete: showPurchaseOptions } // État final : taille normale et opaque
        );
        
        // Afficher les options d'achat après la conversion
        showPurchaseOptions();
    }, 'image/webp');
};

// Fonction pour afficher les options d'achat
function showPurchaseOptions() {
    console.log("Options d'achat affichées."); // Log de vérification
    const purchaseOptions = document.getElementById('purchase-options');
    purchaseOptions.style.display = 'block'; // Affiche la section d'options d'achat

    // Déplace légèrement l'image vers la gauche
    gsap.to(image, { x: -50, duration: 0.5, ease: "power2.out" }); // Animation de décalage de l'image vers la gauche
}

// Gestion des erreurs de chargement d'image
image.onerror = function() {
    console.error("Erreur lors du chargement de l'image :", image.src); // Log d'erreur
    errorMessage.textContent = "Erreur lors du chargement de l'image. Veuillez réessayer plus tard."; // Message d'erreur
    errorMessage.style.display = 'block'; // Affiche le message d'erreur
};
