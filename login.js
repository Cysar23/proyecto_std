const form_login = document.getElementById('form_login');
        form_login.addEventListener('submit', async(e)=>{
            e.preventDefault();
            const email =  form_login['email'].value;
            const password =  form_login['password'].value;

            auth
                .signInWithEmailAndPassword(email, password)
                .then(userCredential =>{
                    form_login.reset();
                    console.log('Entrando...');
                    window.location = 'index.html'
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);

                     if (errorCode === 'auth/user-not-found') {
                        alert("CORREO NO REGISTRADO")
                    } 

                  });
            
        })


const register = document.getElementById('register');
            register.addEventListener('click', async(e)=>{
            e.preventDefault();
            const email =  form_login['email'].value;
            const password =  form_login['password'].value;
            console.log(email, password);

            auth
                .createUserWithEmailAndPassword(email, password)
                .then(userCredential =>{
                    form_login.reset();
                    console.log('REGISTRANDO...');
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                  });
        })

    window.addEventListener('load', function() {       
        auth
        .onAuthStateChanged(function(user) {
            if (user) {
            // ...
            console.log('Usuario logueado');
            window.location = 'pacientes.html'
            }

        });
    })