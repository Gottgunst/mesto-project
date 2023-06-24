export class Api {
  constructor({baseUrl, headers, paths}){
    this._baseUrl = baseUrl,
    this._headers = headers,
    this._paths = paths
  }

  _analyseURL(keyPath){
    keyPath = Object.values(keyPath)
    return keyPath
  }

  workData(keyPath, method='GET', body){
    const options ={
      method: method.toUpperCase(),
      headers: this._headers,
    };

    const lateralUrl = this._analyseURL(keyPath).length < 2 ?
      this._paths[this._analyseURL(keyPath)[0]] :
      this._paths[this._analyseURL(keyPath)[0]] + '/'+ this._analyseURL(keyPath).filter((el,i)=>i>0).join('/');

    if(body){
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${lateralUrl}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }
}
