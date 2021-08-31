var color = ['green', 'red', 'yellow', 'blue'];//colori possibili. i colori dei pulsanti

var patternGame = [];//sequenza corretta di pulsanti

var patternUser=[];

var level=0;

function nRandom() {//funzione che genera un numero random da 0 a 3
    var n = Math.random();//numero tra 0 e 1
    n = Math.floor(n * 4);//numero tra 0 e 3
    return n;
}

function animation(color) {
    var suono = new Audio('sounds/' + color + '.mp3');
    //animazione
    $('#' + color).addClass('pressed');
    setTimeout(function () {
        $('#' + color).removeClass('pressed');
    }, 100);
    suono.play();//suono
}

//aggiunge un nuovo pulsante a caso al patternGioco
function addGameBut() {
    var newGameBut = color[nRandom()];//colore nuovo pulsante
    animation(newGameBut);
    patternGame.push(newGameBut);
    $('#level-title').text('Level '+level);
    level++;
}

function check() {
    var ButUser= patternUser[patternUser.length-1 ];
    var ButGame = patternGame[patternUser.length - 1];
    if (ButGame === ButUser) return true;//se il pulsante premuto è quello corretto
    else return false;
}

function newRound() {
    console.log("nuovo round");
    /*
    for(var i=0;i < patternGame.length -1; i++){
        setTimeout(function(){
            animation(patternGame[i]);
        },1000);
        
    }*/
    setTimeout(addGameBut,1000);//dopo un secondo aggiungo un pulsante
}

function gameOver() {
    $('body').addClass('game-over');
    setTimeout(function () {
        $('body').removeClass('game-over');
    }, 300);
    $('#level-title').text('Game Over- Press A Key to Start');
    patternUser=[];
    patternGame=[];
    level=0;
}

//capisco che pulsante è stato premuto
$(".btn").click(function(){
    //non posso usare i metodi di jQuery su this
    //console.log(event.target.id); //un'alternativa che funziona
    var newUserBut = this.id;
    animation(newUserBut);
    patternUser.push(newUserBut);//salvo l'id del pulsante nell'array. l'id corrisponde al colore
    if (check()) {//è stato premuto il pulsante correto
        if(patternUser.length === patternGame.length){//se ho finito la sequenza
            patternUser=[];
            newRound();
        }
    }
    else gameOver();
});

//nuova partira. devo fare il controllo solo una volta
$(document).keypress(function(){
    if(level===0) addGameBut();
});