/**
 * Fonction pour changer la langue.
 * @param {string} lang - Le code de la langue à définir (en, fr, es).
 */
 function setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    console.log('after setLanguage', localStorage.getItem('selectedLanguage'));
    fetchTranslations(lang);
}
