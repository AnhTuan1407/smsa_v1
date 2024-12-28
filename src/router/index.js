const customerRouter = require('./admin/customer');
const staffRouter = require('./admin/staff');
const authRouter = require('./auth');
const serviceRouter = require('./admin/service');
const categoryRouter = require('./admin/category');
const subCategoryRouter = require('./admin/subCategory');
const locationRouter = require('./admin/location');
const shiftRouter = require('./admin/shift');
// const siteRouter = require('./site');
// const notificationRouter = require('./notification');
const scheduleRouter = require('./admin/schedule');
// const serviceClientRouter = require('./client/serviceClient');
const bookingRouter = require('./client/booking');

function router(app) {
    app.use('/api/admin/services', serviceRouter);
    app.use('/api/admin/category', categoryRouter);
    app.use('/api/admin/customers', customerRouter);
    app.use('/api/admin/staff', staffRouter);
    app.use('/api/admin/subCategory', subCategoryRouter);
    app.use('/api/admin/location', locationRouter);
    app.use('/api/admin/shift', shiftRouter);
    app.use('/api/auth', authRouter);
    // app.use('/api/site', siteRouter);
    // app.use('/api/notifications', notificationRouter);
    app.use('/api/admin/schedule', scheduleRouter);
    app.use('/api/client/booking', bookingRouter);
    // app.use('/api/client/service', serviceClientRouter);
}

module.exports = router;