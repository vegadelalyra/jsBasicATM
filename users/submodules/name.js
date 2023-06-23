<<<<<<< HEAD
// sub module to fetch users spanish names 
import { parentPort } from 'worker_threads'
import { genRamNum } from "./randomize.js"
import { createWriteStream } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
// import { first, last } from './names.js'

export async function fetchName() {
    // MAIN LOGIC [BEGINNING]
    const [first, last] = await import('./names.js')
    .then(x => [x.first, x.last])
    .catch(() => [false, false])

    if (!!first) return Promise.all([pickAnyFrom(first), pickAnyFrom(last)])
    .then(([first, last]) => `${first} ${last}`)


    // Dynamyze website URL were spanish names lists resides 
    const baseURL = 'http://randomlists.com/data/'
    const reqURL = name => baseURL + `names-${name}-spanish.json` 
    
    // Concurrently get a random name 
    return await Promise.all([
        getName(reqURL('first')), // first name
        getName(reqURL('last'))  // last name
    ]).then(([first, last]) => `${first} ${last}`)

    // MAIN LOGIC [ENDING]

    // write users in files to import them
    function writeUsers(list, url) {
        let name = 'first'
        if (url.includes('last')) name = 'last'

        let pathCurated = new URL(import.meta.url) 
        pathCurated = fileURLToPath(pathCurated)
        pathCurated = dirname(pathCurated)
        pathCurated = join(pathCurated, `names/${name}.js`)

        list = list.map(name => "'" + name + "'")

        const writeStream = createWriteStream(pathCurated, { flags: 'w'})
        const data = `export let ${name} = [${list}]`
        writeStream.write(data)
        writeStream.end()

        console.log('OTHER LINES')
        
    }

    // WORKLOAD. REQUIRED FUNCTIONS FOR THE SCRIPT TO HAPPEN.

    // Fetch names from the given URL
    async function getName(URL) {
        // fetch first && last names
        const req = await fetch(URL)
        const list = await req.json()
        .then(list => list.data)
        
        // write function asynchronously
        new Promise(r => writeUsers(list, URL)) 

        // pick a random first or last name
        return pickAnyFrom(list)
    }

    // Callback to pick a random item from an array
    function pickAnyFrom(many) { 
        const chosenOne = genRamNum(many.length - 1, 0)
        return many[chosenOne] 
    }
}

// worker
parentPort?.postMessage(await fetchName())

// test
=======
// sub module to fetch users spanish names 
import { parentPort } from 'worker_threads'
import { genRamNum } from "./randomize.js"
import { createWriteStream } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
// import { first, last } from './names.js'

export async function fetchName() {
    // MAIN LOGIC [BEGINNING]
    const [first, last] = await import('./names.js')
    .then(x => [x.first, x.last])
    .catch(() => [false, false])

    if (!!first) return Promise.all([pickAnyFrom(first), pickAnyFrom(last)])
    .then(([first, last]) => `${first} ${last}`)


    // Dynamyze website URL were spanish names lists resides 
    const baseURL = 'http://randomlists.com/data/'
    const reqURL = name => baseURL + `names-${name}-spanish.json` 
    
    // Concurrently get a random name 
    return await Promise.all([
        getName(reqURL('first')), // first name
        getName(reqURL('last'))  // last name
    ]).then(([first, last]) => `${first} ${last}`)

    // MAIN LOGIC [ENDING]

    // write users in files to import them
    function writeUsers(list, url) {
        let name = 'first'
        if (url.includes('last')) name = 'last'

        let pathCurated = new URL(import.meta.url) 
        pathCurated = fileURLToPath(pathCurated)
        pathCurated = dirname(pathCurated)
        pathCurated = join(pathCurated, `names/${name}.js`)

        list = list.map(name => "'" + name + "'")

        const writeStream = createWriteStream(pathCurated, { flags: 'w'})
        const data = `export let ${name} = [${list}]`
        writeStream.write(data)
        writeStream.end()

        console.log('OTHER LINES')
        
    }

    // WORKLOAD. REQUIRED FUNCTIONS FOR THE SCRIPT TO HAPPEN.

    // Fetch names from the given URL
    async function getName(URL) {
        // fetch first && last names
        const req = await fetch(URL)
        const list = await req.json()
        .then(list => list.data)
        
        // write function asynchronously
        new Promise(r => writeUsers(list, URL)) 

        // pick a random first or last name
        return pickAnyFrom(list)
    }

    // Callback to pick a random item from an array
    function pickAnyFrom(many) { 
        const chosenOne = genRamNum(many.length - 1, 0)
        return many[chosenOne] 
    }
}

// worker
parentPort?.postMessage(await fetchName())

// test
>>>>>>> 0795f717f850949ceca24112e2c99dce98b461d6
// console.log(await fetchName())