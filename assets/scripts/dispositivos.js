//Requiriendo a firestore
const db = firebase.firestore();
const card_dispositivo = document.getElementById("card_dispositivo"); //Donde se muestran
const modalLabel = document.getElementById("ModalLabel");
const tabla_detalle_dispositivo = document.getElementById(
  "mostrar_detalle_dispositivo"
);
var uid;

//FUNCIONES DE FIREBASE
const obtener_dispositivos = () =>
  db.collection("usuarios").doc(uid).collection("datos_dispositivos").get();

const eliminar_dispositivo = (id) =>
  db
    .collection("usuarios")
    .doc(uid)
    .collection("datos_dispositivos")
    .doc(id)
    .delete();

const editar_dispositivo = (id) =>
  db
    .collection("usuarios")
    .doc(uid)
    .collection("datos_dispositivos")
    .doc(id)
    .get();

const cuando_hay_dispositivo = (callback) =>
  db
    .collection("usuarios")
    .doc(uid)
    .collection("datos_dispositivos")
    .onSnapshot(callback);

const cuando_hay_pacientes = (callback) =>
  db
    .collection("usuarios")
    .doc(uid)
    .collection("datos_pacientes")
    .onSnapshot(callback);
///////
//////
//////
const actualizar_paciente = (id_paciente, actualizando) =>
  db
    .collection("usuarios")
    .doc(uid)
    .collection("datos_pacientes")
    .doc(id_paciente)
    .update(actualizando);

const actualizar_dispositivo = (id, actualizando) =>
  db
    .collection("usuarios")
    .doc(uid)
    .collection("datos_dispositivos")
    .doc(id)
    .update(actualizando);

const editarPaciente = (id) =>
  db
    .collection("usuarios")
    .doc(uid)
    .collection("datos_pacientes")
    .doc(id)
    .get();

////////////////////////////
let editStatus = false;
let campStatus = false;
let id = "";
let idNombrePaciente = "";
let numero_dispositivo = 1;
let id_paciente;
let arreglo = [];
let paciente;
let dispositivos;
let estado_mac = false;
let macs = 0;
let grados;
let estado_reg_pastilla = false;

