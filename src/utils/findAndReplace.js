export const replace = (array, index, value) => {
  return [...array.slice(0, index), value, ...array.slice(index + 1)]
}

/**
 * Finds and replaces an item inside an array
 * @param {Array} array
 * @param {Function} findPredicate Callback for Array.prototype.find
 * @param {*|Function} replaceCallbackOrItem Any value: replaced value. Function: recieves old value as argument and should return a new value.
 *
 * @returns New array with replaced item
 */
const findAndReplace = (array, findPredicate, replaceCallbackOrItem) => {
  const index = array.findIndex(findPredicate)

  if (index === -1) {
    return array
  }

  if (typeof replaceCallbackOrItem === 'function') {
    return replace(array, index, replaceCallbackOrItem(array[index]))
  }

  return replace(array, index, replaceCallbackOrItem)
}

export default findAndReplace;
