const shipstation = require('../nodeshipstation')
require('dotenv').config()

const apiKey = process.env.DEFAULT_KEY,
    apiSecret = process.env.DEFAULT_SECRET,
    testKey = process.env.TEST_KEY,
    testSecret = process.env.TEST_SECRET

const ss = new shipstation(apiKey,apiSecret)

function getCarriers(){

    return new Promise(function(resolve,reject){
        ss.getCarriers( function(e,res,body){
            if(e){
                console.log(e)
                reject(e)
            }
            else{
                resolve(body)
            }
        })

    })
}

async function run(){

    await runtest()
    ss.updateAuthKeys(testKey, testSecret)
    console.log('Updated Api keys...')
    await runtest()    
    ss.updateAuthKeys(apiKey, apiSecret)
    console.log('Updated Api keys...')
    await runtest()  
}


async function runtest(){
    // console.log(ss)
    console.log(ss.getCurrentAuthKeys())
    console.log('List all carriers:')
    const carriers = await getCarriers() 
    console.log(carriers)
    return carriers
}

// :)
run()