//VALIDACION DE CAMPOS Y ENVIO A FIREBASE PARA GUARDAR DATOS
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      var forms = document.getElementsByClassName("needs-validation");
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          async (event) => {
            if (form.checkValidity() === true) {
              event.preventDefault();
              event.stopPropagation();

              //Capturando datos del form de pacientes y enviandolos a firestore
              const selectElement = document.getElementById("id_paciente");
              const selectedOption =
                selectElement.options[selectElement.selectedIndex];
              const paciente = selectedOption.text;
              id_paciente = selectedOption.value;
              //numero_dispositivo = id_paciente;
              const mac_dispositivo = form_dispositivo["mac_dispositivo"].value;
              /* const contenedor_1 = form_dispositivo["id_contenedor_1"].value; */

              /* CAPTURANDO DATOS DEL FORM CONTENEDOR 1 */
              const contenedor_1 = 1;
              const pastilla = form_dispositivo["id_pastilla_1"].value;
              const stock_1 = "0";
              const estado_compuerta1 = false;
              const estado_dispensar1 = false;
              const frecuencia_de_pastillas_1 =
                form_dispositivo["frecuencia_de_pastillas_1"].value;
              const dia_inicio_pastilla =
                form_dispositivo["dia_inicio_pastilla"].value;
              const hora_inicio_pastilla =
                form_dispositivo["hora_inicio_pastilla"].value;
              const t_tratamiento_1 = form_dispositivo["t_tratamiento_1"].value;

              /* CAPTURANDO DATOS DEL FORM CONTENEDOR 2 */
              const contenedor_2 = 2;
              const pastilla_2 = form_dispositivo["id_pastilla_2"].value;
              const stock_2 = "0";
              const estado_compuerta2 = false;
              const estado_dispensar2 = false;
              const frecuencia_de_pastillas_2 =
                form_dispositivo["frecuencia_de_pastillas_2"].value;
              const dia_inicio_pastilla_2 =
                form_dispositivo["dia_inicio_pastilla_2"].value;
              const hora_inicio_pastilla_2 =
                form_dispositivo["hora_inicio_pastilla_2"].value;
              const t_tratamiento_2 = form_dispositivo["t_tratamiento_2"].value;

              /* CAPTURANDO DATOS DEL FORM CONTENEDOR 3 */
              const contenedor_3 = 3;
              const pastilla_3 = form_dispositivo["id_pastilla_3"].value;
              const stock_3 = "0";
              const estado_compuerta3 = false;
              const estado_dispensar3 = false;
              const frecuencia_de_pastillas_3 =
                form_dispositivo["frecuencia_de_pastillas_3"].value;
              const dia_inicio_pastilla_3 =
                form_dispositivo["dia_inicio_pastilla_3"].value;
              const hora_inicio_pastilla_3 =
                form_dispositivo["hora_inicio_pastilla_3"].value;
              const t_tratamiento_3 = form_dispositivo["t_tratamiento_3"].value;
              grados = 2498;
              // Create a reference to the cities collection

              if (!editStatus) {
                /* console.log('editStatus', paciente)
                const NombrePaciente = await db
                  .collection("usuarios")
                  .doc(uid)
                  .collection("datos_pacientes")
                  .where("nombre", "==", paciente)
                  .get();

                NombrePaciente.forEach((doc) => {
                  //idNombrePaciente= doc.data();
                  idNombrePaciente = doc.id;
                  console.log("ID DEL PACIENTE ", idNombrePaciente);
                }); */

                console.log(paciente + "(Form) : " + mac_dispositivo);

                const consultando_mac = await db
                  .collection("usuarios")
                  .doc("registros_MAC")
                  .get();
                let array_macs = consultando_mac.data().MACS;
                console.log("consultando_mac: ", array_macs);
                array_macs.forEach((db_mac) => {
                  console.log("db_mac: ", db_mac);

                  if (db_mac.mac_dispositivo == mac_dispositivo) {
                    estado_mac = true;
                    alert("MAC DUPLICADO");
                  }
                });
                if (estado_mac == false) {
                  let registrando_MAC = db
                    .collection("usuarios")
                    .doc("registros_MAC");
                  registrando_MAC.update({
                    /* MACS: firebase.firestore.FieldValue.arrayUnion(mac_dispositivo) */
                    MACS: firebase.firestore.FieldValue.arrayUnion({
                      id_std: uid,
                      mac_dispositivo: mac_dispositivo,
                    }),
                  });

                  await actualizar_paciente(id_paciente, {
                    dispositivos: mac_dispositivo,
                  });

                  await guardar_dispositivo(
                    //numero_dispositivo,
                    id_paciente,
                    idNombrePaciente,
                    paciente,
                    mac_dispositivo,
                    contenedor_1,
                    pastilla,
                    stock_1,
                    estado_compuerta1,
                    estado_dispensar1,
                    frecuencia_de_pastillas_1,
                    dia_inicio_pastilla,
                    hora_inicio_pastilla,
                    t_tratamiento_1,
                    grados,

                    contenedor_2,
                    pastilla_2,
                    stock_2,
                    estado_compuerta2,
                    estado_dispensar2,
                    frecuencia_de_pastillas_2,
                    dia_inicio_pastilla_2,
                    hora_inicio_pastilla_2,
                    t_tratamiento_2,

                    contenedor_3,
                    pastilla_3,
                    stock_3,
                    estado_compuerta3,
                    estado_dispensar3,
                    frecuencia_de_pastillas_3,
                    dia_inicio_pastilla_3,
                    hora_inicio_pastilla_3,
                    t_tratamiento_3
                  );

                  alert("DISPOSITIVO AGREGADO");
                  form_dispositivo.reset();
                }

                estado_mac = false;
              } else {
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
                form_pacientes["btn_agregar"].innerText = "Agregar";
                form_pacientes["btn_eliminar"].classList =
                  "close btn btn-danger btn_eliminar-paciente";
                modalLabel.innerText = "Agregar nuevo paciente";
                id = "";
              }
            } else {
              alert("DEBE LLENAR TODOS LOS CAMPOS");
              form.classList.add("was-validated");
              event.preventDefault();
            }
          },
          false
        );
      });
    },
    false
  );
})();

