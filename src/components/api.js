const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: 'd709f1d7-61bc-4f4a-a795-fd13fa11ff95',
    'Content-Type': 'application/json'
  },
}

export const path = {
  user: '/users/me',
  avatar: '/users/me/avatar',
  cards: '/cards',
  likes: '/cards/likes'
}

export async function workData(path, method='GET', body){
  const options ={
    method: method.toUpperCase(),
    headers: config.headers,
  };

  if(body){
    options.body = JSON.stringify(body);
  }
  return fetch(`${config.baseUrl}${path}`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then(data => {return data;});
}

class Api {
  constructor({baseUrl, headers, paths}){
    this._baseUrl = baseUrl,
    this._headers = headers,
    this._paths = paths
  }

  workData(path, method='GET', body){
    const options ={
      method: method.toUpperCase(),
      headers: this._headers,
    };

    if(body){
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${this._paths[path]}`, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
      // .then(data => {
      //   return data;});
  }
}

export const mestoApi = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: 'd709f1d7-61bc-4f4a-a795-fd13fa11ff95',
    'Content-Type': 'application/json'
  },
  paths: {
    user: '/users/me',
    avatar: '/users/me/avatar',
    cards: '/cards',
    likes: '/cards/likes'
  }
});


mestoApi.workData('user')
  .then((data)=>{console.log(data);})
  .catch((err)=>{console.log(err.status);})

