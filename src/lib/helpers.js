const helpers = {};
const bcrypt = require('bcryptjs');

helpers.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(5);    
    const finalPassword = await bcrypt.hash(password, salt);
    return finalPassword;
}

helpers.matchPassword = async (password, savedPassword) => {
    try{
    await bcrypt.compare(password, savedPassword);
    }catch(e){
        console.log(e)
    }
}

module.exports = helpers;