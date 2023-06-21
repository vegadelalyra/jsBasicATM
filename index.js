console.log('Hello World from JS!')

// input fields ONLY NUMS restriction with regEx
document.querySelectorAll('[type="text"]')
.forEach(input => input.addEventListener(
    'input', function() { 
        this.value = this.value.replace(/[^0-9]/g, '') 
    }
))

// existing users 
const existing = {
    1234: {
        pass: 1234,
        name: 'first Client',
        type: 'client'
    },
    5678: {
        pass: 5678,
        name: 'first Admin',
        type: 'admon'
    }
}

// form [beginning]
const form = document.querySelector('form') 

form.addEventListener('submit', e => {
    e.preventDefault()

    let user = form.querySelector('#user').value
    let pass = form.querySelector('#pass').value

    existing[user] 
    ? existing[user].pass == pass 
        ? loggedIn()
        : alert(`CLAVE INCORRECTA (Verifica en la lista de usuarios).`)
    : alert(`El usuario ${user} NO EXISTE. ¿Quieres crearlo?`)

    function loggedIn() { 
        alert(`¡Bienvenido, ${existing[user].name}!`)
        form.style.display = 'none'
        
        form.querySelectorAll(':not([type="submit"])')
        .forEach(field => field.value = '')
    }
})
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