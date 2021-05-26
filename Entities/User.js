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
	website = ""
	vk = ""
	telegram = ""
	facebook = ""
	instagram = ""
	twitter = ""

	constructor(data) {
    	Object.assign(this, data);
	}
}