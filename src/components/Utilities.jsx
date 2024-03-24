const generateId = (categories, key) => {
    let id = 0;

    categories.forEach(category => {
        if (category[key] >= id) {
            id = category[key];
        }
    });
    return id + 1;
}


export {
    generateId,
}