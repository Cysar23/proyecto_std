
//Requiriendo a firestore
const db = firebase.firestore(); 

const tabla_pacientes = document.getElementById('mostrar_datos_pacientes');
const  modalLabel = document.getElementById('ModalLabel');

let editStatus = false;
let id = '';


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', async(event) =>{
                if (form.checkValidity() === true) {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("1")
                    
                    //Capturando datos del form de pacientes y enviandolos a firestore
                    const nombre = form_pacientes['id_nombre'].value;
                    const apellido = form_pacientes["id_apellido"].value;
                    const fecha_nacimiento = form_pacientes["id_fecha_nacimiento"].value;
                    const parentesco = form_pacientes["id_parentesco"].value;
                    const direccion = form_pacientes["id_direccion"].value;
                    const ciudad = form_pacientes["id_ciudad"].value;
                    const dispositivos = form_pacientes["id_dispositivos"].value;
                    const estado = '';

                    console.log("Enviando...");
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
                       modalLabel.innerText = 'Agregar nuevo paciente';
                       id='';
                       
                   }
                }else{
                alert("DEBE LLENAR TODOS LOS CAMPOS");
                form.classList.add('was-validated');
                event.preventDefault();
                console.log("2")
                }
                
            }, false);
        });
    }, false);
})();




        //Obteniendo los datos de firebase y mostrandolo en la pantalla
const obtener_paciente = () => db.collection('datos_pacientes').get(); 


//const perfilPaciente = id => db.collection('datos_pacientes').doc(id).delete();
const borrar_paciente = id => db.collection('datos_pacientes').doc(id).delete();

const editarPaciente = (id) => db.collection('datos_pacientes').doc(id).get();

const cuando_hay_pacientes = (callback) => db.collection('datos_pacientes').onSnapshot(callback);

const actualizar_paciente = (id, actualizando) => db.collection('datos_pacientes').doc(id).update(actualizando);

window.addEventListener('DOMContentLoaded', async(e) =>{
    cuando_hay_pacientes((querySnapshot)=>{
        
        tabla_pacientes.innerHTML = '';
        querySnapshot.forEach(doc =>{
            const paciente = doc.data();
            paciente.id = doc.id;
            
            let color_estado = '';
            if (paciente.estado === 'Pendiente') {
                color_estado = 'danger';
            }else if(paciente.estado === 'Listo'){
                color_estado = 'success';
            }else{
                color_estado = '';
            }

            

            tabla_pacientes.innerHTML += `
            <tr>
            <td class="text-center text-muted">1</td>
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
            <td class="text-center">STD: ${paciente.dispositivos}</td>
            <td class="text-center">
              <div class="badge badge-${color_estado}">${paciente.estado} </div> 
            </td>
            <td class="text-center">
                    <button type="button" id="" class="btn btn-primary btn-sm btn-perfil" data-id="${paciente.id}">Perfil</button>
                    <button type="button" id="" class="btn btn-info btn-sm">Detalle</button>
                    <button type="button" id="" class="btn btn-info btn-sm btn-edit"  data-id="${paciente.id}" data-toggle="modal"  data-target="#modal_pacientes">Editar</button>
            </td>
        </tr>
            `;

            const btnsPerfil = document.querySelectorAll('.btn-perfil');
            btnsPerfil.forEach(btn =>{
                btn.addEventListener('click', async(e)=>{
                    console.log(e.target.dataset.id);
                    await perfilPaciente(e.target.dataset.id);
                })
            });

            const btnsEdit = document.querySelectorAll('.btn-edit');
            btnsEdit.forEach(btn =>{
                btn.addEventListener('click', async(e)=>{
                    console.log(e.target.dataset.id);
                    const doc =  await editarPaciente(e.target.dataset.id);
                    const paciente = doc.data();
                    
                    
                    editStatus = true;
                    id = doc.id;

                    modalLabel.innerText = 'Actualizar paciente'
                    form_pacientes["btn_agregar"].innerText = 'Actualizar';
                    form_pacientes["btn_cerrar"].innerText = 'Eliminar';
                    form_pacientes["btn_cerrar"].classList[1].innerText = 'btn-primary'
                    console.log(form_pacientes["btn_cerrar"].classList[1]);

                    form_pacientes['id_nombre'].value = paciente.nombre;
                    form_pacientes["id_apellido"].value = paciente.apellido;
                    form_pacientes["id_fecha_nacimiento"].value = paciente.fecha_nacimiento;
                    form_pacientes["id_parentesco"].value = paciente.parentesco;
                    form_pacientes["id_direccion"].value = paciente.direccion;
                    form_pacientes["id_ciudad"].value = paciente.direccion;
                    form_pacientes["id_dispositivos"].value = paciente.dispositivos;
                    
 
                })
            })
        })

    })
})

//Funcion que guarda datos del form de pacientes y enviandolos a firestore

const form_pacientes = document.getElementById("form_pacientes");
const guardar_paciente = (nombre,apellido,fecha_nacimiento,parentesco,direccion,ciudad,dispositivos,estado) => 
        db.collection('datos_pacientes').doc().set({
            nombre,
            apellido,
            fecha_nacimiento,
            parentesco,
            direccion,
            ciudad,
            dispositivos,
            estado
        })