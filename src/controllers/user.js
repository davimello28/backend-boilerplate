import { User } from '../services'

export async function create(req, res) {
  /**
    * @api {post} /user Create
    * @apiName Register User
    * @apiGroup User
    *
    * @apiHeader {String} Content-Type application/json
    *
    * @apiParam (Body) {String} name Name of User
    * @apiParam (Body) {String} email Email of User
    * @apiParam (Body) {String} password Password of User
    *
    * @apiSuccess {Object} user Registered user object
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
    const user = await User.create(req.body)
    return res.json({ user })
  } catch (err) {
    const error = err.message || 'Can\'t user registration'
    return res.status(400).json({ error })
  }
}

export async function getAll(req, res) {
  /**
    * @api {get} /user Get all
    * @apiName Get all Users
    * @apiGroup User
    *
    * @apiHeader {String} authorization `JWT {{ ACCESS_TOKEN }}`
    *
    * @apiSuccess {Object} users Array of `user` object
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
    const users = await User.getAll()
    return res.json({ users })
  } catch (err) {
    const error = err.message || 'Can\'t get users informations'
    return res.status(400).json({ error })
  }
}

export async function getOne(req, res) {
  /**
    * @api {get} /user/:id Get one
    * @apiName Get specific User
    * @apiGroup User
    *
    * @apiHeader {String} authorization `JWT {{ ACCESS_TOKEN }}`
    *
    * @apiParam (UrlParam) {String} id  If you want to search for a user by ID, enter the value of `_id` for this user, if you want to search for the logged in user, use the string `me` in this field. Example `/user/123...` or `/user/me`
    *
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
    const user = await User.getOne(req.params.id || req.userId)
    return res.json({ user })
  } catch (err) {
    const error = err.message || 'Can\'t get user information'
    return res.status(400).json({ error })
  }
}

export async function update(req, res) {
  /**
    * @api {put} /user/:id Update
    * @apiName Upload Avatar and Update User
    * @apiGroup User
    *
    * @apiHeader {String} Content-Type multipart/form-data
    * @apiHeader {String} authorization `JWT {{ ACCESS_TOKEN }}`
    *
    * @apiParam (UrlParam) {String} id ID of User
    *
    * @apiParam (FormData) {String} [name] Name of User
    * @apiParam (FormData) {String} [email] Email of User
    * @apiParam (FormData) {String} [password] Password of User
    * @apiParam (FormData) {File/String} [avatar] Image file to add a user's avatar, or as empty string to remove avatar
    *
    * @apiSuccess {Object} user Updated user object
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
    const user = await User.update(req.params.id || req.userId, req.file, req.body)
    return res.json({ user })
  } catch (err) {
    const error = err.message || 'Can\'t update user informations'
    return res.status(400).json({ error })
  }
}

export async function destroy(req, res) {
  /**
    * @api {delete} /user/:id Delete
    * @apiName Delete User
    * @apiGroup User
    *
    * @apiHeader {String} authorization `JWT {{ ACCESS_TOKEN }}`
    *
    * @apiParam (UrlParam) {String} id ID of User

    * @apiSuccess {Object} user Deleted user object
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
    const user = await User.destroy(req.params.id)
    return res.json({ user })
  } catch (err) {
    const error = err.message || 'Can\'t delete user'
    return res.status(400).json({ error })
  }
}
