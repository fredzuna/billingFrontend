const config = {
    api: 'https://localhost:44374/api',
    options: {
      headers: { 'content-type': 'application/json' },
    },
  };
  
  const httpGet = (endpoint: string) => {
    return fetch(`${config.api}${endpoint}`, {
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  
  const httpPost = (endpoint: string, data: any) => {
    return fetch(`${config.api}${endpoint}`, {
      method: 'post',
      body: data ? JSON.stringify(data) : null,
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  
  /*const httpPut = (endpoint: string, data) => {
    return fetch(`${config.api}${endpoint}`, {
      method: 'put',
      body: data ? JSON.stringify(data) : null,
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  
  const httpDelete = (endpoint: string, data) => {
    return fetch(`${config.api}${endpoint}`, {
      method: 'delete',
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };*/
  
  const handleResponse = async (response: Response) => {



    // You can handle 400 errors as well.
    if (response.status === 200) {
      return await response.json();
    } else {
        // const message = await response.json();
      throw Error(response.statusText);
    }
  };
  
  export default { httpGet, httpPost/*, httpPut, httpDelete */};
  