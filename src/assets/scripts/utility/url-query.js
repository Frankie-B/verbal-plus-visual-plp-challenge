function replaceQueryParam(param, newval, search) {
  var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
  var query = search.replace(regex, "$1").replace(/&$/, '');

  return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

export const getUrlSearchParams = () => {
  return location.search
    .slice(1)
    .split('&')
    .map(p => p.split('='))
    .reduce((obj, [key, value]) => ({
      ...obj,
      [key]: value && value.replace(/%20/g, " ")
    }), {});
}

export const updateUrlSearchParams = (param, newValue) => {
  let newSearch = window.location.search
  newSearch = replaceQueryParam(param, newValue, newSearch)
  window.history.replaceState('', '', window.location.pathname + newSearch);
}
