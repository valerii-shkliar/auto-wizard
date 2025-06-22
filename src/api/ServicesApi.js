class ServicesApi {
  static request(URL, id = '', method = 'GET', body) {
    return fetch(URL + id, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Request is failed!');
    });
  }

  static getList(URL) {
    return this.request(URL).catch(() => {
      console.log('List was not received from server!');
    });
  }

  static getOne(URL, id) {
    return this.request(URL, id).catch(() => {
      console.log('One element was not received from server!');
    });
  }

  static create(URL, body) {
    return this.request(URL, '', 'POST', body).catch(() => {
      console.log('Creating was not done on the server!');
    });
  }

  static update(URL, id, body) {
    return this.request(URL, id, 'PUT', body).catch(() => {
      console.log('Uodating was not done on the server!');
    });
  }

  static delete(URL, id) {
    return this.request(URL, id, 'DELETE').catch(() => {
      console.log('Deleting was not done on the server!');
    });
  }
}
export default ServicesApi;
