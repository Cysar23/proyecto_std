
//Requiriendo a firestore
const db = firebase.firestore();
const tabla_pacientes = document.getElementById('mostrar_datos_pacientes');
const tabla_detalle_pacientes = document.getElementById('mostrar_detalle_pacientes');
const modalLabel = document.getElementById('ModalLabel');
var uid;

//FUNCIONES DE FIREBASE
const obtener_paciente = () => db.collection('usuarios').doc(uid).collection('datos_pacientes').get();

const eliminarPaciente = id => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc(id).delete();
const eliminarDispositivo = id => db.collection('usuarios').doc(uid).collection('datos_dispositivos').doc(id).delete();

const editarPaciente = (id) => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc(id).get();

const cuando_hay_pacientes = (callback) => db.collection('usuarios').doc(uid).collection('datos_pacientes').onSnapshot(callback);

const cuando_hay_dispositivo = (callback) => db.collection('usuarios').doc(uid).collection('datos_dispositivos').onSnapshot(callback);

const dispositivosC = (id) => db.collection('usuarios').doc(uid).collection('datos_dispositivos').doc(id).get();

const actualizar_paciente = (id, actualizando) => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc(id).update(actualizando);
//const guardar_exp = (id, actualizando) => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc(id).update(actualizando);


