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
            var img = document.getElementById('myimg');
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

//Тестовая ссылка : #DBA18F7E-8BA2-40E0-9DFF-EEB83B87C83F&7E3F8780-AB2E-4D78-BE60-8C4DD3C8BF91