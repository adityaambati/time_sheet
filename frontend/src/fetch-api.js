import endpoints from './endpoints.js';

function postRequest(url, data) {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(resolve)
            .catch(reject);
    });
}

function getRequest(url) {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(resolve)
            .catch(reject);
    });
}

function deleteRequest(url) {
    return new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(resolve)
            .catch(reject);

    });
}

export default {
    signin: (data) => getRequest(endpoints.signin + "/" + data.email + "/" + data.password),
    employee_add: (data) => postRequest(endpoints.employee_add, data),
    user_add: (data) => postRequest(endpoints.user_add, data),
    event_save: (data) => postRequest(endpoints.event_save, data),
    user_getAll: () => getRequest(endpoints.user_getAll),
    employee_getAll: () => getRequest(endpoints.employee_getAll),
    event_getAll: () => getRequest(endpoints.event_getAll),
    event_delete: (id) => deleteRequest(endpoints.event_delete + "/" + id),
    event_get: (id) => getRequest(endpoints.event_get + "/" + id),
    eventWorker_save: (data) => postRequest(endpoints.eventWorker_save, data),
    eventWorker_getByEventId: (id) => getRequest(endpoints.eventWorker_getByEventId + "/" + id),
    eventWorker_delete: (eventId, empId) => deleteRequest(endpoints.eventWorker_delete + "/" + eventId + "/" + empId)
};
