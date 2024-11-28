module.exports = function (hour, startTime, endTime) {
    const startHour = new Date(startTime).getHours();
    const endHour = new Date(endTime).getHours();
    return hour >= startHour && hour < endHour;
}