//MOSTRANDO DISPOSITIVOS EN TARJETAS
window.addEventListener("DOMContentLoaded", async (e) => {
  auth.onAuthStateChanged(function (user) {
    uid = user.uid;
    cuando_hay_dispositivo((querySnapshot) => {
      const cant_disp = document.getElementById("cant_disp");
      cant_disp.innerHTML = `<span >${querySnapshot.docs.length}</span>`;

      card_dispositivo.innerHTML = "";
      querySnapshot.forEach((doc) => {
        dispositivos = doc.data();
        dispositivos.id = doc.id;

        /* arreglo.push(dispositivos.numero_dispositivo + 1);
        numero_dispositivo = maximo_id_std(arreglo); */

        card_dispositivo.innerHTML += `
                <div class="col-md-12 col-lg-6 col-xl-4">
                                    <div class="card-hover-shadow profile-responsive card-border border-success mb-3 card">
                                        <div class="dropdown-menu-header">
                                            <div class="dropdown-menu-header-inner bg-success">
                                                <div class="menu-header-content">
                                                    <div>
                                                        <h5 class="menu-header-title">Asignado a: ${
                                                          dispositivos.paciente
                                                        }</h5>
                                                        <h6 class="menu-header-subtitle">STD ID: [${
                                                          dispositivos.mac_dispositivo
                                                        }]</h6>
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
                                                                    
                                                                    <div class="widget-content-left flex2" style="margin-right: 5px;">
                                                                        <div class="widget-heading">CONTENEDOR 1</div>
                                                                        <div class="widget-subheading opacity-10">
                                                                            <span > Pastillas: <b class="text-primary">${
                                                                              dispositivos
                                                                                .contenedor_1
                                                                                .pastilla
                                                                            }</b></span>
                                                                            <br>
                                                                            <div class="text-center">${
                                                                              dispositivos
                                                                                .contenedor_1
                                                                                .stock_1
                                                                            } de 6</div>
                                                                            <div class="mb-3 progress">
                                                                                <div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="5" style="width: ${
                                                                                  dispositivos
                                                                                    .contenedor_1
                                                                                    .stock_1 *
                                                                                  16.67
                                                                                }%;"></div>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                    <div class="widget-content-right">
                                                                        <div class="btn-group-vertical" role="group" aria-label="Basic example">
                                                                            <button type="button" class="btn-transition btn btn-outline-success btn_abrir_dispositivo" data-id="${
                                                                              dispositivos.id
                                                                            }" value="1">Abrir</button>
                                                                            <button type="button" class="btn-transition btn btn-outline-success btn_rellenar" data-id="${
                                                                              dispositivos.id
                                                                            }" value="1">Rellenar</button>
                                                                            <button type="button" class="btn-transition btn btn-outline-success btn_vaciar" data-id="${
                                                                              dispositivos.id
                                                                            }" value="1">Vaciar</button>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <div class="widget-content p-0">
                                                                <div class="widget-content-wrapper">
                                                                    
                                                                    <div class="widget-content-left flex2" style="margin-right: 5px;">
                                                                        <div class="widget-heading">CONTENEDOR 2</div>
                                                                        <div class="widget-subheading opacity-10">
                                                                        <span > Pastillas: <b class="text-primary">${
                                                                          dispositivos
                                                                            .contenedor_2
                                                                            .pastilla_2
                                                                        }</b></span>
                                                                            <br>
                                                                            <div class="text-center">${
                                                                              dispositivos
                                                                                .contenedor_2
                                                                                .stock_2
                                                                            } de 10</div>
                                                                            <div class="mb-3 progress">
                                                                                <div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="5" style="width: ${
                                                                                  dispositivos
                                                                                    .contenedor_2
                                                                                    .stock_2 *
                                                                                  16.67
                                                                                }%;"></div>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                    <div class="widget-content-right">
                                                                        <div class="btn-group-vertical" role="group" aria-label="Basic example">
                                                                            <button type="button" class="btn-transition btn btn-outline-success btn_abrir_dispositivo"  data-id="${
                                                                              dispositivos.id
                                                                            }" value="2">Abrir</button>
                                                                            <button type="button" class="btn-transition btn btn-outline-success btn_rellenar" data-id="${
                                                                              dispositivos.id
                                                                            }" value="2">Rellenar</button>
                                                                            <button type="button" class="btn-transition btn btn-outline-success btn_vaciar" data-id="${
                                                                              dispositivos.id
                                                                            }" value="2">Vaciar</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li class="list-group-item">
                                                            <div class="widget-content p-0">
                                                                <div class="widget-content-wrapper">
                                                                    
                                                                    <div class="widget-content-left flex2" style="margin-right: 5px;">
                                                                        <div class="widget-heading">CONTENEDOR 3</div>
                                                                        <div class="widget-subheading opacity-10">
                                                                        <span > Pastillas: <b class="text-primary">${
                                                                          dispositivos
                                                                            .contenedor_3
                                                                            .pastilla_3
                                                                        }</b></span>
                                                                            <br>
                                                                            <div class="text-center">${
                                                                              dispositivos
                                                                                .contenedor_3
                                                                                .stock_3
                                                                            } de 10</div>
                                                                            <div class="mb-3 progress">
                                                                                <div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="5" style="width: ${
                                                                                  dispositivos
                                                                                    .contenedor_1
                                                                                    .stock_3 *
                                                                                  16.67
                                                                                }%;"></div>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                    <div class="widget-content-right">
                                                                        <div class="btn-group-vertical" role="group" aria-label="Basic example">
                                                                            <button type="button" class="btn-transition btn btn-outline-success btn_abrir_dispositivo" data-id="${
                                                                              dispositivos.id
                                                                            }" value="3">Abrir</button>
                                                                            <button type="button" class="btn-transition btn btn-outline-success btn_rellenar" data-id="${
                                                                              dispositivos.id
                                                                            }" value="3">Rellenar</button>
                                                                            <button type="button" class="btn-transition btn btn-outline-success btn_vaciar" data-id="${
                                                                              dispositivos.id
                                                                            }" value="3">Vaciar</button>
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
                                            <button class="btn-shadow-primary btn btn-primary btn-lg btn_ver_dispositivo" data-id="${
                                              dispositivos.id
                                            }" data-toggle="modal" data-target="#modal_dispositivo_detalle">Ver</button>

                                            <button class="btn-shadow-primary btn btn-warning btn-lg" >Editar</button>

                                            <button class="btn-shadow-primary btn btn-danger btn-lg btn_eliminar_dispositivo" data-id="${
                                              dispositivos.id
                                            }">Eliminar</button>
                                        </div>
                                    </div>
                                    
                                </div>
                `;
      });

      const btnsVer = document.querySelectorAll(".btn_ver_dispositivo");
      btnsVer.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          const doc = await editar_dispositivo(e.target.dataset.id);
          const data_dispositivos = doc.data();
          console.log("data", data_dispositivos);
          const pasciente_STD = document.getElementById("paciente_STD");
          pasciente_STD.innerHTML = `PACIENTE: <strong>${data_dispositivos.paciente}</strong> | STD: <strong>${data_dispositivos.id_paciente}</strong>`;
          tabla_detalle_dispositivo.innerHTML = "";
          tabla_detalle_dispositivo.innerHTML += `
                    <tr>
                        <td class="text-center" id="numero_std">Contenedor 1</td>
                        <td class="text-center" id="numero_std" name="pastilla">${data_dispositivos.contenedor_1.pastilla}</td>
                        <td class="text-center" id="numero_std" name="cada">${data_dispositivos.contenedor_1.frecuencia_de_pastillas_1} H</td>
                        <td class="text-center" id="numero_std" name="estado"></td>
                        <td class="text-center" id="numero_std" name="fecha_esperada">23/12/2020 20:56</td>
                        <td class="text-center" id="numero_std" name="fecha_tomada">23/12/2020 20:56</td>
                        <td class="text-center" id="numero_std" name="historial">Historial</td>
                    </tr>
                    <tr>
                        <td class="text-center" id="numero_std">Contenedor 2</td>
                        <td class="text-center" id="numero_std" name="pastilla">${data_dispositivos.contenedor_2.pastilla_2}</td>
                        <td class="text-center" id="numero_std" name="cada">${data_dispositivos.contenedor_2.frecuencia_de_pastillas_2} H</td>
                        <td class="text-center" id="numero_std" name="estado"></td>
                        <td class="text-center" id="numero_std" name="fecha_esperada">23/12/2020 20:56</td>
                        <td class="text-center" id="numero_std" name="fecha_tomada">23/12/2020 20:56</td>
                        <td class="text-center" id="numero_std" name="historial">Historial</td>
                    </tr>
                    <tr>
                        <td class="text-center" id="numero_std">Contenedor 3</td>
                        <td class="text-center" id="numero_std" name="pastilla"></td>
                        <td class="text-center" id="numero_std" name="cada"></td>
                        <td class="text-center" id="numero_std" name="estado"></td>
                        <td class="text-center" id="numero_std" name="fecha_esperada">23/12/2020 20:56</td>
                        <td class="text-center" id="numero_std" name="fecha_tomada">23/12/2020 20:56</td>
                        <td class="text-center" id="numero_std" name="historial">Historial</td>
                    </tr>
                    `;
        });
      });

      const btnsEliminar = document.querySelectorAll(
        ".btn_eliminar_dispositivo"
      );
      /* btnsEliminar.forEach(btn =>{
                    btn.addEventListener('click', async(e)=>{ 
                        console.log(e.target.dataset.id);
                        const doc =  await editar_dispositivo(e.target.dataset.id);
                        id = doc.id;
                        console.log("dispositivos.mac_dispositivo: ", dispositivos.mac_dispositivo);
                    
                    let conf = confirm("Esta seguro de eliminar el dispositivo ")
                    if (conf==true) {
                        console.log("Si",id);
                        const id_pac = doc.data().idNombrePaciente;

                        

                        let eliminando_MAC = db.collection("usuarios").doc("registros_MAC");
                        eliminando_MAC.update({
                                MACS: firebase.firestore.FieldValue.arrayRemove(dispositivos.mac_dispositivo)
                            });

                        // await actualizar_paciente(id_pac, {
                        //    dispositivos: ''
                        //}); 
                        await eliminar_dispositivo(id);

                       
                        //form_pacientes.reset();
                        alert("DISPOSITIVO ELIMINADO");
                    }
                    else{
                        alert("DISPOSITIVO NO ELIMINADO");
                    }
                    
                    })
                }); */

      /* CODIGO REHECHO */
      btnsEliminar.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          const doc = await editar_dispositivo(e.target.dataset.id);
          id = doc.id;
          console.log(
            "dispositivos.mac_dispositivo: ",
            dispositivos.mac_dispositivo
          );

          let conf = confirm("¿Está seguro de eliminar el dispositivo?");
          if (conf == true) {
            console.log("Sí", id);
            const id_pac = doc.data().idNombrePaciente;

            const mac_dispositivo = dispositivos.mac_dispositivo; // Valor de mac_dispositivo a eliminar
            const eliminando_MAC = db
              .collection("usuarios")
              .doc("registros_MAC");

            // Obtener la matriz actual de MACS
            const snapshot = await eliminando_MAC.get();
            const { MACS } = snapshot.data();

            // Filtrar la matriz para eliminar el objeto con el mac_dispositivo correspondiente
            const updatedMACS = MACS.filter(
              (obj) => obj.mac_dispositivo !== mac_dispositivo
            );

            // Actualizar la matriz MACS en la base de datos
            await eliminando_MAC.update({
              MACS: updatedMACS,
            });

            /* await actualizar_paciente(id_paciente, {
              dispositivos: id_paciente,
            }); */
            await eliminar_dispositivo(id);

            //form_pacientes.reset();
            alert("DISPOSITIVO ELIMINADO");
          } else {
            alert("DISPOSITIVO NO ELIMINADO");
          }
        });
      });

      const btnsAbrir = document.querySelectorAll(".btn_abrir_dispositivo");
      btnsAbrir.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          console.log(e.target.value);
          const doc = await editar_dispositivo(e.target.dataset.id);
          let estado_compuerta;
          let valor_btn = e.target.value;
          let data = doc.data();
          id = doc.id;
          //console.log(dispositivos.contenedor_1.estado_compuerta1);

          if (valor_btn == 1) {
            console.log(data.contenedor_1.estado_compuerta1);
            if (data.contenedor_1.estado_compuerta1) {
              estado_compuerta = false;
            } else {
              estado_compuerta = true;
            }
            console.log("Contenedor 1: ", estado_compuerta);
            await actualizar_dispositivo(id, {
              "contenedor_1.estado_compuerta1": estado_compuerta,
            });
          }

          if (valor_btn == 2) {
            console.log(data.contenedor_2.estado_compuerta2);
            if (data.contenedor_2.estado_compuerta2) {
              estado_compuerta = false;
            } else {
              estado_compuerta = true;
            }
            console.log("Contenedor 2: ", estado_compuerta);
            await actualizar_dispositivo(id, {
              "contenedor_2.estado_compuerta2": estado_compuerta,
            });
          }

          if (valor_btn == 3) {
            console.log(data.contenedor_3.estado_compuerta3);
            if (data.contenedor_3.estado_compuerta3) {
              estado_compuerta = false;
            } else {
              estado_compuerta = true;
            }
            console.log("Contenedor 3: ", estado_compuerta);
            await actualizar_dispositivo(id, {
              "contenedor_2.estado_compuerta2": estado_compuerta,
            });
          }
        });
      });

      const btnsRellenar = document.querySelectorAll(".btn_rellenar");
      btnsRellenar.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          console.log(e.target.value);
          const doc = await editar_dispositivo(e.target.dataset.id);
          let estado_compuerta;
          let valor_btn = e.target.value;
          let data = doc.data();
          id = doc.id;
          //console.log(dispositivos.contenedor_1.estado_compuerta1);

          if (valor_btn == 1) {
            db_grados = data.contenedor_1.grados;
            let db_stock = data.contenedor_1.stock_1;
            console.log("btn 1: " + db_grados + " Grados");

            if (db_grados >= 2500) {
              alert("Contenedor lleno");
            } else {
              //alert("El contenedor esta listo para empezar a ser cargado...")

              /* if (data.contenedor_1.estado_compuerta1) {
                                    estado_compuerta = true;
                                } else {
                                    estado_compuerta = true;
                                }

                                console.log('Contenedor 1: ', estado_compuerta);
                                await actualizar_dispositivo (id, {
                                
                                    'contenedor_1.estado_compuerta1' : estado_compuerta
                                 }); */

              if (db_grados <= 500) {
                /* await actualizar_dispositivo (id, {
                                        'contenedor_1.grados' : 501
                                    }); */
                alert("Completo");
              } else {
                db_grados -= 333;
                db_stock += 1;
                await actualizar_dispositivo(id, {
                  "contenedor_1.grados": db_grados,
                  "contenedor_1.stock_1": db_stock,
                });
                console.log("Act G: ", db_grados);
              }
            }

            console.log("Actualizado los grados");
          }

          if (valor_btn == 2) {
            db_grados = data.contenedor_2.grados;
            let db_stock = data.contenedor_2.stock_2;
            console.log("btn 1: " + db_grados + " Grados");

            if (db_grados >= 2500) {
              alert("Contenedor lleno");
            } else {
              //alert("El contenedor esta listo para empezar a ser cargado...")

              /* if (data.contenedor_1.estado_compuerta1) {
                                    estado_compuerta = true;
                                } else {
                                    estado_compuerta = true;
                                }

                                console.log('Contenedor 1: ', estado_compuerta);
                                await actualizar_dispositivo (id, {
                                
                                    'contenedor_1.estado_compuerta1' : estado_compuerta
                                 }); */

              if (db_grados <= 500) {
                /* await actualizar_dispositivo (id, {
                                        'contenedor_1.grados' : 501
                                    }); */
                alert("Completo");
              } else {
                db_grados -= 333;
                db_stock += 1;
                await actualizar_dispositivo(id, {
                  "contenedor_2.grados": db_grados,
                  "contenedor_2.stock_2": db_stock,
                });
                console.log("Act G: ", db_grados);
              }
            }

            console.log("Actualizado los grados");
          }

          if (valor_btn == 3) {
            db_grados = data.contenedor_3.grados;
            let db_stock = data.contenedor_3.stock_3;
            console.log("btn 1: " + db_grados + " Grados");

            if (db_grados >= 2500) {
              alert("Contenedor lleno");
            } else {
              //alert("El contenedor esta listo para empezar a ser cargado...")

              /* if (data.contenedor_1.estado_compuerta1) {
                                    estado_compuerta = true;
                                } else {
                                    estado_compuerta = true;
                                }

                                console.log('Contenedor 1: ', estado_compuerta);
                                await actualizar_dispositivo (id, {
                                
                                    'contenedor_1.estado_compuerta1' : estado_compuerta
                                 }); */

              if (db_grados <= 500) {
                /* await actualizar_dispositivo (id, {
                                        'contenedor_1.grados' : 501
                                    }); */
                alert("Completo");
              } else {
                db_grados -= 333;
                db_stock += 1;
                await actualizar_dispositivo(id, {
                  "contenedor_3.grados": db_grados,
                  "contenedor_3.stock_3": db_stock,
                });
                console.log("Act G: ", db_grados);
              }
            }

            console.log("Actualizado los grados");
          }
        });
      });

      const btnsVaciar = document.querySelectorAll(".btn_vaciar");
      btnsVaciar.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          console.log(e.target.value);
          const doc = await editar_dispositivo(e.target.dataset.id);
          let estado_compuerta;
          let valor_btn = e.target.value;
          let data = doc.data();
          id = doc.id;
          let db_grados;
          let db_stock_1 = data.contenedor_1.stock_1;
          let db_stock_2 = data.contenedor_2.stock_2;
          let db_stock_3 = data.contenedor_3.stock_3;
          //console.log(dispositivos.contenedor_1.estado_compuerta1);

          if (valor_btn == 1) {
            db_grados = data.contenedor_1.grados;
            console.log("btn 1: " + db_grados + " Grados");

            if (db_grados >= 2500) {
              alert("Contenedor lleno");
            } else {
              //alert("El contenedor esta listo para empezar a ser cargado...")

              /* if (data.contenedor_1.estado_compuerta1) {
                                    estado_compuerta = true;
                                } else {
                                    estado_compuerta = true;
                                }

                                console.log('Contenedor 1: ', estado_compuerta);
                                await actualizar_dispositivo (id, {
                                
                                    'contenedor_1.estado_compuerta1' : estado_compuerta
                                 }); */

              if (db_grados >= 500 && db_grados < 2498) {
                db_grados += 333;
                db_stock_1 -= 1;
                await actualizar_dispositivo(id, {
                  "contenedor_1.grados": db_grados,
                  "contenedor_1.stock_1": db_stock_1,
                });
                console.log("Act G: ", db_grados);
              } else {
                alert("Contenedor Vacio");
              }
            }

            console.log("Actualizado los grados");
          }

          if (valor_btn == 2) {
            db_grados = data.contenedor_2.grados;
            console.log("btn 1: " + db_grados + " Grados");

            if (db_grados >= 2500) {
              alert("Contenedor lleno");
            } else {
              //alert("El contenedor esta listo para empezar a ser cargado...")

              /* if (data.contenedor_1.estado_compuerta1) {
                                    estado_compuerta = true;
                                } else {
                                    estado_compuerta = true;
                                }

                                console.log('Contenedor 1: ', estado_compuerta);
                                await actualizar_dispositivo (id, {
                                
                                    'contenedor_1.estado_compuerta1' : estado_compuerta
                                 }); */

              if (db_grados >= 500 && db_grados < 2498) {
                db_grados += 333;
                db_stock_2 -= 1;
                await actualizar_dispositivo(id, {
                  "contenedor_2.grados": db_grados,
                  "contenedor_2.stock_2": db_stock_2,
                });
                console.log("Act G: ", db_grados);
              } else {
                alert("Contenedor Vacio");
              }
            }

            console.log("Actualizado los grados");
          }

          if (valor_btn == 3) {
            db_grados = data.contenedor_3.grados;
            console.log("btn 1: " + db_grados + " Grados");

            if (db_grados >= 2500) {
              alert("Contenedor lleno");
            } else {
              //alert("El contenedor esta listo para empezar a ser cargado...")

              /* if (data.contenedor_1.estado_compuerta1) {
                                    estado_compuerta = true;
                                } else {
                                    estado_compuerta = true;
                                }

                                console.log('Contenedor 1: ', estado_compuerta);
                                await actualizar_dispositivo (id, {
                                
                                    'contenedor_1.estado_compuerta1' : estado_compuerta
                                 }); */

              if (db_grados >= 500 && db_grados < 2498) {
                db_grados += 333;
                db_stock_3 -= 1;
                await actualizar_dispositivo(id, {
                  "contenedor_3.grados": db_grados,
                  "contenedor_3.stock_3": db_stock_3,
                });
                console.log("Act G: ", db_grados);
              } else {
                alert("Contenedor Vacio");
              }
            }

            console.log("Actualizado los grados");
          }
        });
      });
    });
  });
});

