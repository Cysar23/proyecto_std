
//Requiriendo a firestore
const db = firebase.firestore();
const tabla_enfermeras = document.getElementById('mostrar_datos_enfermeras');
const tabla_detalle_enfermeras = document.getElementById('tabla_detalle_enfermeras');
const tabla_detalle_pacientes = document.getElementById('tabla_detalle_pacientes');
const modalLabel = document.getElementById('ModalLabel');
var uid;

//FUNCIONES DE FIREBASE
const cuando_hay_enfermeras = (callback) => db.collection('usuarios').doc(uid).collection('datos_enfermeras').onSnapshot(callback);

const eliminarEnfermera = id => db.collection('usuarios').doc(uid).collection('datos_enfermeras').doc(id).delete();
const eliminarDispositivo = id => db.collection('usuarios').doc(uid).collection('datos_dispositivos').doc(id).delete();

const editarEnfermera = (id) => db.collection('usuarios').doc(uid).collection('datos_enfermeras').doc(id).get();
const editarPaciente = (id) => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc(id).get();

const cuando_hay_pacientes = (callback) => db.collection('usuarios').doc(uid).collection('datos_pacientes').onSnapshot(callback);

const cuando_hay_dispositivo = (callback) => db.collection('usuarios').doc(uid).collection('datos_dispositivos').onSnapshot(callback);


const actualizar_paciente = (id, actualizando) => db.collection('usuarios').doc(uid).collection('datos_enfermeras').doc(id).update(actualizando);
//const guardar_exp = (id, actualizando) => db.collection('usuarios').doc(uid).collection('datos_enfermeras').doc(id).update(actualizando);


////////////////////////////

let estado_btn = 'agregar';
let campStatus = false;
let id = '';



const preload_pacientes = document.getElementById('preload_pacientes');
const preload_detalle = document.getElementById('preload_detalle');

