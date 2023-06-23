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

    existing[user] 
    ? existing[user].pass == pass 
        ? loggedIn()
        : alert(`CLAVE INCORRECTA (Verifica en la lista de usuarios).`)
    : signUp(user, pass, form.querySelector('span'))

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

    function signUp(u, p, t) {
        // Validate whether user wants to register
        const msg = `El usuario ${user} NO EXISTE. ¿Quieres crearlo?`
        const userWantsToRegister = window.confirm(msg)
        if (!userWantsToRegister) return 
        
        // pop up register form and auto fill
        const registerForm = document.querySelector('#signup')
        registerForm.style.display = 'flex'
        t = 'Cliente' ? 'client' : 'admon'
        registerForm.querySelector(`#${t}`).checked = true
        registerForm.querySelector('#document').value = u
        registerForm.querySelector('#password').value = p

        registerForm.addEventListener('submit', e => newUser(e))

        function newUser(e) {
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

            console.log('[new user]', nm, 'registered', existing[cc])
            console.log('Users list updated')
            usersList(); loggedIn(); registerForm
            .removeEventListener('submit', e => newUser(e))

            registerForm.style.display = 'none'
            // here it lacks to reset all values
            registerForm.querySelector(`#${t}`).checked = false
            registerForm.querySelector('#document').value = ''
            registerForm.querySelector('#password').value = ''
        }
    }
})
// form [ending]


// loot [beginning]

// header
document.querySelector('header h1').innerText

function trade(loot = 0, client) {
    const htmlNum = document.querySelector('header span')
    .innerText.replace(/,/g, '')

    const startingValue = Number(htmlNum)

    if (startingValue == 0 && client) return 

    const endingValue = startingValue + loot 
    > 0 ? startingValue + loot : 0 

    document.querySelector('header span')
    .innerText = endingValue.toLocaleString()
}

// HOW Much INPUT 
const howMuchInput = document.querySelector('#much')

// Add separators && $ to how Much input value
const giveFormat = gaveNum => {
    if (gaveNum) {
        gaveNum = String(gaveNum)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')  
        
        return gaveNum = '$' + gaveNum + ' COP'         
    }

    howMuchInput.value = howMuchInput.value
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')  
    
    return howMuchInput.value = '$' + howMuchInput.value
}; howMuchInput.addEventListener('input', giveFormat)

howMuchInput.addEventListener('blur', () => {
    const pureValue = howMuch()
    const rounded = Math.floor(pureValue / 5_000) * 5_000
    howMuchInput.value = rounded < 5_000 ? 5_000 : rounded
    return giveFormat() 
})

// get formatted number of how Much
const howMuch = () => Number(
    howMuchInput.value.match(/\d+/g).join('')
)

// BUTTONS [beginning]
// deposit 
const depositBut = document.querySelector('#deposit')
depositBut.onclick = () => {
    if (!admon) return popUpSignForm('Administrator') 
    return popUpBillCounter('deposited')  
}

// withdraw
const withdrawBut = document.querySelector('#withdraw')
withdrawBut.onclick = () => {
    if (!client) return popUpSignForm('Cliente') 
    return popUpBillCounter('withdrawn')
}

// bill counter
function popUpBillCounter(done) {
    const totalValue = howMuch()

    // The DownWard Spiral
    const bills = [ 100_000, 50_000, 20_000, 10_000, 5_000 ]
    let quant = {}, distribution = totalValue

    for (const bill of bills) {
        if (bill > distribution) continue
        
        quant[bill] = Math.floor(distribution / bill)
        distribution = distribution % bill 

        document.querySelector(`#i${bill}`).value = quant[bill]
    }

    if (Number(document.querySelector('header span')
    .innerText.replace(/,/g, '')) == 0) console
    .log('Cajero en mantenimiento, vuelva pronto.') 

    // sinking down popped up forms
    document.addEventListener('click', sinkDownForm)

    function sinkDownForm(e) {
        const otherForm = document.querySelector('aside form')

        const buttonsClicked = e.target == depositBut
            || e.target == withdrawBut
        
        const formClicked = form.contains(e.target) 
            || otherForm.contains(e.target)

        if (buttonsClicked || formClicked) return

        form.style.display = 'none'
        otherForm.style.display = 'none'
        document.removeEventListener('click', sinkDownForm)
    }
    
    if (done == 'deposited') return popFillMenu()
    return trade(howMuch() * -1, true)

    function popFillMenu() {
        const billsMenu = document.querySelector('aside form')
        billsMenu.style.display = 'flex'
        
        billsMenu.addEventListener('submit', e => {
            e.preventDefault()
            
            console.log(`Loot ${done}:`, giveFormat(totalValue), quant)
            billsMenu.style.display = 'none'
            return trade(howMuch())
        })
    }
}

// log in screen
function popUpSignForm(user) { 
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

    // log out functionality
    document.querySelectorAll('footer img')
    .forEach(img => img.addEventListener('contextmenu', e => {
        e.preventDefault()

        img.title = ''
        img.style.display = 'none'
        img.class == 'admon' 
        ? admon = undefined
        : client = undefined
    }))
} // BUTTONS [ending] 

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