//Funcion que guarda datos del form de pacientes y enviandolos a firestore
const form_dispositivo = document.getElementById("form_dispositivo");
const guardar_dispositivo = (
  //numero_dispositivo,
  id_paciente,
  idNombrePaciente,
  paciente,
  mac_dispositivo,
  contenedor_1,
  pastilla,
  stock_1,
  estado_compuerta1,
  estado_dispensar1,
  frecuencia_de_pastillas_1,
  dia_inicio_pastilla,
  hora_inicio_pastilla,
  t_tratamiento_1,
  grados,

  contenedor_2,
  pastilla_2,
  stock_2,
  estado_compuerta2,
  estado_dispensar2,
  frecuencia_de_pastillas_2,
  dia_inicio_pastilla_2,
  hora_inicio_pastilla_2,
  t_tratamiento_2,

  contenedor_3,
  pastilla_3,
  stock_3,
  estado_compuerta3,
  estado_dispensar3,
  frecuencia_de_pastillas_3,
  dia_inicio_pastilla_3,
  hora_inicio_pastilla_3,
  t_tratamiento_3
) =>
  db
    .collection("usuarios")
    .doc(uid)
    .collection("datos_dispositivos")
    .doc()
    .set({
      //numero_dispositivo,
      id_paciente,
      idNombrePaciente,
      paciente,
      mac_dispositivo,
      contenedor_1: {
        pastilla,
        stock_1,
        estado_compuerta1,
        estado_dispensar1,
        frecuencia_de_pastillas_1,
        dia_inicio_pastilla,
        hora_inicio_pastilla,
        t_tratamiento_1,
        grados,
      },
      contenedor_2: {
        pastilla_2,
        stock_2,
        estado_compuerta2,
        estado_dispensar2,
        frecuencia_de_pastillas_2,
        dia_inicio_pastilla_2,
        hora_inicio_pastilla_2,
        t_tratamiento_2,
        grados,
      },
      contenedor_3: {
        pastilla_3,
        stock_3,
        estado_compuerta3,
        estado_dispensar3,
        frecuencia_de_pastillas_3,
        dia_inicio_pastilla_3,
        hora_inicio_pastilla_3,
        t_tratamiento_3,
        grados,
      },
    });

