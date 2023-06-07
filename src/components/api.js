const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: 'd709f1d7-61bc-4f4a-a795-fd13fa11ff95',
    'Content-Type': 'application/json'
  },
}

export const pathConfig = {
  userPath: '/users/me',
  cardsPath: '/cards'
}

export function getData(path){
  return fetch(`${config.baseUrl}${path}`, {headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(err => {
      return `Ошибка: ${err.status}`;
    });
}
