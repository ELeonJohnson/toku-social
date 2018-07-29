'use strict'

const { validate } = use('Validator')
const Hash = use('Hash')
const User = use('App/Models/User')

class AuthController {
  async register({response, request, view}) {
    return view.render('auth/register')
  }

  async storeUser ({ request, session, response, auth }) {

    // Validation Rules
    const validation = await validate(request.all(), {
        email: 'required|email|unique:users,email',
        password: 'required',
        confirm_password: 'required'
    })


    //Check If Passwords Match
    if(request.input('password') == request.input('confirm_password')) {
      //Check If it Fails Validation
      if(validation.fails()) {
        session
          .withErrors(validation.messages())
          .flashExcept(['password'])

        return response.redirect('back')
      } else {
        // Save User To Database
        try {
          let newUser = await User.create({
            email: request.input('email'),
            password: request.input('password')
          })
        } catch(error) {
          // Show Errors If There Is A Problem With The Database
          console.log('error')
          session
            .withErrors([
              {field: 'database', message: 'problem with database, try later'},
            ])
            .flashExcept(['password'])

          return response.redirect('back')
        }
        session.flash({notification: 'Welcome to Toku'})
        return response.redirect('/home')

      }
    } else {
      // Show Errors If Passwords Do Not Match
      session
        .withErrors([
          {field: 'password', message: 'need to confirm password'},
          {field: 'confirm_password', message: 'need to confirm password'},
        ])
        .flashExcept(['password'])

      return response.redirect('back')
      return `error: passwords do not match`
  }
}




  async login({response, request, view}) {
    return view.render('auth/login')
  }
  async forgotPassword({response, request, view}) {
    return view.render('auth/forgotPassword')
  }
}

module.exports = AuthController
