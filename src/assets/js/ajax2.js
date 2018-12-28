// $(window).on('ready',getTasks);
var agendas;
function getTasks(){
    $.ajax({
        url: "https://its-tasks-manager.herokuapp.com/API/getTasks",
        type: "POST",
        data: null,
        success: function(response){
            // console.log("getTasks()");
            // console.log(response);
            agendas = response.Agenda;
            llenarTabla(agendas);
            // return response.Agenda;
        }
    });
}

function addTask(){
    // console.log("Dentro de AddTask");
    var name = $("[name='name']").val();
    var description = $("[name='description']").val();
    var task = {
        name: name,
        description: description
    };
    console.log(task);
    $.ajax({
        url: "https://its-tasks-manager.herokuapp.com/API/addTask",
        type: "POST",
        data: task,
        success: function(response){
            console.log("Creacion de tarea exitosa");
            getTasks();
            $("[name='name']").val('');
            $("[name='description']").val('');
        }
    });
}


// Funcion para llenar tablas
function llenarTabla(_agendas) {
    var stateAgenda;
    var miTabla = document.getElementById("miTabla");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("id","body");
    miTabla.removeChild(miTabla.lastChild);
    for (var i = 0; i < _agendas.length; i++) {
        var tr = document.createElement("tr");
        
        stateAgenda = _agendas[i].state;

        var tdNumero = document.createElement("td");
        tdNumero.innerHTML = (i + 1).toString();

        var tdName = document.createElement("td");
        tdName.innerHTML = _agendas[i].name;

        var tdDescription = document.createElement("td");
        tdDescription.innerHTML = _agendas[i].description;

        var tdState = document.createElement("td");
        tdState.innerHTML = _agendas[i].state;

        var divBtn = document.createElement("div");
        divBtn.setAttribute("class","text-center d-flex justify-content-between")

        var tdBtnSuccess = document.createElement("button");
        tdBtnSuccess.setAttribute("id", i + 1);
        tdBtnSuccess.setAttribute("class", "btn btn-dark m-1");
        tdBtnSuccess.setAttribute("onclick", "changeState(this)");
        
        var tdBtnDelete = document.createElement("button");
        tdBtnDelete.setAttribute("id", i + 1);
        tdBtnDelete.setAttribute("class", "btn btn-warning m-1");
        tdBtnDelete.setAttribute("onclick", "removeTask(this)");
        // tr.setAttribute("class", "text-white");
        // tr.style.backgroundColor = 'rgb(231, 124, 82)';
        tdBtnDelete.innerHTML = "Eliminar";
        divBtn.append(tdBtnSuccess);
        divBtn.append(tdBtnDelete);

        tr.append(tdNumero);
        tr.append(tdName);
        tr.append(tdDescription);
        // tr.append(tdBtnSuccess);
        // tr.append(tdBtnDelete);
        tr.append(divBtn);
        tbody.append(tr);

        if (stateAgenda == "Pendiente") {
            tr.setAttribute("class", "text-white");
            tr.style.backgroundColor = 'rgb(231, 124, 82)';
            tdBtnSuccess.innerHTML = "Pendiente";
        }
        else {
            tr.setAttribute("class", "text-white ");
            tr.style.backgroundColor = 'rgb(53, 120, 207)';
            tdBtnSuccess.innerHTML = "Hecho";
            // tdBtnSuccess.setAttribute("disabled", "true");
        }
        
    }
    miTabla.append(tbody);
}

function changeState(btn){
    var _id = agendas[btn.id-1]._id;
    var state = agendas[btn.id-1].state;
    if(state == "Pendiente"){state = "Hecho";}
    else{state = "Pendiente";}
    $.ajax({
        url: "https://its-tasks-manager.herokuapp.com/API/editTask/"+_id,
        type: "PUT",
        data: {state: state},
        success: function(response){
            getTasks();
        }
    });
}

function removeTask(btn){
    var _id = agendas[btn.id-1]._id;
    $.ajax({
        url: "https://its-tasks-manager.herokuapp.com/API/removeTask/"+_id,
        type: "DELETE",
        data: null,
        success: function(response){
            getTasks();
        }
    });
}

$(function(){
    getTasks();
    // console.log(agendas);
    // $("#btnSubmit")
    // addTask(datos);
    var btnSubmit = $("#btnSubmit");
    var btnDelete = $("#btnDelete");
    btnSubmit.click(function(event){
        // console.log("dentro de btnSubmit");
        addTask();
        event.preventDefault();
    });

    btnDelete.click(function(event){
        // console.log("dentro de btnSubmit");
        removeTask();
        event.preventDefault();
    });
});


