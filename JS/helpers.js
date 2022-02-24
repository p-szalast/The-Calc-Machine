export const checkIfNatural = function (number) {
  const convNumber = Number.parseFloat(number);

  if (!typeof (convNumber === 'number')) return false;

  if (number >= 0 && Math.floor(convNumber) === Number.parseFloat(convNumber))
    return true;
  else return false;
};
