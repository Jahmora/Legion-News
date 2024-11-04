// Sélectionne la div où l'image sera insérée
const imageContainer = document.getElementById('image-container');

// Vérifie si le conteneur d'image existe
if (imageContainer) {
    console.log("Le conteneur d'image a été trouvé.");
} else {
    console.error("Le conteneur d'image n'a pas été trouvé.");
}

// Crée un élément image
const image = new Image();
image.crossOrigin = 'anonymous';
image.src = 'https://jahmora.github.io/Legion-News/image1.png';
image.alt = 'Description de l\'image';
image.className = 'magazine-image';

// Insère l'image dans la div
imageContainer.appendChild(image);
console.log("L'image a été ajoutée au conteneur.");

// Crée un élément pour afficher un message d'erreur
const errorMessage = document.querySelector('.error-message');

// Variable pour l'image WebP
let webpImage;

// Vérifie si l'image se charge correctement
image.onload = function() {
    console.log("L'image s'est chargée avec succès :", image.src);

    // Capture la largeur et la hauteur de l'image en fonction de l'écran
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth <= 768;
    const originalWidth = isMobile ? screenWidth * 0.9 : image.width;
    const originalHeight = isMobile ? (screenWidth * 0.9 * image.height) / image.width : image.height;

    // Création d'un canvas pour convertir l'image en WebP
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Définit les dimensions du canvas pour mobile ou PC
    canvas.width = originalWidth;
    canvas.height = originalHeight;

    // Dessine l'image sur le canvas
    ctx.drawImage(image, 0, 0, originalWidth, originalHeight);

    // Convertit l'image en WebP et crée un blob
    canvas.toBlob(function(blob) {
        const webpUrl = URL.createObjectURL(blob);

        if (blob) {
            console.log("L'image a été convertie en WebP avec succès :", webpUrl);
        } else {
            console.error("Échec de la conversion de l'image en WebP.");
        }

        // Crée une nouvelle image WebP avec les dimensions pour mobile ou PC
        webpImage = new Image();
        webpImage.src = webpUrl;
        webpImage.alt = 'Image convertie au format WebP';
        webpImage.className = 'magazine-image';
        webpImage.style.width = '100%';
        webpImage.style.height = 'auto';

        imageContainer.appendChild(webpImage);

        gsap.fromTo(webpImage, 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out", onComplete: showPurchaseOptions }
        );

        image.remove();
    }, 'image/webp');
};

// Fonction pour afficher les options d'achat
function showPurchaseOptions() {
    console.log("Options d'achat affichées.");
    const purchaseOptions = document.getElementById('purchase-options');
    purchaseOptions.style.display = 'block';

    // Déplace légèrement l'image vers la gauche
    gsap.to(webpImage, { x: -50, duration: 0.5, ease: "power2.out" });
}

// Gestion des erreurs de chargement d'image
image.onerror = function() {
    console.error("Erreur lors du chargement de l'image :", image.src);
    errorMessage.textContent = "Erreur lors du chargement de l'image. Veuillez réessayer plus tard.";
    errorMessage.style.display = 'block';
};
