require('dotenv').config

const config = {
        "nodemailerConfig": {
        "host":"smtp.office365.com", 
        "port": 587, 
        "secure":false, 
        "auth":{ 
            "type":"login", 
            "user":process.env.USER_MAIL, 
            "pass":process.env.USER_MAIL_PASSWORD 
        }
    }
}

module.export = config;