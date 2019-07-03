
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

export const deleteFile = (payload) =>
    fetch(`${api}/fileActions/deleteFile`,{
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

export const deleteFolder = (payload) =>
    fetch(`${api}/folderActions/removeFolder`,{
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
