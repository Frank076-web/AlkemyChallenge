//PreviusHelpers
const extendsDefaultParams = (defaultParams, givenParams) => {
  for (let key in defaultParams) {
    if (!givenParams[key]) {
      givenParams[key] = defaultParams[key];
    }
  }
  return givenParams;
};

const defaultParams = {
  method: 'GET',
  url: '',
  headers: {
    'Content-Type': 'Application/json; charset=UTF-8'
  },
  messageError: 'Error en la solicitud'
};
const dataFetch = (params) => {
  const { url, headers, method, messageError } = extendsDefaultParams(
    defaultParams,
    params
  );
  const dataResponse = {
    data: null,
    error: null
  };

  switch (method) {
    case 'GET': {
      return async (data) => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            dataResponse.data = await response.json();
          } else {
            throw (dataResponse.error =
              response.statusText || messageError);
          }
        } catch (error) {
          dataResponse.error = error;
        }
        return dataResponse;
      };
    }

    case 'POST': {
      return async (data) => {
        try {
          const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(data)
          });
          if (response.ok) {
            dataResponse.data = 'Creado satisfactoriamente';
          } else {
            throw (dataResponse.error =
              response.statusText || messageError);
          }
        } catch (error) {
          dataResponse.error = error;
        }
        return dataResponse;
      };
    }

    case 'PUT': {
      return async (data, putParam) => {
        try {
          const response = await fetch(`${url}${putParam}`, {
            method,
            headers,
            body: JSON.stringify(data)
          });
          if (response.ok) {
            dataResponse.data = 'Actualización satisfactoria';
          } else {
            throw (dataResponse.error =
              response.statusText || messageError);
          }
        } catch (error) {
          dataResponse.error = error;
        }
        return dataResponse;
      };
    }

    case 'DELETE': {
      return async (delParam) => {
        try {
          const response = await fetch(`${url}${delParam}`, {
            method
          });
          if (response.ok) {
            dataResponse.data = 'Eliminado satisfactoriamente';
          } else {
            throw (dataResponse.error =
              response.statusText || messageError);
          }
        } catch (error) {
          dataResponse.error = error;
        }
        return dataResponse;
      };
    }
    default:
      return;
  }
};

export { dataFetch };
