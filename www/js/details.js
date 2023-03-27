backButton = document.querySelector("#back_bttn");

backButton.onclick = function(){
    changePage("index.html");
}

function changePage(page){

    window.location.href = page;

}
