//Los ID}
const formulario = document.querySelector("#formulario");
const input = document.getElementById("input");
const listaTarea = document.getElementById("lista-tareas");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();//Se puede usar el mismo fragment en todo el codigo, es volatil
let tareas = {};

//Detectar los eventos:
listaTarea.addEventListener("click", e =>{
//Se podria escribir aqui toda la logica pero le pasaremos una funcion
btnAccion(e);
})

document.addEventListener("DOMContentLoaded", () => {
if(localStorage.getItem("tareas")){//si esto existe, es decir que hay tareas almacenadas entrara a nuestro if 
    tareas = JSON.parse(localStorage.getItem("tareas"))//se parsea ya que localstorage guarda strings.
}
pintarTareas();
})
//Detectar el boton:
formulario.addEventListener("submit", event =>{//El evento submit
    event.preventDefault()
//    console.log(event.target[0].value)
   //Otra alternativa
//    console.log(event.target.querySelector("input").value)
   //Otra alternativa
//    console.log(input.value)//Ya que ya lo tenemos capturado con GetElementbyId
 
    setTareas(event);
})

const setTareas = e => {
//Validamos el formulario:
if(input.value.trim() === ""){
console.log("llenar campos")
return;//Para no seguir con el codigo si se cumple la condicion
}
//Construimos el objeto
const tarea = {
    id: Date.now(),
    texto: input.value,
    estado: false
}
//empujamos en esa coleccion de tareas la tarea en cuestion y lo hacemos indicando su indice
tareas[tarea.id] = {...tarea};

pintarTareas();
// console.log(tareas)

formulario.reset();//Cuando el usuario escriba y aprete el boton desaparecera lo que escribio(se reinicia el form)
input.focus();//Luego de dar click al boton seguira apareciendo para escribir en el input


}

const pintarTareas = () => {
    localStorage.setItem("tareas", JSON.stringify(tareas))
if(Object.values(tareas).length == 0){
    listaTarea.innerHTML = `<div class="alert alert-dark text-center">
    No hay tareas pendientes 😎
</div>`
    return //Cortar la accion cuando el length del objeto este vacio
}
    listaTarea.innerHTML = ""//Para que no se pinten de nuevo las tareas anteriores cuando se agrega una
Object.values(tareas).forEach(task =>{
    //Primero siempre se realiza el clon del template, luego se modifica
const clone = template.cloneNode(true);
clone.querySelector("p").textContent = task.texto;//El texto refiere al input.value del objeto

//Cuando el estado de tareas cambia a true podemos realizar las siguientes modificaciones
if(task.estado){
clone.querySelector(".alert").classList.replace("alert-warning", "alert-primary");
clone.querySelectorAll(".fas")[0].classList.replace("fa-check-circle", "fa-undo-alt");
clone.querySelector("P").style.textDecoration = "Line-through"//Tachar el texto de la lista cuando apretamos el boton


}
//Pasarle un id a los botones de sumar y restar
clone.querySelectorAll(".fas")[0].dataset.id = task.id
clone.querySelectorAll(".fas")[1].dataset.id = task.id
fragment.appendChild(clone)
})
listaTarea.appendChild(fragment);

}

const btnAccion = event =>{
if(event.target.classList.contains("fa-check-circle")){
// console.log(event.target.dataset.id)
//Cuando se apreta el estado cambia a true
tareas[event.target.dataset.id].estado = true
pintarTareas()
// console.log(tareas)
}
// Boton para eliminar las tareas
if(event.target.classList.contains("fa-minus-circle")){
delete tareas[event.target.dataset.id]
pintarTareas()

}
if(event.target.classList.contains("fa-undo-alt")){
 tareas[event.target.dataset.id].estado = false
 pintarTareas();
}
  
event.stopPropagation() 
   }