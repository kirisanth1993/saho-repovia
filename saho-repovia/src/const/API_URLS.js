const urlBase = 'https://api.github.com';

export const API_URL = {
    users: {
        list: urlBase + '/search/users?q={searchKey}&page={pageNo}&per_page={pageCount}'
    }
};