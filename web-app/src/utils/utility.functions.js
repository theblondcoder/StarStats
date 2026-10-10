export const printKeyOfValue = (obj, targetValue) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
  
    if (values.includes(targetValue)) {
      const index = values.indexOf(targetValue);
      return keys[index];
    }
  }

  export function replaceInArray(array, oldValue, newValue) {
    return array.map(item => item === oldValue ? newValue : item);
  }

  export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }