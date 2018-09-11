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
                console.log(body)
                resolve(body)
            }
        })

    })
}

function run(){
    runtest1(runtest2())
}


function runtest1(next){
    // console.log(ss)
    console.log(ss.getCurrentAuthKeys())
    console.log('List all carriers:')

    getCarriers()
        .then( function(carriers){
            console.log(carriers)
            next()
        })
        .catch( function(e){
            console.log(e)
        })
}

function runtest2(next){

    return function(){
        ss.updateAuthKeys(testKey, testSecret)
        console.log('Updated Api keys...')
        console.log(ss.getCurrentAuthKeys())
        console.log('List all carriers:')
        console.log(getCarriers())
    }
}

run()





