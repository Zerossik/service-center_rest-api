const firstLetterUpperCase = str => {
  //  const normalizeCase = str[0].toUpperCase() + str.slice(1).toLowerCase();
  const normalizeCase = str[0].toUpperCase() + str.slice(1);
  return normalizeCase;
};
module.exports = firstLetterUpperCase;
