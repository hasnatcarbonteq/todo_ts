import app from './bootstrap'
import './routes'
import http from 'http'

const server = http.createServer(app);

export default server;