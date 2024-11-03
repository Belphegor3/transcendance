async function deleteAccount() {
    try {
        const response = await fetch('/api/delete/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
        });

        if (response.status === 200) {
            alert('Votre compte a été supprimé avec succès.');
            loginModal.show();
        } else {
            const errorData = await response.json();
            alert('Erreur lors de la suppression du compte : ' + errorData.error);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du compte:', error);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
}