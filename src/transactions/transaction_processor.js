//deleted this line as it doesn't need to be global
//const txr = [];

const processTransactions = (transActions) => {
  if (!validateTransactions(transActions)) {
    throw new Error("Undefined collection of transactions");
  }

  let txCount = {};

  const numberOfTransactions = transActions.length;
  //changed to forEach as its more modern
  transActions.forEach((transaction) =>
    txCount[transaction]
      ? (txCount[transaction] += 1)
      : (txCount[transaction] = 1)
  );

  txCount = sortByAmountThenName(txCount);

  // Place them back in array for returning
  return Object.keys(txCount).map((key) => `${key} ${txCount[key]}`);
};

const sortByAmountThenName = (txCount) => {
  let sortedKeys = Object.keys(txCount).sort(
    (sortingFunction = (itemOne, itemTwo) =>
      txCount[itemTwo] - txCount[itemOne] ||
      itemOne > itemTwo ||
      -(itemOne < itemTwo))
  );

  const sortedResults = {};
  sortedKeys.forEach(
    (objectKey) => (sortedResults[objectKey] = txCount[objectKey])
  );

  return sortedResults;
};

const validateTransactions = (transactions) => transactions !== undefined;

module.exports = processTransactions;
