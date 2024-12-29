const nodemailer = require('nodemailer');

class MailController {
    async sendMail(req, res, next) {
        const { to, subject, text, html } = req.body;

        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.example.com', // Replace with your SMTP server
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'your-email@example.com', // Replace with your email
                pass: 'your-email-password' // Replace with your email password
            }
        });

        // Setup email data
        let mailOptions = {
            from: '"Your Name" <your-email@example.com>', // Replace with your email
            to: to, // List of receivers
            subject: subject, // Subject line
            text: text, // Plain text body
            html: html // HTML body
        };

        // Send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email', error, success: false });
            }
            res.status(200).json({ message: 'Email sent successfully', info, success: true });
        });
    }
}

module.exports = new MailController();