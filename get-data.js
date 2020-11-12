var storage = firebase.storage();
var firestore = firebase.firestore();

var uuid = window.location.hash.substring(1);
//console.log(uuid);

firestore.collection("users").doc(uuid).collection("data").doc(uuid).get().then(function(doc) {
    if (doc.exists) {
        var paragraph = document.getElementById("testid");
        var text = document.createTextNode(Object.values(doc.data()));
        paragraph.appendChild(text);

        //console.log("Document data:", doc.data());

        storage.ref(doc.data().photo).getDownloadURL().then(function(url) {
            var img = document.getElementById('myimg');
            img.src = url;
        }).catch(function(error) {
            console.log("Ошибка при загрузке изображения: ", error);
        });
    } else {
        console.log("Данного документа не существует!");
    }
}).catch(function(error) {
    console.log("Ошибка при получении документа: ", error);
});