
const form = document.forms['loginForm'];
form.addEventListener('submit', function handleFormSubmit(event) {
  event.preventDefault();

  const email = form['email'].value;
  const password = form['password'].value;
  const isLoginOrSignup = form['isLoginOrSignup'].value;

  if (isLoginOrSignup === 'isLogin') {
    return loginUser(email, password);
  }

  return createUser(email, password);
});

function createUser(email, password) {
	console.log('Creando el usuario con email ' + email);

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function (user) {
		console.log('¡Creamos al usuario!');
	})
	.catch(function (error) {
		console.error(error)
	});
}

function loginUser(email, password) {
	console.log('Loging user ' + email);

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function (user) {
		console.log('Credenciales correctas, ¡bienvenido!');
	})
	.catch(function (error) {
		console.log(error);
	});
}

function signoutUser() {
	firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		showPrivateInfo()
		return console.log('Habemus user 🎉');
	}

	showLoginForm()
	return console.log('No habemus user 😭');
});

function showPrivateInfo(user) {
	const loginForm = document.getElementById('loginFormUI');
	loginForm.style.display = 'none';

	const privateInfo = document.getElementById('privateInfo');
	privateInfo.style.display = 'block';
	privateInfo.innerHTML = `
		<p>Información confidencial</p>
		<button id="btnLogout" class="button">Logout</button>
	`;

	const btnLogout = document.getElementById('btnLogout');
	btnLogout.addEventListener('click', signoutUser);
}

function showLoginForm() {
	const loginForm = document.getElementById('loginFormUI');
	loginForm.style.display = 'block';

	const privateInfo = document.getElementById('privateInfo');
	privateInfo.style.display = 'none';
	privateInfo.innerHTML = `
		<p>Nada que mostrar, tienes que registrarte</p>
	`;
}