//VALIDACION DE CAMPOS Y ENVIO A FIREBASE PARA GUARDAR DATOS
(function () {
    'use strict';
    window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', async (event) => {
                if (form.checkValidity() === true) {
                    event.preventDefault();
                    event.stopPropagation();
                    //Capturando datos del form de pacientes y enviandolos a firestore
                    const nombre = form_enfermeras['id_nombre'].value;
                    const apellido = form_enfermeras["id_apellido"].value;
                    const id_nacionalidad = form_enfermeras["id_nacionalidad"].value;
                    const id_estadocivil = form_enfermeras["id_estadocivil"].value;
                    const id_seguro = form_enfermeras["id_seguro"].value;
                    const id_cedula = form_enfermeras["id_cedula"].value;
                    const id_nss = form_enfermeras["id_nss"].value;
                    const fecha_nacimiento = form_enfermeras["id_fecha_nacimiento"].value;
                    const sexo = form_enfermeras["id_sexo"].value;
                    const direccion = form_enfermeras["id_direccion"].value;
                    const ciudad = form_enfermeras["id_ciudad"].value;
                    const telefono = form_enfermeras["id_telefono"].value;
                    const estado = form_enfermeras["estado"].value;


                    const id_trabajo = form_enfermeras["id_trabajo"].value;
                    const id_fecha_ingreso = form_enfermeras["id_fecha_ingreso"].value;
                    const id_turno = form_enfermeras["id_turno"].value;
                    const id_salario = form_enfermeras["id_salario"].value;
                    const id_nota = form_enfermeras["id_nota"].value;

                    const dispositivos = '';

                    const email = form_enfermeras["email"].value;
                    const password = form_enfermeras["password"].value;
                    const password_2 = form_enfermeras["password_2"].value;


                    console.log("ESTADO: ", estado_btn);
                    if (estado_btn == 'agregar') {

                        if (password != password_2) {
                            alert("Contraseñas NO coinciden");
                        } else {

                            auth
                                .createUserWithEmailAndPassword(email, password)
                                .catch(function (error) {
                                    // Handle Errors here.
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    alert(errorMessage);
                                });


                            await guardar_paciente(
                                email,
                                nombre,
                                apellido,
                                id_nacionalidad,
                                id_estadocivil,
                                id_seguro,
                                id_cedula,
                                id_nss,
                                fecha_nacimiento,
                                sexo,
                                direccion,
                                ciudad,
                                telefono,
                                dispositivos,
                                estado,
                                id_trabajo,
                                id_fecha_ingreso,
                                id_turno,
                                id_salario,
                                id_nota);

                            form_enfermeras.reset();
                            alert("ENFERMERA AGREGADA");
                        }
                    } else if (estado_btn == 'editar') {

                        await actualizar_paciente(id, {
                            email: email,
                            nombre: nombre,
                            apellido: apellido,
                            id_nacionalidad: id_nacionalidad,
                            id_estadocivil: id_estadocivil,
                            id_seguro: id_seguro,
                            id_cedula: id_cedula,
                            id_nss: id_nss,
                            fecha_nacimiento: fecha_nacimiento,
                            sexo: sexo,
                            direccion: direccion,
                            ciudad: ciudad,
                            telefono: telefono,
                            id_trabajo: id_trabajo,
                            dispositivos: dispositivos,
                            estado: estado,
                            id_trabajo: id_trabajo,
                            id_fecha_ingreso: id_fecha_ingreso,
                            id_turno: id_turno,
                            id_salario: id_salario,
                            id_nota: id_nota
                        });
                        form_enfermeras.reset();
                        alert("ENFERMERA ACTUALIZADO");
                        estado_btn = 'agregar';
                        form_enfermeras["btn_agregar"].innerText = 'Agregar';
                        form_enfermeras["btn_eliminar"].classList = 'close btn btn-danger btn_eliminar-paciente'
                        modalLabel.innerText = 'Agregar nueva enfermera';
                        id = '';

                    }
                    else if (estado_btn == 'exp') {
                        await actualizar_paciente(id, {
                            expediente: expediente,
                            archivo_expediente: archivo_expediente
                        });
                        alert("GUARDADO!");
                        estado_btn = 'agregar';
                        document.getElementById("close_modal_exp").click();
                    }
                } else {
                    alert("DEBE LLENAR TODOS LOS CAMPOS");
                    form.classList.add('was-validated');
                    event.preventDefault();
                }

            }, false);
        });
    }, false);
})();





