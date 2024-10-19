// import { loadContent } from './loadContent.js';
/**
 * Fonction de navigation pour éviter le rechargement de la page.
 * preventDefault empêche le rechargement de la page
 * pushState modifie l url sans recharger
 * loadContent charge le contenu dynamiquement
 * @param {Event} event - L'événement du clic.
 * @param {string} url - L'URL à charger.
 */
function navigateTo(event, url) {
    event.preventDefault();
    window.history.pushState({}, '', url);
    loadContent(url);
}