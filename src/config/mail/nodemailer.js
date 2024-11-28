const nodemailer = require('nodemailer');

//Cấu hình thông tin mail gốc để gửi
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '@gmail.com',
        pass: 'cajj yeeu ztss omga',
    },
});

module.exports = { transporter };