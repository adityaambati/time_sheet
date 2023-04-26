import React from 'react';

export const ApiContext = React.createContext({
    loggedIn: false,
    toggleStatus: (val) => {
        this.loggedIn = val;
    },
    users: [],
    employees: [],
});
