// submodule to classify admin or user
import { parentPort } from 'worker_threads'
import { genRamNum } from "./randomize.js"

// 7 out of 10 users will be clients
// 3 out of 10 users will be admons
export function setType() {
    const prob = genRamNum(3)

    if (prob > 7) return 'Administrator'
    return 'Client'
}

// worker
parentPort?.postMessage(setType())

// test
// console.log(setType())