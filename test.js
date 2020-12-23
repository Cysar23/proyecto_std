
const db = firebase.firestore(); 

const usersDb = db.collection('users'); 
const liam = usersDb.doc();
const leerUser = (callback) => db.collection('users').onSnapshot(callback);
const editarUser= (id) => db.collection('users').doc(id).get();
const cuando_hay_dispositivo = (callback) => db.collection('users').doc('4CPHti2BqsUp8ZE8MsOZ').collection('dispositivo').onSnapshot(callback);


card_dispositivo = document.getElementById('card_dispositivos')

async function guardar(){
	await liam.set({
		nombre: 'Cesar',
		apellido: 'Rodriguez'
	});
	   alert('guardado...');
	   leer();
}
async function editar() {
	/* let id =[];
	let i=0; */
	leerUser((querySnapshot)=>{
        querySnapshot.forEach(doc =>{
			const data = doc.data();
			id = doc.id;
			/* i +=1; */
		})
		

		db.collection('users').doc(id).collection('dispositivo').doc('disp_cont').set({
				id: 1,
				fecha: '23/09/2020',
				hora: '8:00',
				contenedores: {
					numero: 1,
					pastilla: 'Tt',
					hora_pastilla: '4'
			    }

  		})

	})
	leer();
}
async function borrar(){
	leerUser((querySnapshot)=>{
        querySnapshot.forEach(doc =>{
			id = doc.id;
		})
		
	})
	await db.collection('users').doc(id).delete();
	   alert('Nada.');
}
async function leer() {

	console.log(db.collection('users').doc().collection('dispositivos'));

	leerUser((querySnapshot)=>{
        querySnapshot.forEach(doc =>{
			data = doc.data();
			id = doc.id;
			console.log('ID->',id);
			console.log('DATA->', data);
        })

	})

	
}



/* const btnsEliminar = document.querySelectorAll('.btn_eliminar_dispositivo');
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
			}); */
			
window.addEventListener('DOMContentLoaded', async(e) =>{
    leerUser((querySnapshot)=>{
        querySnapshot.forEach(doc =>{
            users = doc.data();
			users.id = doc.id;
            console.log(users);

		})
	})
	cuando_hay_dispositivo((querySnapshot)=>{
		querySnapshot.forEach(doc =>{
			dat = doc.data();
			console.log(dat);

		})
	})

        
        
        

    
})