function maximo_id_std(arreglo) {
  /* console.log("Max");
    console.log(arreglo); */
  return Math.max.apply(null, arreglo);
}

const pas = async () => {
  cuando_hay_pacientes((querySnapshot) => {
    document.getElementById("id_paciente").innerHTML = "";
    querySnapshot.forEach((doc) => {
      paciente = doc.data();
      if (paciente.dispositivos.length == 0) {
        console.log("paciente.dispositivos: ", paciente.dispositivos);
        console.log("paciente: ", paciente);
        document.getElementById("id_paciente").innerHTML += `
            <option value="${doc.id}">${paciente.nombre} ${paciente.apellido}</option>
            `;
      }
    });
  });

  cuando_hay_dispositivo((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc);
      var macs_registradas = doc.data();
      //console.log('MAC REGISTRADAS: ', macs_registradas.mac_dispositivo);
    });
  });

  let registrando_PASTILLAS = db
    .collection("usuarios")
    .doc(uid)
    .collection("pastillas")
    .doc("registros_pastillas");
  let agregando_sino_esta = await db
    .collection("usuarios")
    .doc(uid)
    .collection("pastillas")
    .doc("registros_pastillas")
    .get();
  console.log("R: ", agregando_sino_esta.exists);
  if (agregando_sino_esta.exists == false) {
    registrando_PASTILLAS.set({
      PASTILLAS: firebase.firestore.FieldValue.arrayUnion({
        nombre_pastilla: "Iboprufen",
        miligramos: "600",
        nota_pastillas: "",
      }),
    });
  }

  document.getElementById("id_pastilla_1").innerHTML = "";
  document.getElementById("id_pastilla_2").innerHTML = "";
  document.getElementById("id_pastilla_3").innerHTML = "";

  const db_cons_pastillas = await db
    .collection("usuarios")
    .doc(uid)
    .collection("pastillas")
    .doc("registros_pastillas")
    .get();
  console.log("PASTILLAS: ", db_cons_pastillas.data().PASTILLAS);
  let array_pastillas = db_cons_pastillas.data().PASTILLAS;

  document.getElementById(
    "id_pastilla_1"
  ).innerHTML += `<option value="" disabled selected>Seleccione...</option> `;
  document.getElementById(
    "id_pastilla_2"
  ).innerHTML += `<option value="" disabled selected>Seleccione...</option> `;
  document.getElementById(
    "id_pastilla_3"
  ).innerHTML += `<option value="" disabled selected>Seleccione...</option> `;

  array_pastillas.forEach((db_pastilla) => {
    console.log(db_pastilla.nombre_pastilla);

    document.getElementById("id_pastilla_1").innerHTML += `
        <option>${db_pastilla.nombre_pastilla} (${db_pastilla.miligramos})mg </option>
        `;
    document.getElementById("id_pastilla_2").innerHTML += `
        <option>${db_pastilla.nombre_pastilla} (${db_pastilla.miligramos})mg</option>
        `;
    document.getElementById("id_pastilla_3").innerHTML += `
        <option>${db_pastilla.nombre_pastilla} (${db_pastilla.miligramos})mg</option>
        `;
  });
};

