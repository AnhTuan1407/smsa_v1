
require('dotenv').config(); // Tải các biến môi trường từ file .env

const connect = {
    development: {
        username: process.env.SQL_USERNAME,  // Username cho SQL Server
        password: process.env.SQL_PASSWORD, // Mật khẩu cho SQL Server
        database: process.env.SQL_NAME, // Tên cơ sở dữ liệu
        host: process.env.SQL_HOST,
        port: process.env.SQL_PORT, // Cổng
        dialect: 'mssql', // Loại cơ sở dữ liệu

        // Mấy dòng dưới này optional ở trên thì buộc phải có
        logging: false, // Tắt logging
        dialectOptions: {
            options: {
                encrypt: true, // Có thể là true nếu server yêu cầu kết nối mã hóa
            }
        }
    },
};

module.exports = connect;