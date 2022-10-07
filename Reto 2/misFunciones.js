function traerDatosOrtesis(){
    $.ajax({
        url: 'https://gbee5718478f365-reto1ciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/orthesis/orthesis',
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            pintarDatosGeneral(respuesta.items, "name", "orthesis");
        },
        error: function(respuesta, xhr){
            alert("Error de la peticion");
        }
    });
}

function traerDatosClientes(){
    $.ajax({
        url: 'https://gbee5718478f365-reto1ciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            pintarDatosGeneral(respuesta.items, "name", "client");
        },
        error: function(respuesta, xhr){
            alert("Error de la peticion");
        }
    });
}

function traerDatosMensajes(){
    $.ajax({
        url: 'https://gbee5718478f365-reto1ciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            pintarDatosGeneral(respuesta.items, "messagetext", "message");
        },
        error: function(respuesta, xhr){
            alert("Error de la peticion");
        }
    });
}

function guardarOrtesis(){
    let datosPorMandar = {
        'id': $("#id").val(),
        'brand': $("#brand").val(),
        'model': $("#model").val(),
        'name': $("#name").val(),
        'category_id': $("#category_id").val(),
    };

    $.ajax({
        url: 'https://gbee5718478f365-reto1ciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/orthesis/orthesis',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(datosPorMandar),
        success: function(respuesta){
            pintarDatosGeneral(respuesta.items, "name", "orthesis");
        },
        error: function(respuesta, xhr){
            alert("Error de la peticion");
        }
    });
}

function guardarIdyTipo(id, tipo){
    sessionStorage.setItem.setItem('id', id);
    sessionStorage.setItem.setItem('tipo', tipo);
    location.href='detalle.html';
}

function mostrarDetalle(){
    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');
    
    $.ajax({
        url: 'https://gbee5718478f365-reto1ciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/'+tipo+'/'+tipo+'/'+id,
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            pintarDatosDetalle(respuesta.items);
            pintarEntradasDetalle(respuesta.items);
        },
        error: function(respuesta, xhr){
            alert("Error de la peticion");
        }
    });
}

function pintarDatosGeneral(datos, titulo, tipoTabla){
    let htmlParaInsertar ="";
    htmlParaInsertar+="<tr>";
    htmlParaInsertar+="<th>Titulo</th>"
    htmlParaInsertar+="</tr>";

    for(let i=0;i<datos.length;i++){
        htmlParaInsertar+="<tr>";
        htmlParaInsertar+="<td><a href='#' onclick='guardarIdyTipo("+datos[i].id+", \""+tipoTabla+"\");'>"+datos[i][titulo]+"</a></td>";
        htmlParaInsertar+="</tr>";
    }

    $("#resultado").empty();
    $("#resultado").append(htmlParaInsertar);
}

function pintarDatosDetalle(datos){
    let htmlParaInsertar ="";
    htmlParaInsertar+="<tr>";
    Object.keys(datos[0]).forEach(elemento => htmlParaInsertar+="<th>"+elemento+"</th>");
    htmlParaInsertar+="</tr>";

    for(let i=0; i<datos.length; i++){
        htmlParaInsertar+="<tr>";
        Object.values(datos[i]).forEach(elemento => htmlParaInsertar+="<td>"+elemento+"</td>");
        htmlParaInsertar+="</tr>";
    }

    $("#resultado").empty();
    $("#resultado").append(htmlParaInsertar);
}

function pintarEntradasDetalle(datos){
    let htmlParaInsertar ="";
    Object.keys(datos[0]).forEach(elemento => htmlParaInsertar+="<input id='"+elemento+"' placeholder='"+elemento+"'><br><br>");
    $("#resultado").empty();
    $("#resultado").append(htmlParaInsertar);
}

function actualizarDetalles(){
    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');

    if(tipo=="orthesis"){actualizarOrtesis();}
    else if(tipo=="message"){actualizarMensaje();}
    else if(tipo=="client"){actualizarCliente();}
}

function actualizarOrtesis(){
    let datosPorMandar = {
        'id': $("#id").val(),
        'brand': $("#brand").val(),
        'model': $("#model").val(),
        'name': $("#name").val(),
        'category_id': $("#category_id").val()
    };

    $.ajax({
        url: 'https://gbee5718478f365-reto1ciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/orthesis/orthesis',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(datosPorMandar),
        success: function(respuesta){
            alert("El producto ha sido agregado con exito");
            mostrarDetalle();
        },
        error: function(respuesta, xhr){
            alert("Error de la peticion");
        }
    });
}

function actualizarMensaje(){
    let datosPorMandar = {
        'id': $("#id").val(),
        'messagetext': $("#messagetext").val(),
    };

    $.ajax({
        url: 'https://gbee5718478f365-reto1ciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(datosPorMandar),
        success: function(respuesta){
            alert("El producto ha sido agregado con exito");
            mostrarDetalle();
        },
        error: function(respuesta, xhr){
            alert("Error de la peticion");
        }
    });
}

function actualizarCliente(){

}

function borrarDetalle(){
    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');
    let datosPorMandar = {
        'id': id
    }

    $.ajax({
        url: 'https://gbee5718478f365-reto1ciclo3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/'+tipo+'/'+tipo,
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify(datosPorMandar),
        success: function(respuesta){
            alert("El elemento ha sido eliminado");
            location.href='index.html';
        },
        error: function(respuesta, xhr){
            alert("Error de la peticion");
        }
    });
}