/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
/* eslint-disable require-jsdoc */
/* eslint-disable no-nested-ternary */

function splitPrice(data) {
  const range = data.split("-");
  const range1 = range[0] * 1;
  const range2 = range[1] * 1;
  return { range1, range2 };
}

function expirationDate(data) {
  const date = new Date(data);
  const today = new Date();
  return { today, date };
}

export { splitPrice, expirationDate };
