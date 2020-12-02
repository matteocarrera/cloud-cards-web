function getUserFromTemplate(ownerUser, userBoolean) {
	var currentUser = new User();
    currentUser.parentId = userBoolean.parentId;
    currentUser.uuid = userBoolean.uuid;
    currentUser.name = checkField(ownerUser.name, userBoolean.name);
    currentUser.surname = checkField(ownerUser.surname, userBoolean.surname);
    currentUser.patronymic = checkField(ownerUser.patronymic, userBoolean.patronymic);
    currentUser.company = checkField(ownerUser.company, userBoolean.company);
    currentUser.jobTitle = checkField(ownerUser.jobTitle, userBoolean.jobTitle);
    currentUser.mobile = checkField(ownerUser.mobile, userBoolean.mobile);
    currentUser.mobileSecond = checkField(ownerUser.mobileSecond, userBoolean.mobileSecond);
    currentUser.email = checkField(ownerUser.email, userBoolean.email);
    currentUser.emailSecond = checkField(ownerUser.emailSecond, userBoolean.emailSecond);
    currentUser.address = checkField(ownerUser.address, userBoolean.address);
    currentUser.addressSecond = checkField(ownerUser.addressSecond, userBoolean.addressSecond);
    currentUser.cardNumber = checkField(ownerUser.cardNumber, userBoolean.cardNumber);
    currentUser.cardNumberSecond = checkField(ownerUser.cardNumberSecond, userBoolean.cardNumberSecond);
    currentUser.website = checkField(ownerUser.website, userBoolean.website);
    currentUser.vk = checkField(ownerUser.vk, userBoolean.vk);
    currentUser.telegram = checkField(ownerUser.telegram, userBoolean.telegram);
    currentUser.facebook = checkField(ownerUser.facebook, userBoolean.facebook);
    currentUser.instagram = checkField(ownerUser.instagram, userBoolean.instagram);
    currentUser.twitter = checkField(ownerUser.twitter, userBoolean.twitter);
    currentUser.notes = checkField(ownerUser.notes, userBoolean.notes);
    return currentUser;
}

function checkField(field, isSelected) {
	if (isSelected) {
		return field;
	}
	return "";
}