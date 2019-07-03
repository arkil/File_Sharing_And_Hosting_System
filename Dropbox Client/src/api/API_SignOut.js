
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

export const doSignOut = (payload) =>

    fetch(`${api}/user/signOut`, {
        credentials: 'include',
    }).then( res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });