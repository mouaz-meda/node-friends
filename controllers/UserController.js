const mongoose = require('mongoose')
const User = mongoose.model('User')
const UserProfile = mongoose.model('UserProfile')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')

// Dashboard
exports.dashboard = (request, response) => {
  if (!request.user) {
    return response.redirect('/admin/login')
  }

  response.render('admin/dashboard', {
    title: 'Admin Portal'
  })
}


// PROFILE
// imagenpm run
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/')
    if (isPhoto) {
      next(null, true)
    } else {
      next({ message: 'That filetype is not allowed!' }, false)
    }
  }
}

exports.upload = multer(multerOptions).fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
])

exports.resize = async (request, response, next) => {
  //check if there is no new file to resize

  if (Object.keys(request.files).length === 0) {
    next() //skip to the next middlewear
    return
  }

  for (name in request.files) {
    const file = request.files[name][0]
    const extension = file.mimetype.split('/')[1]
    request.body[file.fieldname] = `${request.user._id}.${extension}`

    const photo = await jimp.read(file.buffer)

    switch (file.fieldname) {
      case 'avatar':
        await photo.resize(200, jimp.AUTO)
        break
      case 'photo':
        await photo.resize(400, jimp.AUTO)
        break
    }

    await photo.write(`./public/uploads/users/${file.fieldname}/${request.body[file.fieldname]}`)
  }

  // now we've written the photo to the file system, continue
  next()
}


// display and edit profile

exports.editProfile = async (request, response) => {
  let profile = await UserProfile.findOne({ user: request.user._id })
    .populate('user')

  if (!profile) {
    profile = await (new UserProfile({
      user: request.user._id
    })).save()
  }

  response.render('admin/users/edit-profile', {
    title: `Edit Your Profile`,
    profile
  })
}

// update changes to profile

exports.updateProfile = async (request, response) => {
  const profile = await UserProfile.findOneAndUpdate(
    {
      user: request.user._id
    },
    request.body,
    {
      new: true,
    }
  )
    .exec()

  request.flash('success', `successfully updated your profile.`)
  response.redirect('/admin/profile/edit')
}


// Students
exports.studentList = async (request, response) => {

  const students = await User.find({ role: 'student' }).sort({ first_name: 1 })

  // response.json(students)

  response.render('admin/students', {
    title: 'Student List',
    students
  })
}


