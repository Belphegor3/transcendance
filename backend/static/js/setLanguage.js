/**
 * Fonction pour changer la langue.
 * @param {string} lang - Le code de la langue à définir (en, fr, es).
 */
 function setLanguage(lang) {
    sessionStorage.setItem('selectedLanguage', lang);
    // console.log('after setLanguage', sessionStorage.getItem('selectedLanguage'));
    fetchTranslations(lang);
}
