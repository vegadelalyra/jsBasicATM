<<<<<<< HEAD
// module to generate users in parallel with pool of workers

// imports for routing modules && workers
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { Worker } from 'worker_threads'

// block to normalize paths to submodule scripts
async function User() {
    const route = path => {
        const moduleURL = new URL(import.meta.url)
        const filePath = fileURLToPath(moduleURL)
        const dirPath = dirname(filePath)
        return join(dirPath, `../submodules/${path}`)
    }

    // tabula rasa user + tasks covered counter
    const user = { name: '', cc: '', type: '', pass: '' }
    let tasksDone = 0

    // create a worker for each task, assign result to user
    const hireWorker = task => {
        const worker = new Worker(route(`${task}.js`))
        worker.on('message', generatedData => {
            user[task] = generatedData; tasksDone++

            if (tasksDone == 4) return user    
        })
    }

    // set the pool of workers for the 4 tasks
    await Promise.all([
        hireWorker('name'), // fetch random latin names (firsts and lasts)
        hireWorker('cc'), // generate a colombian random CC number
        hireWorker('type'), // randomize user type (admin or client)
        hireWorker('pass'), // generate a random 4 digits password
    ])

    return new Promise(r => {
        const checkTasksDone = () => {
            if (tasksDone === 4) {
                clearInterval(intervalId)
                r(user)
            }
        }; const intervalId = setInterval(checkTasksDone, 100)
    })

} 

// test
=======
// module to generate users in parallel with pool of workers

// imports for routing modules && workers
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { Worker } from 'worker_threads'

// block to normalize paths to submodule scripts
async function User() {
    const route = path => {
        const moduleURL = new URL(import.meta.url)
        const filePath = fileURLToPath(moduleURL)
        const dirPath = dirname(filePath)
        return join(dirPath, `../submodules/${path}`)
    }

    // tabula rasa user + tasks covered counter
    const user = { name: '', cc: '', type: '', pass: '' }
    let tasksDone = 0

    // create a worker for each task, assign result to user
    const hireWorker = task => {
        const worker = new Worker(route(`${task}.js`))
        worker.on('message', generatedData => {
            user[task] = generatedData; tasksDone++

            if (tasksDone == 4) return user    
        })
    }

    // set the pool of workers for the 4 tasks
    await Promise.all([
        hireWorker('name'), // fetch random latin names (firsts and lasts)
        hireWorker('cc'), // generate a colombian random CC number
        hireWorker('type'), // randomize user type (admin or client)
        hireWorker('pass'), // generate a random 4 digits password
    ])

    return new Promise(r => {
        const checkTasksDone = () => {
            if (tasksDone === 4) {
                clearInterval(intervalId)
                r(user)
            }
        }; const intervalId = setInterval(checkTasksDone, 100)
    })

} 

// test
>>>>>>> 0795f717f850949ceca24112e2c99dce98b461d6
await User()