const storage = (key, value) => {
    const save = () => {
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`save ${value} to ${key}`);
    };
    
    const get = () => {
        return JSON.parse(localStorage.getItem(key));
    };
    
    return { save, get };
};

export { storage };