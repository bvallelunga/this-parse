var Twilio = require('twilio')

module.exports.home = function(req, res) {
  res.renderT("home/index")
}

module.exports.download = function(req, res) {
  Parse.Config.get().then(function(config) {
	  res.redirect(config.get("itunesURL"))
	}, res.errorT)
}

module.exports.notfound = function(req, res) {
  res.renderT('home/index')
}

module.exports.terms = function(req, res) {
  Parse.Config.get().then(function(settings) {
  	res.redirect(settings.get("termsURL"))
  })
}

module.exports.privacy = function(req, res) {
  Parse.Config.get().then(function(settings) {
  	res.redirect(settings.get("privacyURL"))
  })
}

module.exports.robots = function(req, res) {
  res.set('Content-Type', 'text/plain')
  res.render('seo/robots')
}

module.exports.sitemap = function(req, res) {
  res.set('Content-Type', 'application/xml')
  res.render('seo/sitemap')
}
