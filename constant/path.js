const params = process.env.PARAMS;
const listNoAuthen = [
    `GET/login`,
    `GET/book`,
    `GET/book/${params}`,
    `GET/catalog`,
    `GET/catalog/${params}`,
    `GET/author`,
    `GET/author/${params}`,
    `GET/user`,
    `GET/user/${params}`

]
const listPermission = {
        899: [ // divide permission
            `GET/user_permission`,
            `POST/user_permission`,
            `DELETE/user_permission/${params}/permission/${params}`
        ], 
        300: [//add new book
            `POST/book`
        ],
        333: [//check book
            `PUT/book/${params}`,
            `DELETE/book/${params}`,
            `GET/book/${params}/check`
        ],
        200: [//author
            `POST/author`
        ],
        201:[
            `PUT/author/${params}`
        ],
        400: [//catalog
            `POST/catalog`,
        ],
        401: [
            `PUT/catalog/${params}`,
        ],
        402: [
            `DELETE/catalog/${params}`
        ],
        900: [//user
            `GET/user`,
            `GET/user/${params}`,
            `POST/user`,
            `PUT/user/${params}`
            `PUT/${params}/block`
        ]

    }
module.exports = {
    listNoAuthen: listNoAuthen,
    listPermission: listPermission
}