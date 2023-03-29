backButton = document.querySelector("#homebtn");

backButton.onclick = function(){
    changePage("index.html");
}

function changePage(page){
    window.location.href = page;
}


