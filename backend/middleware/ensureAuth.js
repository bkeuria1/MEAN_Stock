module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        next()
      } else {
        return res.status(403).send()
      }
    }
}