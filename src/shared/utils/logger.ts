import winston from 'winston'
import { isNodeEnv } from './env'
import dayjs from 'dayjs'
import 'winston-daily-rotate-file'
// todo winston-daily-rotate-file 浏览器兼容问题

export const logger = isNodeEnv() ? getNodeLogger() : getBrowserLogger()

function getNodeLogger() {

  const logCtx = winston.createLogger({
    format: winston.format.json(),
  })

  const isProd = process.env.NODE_ENV !== 'production'

  if (isProd) {
    logCtx.add(new winston.transports.DailyRotateFile({
      filename: 'michong-error-%DATE%.log', level: 'error'
    }))
  } else {
    logCtx.add(new winston.transports.Console({
      format: winston.format.printf(({ level, message }) => {
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const msg = typeof message === 'object' ? JSON.stringify(message) : message
        return `【${level}】 ${time}: ${msg}`
      })
    }))
  }

  return logCtx
}

function getBrowserLogger() {
  function console(type: 'error' | 'info' | 'log' | 'warn', message: any) {
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    window.console[type](`【${type}】${time}:`, message)
  }

  return {
    info: console.bind(null, 'info'),
    error: console.bind(null, 'error'),
    log: console.bind(null, 'log'),
    warn: console.bind(null, 'warn'),
  }
}