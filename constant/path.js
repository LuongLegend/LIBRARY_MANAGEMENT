const { PARAMS } = process.env;
const listNoAuthen = [
    `POST/login`,
    `GET/book`,
    `GET/book/${PARAMS}`,
    `GET/book?`,
    `GET/catalog`,
    `GET/catalog?`,
    `GET/catalog/${PARAMS}`,
    `GET/author`,
    `GET/author?`,
    `GET/author/${PARAMS}`
]
const listPermission = {
    899: [ // divide permission
        `GET/user_permission`,
        `POST/user_permission`,
        `DELETE/user_permission/${PARAMS}/permission/${PARAMS}`
    ],
    300: [//add new book
        `POST/book`
    ],
    333: [//check book
        `PUT/book/${PARAMS}`,
        `DELETE/book/${PARAMS}`,
        `PUT/book/${PARAMS}/check`
    ],
    200: [//author
        `POST/author`
    ],
    201: [
        `PUT/author/${PARAMS}`
    ],
    400: [//catalog
        `POST/catalog`,
    ],
    401: [
        `PUT/catalog/${PARAMS}`,
    ],
    402: [
        `DELETE/catalog/${PARAMS}`
    ],
    900: [//user
        `GET/user`,
        `GET/user/${PARAMS}`,
        `POST/user`,
        `PUT/user/${PARAMS}`,
        `PUT/user/${PARAMS}/block`
    ]

}
module.exports = {
    listNoAuthen: listNoAuthen,
    listPermission: listPermission
}