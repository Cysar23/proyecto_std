auth
    .onAuthStateChanged(function(user) {
        if (user) {
        // User is signed in.
       // var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData; 
        // ...
        console.log();
        console.log('Usuario logueado: ',email,uid);
        } else {
        window.location = 'login.html'
        }
    });

    function logout() {
        auth
            .signOut()
            .then(()=>{
                window.location = 'login.html'
            })
    }