import nodemailer from 'nodemailer';
// import { OAuth2Client } from 'google-auth-library';
import ApiErrorResponse from './ApiErrorResponse';

// const oauth_url = "https://developers.google.com/oauthplayground";

// const auth = new OAuth2Client(
//   process.env.MAILER_ID,
//   process.env.MAILER_SECRET,
//   oauth_url
// );

type mailOptions = {
  from: string,
  to: string,
  subject: string,
  html: string
}

const initstmp = async () => {
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
  const transportOptions = {
    host: process.env.SMTP_HOST_MT,
    port: Number(process.env.SMTP_PORT_MT),
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  }
  const stmp = nodemailer.createTransport(transportOptions);
  return stmp;
}

export const sendEmailFunc = async (email: string, template: string, subject?: string, attachment?: any) => {
  try {
    const stmp = await initstmp()
    const option: mailOptions = {
      from: process.env.BASE_EMAIL!,
      to: email,
      subject: subject! || '',
      html: template
    }
    const sendMailMetaData = await stmp.sendMail(option);

    return sendMailMetaData;
  } catch (error) {
    return error;
  }
}

export const senVerification = async (email: string, name: string, url: string) => {
  try {
    const template = `<!DOCTYPE html><html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"><style type="text/css">@media screen{@font-face{font-family:Montserrat;font-style:normal;font-weight:400;src:local('Montserrat'),local('Montserrat'),url(https://fonts.google.com/share?selection.family=Montserrat:ital,wght@1,200)}@font-face{font-family:Montserrat;font-style:normal;font-weight:700;src:local('Montserrat Bold'),local('Montserrat-Bold'),url(https://fonts.google.com/share?selection.family=Montserrat%20Subrayada:wght@700%7CMontserrat:ital,wght@1,200)}a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}img{-ms-interpolation-mode:bicubic}img{border:0;height:auto;line-height:100%;outline:0;text-decoration:none}table{border-collapse:collapse!important}body{height:100%!important;margin:0!important;padding:0!important;width:100%!important}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}@media screen and (max-width:600px){h1{font-size:32px!important;line-height:32px!important}}div[style*="margin: 16px 0;"]{margin:0!important}}</style></head><body style="background-color:#f4f4f4;margin:0!important;padding:0!important"><div style="display:none;font-size:1px;color:#fefefe;line-height:1px;font-family:'Montserrat'Helvetica,Arial,sans-serif;max-height:0;max-width:0;opacity:0;overflow:hidden">Ye5Sir!</div><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td bgcolor="#f4f4f4" align="center"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px"><tr><td align="center" valign="top" style="padding:40px 10px 40px 10px"></td></tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding:0 10px 0 10px"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px"><tr><td bgcolor="#ffffff" align="center" valign="top" style="padding:40px 20px 20px 20px;border-radius:2px 2px 0 0;color:#aadb1e;font-family:'Londrina Solid'Helvetica,Arial,sans-serif;font-size:45px;font-weight:700;letter-spacing:2px;line-height:48px"><h1 style="font-size:40px;font-weight:700;margin:w-50">Ye5Sir</h1></td></tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding:0 10px 0 10px"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px"><tr><td bgcolor="#ffffff" align="center" style="padding:20px 30px 40px 30px;color:#000;font-family:'Montserrat bold' Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;line-height:25px"><p>Kindly verify your email to complete your account registration.</p></td></tr><tr><td bgcolor="#ffffff" align="left"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td bgcolor="#ffffff" align="center" style="padding:20px 30px 60px 30px"><table border="0" cellspacing="0" cellpadding="0"><tr><td align="center" style="border-radius:30px" bgcolor="#000000"><a href="${url}" target="_blank" style="font-size:20px;font-family:'Montserrat Bold'Helvetica,Arial,sans-serif;color:#fff;text-decoration:none;color:#fff;text-decoration:none;padding:10px 55px;border-radius:2px;display:inline-block">VERIFY NOW</a></td></tr></table></td></tr></table></td></tr><tr><td bgcolor="#ffffff" align="center" style="padding:0 30px 0 30px;color:#000;font-family:'Montserrat'Helvetica,Arial,sans-serif;font-size:14px;font-weight:550;line-height:25px"><p style="margin:0">Alternatively, you can copy this URL to your browser:</p></td></tr><tr><td bgcolor="#ffffff" align="center" style="padding:20px 30px 20px 30px;color:#666;font-family:'Montserrat'Helvetica,Arial,sans-serif;font-size:14px;font-weight:550;line-height:25px"><p style="margin:0"><a href="#" target="_blank" style="color:#29abe2">https://www.google.com/</a></p></td></tr><tr><td bgcolor="#ffffff" align="center" style="padding:0 30px 20px 30px;color:#000;font-family:'Montserrat'Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:25px"><p style="margin:0">The link will be valid for the next 24 hours.</p></td></tr><tr><td bgcolor="#ffffff" align="center" style="padding:0 30px 40px 30px;border-radius:0 0 4px 4px;color:#000;font-family:'Montserrat'Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:25px"><p style="margin:0">Contact us at<a href="#" target="_blank" style="color:#29abe2">support@anywheel.sg</a></p></td></tr><tr><td bgcolor="#ffffff" align="center" style="padding:0 30px 40px 30px;border-radius:0 0 4px 4px;color:#333;font-family:'Montserrat'Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:25px"><img src="https://img.icons8.com/ios-glyphs/30/000000/facebook-new.png"> <img src="https://img.icons8.com/material-outlined/30/000000/instagram-new.png"></td></tr></table></td></tr><tr><td bgcolor="#f4f4f4" align="center" style="padding:0 10px 0 10px"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px"><tr><td bgcolor="#f4f4f4" align="center" style="padding:0 30px 30px 30px;color:#666;font-family:Lato,Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:18px"><br><p style="margin:0"><a href="" target="_blank" style="color:#111;font-weight:700"></p></td></tr></table></td></tr></table></body></html>`
    const sendMailMetaData = await sendEmailFunc(email, template, 'Ye5Sir email verification');
    if(sendMailMetaData.accepted){
      console.log('Send mail result: ',sendMailMetaData)
      return true;
    }
    else{
      console.log(`Send Email Failed, status code: ${sendMailMetaData.response.status}, \nData: error: ${sendMailMetaData.response.data.error} \n error: ${sendMailMetaData.response.data.error_description}`)
      return new ApiErrorResponse(`Send Email Failed, status code: ${sendMailMetaData.response.status}, \nData: error: ${sendMailMetaData.response.data.error} \n error: ${sendMailMetaData.response.data.error_description}`);

    }
  } catch (error) {
    throw error;
  }
}

