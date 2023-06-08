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

export async function getData(path){
  return fetch(`${config.baseUrl}${path}`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {return data;})
    .catch(err => {
      return `Ошибка: ${err.status}`;
    });
}

export async function patchData(path, patchBody){
  return fetch(`${config.baseUrl}${path}`,
    {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(patchBody)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(err => {
      return `Ошибка: ${err.status}`;
    });
}

export async function postData(path, postBody){
  return fetch(`${config.baseUrl}${path}`,
    {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(postBody)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(err => {
      return `Ошибка: ${err.status}`;
    });
}


