
const config = {
    base_url: 'http://timesheettesting-env.eba-fakakc8k.us-east-1.elasticbeanstalk.com',
    // base_url: 'http://localhost:8080',
    api: {
        signin: '/user/getUser',
        event_getAll: '/events/getAllEvents',
        user_getAll: '/user/getAllUser',
        employee_add: '/employee/saveEmp',
        employee_getAll: '/employee/getAllEmp',
        user_add: '/user/saveUser',
        event_save: '/events/save',
        event_delete: '/events/delete',
        event_get: '/events/getEventById',
        eventWorker_getByEventId: '/eventworker/getEventWorkerByEventId',
        eventWorker_save: '/eventworker/saveEventWorker',
        eventWorker_delete: "/eventworker/deleteEventWorkerByEventIdAndEmpId"
    }
}

const endpoints = {
    signin: config.base_url + config.api.signin,
    employee_add: config.base_url + config.api.employee_add,
    user_add: config.base_url + config.api.user_add,
    event_getAll: config.base_url + config.api.event_getAll,
    user_getAll: config.base_url + config.api.user_getAll,
    employee_getAll: config.base_url + config.api.employee_getAll,
    event_save: config.base_url + config.api.event_save,
    event_delete: config.base_url + config.api.event_delete,
    event_get: config.base_url + config.api.event_get,
    eventWorker_getByEventId: config.base_url + config.api.eventWorker_getByEventId,
    eventWorker_save: config.base_url + config.api.eventWorker_save,
    eventWorker_delete: config.base_url + config.api.eventWorker_delete
};

Object.keys(config.api).forEach((key) => {
    endpoints[key] = config.base_url + config.api[key];
});

export default endpoints;
