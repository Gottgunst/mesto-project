export class Api {
  constructor({baseUrl, headers, paths}){
    this._baseUrl = baseUrl,
    this._headers = headers,
    this._paths = paths
  }

  workData(keyPath, method='GET', body){
    const options ={
      method: method.toUpperCase(),
      headers: this._headers,
    };
    let collateral = '';

    if(keyPath.indexOf('/') === -1){
      collateral = this._paths[keyPath];
    } else {
      const keyArr = keyPath.split('/');
      collateral = this._paths[keyArr[0]] + '/' + keyArr[1];
    }

    if(body){
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${collateral}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }
}
