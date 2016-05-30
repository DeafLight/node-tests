import 'whatwg-fetch';

var reposForUser = (userName: string) => {
    let url = `https://api.github.com/users/${userName}/repos`;

    return fetch(url).then((response: Response) => response.json());
};

export {reposForUser};