//MOSTRANDO PACIENTES EN LA TABLA
window.addEventListener('DOMContentLoaded', async (e) => {
    auth.onAuthStateChanged(function (user) {
        uid = user.uid

        cuando_hay_enfermeras((querySnapshot) => {

            const cantidad_enfermeras = document.getElementById('cantidad_enfermeras');
            cantidad_enfermeras.innerHTML = `<span >${querySnapshot.docs.length}</span>`;
            const cant_enfermeras = querySnapshot.docs.length;

            tabla_enfermeras.innerHTML = '';

            if (!cant_enfermeras) {
                tabla_enfermeras.innerHTML =
                    `   <tr>
                    <td class="text-center">
                    NO HAY REGISTROS
                    </td>
                    </tr>
                `
            }

            querySnapshot.forEach(doc => {

                const enfermera = doc.data();
                enfermera.id = doc.id;

                let color_estado = '';
                if (enfermera.estado === false) {
                    color_estado = 'danger';
                    enfermera.estado = 'Inactivo'
                } else if (enfermera.estado === true) {
                    color_estado = 'success';
                    enfermera.estado = 'Activo'
                } else {
                    color_estado = '';
                }



                tabla_enfermeras.innerHTML += `
                <tr>
                <td class="text-center text-muted"></td>
                <td>
                    <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                                <div class="widget-heading" >${enfermera.nombre}</div>
                                <div class="widget-subheading opacity-7">${enfermera.apellido}</div>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="text-center" id="numero_std">${enfermera.id_trabajo}</td>
                <td class="text-center">
                <div class="badge badge-${color_estado}">${enfermera.estado} </div> 
                </td>
                <td class="text-center" id=""></td>
                <td class="text-center">
                    <button type="button" id="" class="btn btn-info btn-sm btn-detalle" data-id="${enfermera.id}" data-toggle="modal" data-target="#modal_pacientes_detalle">Detalle</button>
                    <button type="button" id="" class="btn btn-primary btn-sm btn-perfil"  data-id="${enfermera.id}" data-toggle="modal"  data-target="#modal_enfermera">Perfil</button>
                    
                </td>
            </tr>
                `;

                const btnsDetalle = document.querySelectorAll('.btn-detalle');
                btnsDetalle.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        console.log("ID: ", e.target.dataset.id);
                        const doc = await editarEnfermera(e.target.dataset.id);
                        const data_enfermeras = doc.data();
                        tabla_detalle_enfermeras.innerHTML = '';
                        tabla_detalle_pacientes.innerHTML = '';
                        /* let hoy = new Date();
                        let date = new Date(data_enfermeras.fecha_nacimiento);
                        let edad = hoy.getFullYear() - date.getFullYear();
                        var mes = hoy.getMonth() - date.getMonth();

                        if (mes < 0 || (mes === 0 && hoy.getDate() < date.getDate())) {
                            edad--;
                        } */

                        tabla_detalle_enfermeras.innerHTML += `
                        <tr>
                            <td class="text-center" id="numero_std">${data_enfermeras.nombre}</td>
                            <td class="text-center" id="numero_std">${data_enfermeras.apellido}</td>
                            <td class="text-center" id="numero_std">${data_enfermeras.telefono}</td>
                            <td class="text-center" id="numero_std">${data_enfermeras.id_cedula}</td>
                            <td class="text-center" id="numero_std">${data_enfermeras.email}</td>
                            <td class="text-center" id="numero_std">${data_enfermeras.id_trabajo}</td>
                            <td class="text-center" id="numero_std">${data_enfermeras.id_turno}</td>
                            <td class="text-center">
                                <button type="button" id="" class="btn btn-primary btn-sm btn-ver"  data-id="${enfermera.id}" data-toggle="modal"  data-target="#modal_expediente">Ver</button>
                                
                            </td>
                        </tr>
                        `;

                        cuando_hay_pacientes((querySnapshot) => {
                            tabla_detalle_pacientes.innerHTML = '';
                            querySnapshot.forEach(doc => {
                                const data_pacientes = doc.data();
                                //EN ESTE CASO USO EL NOMBRE PROBANDO PARA LA RELACION, DEBE DE SER POR ID, TENER PENDIENTE ESTO
                                const id_nombreApellido = data_enfermeras.nombre +" "+ data_enfermeras.apellido;
                                if(id_nombreApellido == data_pacientes.enfermera_asiganada){
                                    tabla_detalle_pacientes.innerHTML += `
                                        <tr>
                                            <td class="text-center" id="numero_std">${data_pacientes.nombre}</td>
                                            <td class="text-center" id="numero_std">${data_pacientes.apellido}</td>
                                            <td class="text-center" id="numero_std">20</td>
                                            <td class="text-center" id="numero_std">${data_pacientes.parentesco}</td>
                                            <td class="text-center" id="numero_std">${data_pacientes.sexo}</td>
                                            <td class="text-center" id="numero_std">${data_pacientes.peso}</td>
                                            <td class="text-center" id="numero_std">${data_pacientes.direccion}</td>
                                            <td class="text-center" id="numero_std">${data_pacientes.ciudad}</td>
                                            <td class="text-center" id="numero_std">${data_pacientes.telefono}</td>
                                        </tr>
                                    `;
                                }
                            });                        
                        });




                        const btnsVer = document.querySelectorAll('.btn-ver');
                        btnsVer.forEach(btn => {
                            btn.addEventListener('click', async (e) => {
                                console.log(e.target.dataset.id);
                                const form_exp = document.getElementById('form_exp');
                                const id_nombre_paciente_exp = document.getElementById("id_nombre_paciente_exp");
                                const doc = await editarEnfermera(e.target.dataset.id);
                                const exp = doc.data();
                                console.log(exp);
                                estado_btn = 'exp'
                                id = doc.id;
                                id_nombre_paciente_exp.innerHTML = `<label for="expediente_paciente">Expediente del enfermera ${exp.nombre}</label>`
                                form_exp['expediente_paciente'].value = exp.expediente;
                                console.log(estado_btn);
                            });
                        });



                    });
                });

                const btnsEdit = document.querySelectorAll('.btn-perfil');
                btnsEdit.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        console.log(e.target.dataset.id);
                        const doc = await editarEnfermera(e.target.dataset.id);
                        const enfermera = doc.data();
                        estado_btn = 'editar';
                        id = doc.id;

                        modalLabel.innerText = 'Actualizar enfermera'
                        form_enfermeras["btn_agregar"].innerText = 'Actualizar';
                        /* form_enfermeras["btn_eliminar"].classList = 'btn btn-danger'; */
                        form_enfermeras["btn_eliminar"].classList = 'mb-2 mr-2 btn-pill btn btn-danger btn_eliminar-paciente btn-lg btn-block';


                        form_enfermeras['estado'].value = enfermera.estado;
                        form_enfermeras['estado'].disabled = campStatus;

                        form_enfermeras['email'].value = enfermera.email;
                        form_enfermeras['email'].disabled = campStatus;

                        form_enfermeras['password'].value = "*";
                        form_enfermeras['password'].disabled = campStatus;

                        form_enfermeras['password_2'].value = "*";
                        form_enfermeras['email'].disabled = campStatus;

                        form_enfermeras['id_nombre'].value = enfermera.nombre;
                        form_enfermeras['id_nombre'].disabled = campStatus;

                        form_enfermeras["id_apellido"].value = enfermera.apellido;
                        form_enfermeras['id_apellido'].disabled = campStatus;

                        form_enfermeras["id_nacionalidad"].value = enfermera.id_nacionalidad;
                        form_enfermeras['id_nacionalidad'].disabled = campStatus;

                        form_enfermeras["id_estadocivil"].value = enfermera.id_estadocivil;
                        form_enfermeras['id_estadocivil'].disabled = campStatus;

                        form_enfermeras["id_seguro"].value = enfermera.id_seguro;
                        form_enfermeras['id_seguro'].disabled = campStatus;

                        form_enfermeras["id_cedula"].value = enfermera.id_cedula;
                        form_enfermeras['id_cedula'].disabled = campStatus;

                        form_enfermeras["id_nss"].value = enfermera.id_nss;
                        form_enfermeras['id_nss'].disabled = campStatus;

                        form_enfermeras["id_trabajo"].value = enfermera.id_trabajo;
                        form_enfermeras['id_trabajo'].disabled = campStatus;

                        form_enfermeras["id_fecha_nacimiento"].value = enfermera.fecha_nacimiento;
                        form_enfermeras['id_fecha_nacimiento'].disabled = campStatus;

                        form_enfermeras["id_sexo"].value = enfermera.sexo;
                        form_enfermeras['id_sexo'].disabled = campStatus;

                        form_enfermeras["id_direccion"].value = enfermera.direccion;
                        form_enfermeras['id_direccion'].disabled = campStatus;

                        form_enfermeras["id_ciudad"].value = enfermera.ciudad;
                        form_enfermeras['id_ciudad'].disabled = campStatus;

                        form_enfermeras["id_telefono"].value = enfermera.telefono;
                        form_enfermeras['id_telefono'].disabled = campStatus;

                        form_enfermeras["id_fecha_ingreso"].value = enfermera.id_fecha_ingreso;
                        form_enfermeras['id_fecha_ingreso'].disabled = campStatus;

                        form_enfermeras["id_turno"].value = enfermera.id_turno;
                        form_enfermeras['id_turno'].disabled = campStatus;

                        form_enfermeras["id_salario"].value = enfermera.id_salario;
                        form_enfermeras['id_salario'].disabled = campStatus;


                        /* form_enfermeras["id_dispositivos"].value = paciente.dispositivos;
                        form_enfermeras['id_dispositivos'].disabled = campStatus; */

                        /* cuando_hay_dispositivo((querySnapshot)=>{
                            document.getElementById('id_dispositivos').innerHTML = '';
                            querySnapshot.forEach(doc =>{
                    
                                const dispositivo = doc.data();
                                console.log(dispositivo);
                                document.getElementById('id_dispositivos').innerHTML  += `
                                <option>${dispositivo.numero_dispositivo}</option>
                                `;
                            })
                    
                        }) */

                    })
                })
            })


            const btnsEliminar = document.querySelectorAll('.btn_eliminar-paciente');
            btnsEliminar.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    let conf = confirm("Esta seguro de eliminar a " + form_enfermeras['id_nombre'].value)
                    if (conf == true) {
                        conf = confirm("Seguro?");
                        if (conf == true) {
                            await eliminarEnfermera(id);
                            alert("ENFERMERA ELIMINADA");
                            location.reload();
                        }

                    }

                });
            });

        });

        preload_pacientes.classList.remove('spinner-border')

    });
});
//Funcion que guarda datos del form de pacientes y enviandolos a firestore
const form_enfermeras = document.getElementById("form_enfermeras");
const guardar_paciente = (
    email,
    nombre,
    apellido,
    id_nacionalidad,
    id_estadocivil,
    id_seguro,
    id_cedula,
    id_nss,
    fecha_nacimiento,
    sexo,
    direccion,
    ciudad,
    telefono,
    dispositivos,
    estado,
    id_trabajo,
    id_fecha_ingreso,
    id_turno,
    id_salario,
    id_nota) =>
    db.collection('usuarios').doc(uid).collection('datos_enfermeras').doc().set({
        email,
        nombre,
        apellido,
        id_nacionalidad,
        id_estadocivil,
        id_seguro,
        id_cedula,
        id_nss,
        fecha_nacimiento,
        sexo,
        direccion,
        ciudad,
        telefono,
        dispositivos,
        estado,
        id_trabajo,
        id_fecha_ingreso,
        id_turno,
        id_salario,
        id_nota
    });

