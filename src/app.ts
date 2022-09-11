/* eslint-disable @typescript-eslint/no-throw-literal */
import chalk from 'chalk'
import dotenv from 'dotenv'
import Express, { Application, Request, Response } from 'express'
import http from 'http'
import swaggerUI from 'swagger-ui-express'
import logger from 'morgan'
import { swaggerSpec } from './docs/docsSwagger'
import indexRoutes from './api/routes'
import dbInit from './db/init'

dotenv.config()

const NODE_ENV = process.env.NODE_ENV ?? 'development'
const APP_PORT = Number(process.env.PORT) ?? 3000

class App {
    public application: Application
    public port: number | string

    constructor() {
        this.port = APP_PORT
        this.application = Express()
        dbInit().then(() => console.log('DB intialized')).catch((e) => console.log(e))
        this.routes()
    }

    private docsSwagger(): void {

        this.application.use('/api/v1/docs', swaggerUI.serve)
        this.application.get(
            '/api/v1/docs',
            swaggerUI.setup(swaggerSpec)
        )
    }

    private routes(): void {
        // Body parsing Middleware
        this.application.use(Express.json());
        this.application.use(logger('common'));
        this.application.use(Express.urlencoded({ extended: true }));
        this.application.get('/', async (req: Request, res: Response): Promise<Response> => {
            return res.status(200).send({
                info: 'Engage REST API',
                docs: `http://localhost:${this.port}/api/v1/docs`,
            })
        })
        this.application.use('/api/v1', indexRoutes)
        this.docsSwagger()
    }

    public getInstance(): Application{
        return this.application;
    }

    public run(): void {
        // setup port
        this.application.set('port', this.port)
        const server = http.createServer(this.application)

        const onError = (error: { syscall: string; code: string }): void => {
            if (error.syscall !== 'listen') {
                throw error
            }

            const bind =
                typeof this.port === 'string'
                    ? `Pipe ${this.port}`
                    : `Port ${this.port}`

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(`${bind} requires elevated privileges`)
                    process.exit(1)
                    break
                case 'EADDRINUSE':
                    console.error(`${bind} is already in use`)
                    process.exit(1)
                    break
                default:
                    throw error
            }
        }

        const onListening = (): void => {
            const addr = server.address()
            const bind = typeof addr === 'string' ? `${addr}` : `${addr?.port}`

            const host = chalk.cyan(`http://localhost:${bind}`)
            console.log(`Server listening on ${host} & Env: ${chalk.blue(NODE_ENV)}`)
        }

        // Run listener
        server.listen(this.port)
        server.on('error', onError)
        server.on('listening', onListening)
    }
}

export default App 
