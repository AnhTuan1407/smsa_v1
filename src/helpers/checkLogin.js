module.exports.isLoggedIn = function () {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(row => row.startsWith('tokenUser='));

    if (tokenCookie) {
        return true;
    } else {
        return false;
    }
};