////////////////////////////
let status = 'agregar';
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
                    
                    const enfermera_asiganada = form_pacientes["select_enfermeras"].value;
                    const nombre = form_pacientes['id_nombre'].value;
                    const apellido = form_pacientes["id_apellido"].value;
                    const id_nacionalidad = form_pacientes["id_nacionalidad"].value;
                    const id_estadocivil = form_pacientes["id_estadocivil"].value;
                    const id_seguro = form_pacientes["id_seguro"].value;
                    const id_cedula = form_pacientes["id_cedula"].value;
                    const id_nss = form_pacientes["id_nss"].value;
                    const fecha_nacimiento = form_pacientes["id_fecha_nacimiento"].value;
                    const sexo = form_pacientes["id_sexo"].value;
                    const peso = form_pacientes["id_peso"].value;
                    const parentesco = form_pacientes["id_parentesco"].value;
                    const direccion = form_pacientes["id_direccion"].value;
                    const ciudad = form_pacientes["id_ciudad"].value;
                    const telefono = form_pacientes["id_telefono"].value;
                    const id_vive = form_pacientes["id_vive"].value;
                    const id_trabajo = form_pacientes["id_trabajo"].value;
                    const estado = form_pacientes["estado"].value;

                    const id_hta = form_pacientes["id_hta"].checked;
                    const id_icardiaca = form_pacientes["id_icardiaca"].checked;
                    const id_iagudo = form_pacientes["id_iagudo"].checked;
                    const id_tconduccion = form_pacientes["id_tconduccion"].checked;
                    const id_tcardiaco = form_pacientes["id_tcardiaco"].checked;
                    const id_dislipidemia = form_pacientes["id_dislipidemia"].checked;
                    const id_obesidad = form_pacientes["id_obesidad"].checked;
                    const id_dmt1 = form_pacientes["id_dmt1"].checked;
                    const id_dmt2 = form_pacientes["id_dmt2"].checked;
                    const id_smetabolico = form_pacientes["id_smetabolico"].checked;

                    const id_litiasisRenal = form_pacientes["id_litiasisRenal"].checked;
                    const id_renalAguda = form_pacientes["id_renalAguda"].checked;
                    const id_renalCronica = form_pacientes["id_renalCronica"].checked;

                    const id_cancerPiel = form_pacientes["id_cancerPiel"].checked;
                    const id_CancerPulmon = form_pacientes["id_CancerPulmon"].checked;
                    const id_cancerColon = form_pacientes["id_cancerColon"].checked;
                    const id_cancerTiroides = form_pacientes["id_cancerTiroides"].checked;
                    const id_cancerMama = form_pacientes["id_cancerMama"].checked;
                    const id_cancerCervicoUterino = form_pacientes["id_cancerCervicoUterino"].checked;
                    const id_cancerProstata = form_pacientes["id_cancerProstata"].checked;



                    const dispositivos = '';
                    //const expediente = form_exp['expediente_paciente'].value;
                    //const archivo_expediente = form_exp['archivo_expediente'].value;
                    console.log(status);
                    if (status == 'agregar') {

                        await guardar_paciente(
                            enfermera_asiganada,
                            nombre,
                            apellido,
                            id_nacionalidad,
                            id_estadocivil,
                            id_seguro,
                            id_cedula,
                            id_nss,
                            fecha_nacimiento,
                            sexo,
                            peso,
                            parentesco,
                            direccion,
                            ciudad,
                            telefono,
                            id_vive,
                            id_trabajo,
                            dispositivos,
                            estado,
                            id_hta,
                            id_icardiaca,
                            id_iagudo,
                            id_tconduccion,
                            id_tcardiaco,
                            id_dislipidemia,
                            id_obesidad,
                            id_dmt1,
                            id_dmt2,
                            id_smetabolico,
                            id_litiasisRenal,
                            id_renalAguda,
                            id_renalCronica,
                            id_cancerPiel,
                            id_CancerPulmon,
                            id_cancerColon,
                            id_cancerTiroides,
                            id_cancerMama,
                            id_cancerCervicoUterino,
                            id_cancerProstata,





                            //expediente,
                            //archivo_expediente
                            );
                        form_pacientes.reset();
                        alert("PACIENTE AGREGADO");

                    } else if (status == 'editar') {

                        await actualizar_paciente(id, {
                            
                            enfermera_asiganada: enfermera_asiganada,
                            nombre: nombre,
                            apellido: apellido,
                            id_nacionalidad: id_nacionalidad,
                            id_estadocivil: id_estadocivil,
                            id_seguro: id_seguro,
                            id_cedula: id_cedula,
                            id_nss: id_nss,
                            fecha_nacimiento: fecha_nacimiento,
                            sexo: sexo,
                            peso: peso,
                            parentesco: parentesco,
                            direccion: direccion,
                            ciudad: ciudad,
                            telefono: telefono,
                            id_vive: id_vive,
                            id_trabajo: id_trabajo,
                            dispositivos: dispositivos,
                            estado: estado,
                            id_hta: id_hta,
                            id_icardiaca: id_icardiaca,
                            id_iagudo: id_iagudo,
                            id_tconduccion: id_tconduccion,
                            id_tcardiaco: id_tcardiaco,
                            id_dislipidemia: id_dislipidemia,
                            id_obesidad: id_obesidad,
                            id_dmt1: id_dmt1,
                            id_dmt2: id_dmt2,
                            id_smetabolico: id_smetabolico,
                            id_litiasisRenal: id_litiasisRenal,
                            id_renalAguda: id_renalAguda,
                            id_renalCronica: id_renalCronica,
                            id_cancerPiel: id_cancerPiel,
                            id_CancerPulmon: id_CancerPulmon,
                            id_cancerColon: id_cancerColon,
                            id_cancerTiroides: id_cancerTiroides,
                            id_cancerMama: id_cancerMama,
                            id_cancerCervicoUterino: id_cancerCervicoUterino,
                            id_cancerProstata: id_cancerProstata,



                            //expediente: expediente,
                            //archivo_expediente: archivo_expediente
                        });
                        form_pacientes.reset();
                        alert("PACIENTE ACTUALIZADO");
                        status = 'agregar';
                        form_pacientes["btn_agregar"].innerText = 'Agregar';
                        form_pacientes["btn_eliminar"].classList = 'close btn btn-danger btn_eliminar-paciente btn-with'
                        modalLabel.innerText = 'Agregar nuevo paciente';
                        id = '';

                    }
                    else if (status == 'exp') {
                        await actualizar_paciente(id, {
                            //expediente: expediente,
                            //archivo_expediente: archivo_expediente
                        });
                        alert("GUARDADO!");
                        status = 'agregar';
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

        cuando_hay_pacientes((querySnapshot) => {

            const cantidad_pacientes = document.getElementById('cantidad_pacientes');
            cantidad_pacientes.innerHTML = `<span >${querySnapshot.docs.length}</span>`;
            const cant_pacientes = querySnapshot.docs.length;

            tabla_pacientes.innerHTML = '';

            if (!cant_pacientes) {
                tabla_pacientes.innerHTML =
                    `   <tr>
                    <td class="text-center">
                    NO HAY REGISTROS
                    </td>
                    </tr>
                `      }

            querySnapshot.forEach(doc => {

                const paciente = doc.data();
                paciente.id = doc.id;

                let color_estado = '';
                if (paciente.estado === 'Inactivo') {
                    color_estado = 'danger';
                    paciente.estado = 'Inactivo'
                } else if (paciente.estado === 'Activo') {
                    color_estado = 'success';
                    paciente.estado = 'Activo'
                } else {
                    color_estado = '';
                }



                tabla_pacientes.innerHTML += `
                <tr>
                <td class="text-center text-muted"></td>
                <td>
                    <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                                <div class="widget-heading" >${paciente.nombre}</div>
                                <div class="widget-subheading opacity-7">${paciente.apellido}</div>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="text-center" id="numero_std">${paciente.parentesco}</td>
                <td class="text-center">
                <div class="badge badge-${color_estado}">${paciente.estado} </div> 
                </td>
                <td class="text-center">${paciente.enfermera_asiganada}</td>
                <td class="text-center">
                    <button type="button" id="" class="btn btn-info btn-sm btn-detalle" data-id="${paciente.id}" data-toggle="modal" data-target="#modal_pacientes_detalle">Detalle</button>
                    <button type="button" id="" class="btn btn-primary btn-sm btn-perfil"  data-id="${paciente.id}" data-toggle="modal"  data-target="#modal_pacientes">Perfil</button>
                    
                </td>
            </tr>
                `;

                const btnsDetalle = document.querySelectorAll('.btn-detalle');
                btnsDetalle.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        console.log("ID: ", e.target.dataset.id);
                        const doc = await editarPaciente(e.target.dataset.id);
                        const data_pacientes = doc.data();
                        tabla_detalle_pacientes.innerHTML = '';
                        let hoy = new Date();
                        let date = new Date(data_pacientes.fecha_nacimiento);
                        let edad = hoy.getFullYear() - date.getFullYear();
                        var mes = hoy.getMonth() - date.getMonth();

                        if (mes < 0 || (mes === 0 && hoy.getDate() < date.getDate())) {
                            edad--;
                        }

                        tabla_detalle_pacientes.innerHTML += `
                        <tr>
                            <td class="text-center" id="numero_std">${data_pacientes.nombre}</td>
                            <td class="text-center" id="numero_std">${data_pacientes.apellido}</td>
                            <td class="text-center" id="numero_std">${edad}</td>
                            <td class="text-center" id="numero_std">${data_pacientes.parentesco}</td>
                            <td class="text-center" id="numero_std">${data_pacientes.sexo}</td>
                            <td class="text-center" id="numero_std">${data_pacientes.peso}</td>
                            <td class="text-center" id="numero_std">${data_pacientes.direccion}</td>
                            <td class="text-center" id="numero_std">${data_pacientes.ciudad}</td>
                            <td class="text-center" id="numero_std">${data_pacientes.telefono}</td>
                            <td class="text-center">
                                <button type="button" id="" class="btn btn-primary btn-sm btn-ver"  data-id="${paciente.id}" data-toggle="modal"  data-target="#modal_expediente">Ver</button>
                                
                            </td>
                        </tr>
                        `;

                        const btnsVer = document.querySelectorAll('.btn-ver');
                        btnsVer.forEach(btn => {
                            btn.addEventListener('click', async (e) => {
                                console.log(e.target.dataset.id);
                                //const form_exp = document.getElementById('form_exp');
                                const id_nombre_paciente_exp = document.getElementById("id_nombre_paciente_exp");
                                const doc = await editarPaciente(e.target.dataset.id);
                                const exp = doc.data();
                                console.log(exp);
                                status = 'exp'
                                id = doc.id;
                                id_nombre_paciente_exp.innerHTML = `<label for="expediente_paciente">Expediente del paciente ${exp.nombre}</label>`
                                //form_exp['expediente_paciente'].value = exp.expediente;
                                console.log(status);
                            });
                        });



                    });
                });

                const btnsEdit = document.querySelectorAll('.btn-perfil');
                btnsEdit.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        console.log(e.target.dataset.id);
                        asignar_enfermeras();
                        const doc = await editarPaciente(e.target.dataset.id);
                        const paciente = doc.data();
                        status = 'editar';
                        id = doc.id;
                        console.log(paciente.estado)
                        if (paciente.estado == 'Inactivo') {
                            campStatus = true;
                        }else{
                            campStatus = false;
                        }
                        
                        modalLabel.innerText = 'Actualizar paciente'
                        form_pacientes["btn_agregar"].innerText = 'Actualizar';
                        /* form_pacientes["btn_eliminar"].classList = 'btn btn-danger'; */
                        form_pacientes["btn_eliminar"].classList = 'mb-2 mr-2 btn-pill btn btn-danger btn_eliminar-paciente btn-width';

                        form_pacientes["estado"].value = paciente.estado;

                        form_pacientes["select_enfermeras"].value = paciente.enfermera_asiganada;
                        form_pacientes['select_enfermeras'].disabled = campStatus;
                        
                        form_pacientes['id_nombre'].value = paciente.nombre;
                        form_pacientes['id_nombre'].disabled = campStatus;

                        form_pacientes["id_apellido"].value = paciente.apellido;
                        form_pacientes['id_apellido'].disabled = campStatus;
                        
                        form_pacientes["id_nacionalidad"].value = paciente.id_nacionalidad;
                        form_pacientes['id_nacionalidad'].disabled = campStatus;

                        form_pacientes["id_estadocivil"].value = paciente.id_estadocivil;
                        form_pacientes['id_estadocivil'].disabled = campStatus;

                        form_pacientes["id_seguro"].value = paciente.id_seguro;
                        form_pacientes['id_seguro'].disabled = campStatus;

                        form_pacientes["id_cedula"].value = paciente.id_cedula;
                        form_pacientes['id_cedula'].disabled = campStatus;

                        form_pacientes["id_nss"].value = paciente.id_nss;
                        form_pacientes['id_nss'].disabled = campStatus;

                        form_pacientes["id_vive"].value = paciente.id_vive;
                        form_pacientes['id_vive'].disabled = campStatus;

                        form_pacientes["id_trabajo"].value = paciente.id_trabajo;
                        form_pacientes['id_trabajo'].disabled = campStatus;

                        form_pacientes["id_fecha_nacimiento"].value = paciente.fecha_nacimiento;
                        form_pacientes['id_fecha_nacimiento'].disabled = campStatus;

                        form_pacientes["id_sexo"].value = paciente.sexo;
                        form_pacientes['id_sexo'].disabled = campStatus;

                        form_pacientes["id_peso"].value = paciente.peso;
                        form_pacientes['id_peso'].disabled = campStatus;

                        form_pacientes["id_parentesco"].value = paciente.parentesco;
                        form_pacientes['id_parentesco'].disabled = campStatus;

                        form_pacientes["id_direccion"].value = paciente.direccion;
                        form_pacientes['id_direccion'].disabled = campStatus;

                        form_pacientes["id_ciudad"].value = paciente.ciudad;
                        form_pacientes['id_ciudad'].disabled = campStatus;

                        form_pacientes["id_telefono"].value = paciente.telefono;
                        form_pacientes['id_telefono'].disabled = campStatus;

                        form_pacientes["id_hta"].checked = paciente.id_hta;
                        form_pacientes['id_hta'].disabled = campStatus;

                        form_pacientes["id_icardiaca"].checked = paciente.id_icardiaca;
                        form_pacientes['id_icardiaca'].disabled = campStatus;

                        form_pacientes["id_iagudo"].checked = paciente.id_iagudo;
                        form_pacientes['id_iagudo'].disabled = campStatus;

                        form_pacientes["id_tconduccion"].checked = paciente.id_tconduccion;
                        form_pacientes['id_tconduccion'].disabled = campStatus;

                        form_pacientes["id_tcardiaco"].checked = paciente.id_tcardiaco;
                        form_pacientes['id_tcardiaco'].disabled = campStatus;

                        form_pacientes["id_dislipidemia"].checked = paciente.id_dislipidemia;
                        form_pacientes['id_dislipidemia'].disabled = campStatus;

                        form_pacientes["id_obesidad"].checked = paciente.id_obesidad;
                        form_pacientes['id_obesidad'].disabled = campStatus;

                        form_pacientes["id_dmt1"].checked = paciente.id_dmt1;
                        form_pacientes['id_dmt1'].disabled = campStatus;

                        form_pacientes["id_dmt2"].checked = paciente.id_dmt2;
                        form_pacientes['id_dmt2'].disabled = campStatus;

                        form_pacientes["id_smetabolico"].checked = paciente.id_smetabolico;
                        form_pacientes['id_smetabolico'].disabled = campStatus;

                        form_pacientes["id_litiasisRenal"].checked = paciente.id_litiasisRenal;
                        form_pacientes['id_litiasisRenal'].disabled = campStatus;

                        form_pacientes["id_renalAguda"].checked = paciente.id_renalAguda;
                        form_pacientes['id_renalAguda'].disabled = campStatus;

                        form_pacientes["id_renalCronica"].checked = paciente.id_renalCronica;
                        form_pacientes['id_renalCronica'].disabled = campStatus;

                        form_pacientes["id_cancerPiel"].checked = paciente.id_cancerPiel;
                        form_pacientes['id_cancerPiel'].disabled = campStatus;

                        form_pacientes["id_CancerPulmon"].checked = paciente.id_CancerPulmon;
                        form_pacientes['id_CancerPulmon'].disabled = campStatus;

                        form_pacientes["id_cancerColon"].checked = paciente.id_cancerColon;
                        form_pacientes['id_cancerColon'].disabled = campStatus;

                        form_pacientes["id_cancerTiroides"].checked = paciente.id_cancerTiroides;
                        form_pacientes['id_cancerTiroides'].disabled = campStatus;

                        form_pacientes["id_cancerMama"].checked = paciente.id_cancerMama;
                        form_pacientes['id_cancerMama'].disabled = campStatus;

                        form_pacientes["id_cancerCervicoUterino"].checked = paciente.id_cancerCervicoUterino;
                        form_pacientes['id_cancerCervicoUterino'].disabled = campStatus;

                        form_pacientes["id_cancerProstata"].checked = paciente.id_cancerProstata;
                        form_pacientes['id_cancerProstata'].disabled = campStatus;

                        form_pacientes["id_nota"].checked = paciente.id_nota;
                        form_pacientes['id_nota'].disabled = campStatus;


                        /* form_pacientes["id_dispositivos"].value = paciente.dispositivos;
                        form_pacientes['id_dispositivos'].disabled = campStatus; */

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
                    //console.log('ELIMINAR');
                    let doc_id
                    const id_disp = await db.collection('usuarios').doc(uid).collection('datos_dispositivos').where('paciente', '==', form_pacientes['id_nombre'].value).get();
                    id_disp.forEach(doc => {
                        //idNombrePaciente= doc.data();
                        doc_id = doc.id;
                    })
                    let conf = confirm("Esta seguro de eliminar a " + form_pacientes['id_nombre'].value)
                    if (conf == true) {
                        conf = confirm("SI ELIMINA AL PACIENTE, ELIMINARA EL DISPOSITIVO ASIGNADO");
                        if (conf == true) {
                            await eliminarPaciente(id);
                            await eliminarDispositivo(doc_id);
                            alert("PACIENTE ELIMINADO");
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
const form_pacientes = document.getElementById("form_pacientes");
const guardar_paciente = (
    enfermera_asiganada,
    nombre,
    apellido,
    id_nacionalidad,
    id_estadocivil,
    id_seguro,
    id_cedula,
    id_nss,
    fecha_nacimiento,
    sexo,
    peso,
    parentesco,
    direccion,
    ciudad,
    telefono,
    id_vive,
    id_trabajo,
    dispositivos,
    estado,
    id_hta,
    id_icardiaca,
    id_iagudo,
    id_tconduccion,
    id_tcardiaco,
    id_dislipidemia,
    id_obesidad,
    id_dmt1,
    id_dmt2,
    id_smetabolico,
    id_litiasisRenal,
    id_renalAguda,
    id_renalCronica,
    id_cancerPiel,
    id_CancerPulmon,
    id_cancerColon,
    id_cancerTiroides,
    id_cancerMama,
    id_cancerCervicoUterino,
    id_cancerProstata,


    //expediente,
    //archivo_expediente
    ) =>
    db.collection('usuarios').doc(uid).collection('datos_pacientes').doc().set({
        enfermera_asiganada,
        nombre,
        apellido,
        id_nacionalidad,
        id_estadocivil,
        id_seguro,
        id_cedula,
        id_nss,
        fecha_nacimiento,
        sexo,
        peso,
        parentesco,
        direccion,
        ciudad,
        telefono,
        id_vive,
        id_trabajo,
        dispositivos,
        estado,
        id_hta,
        id_icardiaca,
        id_iagudo,
        id_tconduccion,
        id_tcardiaco,
        id_dislipidemia,
        id_obesidad,
        id_dmt1,
        id_dmt2,
        id_smetabolico,
        id_litiasisRenal,
        id_renalAguda,
        id_renalCronica,
        id_cancerPiel,
        id_CancerPulmon,
        id_cancerColon,
        id_cancerTiroides,
        id_cancerMama,
        id_cancerCervicoUterino,
        id_cancerProstata,


        //expediente,
        //archivo_expediente
    });

function limpiar_form_pacientes() {
    form_pacientes.reset();
    status = 'agregar'
    form_pacientes["btn_agregar"].innerText = 'Agregar';
    form_pacientes["btn_eliminar"].classList = 'close btn btn-danger btn_eliminar-paciente'
    modalLabel.innerText = 'Agregar nuevo paciente';
    id = '';
}

function asignar_enfermeras() {
    const cuando_hay_enfermeras = (callback) => db.collection('usuarios').doc(uid).collection('datos_enfermeras').onSnapshot(callback);
    cuando_hay_enfermeras((querySnapshot) => {

        select_enfermeras.innerHTML = '';
        const cant_enfermeras = querySnapshot.docs.length;

        if (!cant_enfermeras) {
            select_enfermeras.innerHTML =
                `<option>No hay enfermeras</option>`;
        }

        querySnapshot.forEach(doc => {

            const enfermera = doc.data();

            if(enfermera.estado == 'Activo'){
                select_enfermeras.innerHTML += `<option>${enfermera.nombre} ${enfermera.apellido}</option>`;
            }

            

        });
    });
}


/* FUNCIONES DE VALIDAR CEDULA */

window.addEventListener("load", function () {
    id_cedula.addEventListener("keypress", soloNumeros, false);
    id_cedula.addEventListener("keyup", valida, false);
    id_nss.addEventListener("keypress", soloNumeros, false);
    id_peso.addEventListener("keypress", soloNumeros, false);

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

     let notas = [];

     function agregarNota() {
       const fechaActual = new Date();
       const fecha = fechaActual.toLocaleDateString(); // Obtener la fecha actual en formato local
     
       const contenido = document.getElementById('contenido-input').value;
     
       // Validar que se haya ingresado el contenido de la nota
       if (contenido.trim() === '') {
         alert('Por favor, ingresa el contenido de la nota.');
         return;
       }
     
       const nota = {
         fecha: fecha,
         contenido: contenido
       };
     
       notas.push(nota);
     
       document.getElementById('contenido-input').value = '';
     
       actualizarListaNotas();
     }
     
     function buscarNotas() {
       const fechaBuscar = document.getElementById('fecha-buscar').value;
       const contenidoBuscar = document.getElementById('contenido-buscar').value;
     
       const notasFiltradas = notas.filter(nota =>
         nota.fecha.includes(fechaBuscar) && nota.contenido.includes(contenidoBuscar)
       );
     
       mostrarNotas(notasFiltradas);
     }
     
     function actualizarListaNotas() {
       mostrarNotas(notas);
     }
     
     function mostrarNotas(notasArray) {
       const notasContainer = document.getElementById('notas-container');
     
       notasContainer.innerHTML = '';
     
       notasArray.forEach(nota => {
         const notaHTML = document.createElement('div');
         notaHTML.classList.add('card', 'mb-2', 'border', 'border-primary');
         notaHTML.innerHTML = `
           <div class="card-body">
             <h6 class="card-subtitle mb-2 text-muted">${nota.fecha}</h6>
             <p class="card-text">${nota.contenido}</p>
           </div>
         `;
         notasContainer.appendChild(notaHTML);
       });
     }
     