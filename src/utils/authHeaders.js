export const getProjectKey = () => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("project_key");
};

export const getUserId = () => {
  let configData = LS.get("zi_config")
  return configData ?JSON.parse(configData):null;
};
export const LS = {
  set: (key, value) => {
    localStorage.setItem(key, value);
  },
  get: (key) => {
    return localStorage.getItem(key);
  },
};
