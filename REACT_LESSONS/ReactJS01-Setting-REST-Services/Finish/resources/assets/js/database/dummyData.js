import _ from 'lodash';

export const DATA_GROCERYMENU = [
    {
        id: 1,
        name: "Pepperoni Pizza",
        ingredients: [
            { id: 1, name: "Pepperoni" },
            { id: 2, name: "Oil" },
            { id: 3, name: "Olives" },
            { id: 4, name: "Cheese" }
        ]
    },
    {
        id: 2,
        name: "Hawaiian Pizza",
        ingredients: [
            { id: 1, name: "Pineapple" },
            { id: 2, name: "Oil" },
            { id: 3, name: "Bell Peppers" },
            { id: 4, name: "Cheese" }
        ]
    }
];


export const DATA_GROCERYLIST = [
    {
        id: _.uniqueId(),
        name: "Pepperoni"
    },
    {
        id: _.uniqueId(),
        name: "Oil"
    }
];