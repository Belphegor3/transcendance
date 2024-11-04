// async function registerUserDB(userData2) {
//     console.log("Données envoyées: ", JSON.stringify(userData2));
//     try {
//         const response = await fetch('/api/register/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userData2),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error('Erreur:', errorData);
//             return;
//         }

//         const data = await response.json();
//         console.log('Utilisateur créé:', data);
//     } catch (error) {
//         console.error('Erreur lors de l\'inscription:', error);
//     }
// }

async function registerUserDB(userData2) {
    // console.log("Données envoyées: ", JSON.stringify(userData2));
    try {
        const response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData2),
        });

        // Vérifie si la réponse n'est pas ok
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur:', errorData);
            // Crée un message d'erreur détaillé
            let errorMessage = 'Erreur lors de l\'inscription:\n';
            for (const [key, value] of Object.entries(errorData)) {
                errorMessage += `${key}: ${value.join(', ')}\n`; // Par exemple, "username: 'nom déjà pris'"
            }
            alert(errorMessage); // Affiche le message d'erreur à l'utilisateur
            return false; // Renvoie false pour indiquer l'échec
        }

        // const data = await response.json();
        // console.log('Utilisateur créé:', data);
        // alert('Inscription réussie!'); // Message de succès
        return true; // Renvoie true pour indiquer le succèss@sssss.fr
    } catch (error) {
        // console.log('Erreur lors de l\'inscription:');
        // alert('Une erreur s\'est produite, veuillez réessayer.');
        return false; // Renvoie false en cas d'erreur
    }
}
