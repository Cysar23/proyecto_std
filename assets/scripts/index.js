const db = firebase.firestore();
//FUNCIONES DE FIREBASE
const obtener_dispositivos = () =>
  db.collection("usuarios").doc(uid).collection("datos_dispositivos").get();

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

const cuando_hay_enfermeras = (callback) =>
  db
    .collection("usuarios")
    .doc(uid)
    .collection("datos_enfermeras")
    .onSnapshot(callback);

const cuando_hay_pastillas = (callback) =>
  db
    .collection("usuarios")
    .doc(uid)
    .collection("pastillas")
    .onSnapshot(callback);

const time_line = document.getElementById("time_line");
const cantidad_pacientes = document.getElementById("cantidad_pacientes");
const cantidad_enfermeras = document.getElementById("cantidad_enfermeras");
const cantidad_equipos = document.getElementById("cantidad_equipos");
const contenedores_agotarse = document.getElementById("contenedores_agotarse");
const tomas_recientes = document.getElementById("tomas_recientes");

window.addEventListener("DOMContentLoaded", async (e) => {
  auth.onAuthStateChanged(function (user) {
    uid = user.uid;
    cuando_hay_pacientes((querySnapshot) => {
      cantidad_pacientes.innerHTML = `${querySnapshot.docs.length}`;
    });
    cuando_hay_enfermeras((querySnapshot) => {
      cantidad_enfermeras.innerHTML = `${querySnapshot.docs.length}`;
    });
    cuando_hay_dispositivo((querySnapshot) => {
      cantidad_equipos.innerHTML = `${querySnapshot.docs.length}`;
      const fechaHoraHoy = new Date();
      let alarmasProximas = [];
      let alarmasPasadas = [];

      time_line.innerHTML = "";

      if (querySnapshot.docs.length == 0) {
        time_line.innerHTML = `
              <div class="vertical-timeline-item dot-warning vertical-timeline-element">
              <div>
                  <span class="vertical-timeline-element-icon bounce-in"></span>
                  <div class="vertical-timeline-element-content bounce-in">
                      <p>
                          <span class="text-danger">No hay tomas programadas</span>
                          
                      </p>
                      </div>
                  </div>
              </div>
              `;
              contenedores_agotarse.innerHTML = `
            <tr><td class="text-center text-danger">No hay tomas programadas</td></tr>
            `;
      }

      querySnapshot.forEach((doc) => {
        const dispositivos = doc.data();
        dispositivos.id = doc.id;
        //console.log(dispositivos.contenedor_1.alarmas)
        if (dispositivos.contenedor_1.alarmas === undefined) {
          console.log("undefined")
        }
        if (dispositivos.contenedor_1.alarmas != undefined) {
          let a = Object.values(dispositivos.contenedor_1.alarmas);
          for (let index = 0; index < a.length; index++) {
            let fechaHoraToma = new Date(a[index].fechaHora);
            let tiempo_espera = fechaHoraToma.getTime() - fechaHoraHoy;

            if (tiempo_espera > 0) {
              alarmasProximas.push({
                fechaHora: a[index].fechaHora,
                paciente: dispositivos.paciente,
                pastilla: dispositivos.contenedor_1.pastilla,
                estado: a[index].estado,
                tiempoEspera: tiempo_espera,
              });
            }else{
                alarmasPasadas.push({
                    fechaHora: a[index].fechaHora,
                    paciente: dispositivos.paciente,
                    pastilla: dispositivos.contenedor_1.pastilla,
                    estado: a[index].estado,
                    tiempoEspera: tiempo_espera,
                  });
            }
          }
        }
        if (dispositivos.contenedor_2.alarmas != undefined) {
          let a = Object.values(dispositivos.contenedor_2.alarmas);
          for (let index = 0; index < a.length; index++) {
            let fechaHoraToma = new Date(a[index].fechaHora);
            let tiempo_espera = fechaHoraToma.getTime() - fechaHoraHoy;

            if (tiempo_espera > 0) {
              alarmasProximas.push({
                fechaHora: a[index].fechaHora,
                paciente: dispositivos.paciente,
                pastilla: dispositivos.contenedor_2.pastilla_2,
                estado: a[index].estado,
                tiempoEspera: tiempo_espera,
              });
            }
          }
        }
        if (dispositivos.contenedor_3.alarmas != undefined) {
          let a = Object.values(dispositivos.contenedor_3.alarmas);
          for (let index = 0; index < a.length; index++) {
            let fechaHoraToma = new Date(a[index].fechaHora);
            let tiempo_espera = fechaHoraToma.getTime() - fechaHoraHoy;

            if (tiempo_espera > 0) {
              alarmasProximas.push({
                fechaHora: a[index].fechaHora,
                paciente: dispositivos.paciente,
                pastilla: dispositivos.contenedor_3.pastilla_3,
                estado: a[index].estado,
                tiempoEspera: tiempo_espera,
              });
            }
          }
        }

        // Ordena las alarmas por tiempo de espera
        alarmasProximas.sort((a, b) => a.tiempoEspera - b.tiempoEspera);
        alarmasPasadas.sort((a, b) => b.tiempoEspera - a.tiempoEspera);
        
        // Limita la salida a solo las primeras 5 alarmas
        alarmasProximas = alarmasProximas.slice(0, 2);
        alarmasPasadas = alarmasPasadas.slice(0, 2);
        // Limpia el contenido antes de agregar nuevas alarmas
        if (alarmasProximas.length == 0) {
            time_line.innerHTML = `
                  <div class="vertical-timeline-item dot-warning vertical-timeline-element">
                  <div>
                      <span class="vertical-timeline-element-icon bounce-in"></span>
                      <div class="vertical-timeline-element-content bounce-in">
                          <p>
                              <span class="text-danger">No hay tomas programadas</span>
                              
                          </p>
                          </div>
                      </div>
                  </div>
                  `;
          }

        // Agrega las alarmas al timeline
        alarmasProximas.forEach((alarma) => {
          time_line.innerHTML += `
                <div class="vertical-timeline-item dot-warning vertical-timeline-element">
                    <div>
                        <span class="vertical-timeline-element-icon bounce-in"></span>
                        <div class="vertical-timeline-element-content bounce-in">
                            <p>
                                <span class="text-success">${alarma.fechaHora}</span>
                                : ${alarma.paciente}, ${alarma.pastilla}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });

        // Agrega las alarmas pasadas
        tomas_recientes.innerHTML = "";
        alarmasPasadas.forEach((alarma) => {
          console.log(alarma)
            const nombreCompleto = alarma.paciente;
            const fechaCompleto = alarma.fechaHora;
            const pastillaCompleto = alarma.pastilla;
          const partesNombre = nombreCompleto.split(" ");
          const partesFechaHora = fechaCompleto.split(" ");
          const partesPastillas = pastillaCompleto.split(" ");
          const nombre = partesNombre[0];
          const apellido = partesNombre[1];
          const fecha = partesFechaHora[0];
          const hora = partesFechaHora[1]
          const pastilla = partesPastillas[0]
            tomas_recientes.innerHTML += `
            <tr>
            <td class="text-center">
            ${fecha} <br> ${hora}
            </td>
            <td class="text-center">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left flex2">
                    <div class="widget-heading">${nombre}</div>
                    <div class="widget-subheading opacity-7">
                      ${apellido}
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td class="text-center">${pastilla}</td>
            <td class="text-center">${alarma.estado}</td>
          </tr>
              `;
          });


        console.log(dispositivos.contenedor_1.stock_1);
        //COntenedor porximo a aagotarse
        contenedores_agotarse.innerHTML = "";
        if (dispositivos.contenedor_1.stock_1 <= 4) {
          
          const nombreCompleto = dispositivos.paciente;
          const partesNombre = nombreCompleto.split(" ");
          const nombre = partesNombre[0];
          const apellido = partesNombre[1];

          const porciento_stock_1 = Math.floor((dispositivos.contenedor_1.stock_1 / 12) * 100)

          contenedores_agotarse.innerHTML += `
            <tr>
            <td>
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left flex2">
                    <div class="widget-heading w-10">${
                        nombre
                    }</div>
                    <div class="widget-subheading opacity-7">${apellido}</div>
                  </div>
                </div>
              </div>
            </td>
            <td class="text-center">1 [AZUL]</td>
            <td class="text-center">
              <div class="badge badge-pill badge-warning">
                ${dispositivos.contenedor_1.stock_1}/12
              </div>
            </td>
            <td class="text-center" style="width: 200px">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left pr-2">
                      <div
                        class="widget-numbers fsize-1 text-danger"
                      >
                        
                        ${porciento_stock_1}%
                      </div>
                    </div>
                    <div class="widget-content-right w-100">
                      <div class="progress-bar-xs progress">
                        <div
                          class="progress-bar bg-danger"
                          role="progressbar"
                          aria-valuenow="71"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style="width: ${porciento_stock_1}%"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
            `;
        }

        if (dispositivos.contenedor_2.stock_2 <= 4) {

          const nombreCompleto = dispositivos.paciente;
          const partesNombre = nombreCompleto.split(" ");
          const nombre = partesNombre[0];
          const apellido = partesNombre[1];

          const porciento_stock_2 = Math.floor((dispositivos.contenedor_2.stock_2 / 12) * 100)

          contenedores_agotarse.innerHTML += `
            <tr>
            <td>
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left flex2">
                    <div class="widget-heading w-10">${
                        nombre
                    }</div>
                    <div class="widget-subheading opacity-7">${apellido}</div>
                  </div>
                </div>
              </div>
            </td>
            <td class="text-center">2 [ROJO]</td>
            <td class="text-center">
              <div class="badge badge-pill badge-warning">
                ${dispositivos.contenedor_2.stock_2}/12
              </div>
            </td>
            <td class="text-center" style="width: 200px">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left pr-2">
                      <div
                        class="widget-numbers fsize-1 text-danger"
                      >
                        
                        ${porciento_stock_2}%
                      </div>
                    </div>
                    <div class="widget-content-right w-100">
                      <div class="progress-bar-xs progress">
                        <div
                          class="progress-bar bg-danger"
                          role="progressbar"
                          aria-valuenow="71"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style="width: ${porciento_stock_2}%"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
            `;
        }

        if (dispositivos.contenedor_3.stock_3 <= 4) {

          const nombreCompleto = dispositivos.paciente;
          const partesNombre = nombreCompleto.split(" ");
          const nombre = partesNombre[0];
          const apellido = partesNombre[1];

          const porciento_stock_3 = Math.floor((dispositivos.contenedor_3.stock_3 / 12) * 100)

          contenedores_agotarse.innerHTML += `
            <tr>
            <td>
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left flex2">
                    <div class="widget-heading w-10">${
                        nombre
                    }</div>
                    <div class="widget-subheading opacity-7">${apellido}</div>
                  </div>
                </div>
              </div>
            </td>
            <td class="text-center">3 [VERDE]</td>
            <td class="text-center">
              <div class="badge badge-pill badge-warning">
                ${dispositivos.contenedor_3.stock_3}/12
              </div>
            </td>
            <td class="text-center" style="width: 200px">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left pr-2">
                      <div
                        class="widget-numbers fsize-1 text-danger"
                      >
                        
                        ${porciento_stock_3}%
                      </div>
                    </div>
                    <div class="widget-content-right w-100">
                      <div class="progress-bar-xs progress">
                        <div
                          class="progress-bar bg-danger"
                          role="progressbar"
                          aria-valuenow="71"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style="width: ${porciento_stock_3}%"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
            `;
        }


      });
    });
  });
});
