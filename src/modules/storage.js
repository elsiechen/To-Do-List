const storage = (key, value) => {
    // Save new object to array
    const save = () => {
        const getArray = getStorage(key);
        // Important: to store the modified array to local storage,
        // push new value to the "old" array
        // and stringify "old" array without creating new
        // array because push() will return number of element
        // inside array 
        // e.g: const array = [].push(object); 
        // console.log(array) returns 1
        getArray.push(value);
        const serializedArray = JSON.stringify(getArray);
        localStorage.setItem(key, serializedArray);
    };
    // override old value to key
    const override = () => {
        localStorage.setItem(key, value);
    };
    return { save, override };
};

const getStorage = (key) => {
    return  JSON.parse(localStorage.getItem(key)) 
            || JSON.parse(JSON.stringify([]));
};

export { storage, getStorage };