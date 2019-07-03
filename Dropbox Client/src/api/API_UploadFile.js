
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';

export const uploadFile = (payload) =>
        fetch(`${api}/user/fileActions/uploadFile`, {
        method: 'POST',
        credentials: 'include',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });