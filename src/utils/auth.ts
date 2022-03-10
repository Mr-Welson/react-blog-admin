export const TOKEN_KEY = 'Admin-Token';

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY) || '';
};

export const setToken = (token: string) => {
  return sessionStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  return sessionStorage.removeItem(TOKEN_KEY);
};
