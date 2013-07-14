sinon = require('sinon');
chai = require('chai');
should = chai.should();
SandboxedModule = require('sandboxed-module');
modulePath = "./UserHandler";

describe('User Handler', function() {

	var user_id = "12345"

	beforeEach(function() {
		var self = this;
		this.request = {
			get: sinon.stub()
		}
		return this.userHandler = SandboxedModule.require(modulePath, {
			requires: {
				"request":self.request
			}
		});
	});

	it('should make a http request to the api', function(done) {
		var self = this;
		this.request.get.callsArgWith(1)
		this.userHandler.getUserDetails(user_id, function(){
			self.request.get.calledWith("http://www.api.com/user/"+user_id).should.equal(true);
			done()
		});
	});

	it('should return the user deatils from the api', function(done){
		var stubbedUserDetails = {
			first_name:"bob",
			last_name:"brown"
		}
		this.request.get.callsArgWith(1, null, null, stubbedUserDetails)
		this.userHandler.getUserDetails(user_id, function(err, userDetails){
			userDetails.should.deep.equal(stubbedUserDetails)
			done()
		});
	})
	
});


