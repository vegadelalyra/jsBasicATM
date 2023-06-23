// sub module to generate random IDs
import { genRamNum } from "./randomize.js"
import { parentPort } from 'worker_threads'

// min & max values to limit random nuums
const min = 20  // min head
const max = 1_200 // max head
const gap = 999 // body max

// randomize numbers [a, b] function, default = 999
export function getRandomID() {
    let head = genRamNum(max, min).toString()
    let middle = genRamNum(gap, 0).toString()
    let tail = genRamNum(gap, 0).toString()

    // curate two tails to look like real CCs
    const fill = { 1: '00', 2: '0', 3: '' }
    middle = fill[middle.length] + middle
    tail = fill[tail.length] + tail

    if (head.length < 4) tail = tail.slice(0, 2)

    // stringify outcome and properly format
    const n = Number(`${head}${middle}${tail}`)
    const cc = n.toLocaleString(
        'en-US', { useGrouping: true })
    .replace(/,/g, '.')

    return cc // return cc number 
} 

// worker
parentPort?.postMessage(getRandomID())

// test
// console.log(getRandomID())