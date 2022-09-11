import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import fs from "fs";
import { config } from "dotenv";
const dotenv = { config }.config();
const APP_NAME = 'Engage XR';
const baseRoutes = path.resolve(`${__dirname}/./schemas`);

const getDocs = (basePath: string) => fs.readdirSync(basePath).reduce((acc, file) => {
    const data = require(`${baseRoutes}/${file}`);
    acc = {
        ...acc,
        ...data,
    };
    return acc;
}, {});
const docsSources = getDocs(baseRoutes);
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        servers: [
            {
                url: `http://localhost:${process.env.APP_PORT}/api/v1`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                auth_token: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: 'JWT Authorization header using the JWT scheme. Example: “Authorization: JWT {token}”',
                },
            },
        },
        info: {
            title: `${APP_NAME} API Documentation`,
            version: '1.0.0',
        },
        paths: docsSources,
    },
    apis: [],
};
export const swaggerSpec = swaggerJSDoc(swaggerOptions)