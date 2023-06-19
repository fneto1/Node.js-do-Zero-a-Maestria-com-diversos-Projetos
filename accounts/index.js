//modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

//modulos internos
const fs = require('fs')

console.log("Iniciamos o Accounts")

operation()

function operation(){

    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }]).then((answer) => {
        const action = answer['action']

        if(action == 'Criar conta'){
            createAccount()
        } else if (action == 'Consultar saldo'){

            getAccountBalance()

        } else if (action == 'Depositar'){

            deposit()
            
        } else if (action == 'Sacar'){

            withDraw()
            
        } else if (action == 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'));
            process.exit()
        } 
    })
    .catch(err => console.log(err))
}

//create an account
function createAccount(){
    console.log(chalk.bgGreen.black("Obrigado por escolher nosso banco!"));
    console.log(chalk.green("Defina as opções da sua conta a seguir"));
    buildAccount()
}

function buildAccount(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta:'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        console.info(accountName);

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'));
            buildAccount()
            return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`, 
            '{"balance": 0}',
            function(err){
                console.log(err)
            })
        
        console.log(chalk.green("Parabéns, a sua conta foi criada!"))
        operation()

    })
    .catch(err => console.log(err))
}

//add an amount to user account
function deposit() {
    inquirer.prompt([
        {
            name: 'accountName', 
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        //verify if account exists
        if(!checkAccount(accountName)){ //checkAccount(accountName) == false
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            }
        ])
        .then((answer) => {
            const amount = answer['amount']
            //add a amount
            addAmount(accountName, amount)
            operation()
        })
        .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
} 

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black("Esta conta não existe, escolha outra"));

        return false
    }

    return true
}

function addAmount(accountName, amount){

    const accountData = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente"))

        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err);
        }
    )

    console.log(chalk.green(`Foi depositado o valor R$ ${amount} na sua conta`));
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

//show account balance
function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'accountName', 
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        //verify if account exists
        if(!checkAccount(accountName)){ //checkAccount(accountName) == false
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Seu saldo é: R$ ${accountData.balance}`));

        operation()

    })
    .catch(err => console.log(err))
} 

//withdraw an amount to user account
function withDraw() {
    inquirer.prompt([
        {
            name: 'accountName', 
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        //verify if account exists
        if(!checkAccount(accountName)){ //checkAccount(accountName) == false
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja sacar?'
            }
        ])
        .then((answer) => {
            const amount = answer['amount']
            //add a amount
            withdrawAmount(accountName, amount)
            
        })
        .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
}

function withdrawAmount(accountName, amount){

    const accountData = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente"))

        return withDraw()
    }

    if(amount > accountData.balance ){
        console.log(chalk.bgRed.black("Saldo insuficiente"))
        
        return withDraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err);
        }
    )

    console.log(chalk.green(`Foi sacado um valor de R$ ${amount} na sua conta`));
    operation()
}