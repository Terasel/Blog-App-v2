export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: "My first well-documented, passably well-tested, JSON Web Token-using API"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./src/routes/*.ts"]
}