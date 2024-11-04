// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

// const csrftoken = getCookie('csrftoken');

async function loginUserDB(userData2) {
    // console.log("Données envoyées: ", JSON.stringify(userData2));
    try {
        const response = await fetch('/api/login/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(userData2),
        });

        // Vérifie si la réponse n'est pas ok
        // if (!response.ok) {
        //     // const errorData = await response.json();
        //     // console.error('Erreur:', errorData);
        //     // Crée un message d'erreur détaillé
        //     let errorMessage = 'Erreur lors de l\'inscription:\n';
        //     for (const [key, value] of Object.entries(errorData)) {
        //         errorMessage += `${key}: ${value.join(', ')}\n`; // Par exemple, "username: 'nom déjà pris'"
        //     }
        //     alert(errorMessage); // Affiche le message d'erreur à l'utilisateur
        //     return false; // Renvoie false pour indiquer l'échec
        // }

        // const data = await response.json();
        // console.log('Utilisateur créé:', data);
        console.log("content\n");
        // alert('Inscription réussie!'); // Message de succès
        return true; // Renvoie true pour indiquer le succèss@sssss.fr
    } catch (error) {
        console.log("pas content\n");
        // console.log('Erreur lors de l\'inscription:');
        // alert('Une erreur s\'est produite, veuillez réessayer.');
        return false; // Renvoie false en cas d'erreur
    }
}