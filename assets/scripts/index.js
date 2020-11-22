
//Requiriendo a firestore
const db = firebase.firestore(); 

const tabla_pacientes = document.getElementById('mostrar_datos_pacientes');


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
                   
                    await guardar_paciente(nombre,apellido,fecha_nacimiento,parentesco,direccion,ciudad,dispositivos, estado);

                    
                    alert("PACIENTE AGREGADO");
                    
                    form_pacientes.reset();
                    
                    console.log(nombre, apellido, fecha_nacimiento, parentesco, direccion, ciudad, dispositivos);
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


const cuando_hay_pacientes = (callback) => db.collection('datos_pacientes').onSnapshot(callback);

window.addEventListener('DOMContentLoaded', async(e) =>{
    cuando_hay_pacientes((querySnapshot)=>{
        
        tabla_pacientes.innerHTML = '';
        querySnapshot.forEach(doc =>{
            
            const paciente = doc.data();
            
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
                    <button type="button" id="" class="btn btn-primary btn-sm">Perfil</button>
                    <button type="button" id="" class="btn btn-info btn-sm">Detalle</button>
            </td>
        </tr>
            `

            //document.getElementById('cantidad_pacientes').innerHTML = cuando_hay_pacientes.length;
            
    
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