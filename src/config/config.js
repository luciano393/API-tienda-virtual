require('dotenv').config

const config = {
        "nodemailerConfig": {
        "host":"smtp.office365.com", 
        "port": 587, 
        "secure":false, 
        "auth":{ 
            "type":"login", 
            "user":process.env.USER-MAIL, 
            "pass":process.env.USER-MAIL-PASSWORD 
        }
    }
}

module.export = config;