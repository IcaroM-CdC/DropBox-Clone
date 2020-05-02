const JWT = require("jsonwebtoken")
const Bcrypt = require("bcrypt")


class LoginController {

    constructor() {

        this.BotaoLogin_Element = document.querySelector("#btn-login")
        this.BotaoRegister_Element = document.querySelector("#btn-register")

        this.InitEvents()

    }

    InitEvents(){

        this.BotaoRegister_Element.addEventListener("click", Event => {

            


        })

    }

    FirebaseConnect(){

        var firebaseConfig = {
            apiKey: "AIzaSyC1y3GdgjmZ0OVfHUKk_4YMrNzmwzkBHCw",
            authDomain: "dropbox-clone-870dd.firebaseapp.com",
            databaseURL: "https://dropbox-clone-870dd.firebaseio.com",
            projectId: "dropbox-clone-870dd",
            storageBucket: "dropbox-clone-870dd.appspot.com",
            messagingSenderId: "124367700415",
            appId: "1:124367700415:web:71c378f0adf1107c84a10a",
            measurementId: "G-T89LHYCPFB"

        }
        
        // INICIA O FIREBASE
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();

    }

}