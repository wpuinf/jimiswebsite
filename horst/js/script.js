function run() {
    var div = document.getElementById("out")
    var code = document.getElementById("input").value
    if(code.includes("document.write")==true){
        alert("document.write is not allowed. Please use div.innerHTML += 'Your text'.")
    }else{
        eval(code)
    }
}
window.onerror = function (msg, url, lineNo, columnNo, error) {
    alert("ERROR: " + msg)
  
    return false;
  }

/* Files
const fileSelector = document.getElementById('loadFile');
fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;
  console.log(fileList);
});
*/