/**
 * Created by ghost on 11/29/16.
 */
module.exports = function () {
  var mongoose = require('mongoose');
  var PageSchema = mongoose.Schema({
      _website:{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
      title:{type:String, required:true},
      name: String,
      description: String,
      widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
      dateCreated: {type: Date, default: Date.now()}
  }, {
      collection :"page"
  });
  return PageSchema;
};