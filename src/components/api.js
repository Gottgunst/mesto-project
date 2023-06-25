export class Api {
  constructor({baseUrl, headers, paths}){
    this._baseUrl = baseUrl,
    this._headers = headers,
    this._paths = paths
  }

  _lateralUrl(keyPath){
    return keyPath.id ?
        this._paths[keyPath.key] + '/' + keyPath.id :
        this._paths[keyPath.key];
  }

  workData(keyPath, method='GET', body){
    const options ={
      method: method.toUpperCase(),
      headers: this._headers,
    };

    if(body){
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${this._lateralUrl(keyPath)}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }
}
