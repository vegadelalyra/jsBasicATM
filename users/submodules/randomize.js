// submodule to generate 
// a random inclusive number 
// among x possibilities
export function genRamNum(max = 2, min = 1) {
    const ranFNum = Math.random() * (max - min + 1) + min
    return Math.floor(ranFNum)
}

// debug 
// console.log(genRamNum(10))