const config = {
    api: 'https://localhost:5001/api',
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
  
  const handleResponse = async (response: Response) => {

    if (response.status === 200) {
      return await response.json();
    } else {
      throw Error(response.statusText);
    }
  };
  
  export default { httpGet, httpPost};
  