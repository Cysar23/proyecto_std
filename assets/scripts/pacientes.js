
//Requiriendo a firestore
const db = firebase.firestore(); 
const tabla_pacientes = document.getElementById('mostrar_datos_pacientes');
const tabla_detalle_pacientes = document.getElementById('mostrar_detalle_pacientes');
const  modalLabel = document.getElementById('ModalLabel');
var uid;

//FUNCIONES DE FIREBASE
const obtener_paciente = () => db.collection('usuarios').doc(uid).collection('datos_pacientes').get(); 

const eliminarPaciente = id => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc(id).delete();
const eliminarDispositivo = id => db.collection('usuarios').doc(uid).collection('datos_dispositivos').doc(id).delete();

const editarPaciente = (id) => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc(id).get();

const cuando_hay_pacientes = (callback) => db.collection('usuarios').doc(uid).collection('datos_pacientes').onSnapshot(callback);

const cuando_hay_dispositivo = (callback) => db.collection('usuarios').doc(uid).collection('datos_dispositivos').onSnapshot(callback);

const actualizar_paciente = (id, actualizando) => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc(id).update(actualizando);


////////////////////////////
let editStatus = false;
let campStatus = false;
let id = '';


//VALIDACION DE CAMPOS Y ENVIO A FIREBASE PARA GUARDAR DATOS
(function() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', async(event) =>{
                if (form.checkValidity() === true) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    //Capturando datos del form de pacientes y enviandolos a firestore
                    const nombre = form_pacientes['id_nombre'].value;
                    const apellido = form_pacientes["id_apellido"].value;
                    const fecha_nacimiento = form_pacientes["id_fecha_nacimiento"].value;
                    const parentesco = form_pacientes["id_parentesco"].value;
                    const direccion = form_pacientes["id_direccion"].value;
                    const ciudad = form_pacientes["id_ciudad"].value;
                    const dispositivos = form_pacientes["id_dispositivos"].value;
                    const estado = '';

                   if (!editStatus) {
                    
                        await guardar_paciente(nombre,apellido,fecha_nacimiento,parentesco,direccion,ciudad,dispositivos, estado);
                        alert("PACIENTE AGREGADO");
                        form_pacientes.reset();
                   }else{ 
                    
                       await actualizar_paciente(id, {
                        nombre: nombre,
                        apellido: apellido,
                        fecha_nacimiento: fecha_nacimiento,
                        parentesco: parentesco,
                        direccion: direccion,
                        ciudad: ciudad,
                        dispositivos: dispositivos,
                       });
                       alert("PACIENTE ACTUALIZADO");
                       form_pacientes.reset();
                       editStatus = false;
                       form_pacientes["btn_agregar"].innerText = 'Agregar';
                       form_pacientes["btn_eliminar"].classList = 'close btn btn-danger btn_eliminar-paciente'
                       modalLabel.innerText = 'Agregar nuevo paciente';
                       id=''; 

                       
                       
                   }
                }else{
                alert("DEBE LLENAR TODOS LOS CAMPOS");
                form.classList.add('was-validated');
                event.preventDefault();
                }
                
            }, false);
        });
    }, false);
})();





