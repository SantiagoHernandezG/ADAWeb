const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID_MAILER, process.env.CLIENT_SECRET_MAILER, process.env.REDIRECT_URI_MAILER)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN_MAILER })


exports.sendMail = async(toEmail, subjectEmail, textEmail) => {
    try {
        // Token de acceso de oAuth2Client
        const accessToken = await oAuth2Client.getAccessToken()
        // Transport para enviar los correos
        const transport = nodemailer.createTransport({
            //es gmail porque es el servicio que estamos usando para mandar correos
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                //el usuario que autorizamos
                user: 'adawomenccm@gmail.com',
                clientId: process.env.CLIENT_ID_MAILER,
                clientSecret: process.env.CLIENT_SECRET_MAILER,
                refreshToken: process.env.REFRESH_TOKEN_MAILER,
                accessToken: accessToken
            }
        })
        const mainOptions = {
             from: 'AdaWomen <adawomenccm@gmail.com>',
             to: toEmail,
             subject: subjectEmail,
             text: textEmail,
             html: '<p>'+textEmail+'</p>'
        }

        const result = await transport.sendMail(mainOptions)
        return result

    } catch (err) {
        console.log("Mail error: " + err)
    }
    
}
