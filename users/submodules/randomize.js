<<<<<<< HEAD
// submodule to generate 
// a random inclusive number 
// among x possibilities
export function genRamNum(max = 2, min = 1) {
    const ranFNum = Math.random() * (max - min + 1) + min
    return Math.floor(ranFNum)
}

// debug 
=======
// submodule to generate 
// a random inclusive number 
// among x possibilities
export function genRamNum(max = 2, min = 1) {
    const ranFNum = Math.random() * (max - min + 1) + min
    return Math.floor(ranFNum)
}

// debug 
>>>>>>> 0795f717f850949ceca24112e2c99dce98b461d6
// console.log(genRamNum(10))