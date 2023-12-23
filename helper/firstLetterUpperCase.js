const firstLetterUpperCase = str => {
  const normalizeCase = str[0].toUpperCase() + str.slice(1).toLowerCase();
  return normalizeCase;
};
module.exports = firstLetterUpperCase;
