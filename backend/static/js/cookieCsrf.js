function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

async function registerUserDB(userData2) {
    console.log("Données envoyées: ", JSON.stringify(userData2));
    try {
        const response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(userData2),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur:', errorData);
            return;
        }

        const data = await response.json();
        console.log('Utilisateur créé:', data);
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
    }
}
