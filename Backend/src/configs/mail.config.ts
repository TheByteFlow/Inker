import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: SENDER_EMAIL,
        //pass: PASSKEY
    }
})

export default transporter