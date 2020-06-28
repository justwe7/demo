const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main({ subject, text = '', html = '', to = 'x13133053566@163.com'}) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secureConnection: true,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '747399919@qq.com', // generated ethereal user
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"我的小跟班👳" <747399919@qq.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
module.exports = main