function buscando_id_paciente() {
  cuando_hay_pacientes((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      idNombrePaciente = doc.id;
      console.log("Buscando ID paciente ", idNombrePaciente);
    });
  });
}

const checkbox_contenedor_2 = document.getElementById("checkbox_contenedor_2");
const checkbox_contenedor_3 = document.getElementById("checkbox_contenedor_3");

checkbox_contenedor_2.addEventListener("click", function () {
  if (checkbox_contenedor_2.checked) {
    document.getElementById("id_pastilla_2").removeAttribute("disabled");
    document
      .getElementById("frecuencia_de_pastillas_2")
      .removeAttribute("disabled");
    document
      .getElementById("dia_inicio_pastilla_2")
      .removeAttribute("disabled");
    document
      .getElementById("hora_inicio_pastilla_2")
      .removeAttribute("disabled");
    document.getElementById("t_tratamiento_2").removeAttribute("disabled");
    document.getElementById("fecha_v_2").removeAttribute("disabled");
  } else {
    document
      .getElementById("id_pastilla_2")
      .setAttribute("disabled", "required");
    document
      .getElementById("frecuencia_de_pastillas_2")
      .setAttribute("disabled", "required");
    document
      .getElementById("dia_inicio_pastilla_2")
      .setAttribute("disabled", "required");
    document
      .getElementById("hora_inicio_pastilla_2")
      .setAttribute("disabled", "required");
    document
      .getElementById("t_tratamiento_2")
      .setAttribute("disabled", "required");
    document.getElementById("fecha_v_2").setAttribute("disabled", "required");
  }
});

