// submodule to generate 4 digits passwords
import { genRamNum } from "./randomize.js"
import { parentPort } from 'worker_threads'

export async function genRanPass(digits = 4) {
    const pass = []
    
    // recursivity to promise each digit
    while (!!digits) {
        pass.push( new Promise (
            r => r(genRamNum(9, 0))
        )); digits--
    } // push promises to pass array

    // concurrently generate values for pass
    return await Promise.all(pass)
    .then(arr => arr.join(''))
    // return joined array of values
}

// worker 
parentPort?.postMessage(await genRanPass())

// test
// console.log(await genRanPass())