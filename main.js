/*
    Сервисы Firebase
*/
var storage = firebase.storage();
var firestore = firebase.firestore();

/*
    ID визитки
*/
var link = window.location.hash.substring(1);

if (link == "") {
	window.location.href = window.location.href + "start.html"
}

var parentId = link.split('&')[0]
var uuid = link.split('&')[1]
var type = link.split('&')[2]
if (type == undefined) {
	type = 'personal'
}

/*
    Получение родительского пользователя
*/
firestore
	.collection("users")
	.doc(parentId)
	.collection("data")
	.doc(parentId)
	.get()
	.then(function(doc) {

    if (doc.exists) {
        var ownerUserJson = JSON.stringify(doc.data()); 
        var ownerUser = new User(JSON.parse(ownerUserJson));

        /*
            Получение пользователя с конкретной визитки
        */
        firestore
        	.collection("users")
        	.doc(parentId)
        	.collection("cards")
        	.doc(uuid)
        	.get()
        	.then(function(doc) {
            
            if (doc.exists) {
            	var type = doc.data()["type"];
                var userBooleanJson = null;
                var userBoolean = null;
                var currentUser = null;
                switch (type) {
                    case 'personal':
                        userBooleanJson = JSON.stringify(doc.data()["data"]); 
                        userBoolean = new UserBoolean(JSON.parse(userBooleanJson));
                        currentUser = getUserFromTemplate(ownerUser, userBoolean);

		                generateVCard(currentUser);
		                fillTableWithPersonalData(currentUser);
                        break;
                    case 'company':
                    	var companyJson = JSON.stringify(doc.data()["data"]); 
                    	var company = new Company(JSON.parse(companyJson));
                    	fillTableWithCompanyData(company);
                    	break;
                    case undefined:
                        userBooleanJson = JSON.stringify(doc.data()); 
                        userBoolean = new UserBoolean(JSON.parse(userBooleanJson));
                        currentUser = getUserFromTemplate(ownerUser, userBoolean);

		                generateVCard(currentUser);
		                fillTableWithPersonalData(currentUser);
                        break;
                }
                

                if(/iPhone/i.test(navigator.userAgent)) {
                    document.getElementById('import-contact-row').classList.remove("d-none");
                }

            } else {
                console.log("Визитки по данному адресу не существует!");
            }

        }).catch(function(error) {
            console.log("Ошибка при получении документа: ", error);
        });

        /*
            Получение фотографии пользователя
        */

		if (type == 'personal') {
			storage.ref(doc.data().photo).getDownloadURL().then(function(url) {
				var img = document.getElementsByClassName('avatar')[0];
	            img.src = url;
	        }).catch(function(error) {
	            console.log("Ошибка при загрузке изображения: ", error);
	        });
		}

    } else {
        console.log("Пользователя по данному адресу не существует!");
    }

}).catch(function(error) {
    console.log("Ошибка при получении документа: ", error);
});

function importContact() {
    window.location.href = "cloudcards://" + window.location.hash;
}

/*
    Генерация VCard пользователя
*/

function generateVCard(currentUser) {
    // TODO("Добавить фото контакта")
    var user = vCard.create(vCard.Version.THREE);
    user.add(vCard.Entry.NAME, currentUser.surname + ";" + currentUser.name + " " + currentUser.patronymic + ";;");
    user.add(vCard.Entry.FORMATTEDNAME, currentUser.surname + " " + currentUser.name + " " + currentUser.patronymic);
    user.add(vCard.Entry.PHONE, currentUser.mobile, vCard.Type.CELL);
    user.add(vCard.Entry.PHONE, currentUser.mobileSecond, vCard.Type.OTHER);
    user.add(vCard.Entry.EMAIL, currentUser.email, vCard.Type.WORK);
    user.add(vCard.Entry.EMAIL, currentUser.emailSecond, vCard.Type.OTHER);
    user.add(vCard.Entry.ORGANIZATION, currentUser.company);
    user.add(vCard.Entry.TITLE, currentUser.jobTitle);
    user.add(vCard.Entry.ADDRESS, currentUser.address, vCard.Type.WORK);
    user.add(vCard.Entry.ADDRESS, currentUser.addressSecond, vCard.Type.OTHER);
    setSocialToVCard(user, "https://vk.com/", "VK", currentUser.vk);
    setSocialToVCard(user, "https://t.me/", "Telegram", currentUser.telegram);
    setSocialToVCard(user, "https://facebook.com/", "Facebook", currentUser.facebook);
    setSocialToVCard(user, "https://instagram.com/", "Instagram", currentUser.instagram);
    setSocialToVCard(user, "https://twitter.com/", "Twitter", currentUser.twitter);
    user.add(vCard.Entry.URL, currentUser.website);
    user.add(vCard.Entry.NOTE, currentUser.notes);

    var link = vCard.export(user, "Скачать VCard контакта", currentUser.name + " " + currentUser.surname, false);
    document.getElementById("vcard").appendChild(link);
}

