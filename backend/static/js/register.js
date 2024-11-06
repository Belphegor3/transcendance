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
// sessionStorage.setItem('csrftoken', csrftoken);

// async function registerUserDB(userData2) {
//     console.log("Données envoyées: ", JSON.stringify(userData2));
//     // const csrftoken = getCookie('csrftoken');
//     try {
//         const response = await fetch('/api/register/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': csrftoken,
//             },
//             body: JSON.stringify(userData2),
//         });
//         if (!response.ok) {
//             const errorData = await response.json();
//             console.log('Erreur:' + errorData);
//             let errorMessage = 'Erreur lors de l\'inscription:\n';
//             for (const [key, value] of Object.entries(errorData)) {
//                 errorMessage += `${key}: ${value.join(', ')}\n`;
//             }
//             alert(errorMessage);
//             return false;
//         }
//         sessionStorage.setItem('username', userData2.username);
//         sessionStorage.setItem('firstname', userData2.firstname);
//         sessionStorage.setItem('lastname', userData2.lastname);
//         sessionStorage.setItem('email', userData2.email);
//         console.log('CSRF Token:', csrftoken);
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// async function loginUserDB(userData3) {
//     // const csrftoken = getCookie('csrftoken');
//     try {
//         const response = await fetch('/api/login/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': csrftoken,
//             },
//             body: JSON.stringify(userData3),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         console.error('Erreur lors de la connexion:', error);
//         return false;
//     }
// }

// async function editUserDB(userData3) {
//     // const csrftoken = getCookie('csrftoken');
//     console.log(getCookie("csrf", 'csrftoken'));
//     try {
//         const response = await fetch('/api/edit/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': csrftoken,
//             },
//             body: JSON.stringify(userData3),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         console.error('Erreur lors de la connexion:', error);
//         return false;
//     }
// }

// async function deleteAccount(userData5) {
//     // const csrftoken = getCookie('csrftoken');
//     // console.log(getCookie("csrf", 'csrftoken'));
//     try {
//         const response = await fetch('/api/deleteaccount/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': csrftoken,
//             },
//             body: JSON.stringify(userData5),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         console.error('Erreur lors de la connexion:', error);
//         return false;
//     }
// }

// async function anonymiseUser(userData6) {
//     // console.log(getCookie("csrf", 'csrftoken'));
//     try {
//         const response = await fetch('/api/edit/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userData6),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         console.error('Erreur lors de la connexion:', error);
//         return false;
//     }
// }

// async function postUserDB(userData) {
//     // console.log(getCookie("csrf", 'csrftoken'));
//     try {
//         const response = await fetch('/api/postusername/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userData),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         console.error('Erreur lors de la connexion:', error);
//         return false;
//     }
// }

// async function getUserDB() {
//     console.log("el famoso token de connection: " + localStorage.getItem('authToken'));
//     try {
//         const response = await fetch('/api/getUserInfo/', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Token ' + localStorage.getItem('authToken')
//             },
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         console.error('Erreur lors de la connexion:', error);
//         return false;
//     }
// }