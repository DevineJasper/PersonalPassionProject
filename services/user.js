'use strict';

module.exports = class User {
	constructor(psid) {
		this.psid = psid;
		this.firstName = '';
		this.lastName = '';
		this.phase = 0;
		this.volunteer = 0;
	}
	setProfile(profile) {
		this.firstName = profile.firstName;
		this.lastName = profile.lastName;
		if ('phase' in profile && 'volunteer' in profile) {
			this.phase = profile.phase;
			this.volunteer = profile.volunteer;
		}
	}
};
