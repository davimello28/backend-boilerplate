import { resolve } from 'path'
import { create } from 'express-handlebars'
import { createTransport } from 'nodemailer'
import nodemailerhbs from 'nodemailer-express-handlebars'

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

const viewPath = resolve(__dirname, '..', 'resources', 'mail');

transport.use('compile', nodemailerhbs({
  viewEngine: create({
    layoutsDir: viewPath,
    partialsDir: viewPath,
    defaultLayout: '_default',
    extname: '.hbs',
  }),
  viewPath,
  extname: '.hbs'
}))

export default transport
