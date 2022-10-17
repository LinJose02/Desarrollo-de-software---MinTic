//GET, POST , PUT Y DELETE

function getOrtesis (){
    $.ajax({
        url:"http://129.146.136.56:8080/api/Ortesis/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            pintarOrtesis(respuesta);
        }
    });

}

function postOrtesis(){
    let cajas = {
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{id: +$("#select-categoria").val()}
    };
    console.log(cajas);
    $.ajax({
        url:"http://129.146.136.56:8080/api/orthesis/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la ortesis");
            window.location.reload();
    
        }
    });

}

function putOrtesis(){

}

function deleteOrtesis(){
    
}

////////////////////////////////////////////////////////

function pintarOrtesis(json_ortesis){
    let myTable="<table>";
    for(i=0;i<json_ortesis.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+json_ortesis[i].name+"</td>";
        myTable+="<td>"+json_ortesis[i].brand+"</td>";
        myTable+="<td>"+json_ortesis[i].year+"</td>";
        myTable+="<td>"+json_ortesis[i].description+"</td>";
        myTable+="<td>"+json_ortesis[i].category.name+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoOrtesis").html(myTable);

}

function getCategoria_Ortesis(){
    $.ajax({
        url:"http://129.146.136.56:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-categoria");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>' )
            })
        }
    });
}