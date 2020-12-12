//Requiriendo a firestore
const db = firebase.firestore(); 
const card_dispositivo = document.getElementById('card_dispositivo'); //Donde se muestran 
const  modalLabel = document.getElementById('ModalLabel');

//FUNCIONES DE FIREBASE
const obtener_dispositivo = () => db.collection('datos_dispositivos').get(); 

const eliminar_dispositivo = id => db.collection('datos_dispositivos').doc(id).delete();

const editar_dispositivo = (id) => db.collection('datos_dispositivos').doc(id).get();

const cuando_hay_dispositivo = (callback) => db.collection('datos_dispositivos').onSnapshot(callback);

const cuando_hay_pacientes = (callback) => db.collection('datos_pacientes').onSnapshot(callback);
///////
//////
//////
const actualizar_paciente = (id, actualizando) => db.collection('datos_pacientes').doc(id).update(actualizando);
const editarPaciente = (id) => db.collection('datos_pacientes').doc(id).get();
//const actualizar_dispositivo = (id, actualizando) => db.collection('datos_dispositivos').doc(id).update(actualizando);


////////////////////////////
let editStatus = false;
let campStatus = false;
let id = '';
let numero=1; 
let arreglo = [];
let paciente;
let dispositivos;

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
                    numero = numero;
                    const paciente = form_dispositivo['id_paciente'].value;
                    const contenedor1 = form_dispositivo["id_contenedor_1"].value;
                    const pastilla1 = form_dispositivo["id_pastilla_1"].value;
                    const pastillahora1 = form_dispositivo["id_pastilla_hora_1"].value;
                    const dia1 = form_dispositivo["id_dia_1"].value;
                    const hora1 = form_dispositivo["id_hora_1"].value;

                   if (!editStatus) {
                    
                        await guardar_dispositivo(numero, paciente,contenedor1,pastilla1,pastillahora1,dia1,hora1);
                        alert("DISPOSITIVO AGREGADO");
                        form_dispositivo.reset();
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
                       alert("DISPOSITIVO ACTUALIZADO");
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





//MOSTRANDO DISPOSITIVOS EN TARJETAS
window.addEventListener('DOMContentLoaded', async(e) =>{
    cuando_hay_dispositivo((querySnapshot)=>{
        
        card_dispositivo.innerHTML = '';
        querySnapshot.forEach(doc =>{
            dispositivos = doc.data();
            dispositivos.id = doc.id;

            //console.log(dispositivos);
            console.log(dispositivos.numero);
            arreglo.push(dispositivos.numero +1);
            numero  = maximo_id_std(arreglo);
            console.log("->"+numero);

            card_dispositivo.innerHTML += `
            <div class="col-md-12 col-lg-6 col-xl-4">
                                <div class="card-hover-shadow profile-responsive card-border border-success mb-3 card">
                                    <div class="dropdown-menu-header">
                                        <div class="dropdown-menu-header-inner bg-success">
                                            <div class="menu-header-content">
                                                <div>
                                                    <h5 class="menu-header-title">Asignado a: ${dispositivos.paciente}</h5>
                                                    <h6 class="menu-header-subtitle">STD ID: ${dispositivos.numero}</h6>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-0 card-body">
                                        <div class="tab-content">
                                            <div class="tab-pane show active" id="tab-2-eg1">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">
                                                        <div class="widget-content p-0">
                                                            <div class="widget-content-wrapper">
                                                                
                                                                <div class="widget-content-left flex2">
                                                                    <div class="widget-heading">CONTENEDOR ${dispositivos.contenedor1}</div>
                                                                    <div class="widget-subheading opacity-10">
                                                                        <span > <b class="text-warning">${dispositivos.pastilla1}</b></span>
                                                                        <br>
                                                                        <span class="pr-2"> Quedan <b class="text-danger">12</b></span>
                                                                        
                                                                    </div>
                                                                </div>
                                                                <div class="widget-content-right">
                                                                    <div class="icon-wrapper m-0">
                                                                        <button type="button" id="PopoverCustomT-1" class="mb-2 mr-2 btn-transition btn btn-outline-success">Ver</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <div class="widget-content p-0">
                                                            <div class="widget-content-wrapper">
                                                                
                                                                <div class="widget-content-left flex2">
                                                                    <div class="widget-heading">${dispositivos.contenedor2}</div>
                                                                    <div class="widget-subheading opacity-10">
                                                                        <span > <b class="text-warning">${dispositivos.pastilla2}</b></span>
                                                                        <br>
                                                                        <span class="pr-2"> Quedan <b class="text-danger">12</b></span>
                                                                        
                                                                    </div>
                                                                </div>
                                                                <div class="widget-content-right">
                                                                    <div class="icon-wrapper m-0">
                                                                        <button type="button" id="PopoverCustomT-1" class="mb-2 mr-2 btn-transition btn btn-outline-success">Ver</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <div class="widget-content p-0">
                                                            <div class="widget-content-wrapper">
                                                                
                                                                <div class="widget-content-left flex2">
                                                                    <div class="widget-heading">${dispositivos.contenedor3}</div>
                                                                    <div class="widget-subheading opacity-10">
                                                                        <span > <b class="text-warning">${dispositivos.pastilla3}</b></span>
                                                                        <br>
                                                                        <span class="pr-2"> Quedan <b class="text-danger">4</b></span>
                                                                        
                                                                    </div>
                                                                </div>
                                                                <div class="widget-content-right">
                                                                    <div class="icon-wrapper m-0">
                                                                        <button type="button" id="PopoverCustomT-1" class="mb-2 mr-2 btn-transition btn btn-outline-success">Ver</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <div class="text-center d-block card-footer">
                                        <button class="btn-shadow-primary btn btn-danger btn-lg btn_eliminar_dispositivo" data-id="${dispositivos.id}">Eliminar</button>
                                    </div>
                                </div>
                                
                            </div>
            `;

        })

        
        
        const btnsEliminar = document.querySelectorAll('.btn_eliminar_dispositivo');
            btnsEliminar.forEach(btn =>{
                btn.addEventListener('click', async(e)=>{ 
                    console.log(e.target.dataset.id);
                    const doc =  await editar_dispositivo(e.target.dataset.id);
                    id = doc.id;
                   
                   let conf = confirm("Esta seguro de eliminar el dispositivo ")
                   if (conf==true) {
                    console.log("Si",id);
                    await eliminar_dispositivo(id);
                    //form_pacientes.reset();
                    alert("DISPOSITIVO ELIMINADO");
                   }
                   else{
                    alert("DISPOSITIVO NO ELIMINADO");
                   }
                   
                })
            });

    })
})

//Funcion que guarda datos del form de pacientes y enviandolos a firestore
const form_dispositivo = document.getElementById("form_dispositivo");
const guardar_dispositivo = (numero, paciente,contenedor1,pastilla1,pastillahora1,dia1,hora1) => 
        db.collection('datos_dispositivos').doc().set({
            numero,
            paciente,
            contenedor1,
            pastilla1,
            pastillahora1,
            dia1,
            hora1
        })

function maximo_id_std(arreglo){
    console.log("Max");
    console.log(arreglo);
    return Math.max.apply(null, arreglo);
}

function pas() {

    cuando_hay_pacientes((querySnapshot)=>{
        document.getElementById('id_paciente').innerHTML = '';
        querySnapshot.forEach(doc =>{

            paciente = doc.data();
            document.getElementById('id_paciente').innerHTML  += `
            <option>${paciente.nombre}</option>
            `;
        })

    })

}