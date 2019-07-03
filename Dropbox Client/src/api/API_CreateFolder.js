
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};

export const createFolder = (payload) =>
    fetch(`${api}/user/folderAction/createFolder`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

