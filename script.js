// Initialisation des éléments de l'interface
function setLanguage(lang) {
  console.log(`[Langue] Passage à la langue : ${lang}`);

  // Titre des options d'achat
  const purchaseTitle = document.getElementById('purchase-options-title');
  if (purchaseTitle) {
    purchaseTitle.textContent = translations[lang].purchaseTitle;
    console.log("[Langue] Titre des options d'achat mis à jour.");
  } else {
    console.error("[Erreur] Élément 'purchase-options-title' introuvable.");
  }

  // Description des options d'achat
  const description = document.querySelector('.purchase-options p');
  if (description) {
    description.textContent = translations[lang].description;
    console.log("[Langue] Description des options d'achat mise à jour.");
  } else {
    console.error("[Erreur] Élément 'description' introuvable.");
  }

  // Bouton d'achat
  const buyButton = document.getElementById('buyButton');
  if (buyButton) {
    buyButton.textContent = translations[lang].buyButton;
    console.log("[Langue] Texte du bouton d'achat mis à jour.");
  } else {
    console.error("[Erreur] Élément 'buyButton' introuvable.");
  }

  // Message d'erreur
  const errorMessage = document.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.textContent = translations[lang].errorMessage;
    console.log("[Langue] Message d'erreur mis à jour.");
  } else {
    console.error("[Erreur] Élément 'error-message' introuvable.");
  }

  // Sauvegarde de la langue préférée
  localStorage.setItem('preferredLanguage', lang);
  console.log("[Langue] Langue préférée sauvegardée dans localStorage.");
}

// Détection et application automatique de la langue
function detectAndSetLanguage() {
  const browserLanguage = navigator.language || navigator.userLanguage;
  const selectedLang = browserLanguage.startsWith('fr') ? 'fr' : 'en';
  console.log(`[Langue] Langue détectée : ${selectedLang} d'après le navigateur.`);
  setLanguage(selectedLang);
}

// Initialisation de la page
function init() {
  console.log("[Initialisation] Démarrage de l'initialisation...");

  const imageContainer = document.getElementById('image-container');
  if (imageContainer) {
    console.log("[Image] Conteneur d'image trouvé.");
    loadImage(imageContainer);
  } else {
    console.error("[Erreur] Conteneur d'image introuvable.");
  }

  detectAndSetLanguage();
}

// Chargement et conversion de l'image
function loadImage(imageContainer) {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = 'https://jahmora.github.io/Legion-News/image1.png';
  image.alt = "Description de l'image";
  image.className = 'magazine-image';
  imageContainer.appendChild(image);
  console.log("[Image] Image ajoutée au conteneur.");

  image.onload = () => {
    if (image.src.endsWith('.webp')) {
      displayWebPImage(image.src, imageContainer);
      console.log("[Image] Image WebP chargée et affichée.");
    } else {
      convertToWebP(image, imageContainer);
    }
  };
  image.onerror = handleImageError;
}

// Conversion de l'image en WebP
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

// Affichage de l'image WebP avec animation
function displayWebPImage(webpUrl, imageContainer) {
  const webpImage = new Image();
  webpImage.src = webpUrl;
  webpImage.alt = 'Image convertie au format WebP';
  webpImage.className = 'magazine-image';
  webpImage.style.width = '100%';
  webpImage.style.height = 'auto';

  imageContainer.innerHTML = '';
  imageContainer.appendChild(webpImage);

  gsap.to(webpImage, {
    opacity: 1,
    duration: 1,
    onComplete: () => {
      document.getElementById('purchase-options').classList.add('visible');
      console.log("[Animation] Image affichée avec animation. Options d'achat visibles.");
    }
  });
}

// Gestion des erreurs de chargement de l'image
function handleImageError() {
  const lang = localStorage.getItem('preferredLanguage') || 'en';
  console.error("[Erreur] Chargement de l'image échoué.");
  const errorMessage = document.querySelector('.error-message');
  errorMessage.textContent = translations[lang].errorMessage;
  errorMessage.style.display = 'block';

  const imageContainer = document.getElementById('image-container');
  const fallbackImage = new Image();
  fallbackImage.src = 'fallback-image.png';
  fallbackImage.alt = 'Image de remplacement';
  imageContainer.appendChild(fallbackImage);
  console.log("[Erreur] Image de remplacement ajoutée.");
}

// Écouteur pour le changement de langue
document.getElementById('languageSelect').addEventListener('change', (event) => {
  const selectedLanguage = event.target.value;
  console.log(`[Langue] Changement manuel vers : ${selectedLanguage}`);
  setLanguage(selectedLanguage);
});

// Initialisation du script au chargement de la page
window.onload = init;
