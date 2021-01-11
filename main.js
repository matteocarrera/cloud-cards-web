var storage = firebase.storage();
var firestore = firebase.firestore();

var link = window.location.hash.substring(1);
var parentId = link.split('&')[0]
var uuid = link.split('&')[1]

/*
    Получение родительского пользователя
*/
firestore.collection("users").doc(parentId).collection("data").doc(parentId).get().then(function(doc) {
    if (doc.exists) {
        var ownerUserJson = JSON.stringify(doc.data()); 
        var ownerUser = new User(JSON.parse(ownerUserJson));

        /*
            Получение пользователя с конкретной визитки
        */
        firestore.collection("users").doc(parentId).collection("cards").doc(uuid).get().then(function(doc) {
            if (doc.exists) {
                var userBooleanJson = JSON.stringify(doc.data()); 
                var userBoolean = new UserBoolean(JSON.parse(userBooleanJson));

                var currentUser = getUserFromTemplate(ownerUser, userBoolean);

                document.getElementById('name').innerHTML = currentUser.surname + ' ' + currentUser.name + ' ' + currentUser.patronymic;
				
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
				
                console.log(currentUser);
            } else {
                console.log("Визитки по данному адресу не существует!");
            }
        }).catch(function(error) {
            console.log("Ошибка при получении документа: ", error);
        });

        /*
            Получение фотографии пользователя
        */
        storage.ref(doc.data().photo).getDownloadURL().then(function(url) {
            var img = document.getElementById('avatar');
            img.src = url;
        }).catch(function(error) {
            console.log("Ошибка при загрузке изображения: ", error);
        });
    } else {
        console.log("Пользователя по данному адресу не существует!");
    }
}).catch(function(error) {
    console.log("Ошибка при получении документа: ", error);
});

function setDataToField(fieldRow, field, data, additionalText) {
	if (data == '') {
		document.getElementById(fieldRow).classList.add('d-none');
	} else {
		if (additionalText != null) {
			document.getElementById(field).href = additionalText + data
		}
		document.getElementById(field).innerHTML = data
	}
}

function setLinkToSocial(socialId, socialAddress, userData) {
	if (userData == '') {
		document.getElementById(socialId).classList.add('d-none');
	} else {
		document.getElementById(socialId).href = socialAddress + userData;
	}
}

//Тестовая ссылка : #07D64EDB-2763-4ADD-8D98-0715F86D4D7F&AEDEAF5E-CED5-4D2D-B1DB-9DE6B41DD41E
