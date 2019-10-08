const config = require('../config/jwt-config.json')
const atob = require('atob')
var jwt = require('jsonwebtoken')
//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = req.headers['authorization']

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ')
    const token = bearer[1]

    req.token = token
    next()
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403)
  }
}

const getUser = (req) => {
  const header = req.headers['authorization']
  console.log(header)

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ')
    const token = bearer[1]

    req.token = token
    const tokenParts = token.split('.')
    const encodedPayload = tokenParts[1]
    const rawPayload = atob(encodedPayload)
    const user = JSON.parse(rawPayload)
    console.log(user.username)
    return user
  }
}

const isLoggedIn = (req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization']
  // decode token
  console.log(config.secret, token)
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      console.log(decoded, err)
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Sign in to continue.' + err
        })
      } else {
        // if everything is good, save to request for use in other routes
        next()
      }
    })
  } else {
    // if there is no token
    // return an error
    return res.status(401).send({
      success: false,
      message: 'Sign in to continue.'
    })
  }
}

module.exports = {
  checkToken,
  isLoggedIn,
  getUser
}
