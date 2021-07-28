const axios = require("axios");

const Convertion = (a, b) => {
  return (a * b).toFixed(2);
};
const avarage = (a, b) => {
  const result = (a + b) / 2;
  return result.toFixed(2);
};

const getQuotation = async (curr1, curr2) => {
  const response = await axios.get(
    `https://economia.awesomeapi.com.br/last/${curr1}-${curr2}`
  );
  const data = response.data;
  const { high, low } = { ...data[`${curr1}${curr2}`] };
  const quot = [high, low];
  return quot;
};

module.exports = {
  Convertion,
  getQuotation,
  avarage,
};
