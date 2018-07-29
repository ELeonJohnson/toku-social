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
        // session
        //   .withErrors(validation.messages())
        //   .flashExcept(['password'])
        //
        // return response.redirect('back')

        return `error: there is a problem with the email you used`
      } else {
        try {
          let newUser = await User.create({
            email: request.input('email'),
            password: request.input('password')
          })
        } catch(error) {
          consoloe.log('error')
          return 'problems with database'
        }
        return `validation passed`
      }
    } else {
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
