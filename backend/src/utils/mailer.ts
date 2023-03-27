import ApiErrorResponse from './ApiErrorResponse'
import SibApiV3Sdk from 'sib-api-v3-sdk'

const client = SibApiV3Sdk.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = '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'

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi()

type mailOptions = {
  from: string
  to: string
  subject: string
  html: string
  text: string
}

// const initstmp = async () => {
// auth.setCredentials({
//   refresh_token: process.env.MAILER_REFRESH_TOKEN,
// })
// console.log(process.env.MAILER_ID)
// const accessTokenObject: any = await auth.getAccessToken();
// const accessToken = accessTokenObject?.token;
// console.log('access:',accessToken)
// const stmp = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.BASE_EMAIL,
//     clientId: process.env.MAILER_ID,
//     clientSecret: process.env.MAILER_SECRET,
//     refreshToken: process.env.MAILER_REFRESH_TOKEN,
//     accessToken: accessToken
//   }
// })
// const transportOptions = {
// host: process.env.SMTP_HOST_MT,
// port: Number(process.env.SMTP_PORT_MT),
// auth: {
//   user: process.env.SMTP_USERNAME,
//   pass: process.env.SMTP_PASSWORD
// }
// service: 'SendGrid',
// auth: {
// user: 'apikey',
// pass: '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'
// }
// }
// const stmp = nodemailer.createTransport(transportOptions);
// return stmp;
// }

export const sendEmailFunc = async (
  email: string,
  template: string,
  subject?: string,
  text?: any,
  attachment?: any
) => {
  try {
    // const stmp = await initstmp()
    const sender = {
      email: process.env.BASE_EMAIL,
      name: 'Leaks Application',
    }
    const receivers = [
      {
        email: email,
      },
    ]

    // const option: mailOptions = {
    //   from: 'demotqt123@gmail.com',
    //   to: email,
    //   subject: subject! || '',
    //   html: template,
    //   text: text
    // }
    const sendMailMetaData = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: subject! || '',
      htmlContent: template,
      textContent: text || '',
    })
    // const sendMailMetaData = await stmp.sendMail(option);
    console.log(sendMailMetaData)
    return sendMailMetaData
  } catch (error) {
    return error
  }
}

export const senVerification = async (email: string, name: string, url: string) => {
  try {
    const template = `<!DOCTYPE html> <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=device-width,initial-scale=1"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <style type="text/css"> a, body { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100% } </style> </head> <body style="background-color:#f4f4f4;display: flex; justify-content: center;"> <div border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background:#fff;"> <div bgcolor="#ffffff" align="center" valign="top" style="padding:40px 20px 20px 20px;color:#341edb;font-size:45px;font-weight:1000;letter-spacing:2px;line-height:48px"> <h1 style="font-size:40px;font-weight:700;margin:w-50">Leaks</h1> </div> <div bgcolor="#ffffff" align="center" style="padding:20px 30px 40px 30px;color:#000;font-size:16px;font-weight:600;line-height:25px"> <p>Kindly verify your email to complete your account registration.</p> </div> <div bgcolor="#ffffff" align="center" style="padding:20px 30px 60px 30px"> <div align="center" style="border-radius:30px" bgcolor="#000000"> <a href="${url}" target="_blank" style="background:#000;font-size:20px;color:#fff;text-decoration:none;color:#fff;text-decoration:none;padding:10px 55px;border-radius:2px;display:inline-block">VERIFY NOW </a> </div> </div> </div> </body> </html>`
    // const template = `<p>djt me send email cai db</p>`
    const sendMailMetaData = await sendEmailFunc(
      email,
      template,
      'Leaks email verification',
      'We sent this mail to activate your account'
    )
    return sendMailMetaData
  } catch (error) {
    throw error
  }
}

export const sendNotification = async (email: string, content?: string, title?: string, datetime?: any, url?: any) => {
  try {
    console.log('email: ', email)

    const template = `<!DOCTYPE html> <html> <head> <title></title> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1"> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <style type="text/css"> /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*="margin: 16px 0;"] { margin: 0 !important; } </style> </head> <body style="background-color: #e1e1e1; margin: 0 !important; padding: 0 !important;"> <!-- HIDDEN PREHEADER TEXT --> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <!-- LOGO --> <tr> <td bgcolor="#1746e0" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;"> <h1 style="font-size: 48px; font-weight: 400; margin: 2;">${title} <img src="https://th.bing.com/th/id/OIP.lE62x1N59IinU1S4RvBL6QHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7" width="125" height="120" style="display: block; border: 0px;" /> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#e1e1e1" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;">${content}</p> </td> </tr> <tr> <td bgcolor="#ffffff" align="left"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;"> <table border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="border-radius: 3px;" bgcolor="#1746e0"><a href="${url}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #1746e0; display: inline-block;">View Idea</a></td> </tr> </table> </td> </tr> </table> </td> </tr> <!-- COPY --> <tr> <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;">Cheers,<br>Ye5Sir Team</p> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#e1e1e1" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#e1e1e1" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br> <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p> </td> </tr> </table> </td> </tr> </table> </body> </html>`
    const sendMailMetaData = await sendEmailFunc(email, template, 'Ye5Sir Notification')
    console.log(sendMailMetaData)
    if (sendMailMetaData.accepted) {
      console.log('Send mail result: ', sendMailMetaData)
      return true
    } else {
      // console.log(`Send Email Failed, status code: ${sendMailMetaData.response.status}, \nData: error: ${sendMailMetaData.response.data.error} \n error: ${sendMailMetaData.response.data.error_description}`)
      // return new ApiErrorResponse(`Send Email Failed, status code: ${sendMailMetaData.response.status}, \nData: error: ${sendMailMetaData.response.data.error} \n error: ${sendMailMetaData.response.data.error_description}`);
      return false
    }
  } catch (error) {
    throw error
  }
}

export const sendResetPassword = async (email: string, name: string, code: string) => {
  try {
    const template = 's'
    const result = await sendEmailFunc(email, template, 'Ye5Sir reset password')
    if (result.response.status !== 200) {
      throw new ApiErrorResponse(
        `Send Email Failed, status code: ${result.response.status}, \nData: ${result.response.data} \n`
      )
    } else {
      return true
    }
  } catch (error) {
    return error
  }
}
