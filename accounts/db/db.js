
/**
*
*@param {*} success
// *@param {*} error
*/

module.exports = function(success){

const mongoose = require('mongoose')
const { DBHOST, DBPORT, DBNAME } = require('../config/config')

mongoose.set('strictQuery', true);

mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(data => console.log('mongodb connected.....')
    )
    .catch(err => console.log("Could not connect", err))

    mongoose.connection.once('open',()=>{
        success()
    })

    mongoose.connection.on('close',()=>{console.log('closed~~~')})

}