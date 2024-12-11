const customerRouter = require('./admin/customer');
const staffRouter = require('./admin/staff');
const authRouter = require('./auth');
const serviceRouter = require('./admin/service');
const categoryRouter = require('./admin/category');
const subCategoryRouter = require('./admin/subCategory');
const locationRouter = require('./admin/location');
// const siteRouter = require('./site');
// const notificationRouter = require('./notification');
// const scheduleRouter = require('./schedule');
// const serviceClientRouter = require('./client/serviceClient');

function router(app) {
    app.use('/api/admin/services', serviceRouter);
    app.use('/api/admin/category', categoryRouter);
    app.use('/api/admin/customers', customerRouter);
    app.use('/api/admin/staff', staffRouter);
    app.use('/api/admin/subCategory', subCategoryRouter);
    app.use('/api/admin/location', locationRouter);
    app.use('/api/auth', authRouter);
    // app.use('/api/site', siteRouter);
    // app.use('/api/notifications', notificationRouter);
    // app.use('/api/schedules', scheduleRouter);
    // app.use('/api/client/service', serviceClientRouter);
}

module.exports = router;