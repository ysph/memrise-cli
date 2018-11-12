var request = require('request');
var querystring = require('querystring');
request = request.defaults({jar: true});
const jar = request.jar(  );

const url_login = 'https://www.memrise.com/login/';
const url_home = 'https://www.memrise.com/home/';
const regex = new RegExp('csrftoken: "(.*.)"');
const headers = {
    'referer': url_login,
}

var user; //credentials
var pass;

request({
	uri: url_login, 
	jar: jar,
	headers: headers
}, function ( err, response, body ) {
	const csrf = ( body.match(regex) )[1];
	const request_body = {
		csrfmiddlewaretoken:csrf,
		username:user,
		password:pass
	}

	request.post({
	    uri:url_login,
	    jar: jar,
	    form: request_body,
	    headers: headers    
	}, function(err, response, body) {
		request({
			uri: url_home, 
			jar: jar,
		}, function(err, response, body) {
			//console.log(body);
		})
	})
})