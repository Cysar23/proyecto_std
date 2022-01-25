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
                    if (errorCode === 'auth/wrong-password') {
                        alert("CONTRASEÑA INCORRECTA")
                    }

                  });
            
        })


const register = document.getElementById('register');
const form_registro = document.getElementById("form_registro");

            register.addEventListener('click', async(e)=>{
            e.preventDefault();
            const email =  form_registro['email'].value;
            const password =  form_registro['password'].value;
            const password_2 =  form_registro['password_2'].value;

            if (password != password_2) {
                alert("Contraseñas NO coisiden");
            }else{

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
            }
        });

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