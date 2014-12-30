var express = require('express'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

exports.get = function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('signin', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
};