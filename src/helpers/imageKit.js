const ImageKit = require('imagekit');
const config = require('../../config.json')

const imagekit = new ImageKit({
    publicKey: config.publicKey,
    privateKey: config.privateKey,
    urlEndpoint: config.urlEndpoint
})

module.exports = imagekit