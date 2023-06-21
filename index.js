console.log('Hello World from JS!')

// input fields ONLY NUMS restriction with regEx
document.querySelectorAll('input:not([type="submit"]')
.forEach(input => input.addEventListener(
    'input', function() { 
        if (this.id == 'uname') return // exception for uname
        this.value = this.value.replace(/[^0-9]/g, '') 
    }
))

// existing users 
const existing = {
    1234: {
        name: 'first Client',
        type: 'client',
        pass: 1234
    },
    5678: {
        name: 'first Admin',
        type: 'admon',
        pass: 5678
    }
}

const logUsers = () => console.log('Existing users', existing)
logUsers()

// form [beginning]
const form = document.querySelector('form') 

form.addEventListener('submit', e => {
    e.preventDefault()

    let user = form.querySelector('#user').value
    let pass = form.querySelector('#pass').value

    if (!user || !pass) return

    existing[user] 
    ? existing[user].pass == pass 
        ? loggedIn()
        : alert(`CLAVE INCORRECTA (Verifica en la lista de usuarios).`)
    : signUp()

    function loggedIn() { 
        alert(`¡Bienvenido, ${existing[user].name}!`)
        form.style.display = 'none'
        
        form.querySelectorAll(':not([type="submit"])')
        .forEach(field => field.value = '')
    }

    function signUp() {
        const msg = `El usuario ${user} NO EXISTE. ¿Quieres crearlo?`
        const userWantsToRegister = window.confirm(msg)
        
        const registerForm = document.querySelector('#signup')
        if (userWantsToRegister) registerForm.style.display = 'flex'

        registerForm.addEventListener('submit', e => {
            e.preventDefault()

            let properties = [
                '#uname', 
                '#document', 
                ':checked', 
                '#password'
            ], destructAssign = []

            for (const property of properties) {
                const inputValue = property == ':checked'
                ? registerForm.querySelector(`${property}`).id 
                : registerForm.querySelector(`${property}`).value

                destructAssign.push(inputValue)
            }
        
            let [nm, cc, tp, pw] = destructAssign
            existing[cc] = { name: nm, type: tp, pass: pw }

            console.log('new user', cc, existing[cc])
            logUsers()
        })
    }
})

// sinking down popped up forms
document.onclick = e => { 
    const login_form = document.querySelector('form')
    const signUp_form = document.querySelector('#signup')

    const loginNotClick = e.target != login_form 
    const loginOn = login_form.style.display == 'flex'

    if (loginNotClick && loginOn) login_form.style.display = 'none'
    console.log(e.target)

    // console.log(e.target) Interesting line to debug
}
// form [ending]


// loot [beginning]

// header
document.querySelector('header h1').innerText

function trade(loot = 0) {
    const htmlNum = document.querySelector('header span')
    .innerText.replace(/,/g, '')

    const startingValue = Number(htmlNum)
    const endingValue = startingValue + loot

    document.querySelector('header span')
    .innerText = endingValue.toLocaleString()
}

// buttons
document.querySelector('#deposit') // deposit button
.onclick = () => handleButReq(4000, 'Administrator')

document.querySelector('#withdraw') // withdraw button
.onclick = () => handleButReq(-4000, 'Cliente')

function handleButReq(amount, user) { 
    form.style.display = 'flex'
    form.querySelector('form span')
    .innerText = user
    
    trade(amount)
}

// loot [ending]





const cajero = [
    {
        value: 5_000,
        quant: 0
    },
    {
        value: 10_000,
        quant: 0
    },
    {
        value: 20_000,
        quant: 0
    },
    {
        value: 50_000,
        quant: 0
    },
    {
        value: 100_000,
        quant: 0
    },

]