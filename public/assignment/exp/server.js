/**
 * Created by ghost on 11/2/16.
 */
var express = require('express')
var app = express()

app.use(express.static(__dirname+'/public'));

app.get('/rest/course', function (req, res) {
    var courses = [
        {title:"C++", seats:1000, start:new Date()},
        {title:"C", seats:200, start:new Date(2016, 16, 2)},
        {title:"Python", seats:300, start:new Date(2016, 9, 11)}];
    res.send(courses);
});

app.listen(3000);