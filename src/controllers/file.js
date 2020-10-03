import services from '../services'

export async function create(req, res) {
  /**
    * @api {post} /file Create
    * @apiName Upload File
    * @apiGroup File
    *
    * @apiHeader {String} Content-Type multipart/form-data
    * @apiHeader {String} authorization `JWT {{ ACCESS_TOKEN }}`
    *
    * @apiParam (FormData) {File} file Form-Data File Upload
    *
    * @apiSuccess {Object} file Created file object
    * @apiSuccess {String} file._id File ID
    * @apiSuccess {String} file.name File name
    * @apiSuccess {String} file.size File size
    * @apiSuccess {String} file.key File key
    * @apiSuccess {String} file.url File url
    * @apiSuccess {String} user.createdAt File creation date
    * @apiSuccess {String} user.updatedAt File updated date
    * @apiSuccess {String} user.__v File version
    *
    * @apiError {String} error Message about error
    */

  try {
    const file = await services.file.create(req.file)
    return res.json({ file })
  } catch (err) {
    const error = err.message || 'Can\'t upload file'
    return res.status(400).json({ error })
  }
}

export async function destroy(req, res) {
  /**
    * @api {delete} /file/:id Delete
    * @apiName Delete File
    * @apiGroup File
    *
    * @apiParam (UrlParam) {String} id File ID
    *
    * @apiHeader {String} authorization `JWT {{ ACCESS_TOKEN }}`
    *
    * @apiSuccess {Object} file Deleted file object
    * @apiSuccess {String} file._id File ID
    * @apiSuccess {String} file.name File name
    * @apiSuccess {String} file.size File size
    * @apiSuccess {String} file.key File key
    * @apiSuccess {String} file.url File url
    * @apiSuccess {String} user.createdAt File creation date
    * @apiSuccess {String} user.updatedAt File updated date
    * @apiSuccess {String} user.__v File version
    *
    * @apiError {String} error Message about error
    */

  try {
    const file = await services.file.destroy({ _id: req.params.id })
    return res.json({ file })
  } catch (err) {
    const error = err.message || 'Can\'t delete file'
    return res.status(400).json({ error })
  }
}