checkbox_contenedor_3.addEventListener("click", function () {
  if (checkbox_contenedor_3.checked) {
    document.getElementById("id_pastilla_3").removeAttribute("disabled");
    document
      .getElementById("frecuencia_de_pastillas_3")
      .removeAttribute("disabled");
    document
      .getElementById("dia_inicio_pastilla_3")
      .removeAttribute("disabled");
    document
      .getElementById("hora_inicio_pastilla_3")
      .removeAttribute("disabled");
    document.getElementById("t_tratamiento_3").removeAttribute("disabled");
    document.getElementById("fecha_v_3").removeAttribute("disabled");
  } else {
    document
      .getElementById("id_pastilla_3")
      .setAttribute("disabled", "required");
    document
      .getElementById("frecuencia_de_pastillas_3")
      .setAttribute("disabled", "required");
    document
      .getElementById("dia_inicio_pastilla_3")
      .setAttribute("disabled", "required");
    document
      .getElementById("hora_inicio_pastilla_3")
      .setAttribute("disabled", "required");
    document
      .getElementById("t_tratamiento_3")
      .setAttribute("disabled", "required");
    document.getElementById("fecha_v_3").setAttribute("disabled", "required");
  }
});

async function agregar_pastillas() {
  const nombre_pastilla = document.getElementById("nombre_pastilla").value;
  const mg_pastillas = document.getElementById("mg_pastillas").value;
  const nota_pastillas = document.getElementById("nota_pastillas").value;

  if (nombre_pastilla == "" || mg_pastillas == "") {
    alert("Debe llenar los campos obligatorios");
  } else {
    const consultando_pastillas = await db
      .collection("usuarios")
      .doc(uid)
      .collection("pastillas")
      .doc("registros_pastillas")
      .get();
    console.log("PASTILLAS: ", consultando_pastillas.data().PASTILLAS);
    let array_pastillas = consultando_pastillas.data().PASTILLAS;
    array_pastillas.forEach((db_pastilla) => {
      console.log(db_pastilla.nombre_pastilla);

      if (
        db_pastilla.nombre_pastilla == nombre_pastilla &&
        db_pastilla.miligramos == mg_pastillas
      ) {
        estado_reg_pastilla = true;
        alert("Pastilla existente");
      }
    });
    if (estado_reg_pastilla == false) {
      let registrando_PASTILLAS = db
        .collection("usuarios")
        .doc(uid)
        .collection("pastillas")
        .doc("registros_pastillas");
      registrando_PASTILLAS.update({
        PASTILLAS: firebase.firestore.FieldValue.arrayUnion({
          nombre_pastilla: nombre_pastilla,
          miligramos: mg_pastillas,
          nota_pastillas: nota_pastillas,
        }),
      });

      const db_cons_pastillas = await db
        .collection("usuarios")
        .doc(uid)
        .collection("pastillas")
        .doc("registros_pastillas")
        .get();
      document.getElementById("id_pastilla_1").innerHTML = "";
      document.getElementById("id_pastilla_2").innerHTML = "";
      document.getElementById("id_pastilla_3").innerHTML = "";
      let array_pastillas = db_cons_pastillas.data().PASTILLAS;

      document.getElementById(
        "id_pastilla_1"
      ).innerHTML += `<option value="" disabled selected>Seleccione...</option> `;
      document.getElementById(
        "id_pastilla_2"
      ).innerHTML += `<option value="" disabled selected>Seleccione...</option> `;
      document.getElementById(
        "id_pastilla_3"
      ).innerHTML += `<option value="" disabled selected>Seleccione...</option> `;

      array_pastillas.forEach((db_pastilla) => {
        document.getElementById("id_pastilla_1").innerHTML += `
                                    <option>${db_pastilla.nombre_pastilla} (${db_pastilla.miligramos})mg </option>
                                    `;
        document.getElementById("id_pastilla_2").innerHTML += `
                                    <option>${db_pastilla.nombre_pastilla} (${db_pastilla.miligramos})mg</option>
                                    `;
        document.getElementById("id_pastilla_3").innerHTML += `
                                    <option>${db_pastilla.nombre_pastilla} (${db_pastilla.miligramos})mg</option>
                                    `;
      });

      alert("Agregado correctamente");
    } else {
      alert("Error al procesar la solicitud");
    }

    estado_reg_pastilla = false;

    form_agregar_pastillas.reset();
  }
}
