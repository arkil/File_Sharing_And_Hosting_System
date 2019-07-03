
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';

const headers = {
    'Accept': 'application/json'
};

export const getUserActivity = () =>
    fetch(`${api}/user/getActivity`,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });
