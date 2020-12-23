//Requiriendo a firestore
const db = firebase.firestore(); 
const card_dispositivo = document.getElementById('card_dispositivo'); //Donde se muestran 
const  modalLabel = document.getElementById('ModalLabel');
var uid;

//FUNCIONES DE FIREBASE
const obtener_dispositivo = () => db.collection('usuarios').doc(uid).collection('datos_dispositivos').get(); 

const eliminar_dispositivo = id => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc().collection('datos_dispositivos').doc(id).delete();

const editar_dispositivo = (id) => db.collection('usuarios').doc(uid).collection('datos_dispositivos').doc(id).get();

const cuando_hay_dispositivo = (callback) => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc().collection('datos_dispositivos').onSnapshot(callback);

const cuando_hay_pacientes = (callback) => db.collection('usuarios').doc(uid).collection('datos_pacientes').onSnapshot(callback);
///////
//////
//////
const actualizar_paciente = (id, actualizando) => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc(id).update(actualizando);
const editarPaciente = (id) => db.collection('usuarios').doc(uid).collection('datos_pacientes').doc(id).get();
//const actualizar_dispositivo = (id, actualizando) => db.collection('datos_dispositivos').doc(id).update(actualizando);


////////////////////////////
let editStatus = false;
let campStatus = false;
let id = '';
let numero_dispositivo=1; 
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
                    numero_dispositivo = numero_dispositivo;
                    const paciente = form_dispositivo['id_paciente'].value;
                    const contenedor_1 = form_dispositivo["id_contenedor_1"].value;
                    const pastilla = form_dispositivo["id_pastilla_1"].value;
                    const stock_1 = '';
                    const frecuencia_de_pastillas = form_dispositivo["frecuencia_de_pastillas"].value;
                    const dia_inicio_pastilla = form_dispositivo["dia_inicio_pastilla"].value;
                    const hora_inicio_pastilla = form_dispositivo["hora_inicio_pastilla"].value;

                   if (!editStatus) {
                    
                        await guardar_dispositivo(numero_dispositivo, paciente,contenedor_1,pastilla,stock_1,frecuencia_de_pastillas,dia_inicio_pastilla,hora_inicio_pastilla);
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
    auth.onAuthStateChanged(function(user) {uid = user.uid
        cuando_hay_dispositivo((querySnapshot)=>{
            
            card_dispositivo.innerHTML = '';
            querySnapshot.forEach(doc =>{
                dispositivos = doc.data();
                dispositivos.id = doc.id;

                //console.log(dispositivos);
                console.log(dispositivos.numero_dispositivo);
                arreglo.push(dispositivos.numero_dispositivo +1);
                numero_dispositivo  = maximo_id_std(arreglo);
                console.log("->"+numero_dispositivo);

                card_dispositivo.innerHTML += `
                <div class="col-md-12 col-lg-6 col-xl-4">
                                    <div class="card-hover-shadow profile-responsive card-border border-success mb-3 card">
                                        <div class="dropdown-menu-header">
                                            <div class="dropdown-menu-header-inner bg-success">
                                                <div class="menu-header-content">
                                                    <div>
                                                        <h5 class="menu-header-title">Asignado a: ${dispositivos.paciente}</h5>
                                                        <h6 class="menu-header-subtitle">STD ID: ${dispositivos.numero_dispositivo}</h6>
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
                                                                        <div class="widget-heading">CONTENEDOR 1</div>
                                                                        <div class="widget-subheading opacity-10">
                                                                            <span > <b class="text-warning">${dispositivos.contenedor_1.pastilla}</b></span>
                                                                            <br>
                                                                            <span class="pr-2"> Quedan <b class="text-danger">${dispositivos.contenedor_1.stock_1}</b></span>
                                                                            
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
                                                                        <div class="widget-heading">CONTENEDOR 2</div>
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
                                                                        <div class="widget-heading">CONTENEDOR 3</div>
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
})

//Funcion que guarda datos del form de pacientes y enviandolos a firestore
const form_dispositivo = document.getElementById("form_dispositivo");
const guardar_dispositivo = (numero_dispositivo, paciente,contenedor_1,pastilla,stock_1,frecuencia_de_pastillas,dia_inicio_pastilla,hora_inicio_pastilla) => 
        db.collection('usuarios').doc(uid).collection('datos_pacientes').doc().collection('datos_dispositivos').doc().set({
            numero_dispositivo,
            paciente,
            contenedor_1:{
                pastilla,
                stock_1,
                frecuencia_de_pastillas,
                dia_inicio_pastilla,
                hora_inicio_pastilla
            }
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
            console.log('--->',paciente);
            document.getElementById('id_paciente').innerHTML  += `
            <option>${paciente.nombre}</option>
            `;
        })

    })

}