const helpers = {};
const bcrypt = require('bcryptjs');

helpers.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(2);    
    const hash = await bcrypt.hash(password.toString(), salt);
    return hash;
}

helpers.matchPassword = async (password, savedPassword) => {
    try{
       await bcrypt.compare(password, savedPassword);
    }catch(e){
        console.log(e);
    }
}

module.exports = helpers;