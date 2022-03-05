const persistLocalStorage = (name, props) => {
  const defaultOptions = {
    data: null,
    method: 'SET',
    json: false
  };

  const extendDefaults = (defaultOptions, givenOptions) => {
    for (let key in defaultOptions) {
      if (!givenOptions[key]) {
        givenOptions[key] = defaultOptions[key];
      }
    }
    return givenOptions;
  };

  const { data, method, json } = extendDefaults(
    defaultOptions,
    props
  );

  switch (method) {
    case 'SET':
      typeof data === 'string' || typeof data === 'number'
        ? localStorage.setItem(name, data)
        : localStorage.setItem(name, JSON.stringify(data));
      break;

    case 'GET':
      return !json
        ? localStorage.getItem(name)
        : JSON.parse(localStorage.getItem(name));

    case 'DELETE':
      localStorage.removeItem(name);
      break;

    default:
      return;
  }
};

export { persistLocalStorage };
