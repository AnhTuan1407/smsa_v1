module.exports = function (...args) {
    args.pop(); // Loại bỏ object Handlebars options
    return args.every(Boolean); // Trả về true nếu tất cả các điều kiện đều là true
};