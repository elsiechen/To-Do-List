const storage = (key, value) => {
    const save = () => {
        const serializedArray = JSON.stringify(value);
        localStorage.setItem(key, serializedArray);
    }
    return { save };
};

const getStorage = (key) => {
    return  JSON.parse(localStorage.getItem(key));
};

export { storage, getStorage };