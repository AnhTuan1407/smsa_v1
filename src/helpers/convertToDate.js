module.exports.convertByDay = function (day) {
    const date = new Date();
    date.setDate(day);
    date.setHours(0, 0, 0, 0);
    return date;
};

module.exports.convertDateToObj = function (date) {
    const objDate = new Date(date);
    objDate.setHours(0, 0, 0, 0);
    return objDate;
}

module.exports.getDate = function (date) {
    const objDate = new Date(date);
    return objDate.getDate();
}

module.exports.formatDate = function (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatDate = year + "-" + month + "-" + day;
    return formatDate;
} 