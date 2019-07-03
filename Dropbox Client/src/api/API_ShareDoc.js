
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};

export const shareDoc = (payload) =>
    fetch(`${api}/user/shareDoc`,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });
