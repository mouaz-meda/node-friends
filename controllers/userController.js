const mongoose = require('mongoose')
const User = mongoose.model('User')

// Login
exports.login = (request, response) => {
    response.render('user/login', { title: 'Login' })
}

// Profile
exports.editProfile = (request, response) => {
    response.render('user/edit-profile', {
        title: 'Edit your profile'
    })
}

exports.absenceReport = (request, response) => {
    response.render('user/absenceReport', {
        title: 'add absence report'
    })
}

