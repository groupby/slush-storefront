const pascalToKebab = (str) => {
  return str.replace(/[A-z][A-Z]/g, (letters) => letters.split('').join('-')).toLowerCase();
};

module.exports = {
  pascalToKebab,
};