function limpiar_form_enfermeras() {
    form_enfermeras.reset();
    estado_btn = 'agregar'
    form_enfermeras["btn_agregar"].innerText = 'Agregar';
    form_enfermeras["btn_eliminar"].classList = 'close btn btn-danger btn_eliminar-paciente'
    modalLabel.innerText = 'Agregar nuevo paciente';
    id = '';
}


/* FUNCIONES DE VALIDAR CEDULA */

window.addEventListener("load", function () {
    id_cedula.addEventListener("keypress", soloNumeros, false);
    id_cedula.addEventListener("keyup", valida, false);
    id_nss.addEventListener("keypress", soloNumeros, false);

});

//Solo permite introducir numeros.
function soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
}

function valida(id_cedula) {
    id_cedula = document.getElementById('id_cedula').value;
    id_cedula_validar = document.getElementById('id_cedula_validar').value;
    c = id_cedula.split('');
    v = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
    var result = 0;
    var ar;
    var up;
    var oc;
    for (i = 0; i < 10; i++) {
        up = c[i] * v[i];
        ab = up;
        if (ab >= 10) {
            oc = ab.toString()
                .split('')
                .map(x => parseInt(x))
                .reduce((x, y) => x + y);
        } else {
            oc = ab;
        }
        result = parseFloat(result) + parseFloat(oc);
    }
    dp = result;
    ac = dp.toString().split('')[0] + '0';
    ac = parseInt(ac);
    uj = (ac / 10) * 10;
    if (uj < dp) {
        dp = (uj + 10) - dp;
    }

    if (c[10] == dp) {

        document.getElementById('id_cedula_validar').innerHTML = '<p>Correcta </p>';
        document.getElementById('id_cedula_validar').setAttribute("style", "color: green");
    } else {

        document.getElementById('id_cedula_validar').innerHTML = '<p>Incorrecta </p>';
        document.getElementById('id_cedula_validar').setAttribute("style", "color: red");

    }
}



/*      let filtro_fecha_exp = document.getElementById("filtro_fecha_exp");

     filtro_fecha_exp.addEventListener("click", exp_filtro, false);

     function exp_filtro() {
         console.log(filtro_fecha_exp.value);
     } */