const getIdFromUrl = url => {
  const splitted = url.split('/');
  return splitted[splitted.length - 2];
};

export default getIdFromUrl;
