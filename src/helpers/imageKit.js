import ImageKit from 'imagekit';
import 'dotenv/config'

const imagekit = new ImageKit({
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey,
    urlEndpoint: process.env.urlEndpoint
})

export default imagekit