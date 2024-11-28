module.exports.top = function (startTime) {
    const hour = startTime.getUTCHours();
    return (hour - 7) * 40;
}

module.exports.height = function (startTime, endTime) {
    const starHour = startTime.getUTCHours();
    const EndHour = endTime.getUTCHours();
    return (EndHour - starHour) * 40;
}