/*
    Заполнение таблицы на сайте данными контакта
*/

function fillTableWithPersonalData(currentUser) {
    setDataToField('name-row', 'name', currentUser.surname + ' ' + currentUser.name + ' ' + currentUser.patronymic, null);
    setDataToField('mobile-row', 'mobile', currentUser.mobile, 'tel:');
    setDataToField('mobileSecond-row', 'mobileSecond', currentUser.mobileSecond, 'tel:');
    setDataToField('email-row', 'email', currentUser.email, 'mailto:');
    setDataToField('emailSecond-row', 'emailSecond', currentUser.emailSecond, 'mailto:');
    setDataToField('company-row', 'company', currentUser.company, null);
    setDataToField('jobTitle-row', 'jobTitle', currentUser.jobTitle, null);
    setDataToField('address-row', 'address', currentUser.address, 'http://maps.google.com/?q=');
    setDataToField('addressSecond-row', 'addressSecond', currentUser.addressSecond, 'http://maps.google.com/?q=');
    setDataToField('site-row', 'site', currentUser.website, '');

    setLinkToSocial('vk', 'https://vk.com/', currentUser.vk);
    setLinkToSocial('telegram', 'https://t.me/', currentUser.telegram);
    setLinkToSocial('facebook', 'https://facebook.com/', currentUser.facebook);
    setLinkToSocial('instagram', 'https://instagram.com/', currentUser.instagram);
    setLinkToSocial('twitter', 'https://twitter.com/', currentUser.twitter);
}

/*
    Заполнение таблицы на сайте данными компании
*/

function fillTableWithCompanyData(currentCompany) {

	setDataToField('company-name-row', 'company-name', currentCompany.name, null);
	setDataToField('company-responsible-row', 'company-responsible', currentCompany.responsibleFullName, null);
	setDataToField('company-responsible-job-title-row', 'company-responsible-job-title', currentCompany.responsibleJobTitle, null);
    setDataToField('mobile-row', 'mobile', currentCompany.phone, 'tel:');
    setDataToField('email-row', 'email', currentCompany.email, 'mailto:');
    setDataToField('address-row', 'address', currentCompany.address, 'http://maps.google.com/?q=');
    setDataToField('site-row', 'site', currentCompany.website, '');
}

/*
	Заполнение данных в ячейку таблицы
*/

function setDataToField(fieldRow, field, data, additionalText) {
	if (data != '') {
		document.getElementById(fieldRow).classList.remove('d-none');
		if (additionalText != null) {
			document.getElementById(field).href = additionalText + data
		}
		document.getElementById(field).innerHTML = data
	}
}

/*
	Заполнения ссылки на социальные сети
*/

function setLinkToSocial(socialId, socialAddress, userData) {
	if (userData == '') {
		document.getElementById(socialId).classList.remove('d-none');
		document.getElementById(socialId).href = socialAddress + userData;
	}
}

/*
	Заполнение социальных сетей для VCard
*/

function setSocialToVCard(user, social, key, userData) {
    if (userData != "") {
        user.add(vCard.Entry.URL, social + userData, key);
    }
}

/*
	Тестовые ссылки:
		- Без типа: #07D64EDB-2763-4ADD-8D98-0715F86D4D7F&AEDEAF5E-CED5-4D2D-B1DB-9DE6B41DD41E
		- Персональная: #07D64EDB-2763-4ADD-8D98-0715F86D4D7F&AEDEAF5E-CED5-4D2D-B1DB-9DE6B41DD41E&personal
		- Компания: #07D64EDB-2763-4ADD-8D98-0715F86D4D7F&EE424775-E882-4D0C-BE92-DE21471F7AE7&company
*/
