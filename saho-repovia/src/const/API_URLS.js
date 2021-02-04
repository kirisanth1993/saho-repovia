const urlBase = 'https://api.github.com';

export const API_URL = {
    users: {
        list: urlBase + '/search/users?q={searchKey}&page={pageNo}&per_page={pageCount}'
    },
    repos: {
        list: urlBase + '/users/{login}/repos'
    },
    followes: {
        list: urlBase + '/users/{login}/followers'
    },
    follows: {
        list: urlBase + '/users/{login}/following'
    }
};