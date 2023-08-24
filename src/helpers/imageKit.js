const ImageKit = require('imagekit');
require('dotenv').config()

const imagekit = new ImageKit({
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey,
    urlEndpoint: process.env.urlEndpoint
})

module.exports = imagekit