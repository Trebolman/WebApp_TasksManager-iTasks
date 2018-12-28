var agendas = [];
$(function(){
    var miSubmitButton = $("#btnSubmit");
    var miForm = $("#MyForm");
    // console.log(name);
    
    $('#myform').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url : $(this).attr('action') || window.location.pathname,
            type: "POST",
            data: $(this).serialize(),
            success: function (data) {
                // $("#helpId").html(data);
                // console.log(data);
            },
            error: function (jXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });

    // miSubmitButton.click(function(evento){

        
    //     var name = $("#name").val();
    //     var description = $("#description").val();
    //     console.log(name);
    //     // var name = miForm.name;
    //     // alert("Le hiciste click");
    //     // evento.preventDefault();
    //     // var Agenda = {
    //     //     name: $("input[name = 'name']").val(),
    //     //     description: $("input[name = 'description']").val()
    //     // };
    //     var Agenda = {
    //         name: name,
    //         description: description
    //     };
    //     console.log(Agenda);
    //     $.ajax({
    //         type:   "POST",
    //         url:    miForm.attr("action"),
    //         data:   Agenda,
    //         // timeout:1000,
    //         success:    function(data){
    //             // preventDefault();
    //             // document.location.reload();
    //             console.log(response);
    //             $("#myForm").html(data);
    //             // document.location.reload();
    //         },
    //         error:      function(){
    //             console.log("Ocurrio un error");
    //         },
    //         beforeSend: function(){
    //             // evento.preventDefault();
    //             console.log("Vamos a crear una nueva agenda"); 
    //         }
    //     });

        
    // });


    // miForm.submit(function(){
    //     // evento.preventDefault();
    //     var Agenda = {
    //         name: $("input[name = 'name']").val(),
    //         description: $("input[name = 'description']").val()
    //     };
    //     // evento.preventDefault();
    //     // $.post(miForm.attr("action"),Agenda,function(response){
    //     //     console.log(response);
    //     // });
    //     // $.ajax({
    //     //     type: "method",
    //     //     url: "url",
    //     //     data: "data",
    //     //     dataType: "dataType",
    //     //     success: function (response) {
                
    //     //     }
    //     // });
    //     // envio por ajax
    //     $.ajax({
    //         type:   "POST",
    //         url:    miForm.attr("action"),
    //         data:   Agenda,
    //         timeout:1000,
    //         success:    function(response){
    //             // preventDefault();
    //             console.log(response);
    //             // document.location.reload();
    //         },
    //         error:      function(){
    //             console.log("Ocurrio un error");
    //         },
    //         beforeSend: function(){
    //             // evento.preventDefault();
    //             console.log("Vamos a crear una nueva agenda"); 
    //         }
    //     });
    // });

    getTasks();

    function getTasks() {
        var request = new XMLHttpRequest();
        request.open('POST', "http://localhost:3800/API/getTasks");
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState == 3) {
                // console.log("Cargando");
                // divCargando.removeAttribute("hidden");
            }
            if (request.readyState == 4) {
                // console.log("Carga completa");
                // console.log(request.responseURL);
                var respuesta = JSON.parse(request.responseText);
                // console.log(respuesta.Agenda);
                agendas = respuesta.Agenda;

                llenarTabla(agendas);
                // JSONObjeto = JSON.parse(request.responseText);
                // console.log(JSON.parse(request.responseText)[0]);
                // JSONObjeto = JSON.parse(request.responseText);
            }
        };
    }

    function llenarTabla(respuesta) {
        var stateAgenda;

        var miTabla = document.getElementById("miTabla");
        // console.log(miTabla.childNodes);
        // miTabla.removeChild(miTabla.childNodes[2]);
        miTabla.removeChild(miTabla.childNodes[5]);
        var tbody = document.createElement("tbody");

        for (var i = 0; i < respuesta.length; i++) {
            var tr = document.createElement("tr");
            // var id = respuesta[i].Agenda._id;
            // console.log(id);
            // agendas.push(id);
            
            stateAgenda = respuesta[i].state;
            // console.log(stateAgenda);


            var tdNumero = document.createElement("td");
            tdNumero.innerHTML = (i + 1).toString();

            var tdName = document.createElement("td");
            tdName.innerHTML = respuesta[i].name;

            var tdDescription = document.createElement("td");
            tdDescription.innerHTML = respuesta[i].description;

            var tdState = document.createElement("td");
            tdState.innerHTML = respuesta[i].state;


            var tdBoton = document.createElement("button");
            tdBoton.setAttribute("id", i + 1);
            tdBoton.setAttribute("class", "btn btn-dark btn-block align-middle");

            tdBoton.setAttribute("onclick", "changeState(this)");
            // tdBoton.innerHTML = "Hecho";
            tr.append(tdNumero);
            tr.append(tdName);
            tr.append(tdDescription);
            tr.append(tdBoton);
            tbody.append(tr);

            if (stateAgenda == "Pendiente") {
                tr.setAttribute("class", "text-white");
                tr.style.backgroundColor = 'rgb(231, 124, 82)';
                tdBoton.innerHTML = "Pendiente";
            }
            else {
                tr.setAttribute("class", "text-white ");
                tr.style.backgroundColor = 'rgb(53, 120, 207)';
                tdBoton.innerHTML = "Hecho";
                tdBoton.setAttribute("disabled", "true");
            }
            
        }
        miTabla.append(tbody);
        console.log(agendas);
    }
    

    // $.ajax({
    //     type:   "PUT",
    //     url:    "http://localhost:3800/API/editTask/"+_id,
    //     data:   {state: "Hecho"},
    //     timeout:1000,
    //     success:    function(response){
    //         evento.preventDefault();
    //         console.log(response);
    //     },
    //     error:      function(){
    //         console.log("Ocurrio un error");
    //     },
    //     beforeSend: function(){
    //         console.log("Vamos a crear una nueva agenda"); 
    //     }
    // });
});

