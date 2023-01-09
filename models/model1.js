const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    Password : {
        type : String
    },
    Username : {
        type : String
    }

})
const blog = mongoose.model('Users',userSchema);   //users is the name of the table
module.exports = blog;