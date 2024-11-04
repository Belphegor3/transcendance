function generateRandomString(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}


function auth42(){
    // const urlParams = new URLSearchParams(window.location.search);
    // const code = urlParams.get('code');
}

const utils = {
    get: async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return { status: response.status, data };
    },
    post: async (url, data) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify(data),
      });
      const text = await response.text();
      return { status: response.status, data: text ? JSON.parse(text) : {} };
    },
}