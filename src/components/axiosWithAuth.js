import Axios from 'axios';

export const axiosWithAuth = () =>
{
    const token = window.localStorage.getItem('auth');
    return Axios.create(
        {
            headers: { authorization: token },
            baseURL: 'https://african-market-place.herokuapp.com/'
        });
};