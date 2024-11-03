async function registerUserDB(userData2) {
    console.log("Données envoyées: ", JSON.stringify(userData2));
    try {
        const response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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