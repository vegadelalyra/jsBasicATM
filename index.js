// Greet && introductory instructions 
console.log('Hello World from JS!')
console.log('usersList()    will log existing users list')
console.log('admon          will log current admon session')
console.log('client         will log current client session')

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
        user: 1234,
        pass: 1234
    },
    5678: {
        name: 'first Admin',
        type: 'admon',
        user: 5678,
        pass: 5678
    }
}

// sessions [admon, client]
let admon, client

// SHOW TESTING EXISTING USERS FROM START
const usersList = () => console.log(
    'Existing users', 
    Object.keys(existing).length, 
    existing
); usersList()

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
        // Dissapear and reset log screen
        form.style.display = 'none'
        form.querySelectorAll(':not([type="submit"])')
        .forEach(field => field.value = '')

        // Log session info
        const thisUser = existing[user] 

        let session = `[${thisUser.type}] ${thisUser.name} logged`
        console.log(session)

        thisUser.type == 'admon'
        ? admon = thisUser 
        : client = thisUser

        console.log(thisUser.type, thisUser)

        // Pop up key image with user info 
        const key = document.querySelector(`footer .${thisUser.type}`)
        key.style.display = 'flex'
        key.title = `${thisUser.type == 'admon' ? 'Administrador' : 'Cliente'}\n${thisUser.name}\nC.C. ${thisUser.user}\nClave ${thisUser.pass}`

        // 
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
            existing[cc] = { name: nm, type: tp, user: cc, pass: pw }

            console.log('new user registered:', cc, existing[cc])
            console.log('Users list updated')
            usersList()
        })
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
    > 0 ? startingValue + loot : 0 

    document.querySelector('header span')
    .innerText = endingValue.toLocaleString()

    if (endingValue == 0) console
    .log('Cajero en mantenimiento, vuelva pronto.')
}

// HOW MANY INPUT 
const howManyInput = document.querySelector('#many')

// Add separators to how many input value
howManyInput.addEventListener('input', () => {
  howManyInput.value = howManyInput.value
  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')  

  howManyInput.value = '$' + howManyInput.value
})

// get formatted number of how many
const howMany = () => Number(
    howManyInput.value.match(/\d+/g).join('')
)

// buttons
const depositBut = document.querySelector('#deposit')
depositBut.onclick = () => {
    if (!!admon) return trade(howMany()) 
    return  popUpForm('Administrator')
}

const withdrawBut = document.querySelector('#withdraw')
withdrawBut.onclick = () => {
    if (!!client) return trade(howMany() * -1)
    return popUpForm('Cliente')
}

function popUpForm(user) { 
    // spawn form to log in
    form.style.display = 'flex'
    form.querySelector('form span')
    .innerText = user

    // sinking down popped up forms
    document.addEventListener('click', sinkDownForm)

    function sinkDownForm(e) {
        const otherForm = document.querySelector('#signup')

        const buttonsClicked = e.target == depositBut
            || e.target == withdrawBut
        
        const formClicked = form.contains(e.target) 
            || otherForm.contains(e.target)

        if (buttonsClicked || formClicked) return

        form.style.display = 'none'
        otherForm.style.display = 'none'
        document.removeEventListener('click', sinkDownForm)
    }
}
// loot [ending]

// cashier [beginning]
const ATM = [
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
// cashier [ending]