function changeState(btnState){
    miSubmitButton = btnState;
    // var indice = parseInt(respuesta);
    console.log(btnState.id);
    console.log(agendas[btnState.id]);
    getTasks();
    editTask(agendas[btnState.id-1]._id);
}

function getTasks(){
    var request = new XMLHttpRequest();
    request.open('POST', "http://localhost:3800/API/getTasks");
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState == 3) {
            console.log("Cargando");
            // divCargando.removeAttribute("hidden");
        }
        if (request.readyState == 4) {
            console.log("Carga completa");
            // console.log(request.responseURL);
            var respuesta = JSON.parse(request.responseText);
            // console.log(respuesta.Agenda);
            agendas = respuesta.Agenda;

            llenarTabla(respuesta.Agenda);
            // JSONObjeto = JSON.parse(request.responseText);
            // console.log(JSON.parse(request.responseText)[0]);
            // JSONObjeto = JSON.parse(request.responseText);
        }
    };
}

function llenarTabla(respuesta) {
    var stateAgenda;

    var miTabla = document.getElementById("miTabla");
    // miTabla.removeChild(miTabla.childNodes[2]);
    miTabla.removeChild(miTabla.childNodes[5]);
    // miTabla.removeChild(miTabla.childNodes[2]);
    var tbody = document.createElement("tbody");

    for (var i = 0; i < respuesta.length; i++) {
        var tr = document.createElement("tr");
        // var id = respuesta[i].Agenda._id;
        // console.log(id);
        // agendas.push(id);
        
        stateAgenda = respuesta[i].state;
        console.log(stateAgenda);

        var tdNumero = document.createElement("td");
        tdNumero.innerHTML = (i + 1).toString();

        var tdName = document.createElement("td");
        tdName.innerHTML = respuesta[i].name;

        var tdDescription = document.createElement("td");
        tdDescription.innerHTML = respuesta[i].description;

        var tdState = document.createElement("td");
        tdState.innerHTML = respuesta[i].state;


        var tdBoton = document.createElement("button");
        tdBoton.setAttribute("id", i + 1);
        tdBoton.setAttribute("class", "btn btn-dark btn-block align-middle");

        tdBoton.setAttribute("onclick", "changeState(this)");
        // tdBoton.innerHTML = "Hecho";
        tr.append(tdNumero);
        tr.append(tdName);
        tr.append(tdDescription);
        tr.append(tdBoton);
        tbody.append(tr);

        if (stateAgenda == "Pendiente") {
            tr.setAttribute("class", "text-white");
            tr.style.backgroundColor = 'rgb(231, 124, 82)';
            tdBoton.innerHTML = "Pendiente";
        }
        else {
            tr.setAttribute("class", "text-white ");
            tr.style.backgroundColor = 'rgb(53, 120, 207)';
            tdBoton.innerHTML = "Hecho";
            tdBoton.setAttribute("disabled", "true");
        }
        
    }
    miTabla.append(tbody);
    console.log(agendas);
}

function editTask(_id){
    var request = new XMLHttpRequest();
    request.open("put","http://localhost:3800/API/editTask/"+_id);
    request.send(null);
    request.onreadystatechange = function(){
        if(request.readyState == 3){
            console.log("Cargando");
            // divCargando.removeAttribute("hidden");
        }
        if(request.readyState == 4){
            console.log("Carga completa");
            // llenarTabla(JSON.parse(request.responseText));
            // JSONObjeto = JSON.parse(request.responseText);
            // console.log(JSON.parse(request.responseText)[0]);
            // JSONObjeto = JSON.parse(request.responseText);
            console.log(request.responseText);
        }
    };
}