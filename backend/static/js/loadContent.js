function loadContent(url) {
    fetch(url, { 
        headers: { 
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.text())
    .then(html => {
        document.getElementById('content').innerHTML = '';
        document.getElementById('content').innerHTML = html;
        fetchTranslations(sessionStorage.getItem('selectedLanguage'));
    })
    .catch(error => {
        console.error('Error loading content:', error);
    });
}