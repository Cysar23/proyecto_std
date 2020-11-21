
function modal(par) {
    console.log(par.id);
/* 
    if(par.id == 'mod1'){
        let id = 'mod1';
    }else if(a){

    } */
        document.getElementById(par.id).innerHTML = `
        
                    
                        <div class="form-row">
                            <div class="col-md-6 mb-3">
                                <label for="validationCustom01">Nombre</label>
                                <input type="text" class="form-control" id="validationCustom01" placeholder="Nombre"  required="">
                                
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="validationCustom02">Apellido</label>
                                <input type="text" class="form-control" id="validationCustom02" placeholder="Apellido"  required="">
                                
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="validationCustomUsername">Fecha de nacimiento</label>
                                <input type="date" class="form-control" id="validationDate"  required="">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="validationCustom04">Parentesco</label>
                                <select name="custom-select-dip" id="exampleSelectParen" class="form-control" required="">
                                    <option></option>
                                    <option>Paciente</option>
                                    <option>Madre</option>
                                    <option>Padre</option>
                                    <option>Hija</option>
                                    <option>Hijo</option>
                                    <option>Hermana</option>
                                    <option>Hermano</option>
                                    <option>Otros</option>
                                </select>
                                
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="validationCustom03">Dirección</label>
                                <input type="text" class="form-control" id="validationCustom03" placeholder="Dirección" required="">
                                
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="validationCustom04">Ciudad</label>
                                <input type="text" class="form-control" id="validationCustom04" placeholder="Ciudad" required="">
                                
                            </div>
                            
                            
                            <div class="col-md-6 mb-3">
                                <label for="validationCustom04">Enfermedades</label>
                                
                                
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="validationCustom04">Dispsitivo</label>
                                <select name="custom-select-dip" id="exampleSelect" class="form-control" required="">
                                    
                                    <option>1</option>
                                    <!-- <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option> -->
                                </select>
                                <p id="label_dispositivo" style="color: red; font-size: 10px;"></p>
                                
                            </div>
                            
                        </div>
                        
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" >Cerrar</button>
                        <button  class="btn btn-primary" type="submit">Agregar</button>
                    
                
        `;

    let disp = document.getElementById("exampleSelect");

    if(disp.value == ''){
        document.getElementById("exampleSelect").innerHTML = " <option disabled='disabled'>No tiene dispositivos</option>" 
    }
        
    
}