// Traductions pour chaque langue
const translations = {
  fr: {
    purchaseTitle: "Options d'Achat",
    description: "Achetez cette image avec des crypto-monnaies.",
    buyButton: "Achetez Maintenant",
    errorMessage: "Une erreur est survenue lors du chargement de l'image."
  },
  en: {
    purchaseTitle: "Purchase Options",
    description: "Buy this image with cryptocurrency.",
    buyButton: "Buy Now",
    errorMessage: "An error occurred while loading the image."
  }
};

// Fonction pour définir la langue et mettre à jour les textes
function setLanguage(lang) {
  console.log(`[Langue] Passage à la langue: ${lang}`);
  
  const purchaseTitle = document.getElementById('purchase-options-title');
  if (purchaseTitle) {
      purchaseTitle.textContent = translations[lang].purchaseTitle;
  } else {
      console.error("[Erreur] Élément 'purchase-options-title' introuvable.");
  }

  const description = document.querySelector('.purchase-options p');
  if (description) {
      description.textContent = translations[lang].description;
  } else {
      console.error("[Erreur] Élément 'description' introuvable.");
  }

  const buyButton = document.getElementById('buyButton');
  if (buyButton) {
      buyButton.textContent = translations[lang].buyButton;
  } else {
      console.error("[Erreur] Élément 'buyButton' introuvable.");
  }

  const errorMessage = document.querySelector('.error-message');
  if (errorMessage) {
      errorMessage.textContent = translations[lang].errorMessage;
  } else {
      console.error("[Erreur] Élément 'error-message' introuvable.");
  }

  localStorage.setItem('preferredLanguage', lang);
}

// Fonction pour appliquer automatiquement la langue selon le navigateur
function detectAndSetLanguage() {
  const browserLanguage = navigator.language || navigator.userLanguage;
  const selectedLang = browserLanguage.startsWith('fr') ? 'fr' : 'en';
  
  setLanguage(selectedLang);
  console.log(`[Langue] Langue détectée : ${selectedLang} (d'après le navigateur)`);
}

// Fonction d'initialisation
function init() {
  console.log("[Initialisation] Début de l'initialisation...");
  
  const imageContainer = document.getElementById('image-container');
  if (imageContainer) {
      console.log("[Image] Conteneur trouvé.");
      loadImage(imageContainer);
  } else {
      console.error("[Erreur] Conteneur d'image introuvable.");
  }

  detectAndSetLanguage(); // Détecter et appliquer la langue
}

// Fonction pour charger et convertir l'image en WebP
function loadImage(imageContainer) {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = 'https://jahmora.github.io/Legion-News/image1.png'; // À remplacer par un URL WebP si nécessaire
  image.alt = 'Description de l\'image';
  image.className = 'magazine-image';
  imageContainer.appendChild(image);
  console.log("[Image] Image ajoutée au conteneur.");

  image.onload = () => {
    // Vérification du format de l'image
    if (image.src.endsWith('.webp')) {
      displayWebPImage(image.src, imageContainer); // Si déjà WebP, on l'affiche directement
    } else {
      convertToWebP(image, imageContainer);
    }
  };
  image.onerror = handleImageError;
}

// Fonction de conversion en WebP
function convertToWebP(image, imageContainer) {
  console.log("[Conversion] Début de la conversion en WebP...");
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth <= 768;
  const originalWidth = isMobile ? screenWidth * 0.9 : image.width;
  const originalHeight = isMobile ? (screenWidth * 0.9 * image.height) / image.width : image.height;

  const canvas = document.createElement('canvas');
  canvas.width = originalWidth;
  canvas.height = originalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, originalWidth, originalHeight);

  canvas.toBlob(blob => {
    if (blob) {
        const webpUrl = URL.createObjectURL(blob);
        displayWebPImage(webpUrl, imageContainer);
        console.log("[Conversion] Image convertie avec succès en WebP.");
    } else {
        console.error("[Conversion] Échec de la conversion en WebP.");
    }
  }, 'image/webp');
}

// Affiche l'image WebP et applique les animations
function displayWebPImage(webpUrl, imageContainer) {
  const webpImage = new Image();
  webpImage.src = webpUrl;
  webpImage.alt = 'Image convertie au format WebP';
  webpImage.className = 'magazine-image';
  webpImage.style.width = '100%';
  webpImage.style.height = 'auto';

  imageContainer.innerHTML = ''; // Vide le conteneur avant d'ajouter l'image
  imageContainer.appendChild(webpImage);

  gsap.to(webpImage, {
    opacity: 1,
    duration: 1,
    onComplete: () => {
      document.getElementById('purchase-options').classList.add('visible');
    }
  });
}

// Gestion des erreurs de chargement de l'image
function handleImageError() {
  const lang = localStorage.getItem('preferredLanguage') || 'en';
  console.error("[Image] Erreur lors du chargement de l'image.");
  document.querySelector('.error-message').textContent = translations[lang].errorMessage;
  document.querySelector('.error-message').style.display = 'block';

  // Remplacer l'image par une image de secours
  const imageContainer = document.getElementById('image-container');
  const fallbackImage = new Image();
  fallbackImage.src = 'fallback-image.png'; // Image par défaut
  fallbackImage.alt = 'Image par défaut';
  imageContainer.appendChild(fallbackImage);
}

// Écouteur pour le changement de langue
document.getElementById('languageSelect').addEventListener('change', (event) => {
  setLanguage(event.target.value);
});

// Initialisation du script au chargement de la page
window.onload = init;
