request = require("request")

module.exports = {
	getUserDetails: function(user_id, callback){ 
		var url = "http://www.api.com/user/" + user_id
		request.get(url, function(err, response, body){
			callback(err, body)
		})
	}
}