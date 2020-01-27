import mailer from '../../configs/mailer'

export default {
  key: 'ForgotPasswordMail',
  async handle({ data }) {
    const { user, token } = data

    await mailer.sendMail({
      to: `${ user.name } <${ user.email }>`,
      from: process.env.MAIL_FROM,
      subject: 'Forgot Password',
      template: 'forgot_password',
      context: { token }
    })
  }
}
