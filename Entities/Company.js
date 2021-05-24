class Company {
	uuid = ""
	parentUuid = ""
	name = ""
	responsibleFullName = ""
	responsibleJobTitle = ""
	address = ""
	phone = ""
	email = ""
	website = ""

	constructor(data) {
    	Object.assign(this, data);
	}
}