//GET, POST , PUT Y DELETE

function getMensajes (){
    $.ajax({
        url:"http://129.146.136.56:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            pintarMensajes(respuesta);
        }
    });
}

function postMensajes(){
    let cajas = {
        messageText:$("#messageText").val(),
        client:{idClient: +$("#select-client").val()},
        ortesis:{id: +$("#select-ortesis").val()}
        
    };
    console.log(cajas);
    $.ajax({
        url:"http://129.146.136.56:8080/api/Message/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el mensaje");
            //window.location.reload();
    
        }
    });
}

function putMensajes(){

}

function deleteMensajes(){
    
}


////////////////////////////////////////////

function pintarMensajes(respuesta){
   
    let myTable="<table>";
    let MENSAJE = "MENSAJE";
    let MAQUINA = "MAQUINA";
    let CLIENTE = "CLIENTE";
    //let EDAD = "EDAD";
    
    myTable+="<th>"+MENSAJE+"</th>";

    myTable+="<th>"+MAQUINA+"</th>";

    myTable+="<th>"+CLIENTE+"</th>";

    
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);


}

function getOrtesis_Message(){
    $.ajax({
        url:"http://129.146.136.56:8080/api/orthesis/all",
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

function getClient_Message(){
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