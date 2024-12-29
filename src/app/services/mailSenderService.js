const { transporter } = require('../../config/mail/nodemailer');

const sendEmailNotification = async (subject, message, recipientList) => {
    try {
        for (let recipient of recipientList) {
            if (recipient == "") {
                continue
            } else {
                let info = await transporter.sendMail({
                    from: 'SmSa System',
                    to: recipient,
                    subject: subject,
                    text: message
                });

                console.log('Email sent: ' + info.response);
            }
        }

    } catch (error) {
        console.log('>>> Lỗi khi gửi mail: ', error);
    }
}

module.exports = { sendEmailNotification };