//MOSTRANDO PACIENTES EN LA TABLA
window.addEventListener('DOMContentLoaded', async(e) =>{
    auth.onAuthStateChanged(function(user) {uid = user.uid
    
        cuando_hay_pacientes((querySnapshot)=>{
            tabla_pacientes.innerHTML = '';
            querySnapshot.forEach(doc =>{
                
                const paciente = doc.data();
                paciente.id = doc.id;
                
                let color_estado = '';
                if (paciente.estado === false) {
                    color_estado = 'danger';
                    paciente.estado = 'Pendiente'
                }else if(paciente.estado === true){
                    color_estado = 'success';
                    paciente.estado = 'Listo'
                }else{
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
                                <div class="widget-subheading opacity-7">${paciente.parentesco}</div>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="text-center" id="numero_std">${paciente.dispositivos}</td>
                <td class="text-center">
                <div class="badge badge-${color_estado}">${paciente.estado} </div> 
                </td>
                <td class="text-center">
                    <button type="button" id="" class="btn btn-info btn-sm btn-detalle" data-id="${paciente.id}" data-toggle="modal" data-target="#modal_pacientes_detalle">Detalle</button>
                    <button type="button" id="" class="btn btn-primary btn-sm btn-perfil"  data-id="${paciente.id}" data-toggle="modal"  data-target="#modal_pacientes">Perfil</button>
                    
                </td>
            </tr>
                `;
                const btnsDetalle = document.querySelectorAll('.btn-detalle');
                btnsDetalle.forEach(btn =>{
                    btn.addEventListener('click', async(e)=>{
                        
                    })
                })

                const btnsEdit = document.querySelectorAll('.btn-perfil');
                btnsEdit.forEach(btn =>{
                    btn.addEventListener('click', async(e)=>{
                        console.log(e.target.dataset.id);
                        const doc =  await editarPaciente(e.target.dataset.id);
                        const paciente = doc.data();
                        
                        editStatus = true;
                        id = doc.id;

                        modalLabel.innerText = 'Actualizar paciente'
                        form_pacientes["btn_agregar"].innerText = 'Actualizar';
                        form_pacientes["btn_eliminar"].classList = 'btn btn-danger';

                        
                        form_pacientes['id_nombre'].value = paciente.nombre;
                        form_pacientes['id_nombre'].disabled = campStatus;

                        form_pacientes["id_apellido"].value = paciente.apellido;
                        form_pacientes['id_apellido'].disabled = campStatus;

                        form_pacientes["id_fecha_nacimiento"].value = paciente.fecha_nacimiento;
                        form_pacientes['id_fecha_nacimiento'].disabled = campStatus;

                        form_pacientes["id_parentesco"].value = paciente.parentesco;
                        form_pacientes['id_parentesco'].disabled = campStatus;

                        form_pacientes["id_direccion"].value = paciente.direccion;
                        form_pacientes['id_direccion'].disabled = campStatus;

                        form_pacientes["id_ciudad"].value = paciente.direccion;
                        form_pacientes['id_ciudad'].disabled = campStatus;

                        /* form_pacientes["id_dispositivos"].value = paciente.dispositivos;
                        form_pacientes['id_dispositivos'].disabled = campStatus; */
                        
                        cuando_hay_dispositivo((querySnapshot)=>{
                            document.getElementById('id_dispositivos').innerHTML = '';
                            querySnapshot.forEach(doc =>{
                    
                                const dispositivo = doc.data();
                                document.getElementById('id_dispositivos').innerHTML  += `
                                <option>${dispositivo.numero}</option>
                                `;
                            })
                    
                        })
    
                    })
                })
            })
            
            const btnsEliminar = document.querySelectorAll('.btn_eliminar-paciente');
                btnsEliminar.forEach(btn =>{
                    btn.addEventListener('click', async(e)=>{ 
                    
                    let conf = confirm("Esta seguro de eliminar a " + form_pacientes['id_nombre'].value)
                    if (conf==true) {
                        console.log("Si",id);
                        await eliminarPaciente(id);
                        await eliminarDispositivo(id);
                        //form_pacientes.reset();
                        alert("PACIENTE ELIMINADO");
                        location.reload();
                    }
                    
                    });
                });

        });

    });
});
//Funcion que guarda datos del form de pacientes y enviandolos a firestore
const form_pacientes = document.getElementById("form_pacientes");
const guardar_paciente = (nombre,apellido,fecha_nacimiento,parentesco,direccion,ciudad,dispositivos,estado) => 
            db.collection('usuarios').doc(uid).collection('datos_pacientes').doc().set({
                nombre,
                apellido,
                fecha_nacimiento,
                parentesco,
                direccion,
                ciudad,
                dispositivos,
                estado
            });

        


