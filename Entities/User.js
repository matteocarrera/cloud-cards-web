class User {
	uuid = ""
	parentId = ""
	photo = ""
	name = ""
	surname = ""
	patronymic = ""
	company = ""
	jobTitle = ""
	mobile = ""
	mobileSecond = ""
	email = ""
	emailSecond = ""
	address = ""
	addressSecond = ""
	cardNumber = ""
	cardNumberSecond = ""
	website = ""
	vk = ""
	telegram = ""
	facebook = ""
	instagram = ""
	twitter = ""
	notes = ""

	constructor(data) {
    	Object.assign(this, data);
	}
}