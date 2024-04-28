// check wherether the id is already in the storage
const getCartIdsFromLST = (cartStorageName) => {
  const currentIds = localStorage.getItem(cartStorageName);
  if (currentIds) return JSON.parse(currentIds);
  else return [];
};

// delete the Id from the localstorage
const deleteCartIdsFromLST = (cartStorageName, id) => {
  const result = getCartIdsFromLST(cartStorageName);
  if (result.includes(id)) {
    let newPropArr = result.filter((itemId) => itemId !== id);
    localStorage.setItem(cartStorageName, JSON.stringify(newPropArr));
  }
};

// Store the Tour Spot Ids if it is not in the storage
const storeCartIdsToLST = (cartStorageName, id) => {
  const result = getCartIdsFromLST(cartStorageName);
  if (!result.includes(id)) {
    result.push(id);
    localStorage.setItem(cartStorageName, JSON.stringify(result));
  }
};

export { getCartIdsFromLST, storeCartIdsToLST, deleteCartIdsFromLST };
