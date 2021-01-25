const transformInstructions = (stringsArray) => {
    let arrayOfObjects = [];
    for(let i = 0; i < stringsArray.length; ++i){
        arrayOfObjects.push({ order_num : String(i+1), instruction: stringsArray[i] })
    }
    return arrayOfObjects
}

const transformIngredients = (stringsArray) => {
    let arrayOfObjects = [];
    for(let i = 0; i < stringsArray.length; ++i){
        arrayOfObjects.push({ order_num : String(i+1), ingredient: stringsArray[i] })
    }
    return arrayOfObjects
}

export { transformIngredients, transformInstructions }