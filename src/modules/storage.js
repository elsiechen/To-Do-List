const storage = () => {
    const save = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`save ${value} to ${key}`);
    };
    
    const get = (key) => {
        return JSON.parse(localStorage.getItem(key));
    };
    
    return { save, get };
};

export default storage;