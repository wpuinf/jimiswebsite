function bClick(){
    var val = document.getElementById("inp").value
    if(val=="Entchen"){
        document.write('<title>Alle meine Entchen</title>Alle meine Entchen<br>Schwimmen auf dem See<br>Schwimmen auf dem See<br>Köpfchen in das Wasser<br>Schwänzchen in die Höh.')
    }else if(val=="Kuchen"){
        document.write('<title>Backe, backe Kuchen</title>Backe, backe Kuchen<br>Der Bäcker hat gerufen<br>Wer will guten Kuchen backen<br>Der muß haben sieben Sachen<br>Eier und Schmalz<br>Zucker und Salz<br>Milch und Mehl<br>Safran macht den Kuchen gehl<br>Schieb, schieb in den Ofen rein!')
    }else if(val=="Reiter"){
        document.write('<title>Hoppe hoppe Reiter</title>Hoppe hoppe Reiter<br>Wenn er fällt, dann schreit er<br>Fällt er in den Graben<br>Fressen ihn die Raben<br>Fällt er in den Sumpf<br>Macht der Reiter plumps')
    }else if(val=="Horst"){
        window.open("horst.html")
    }else if(val.startsWith("wiki")==true){
        const arr = val.split(":")
        window.open("https://wikipedia.com/wiki/" + arr[1])
    }
}

//konamiListener Quelle: https://stackoverflow.com/a/45576888
function onKonamiCode(cb) {
var input = '';
var key = '38384040373937396665';
document.addEventListener('keydown', function (e) {
input += ("" + e.keyCode);
if (input === key) {
  return cb();
}
if (!key.indexOf(input)) return;
input = ("" + e.keyCode);
});
}
onKonamiCode(function () {window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")})