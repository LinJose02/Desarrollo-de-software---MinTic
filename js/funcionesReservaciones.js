//GET, POST , PUT Y DELETE

function getReservaciones (){
    $.ajax({
        url:"http://129.146.136.56:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            pintarReservaciones(respuesta);
        }
    });

}

function postReservaciones(){
    if($("#startDate").val().length==0 || $("#devolutionDate").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        client:{idClient: +$("#select-client").val()},
        ortesis:{id: +$("#select-ortesis").val()}
    };
    $.ajax({
        url:"http://129.146.136.56:8080/api/Reservation/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la reserva");
            window.location.reload();
    
        }
    });
    }

}

function putReservaciones(idDesdeBoton){
    console.log(idDesdeBoton);
    if($("#startDate").val().length==0 || $("#devolutionDate").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        idReservation:idDesdeBoton,
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        client:{idClient: +$("#select-client").val()},
        ortesis:{id: +$("#select-ortesis").val()}
    };
    $.ajax({
        url:"http://129.146.136.56:8080/api/Reservation/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la informacion de la reservation");
            window.location.reload();
    
            }
        });
    }
}

function deleteReservaciones(data){
    console.log(data);
    let myData={
        id:data
    };
    $.ajax({
        url:"http://129.146.136.56:8080/api/Reservation/"+data,
        type:"DELETE",
        datatype:"JSON",
        data: JSON.stringify(myData),
        contentType:"application/json",
        success:function(respuesta){
            alert("se borro correctamente la reservacion");
            window.location.reload();
        }
    });

}
//////////////////////////////////////////////
function  pintarReservaciones(json_ortesis){
    let myTable="<table>";
    for(i=0;i<json_ortesis.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+json_ortesis[i].startDate+"</td>";
        myTable+="<td>"+json_ortesis[i].devolutionDate+"</td>";
        myTable+="<td>"+json_ortesis[i].status+"</td>";
        myTable+="<td>"+json_ortesis[i].ortesis.name+"</td>";
        myTable+="<td>"+json_ortesis[i].client.name+"</td>";
        myTable+="<td> <button onclick='putReservaciones("+json_ortesis[i].idReservation+")'> Actualizar</button>"
        myTable+="<td> <button onclick='deleteReservaciones("+json_ortesis[i].idReservation+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

///////////////////////////////////////////////

function getClient_Reservation(){
    $.ajax({
        url:"http://129.146.136.56:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>' )
            })
        }
    });
}

function getOrtesis_Reservation(){
    $.ajax({
        url:"http://129.146.136.56:8080/api/Ortesis/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-ortesis");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>' )
            })
        }
    });
    
}