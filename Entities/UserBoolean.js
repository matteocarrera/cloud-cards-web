class UserBoolean {
	uuid = false
	parentId = false
	name = false
	surname = false
	patronymic = false
	company = false
	jobTitle = false
	mobile = false
	mobileSecond = false
	email = false
	emailSecond = false
	address = false
	addressSecond = false
	cardNumber = false
	cardNumberSecond = false
	website = false
	vk = false
	telegram = false
	facebook = false
	instagram = false
	twitter = false
	notes = false

	constructor(data) {
    	Object.assign(this, data);
	}
}