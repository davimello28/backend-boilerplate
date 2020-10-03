import services from '../services'

export async function login(req, res) {
  /**
    * @api {post} /login Login
    * @apiName User Authentication
    * @apiGroup Auth
    *
    * @apiHeader {String} Content-Type application/json
    *
    * @apiParam (Body) {String} email User email
    * @apiParam (Body) {String} password User password
    *
    * @apiSuccess {String} token User Access Token
    * @apiSuccess {Object} user User object
    * @apiSuccess {String} user._id User ID
    * @apiSuccess {String} user.name Name of user
    * @apiSuccess {String} user.email User email
    * @apiSuccess {String} user.avatar User avatar url
    * @apiSuccess {String} user.createdAt User creation date
    * @apiSuccess {String} user.updatedAt User updated date
    * @apiSuccess {String} user.__v User version
    *
    * @apiError {String} error Message about error
    */

  try {
    const user = await services.auth.login(req.body)
    return res.json({ user, token: user.generateToken() })
  } catch (err) {
    const error = err.message || 'Can\'t user registration'
    return res.status(400).json({ error })
  }
}

export async function forgotPassword(req, res) {
  /**
    * @api {post} /forgot_password Forgot
    * @apiName User Forgot Password
    * @apiGroup Auth
    *
    * @apiHeader {String} Content-Type application/json
    *
    * @apiParam (Body) {String} email User email
    *
    * @apiSuccess {String} status Ok
    *
    * @apiError {String} error Message about error
    */

  try {
    await services.auth.forgotPassword(req.body)
    return res.json({ status: 'Ok' })
  } catch (err) {
    const error = err.message || 'Can\'t forgot password'
    return res.status(400).json({ error })
  }
}

export async function resetPassword(req, res) {
  /**
    * @api {post} /reset_password Reset
    * @apiName User Reset Password
    * @apiGroup Auth
    *
    * @apiHeader {String} Content-Type application/json
    *
    * @apiParam (Body) {String} token Token received in user email
    * @apiParam (Body) {String} password New user password
    *
    * @apiSuccess {String} status Ok
    *
    * @apiError {String} error Message about error
    */

  try {
    await services.auth.resetPassword(req.body)
    return res.json({ status: 'Ok' })
  } catch (err) {
    const error = err.message || 'Can\'t reset password'
    return res.status(400).json({ error })
  }
}
