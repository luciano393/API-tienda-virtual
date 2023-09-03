import ImageKit from 'imagekit';
import env from 'dotenv'
env.config()

const imagekit = new ImageKit({
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey,
    urlEndpoint: process.env.urlEndpoint
})

export default imagekit