export const sendNotification = async (email: string, content?: string, title?: string, datetime?: any, url?: any) => {
  try {
    console.log('email: ', email);

    const template = `<!DOCTYPE html> <html> <head> <title></title> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1"> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <style type="text/css"> /* CLIENT-SPECIFIC STYLES */ body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } /* RESET STYLES */ img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } /* MOBILE STYLES */ @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } /* ANDROID CENTER FIX */ div[style*="margin: 16px 0;"] { margin: 0 !important; } </style> </head> <body style="background-color: #e1e1e1; margin: 0 !important; padding: 0 !important;"> <!-- HIDDEN PREHEADER TEXT --> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <!-- LOGO --> <tr> <td bgcolor="#1746e0" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;"> <h1 style="font-size: 48px; font-weight: 400; margin: 2;">${title} <img src="https://th.bing.com/th/id/OIP.lE62x1N59IinU1S4RvBL6QHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7" width="125" height="120" style="display: block; border: 0px;" /> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#e1e1e1" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;">${content}</p> </td> </tr> <tr> <td bgcolor="#ffffff" align="left"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;"> <table border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="border-radius: 3px;" bgcolor="#1746e0"><a href="${url}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #1746e0; display: inline-block;">View Idea</a></td> </tr> </table> </td> </tr> </table> </td> </tr> <!-- COPY --> <tr> <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;">Cheers,<br>Ye5Sir Team</p> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#e1e1e1" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#e1e1e1" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br> <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p> </td> </tr> </table> </td> </tr> </table> </body> </html>`
    const sendMailMetaData = await sendEmailFunc(email, template, 'Ye5Sir Notification');
    console.log(sendMailMetaData)
    if(sendMailMetaData.accepted){
      console.log('Send mail result: ',sendMailMetaData)
      return true;
    }
    else{
      // console.log(`Send Email Failed, status code: ${sendMailMetaData.response.status}, \nData: error: ${sendMailMetaData.response.data.error} \n error: ${sendMailMetaData.response.data.error_description}`)
      // return new ApiErrorResponse(`Send Email Failed, status code: ${sendMailMetaData.response.status}, \nData: error: ${sendMailMetaData.response.data.error} \n error: ${sendMailMetaData.response.data.error_description}`);
      return false;

    }
  } catch (error) {
    throw error;
  }
}

export const sendResetPassword = async (email: string, name: string, code: string) => {
  try {
    const template = 's';
    const result = await sendEmailFunc(email, template, 'Ye5Sir reset password');
    if (result.response.status !== 200) {
      throw new ApiErrorResponse(`Send Email Failed, status code: ${result.response.status}, \nData: ${result.response.data} \n`)
    }
    else {
      return true;
    }
  } catch (error) {
    return error;
  }
}
