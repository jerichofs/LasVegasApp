class API {
  constructor() {
    this._baseURL = process.env.serverURL || 'http://localhost:3000'
  }

  get headers() {
    return {
      Accept: "application/json",
    };
  }

  get params() {
    return {
      credentials: "include",
    };
  }

  post(url) {
    const urlPath = `${this._baseURL}${url}`;
    console.log('urlPath', urlPath);
    const params = {
      ...this.params,
      headers: { ...this.headers },
      method: 'POST',
    };
    return fetch(urlPath, params);
  }

  async start() {
    return this.post('/start').then((res) => res.json());
  }

  async play() {
    return this.post('/play').then((res) => res.json());
  }

  async cashout() {
    return this.post('/cashout').then((res) => res.json());
  }

  async twist() {
    return this.post('/twist').then((res) => res.json());
  }
}

export const ApiService = new API();
