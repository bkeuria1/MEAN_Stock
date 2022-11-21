const nodemailer = require('nodemailer');

module.exports = {
    async sendEmail(req,res){
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            //secure: true, // true for 465, false for other ports
            auth: {
                user: 'stockmarketsimulatorapp@gmail.com', // generated ethereal user
                pass: process.env.PASSWORD // generated ethereal password
            },
            tls:{
              rejectUnauthorized:false
            }
          });
        const mailData = {
            from: 'stockmarketsimulatorapp@gmail.com',
            to: req.user.email,
            subject: "Purchase Alert",
            text: req.body.message,
    
        };
    
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).send()
            }
            res.status(200).send({ message: "Mail sent", message_id: info.messageId });
        });
    }
}
