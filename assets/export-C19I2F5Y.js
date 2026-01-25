const l=`<section id="export-section" class="export-container">\r
\r
    <h2>Export Page</h2>\r
    <div class="container">\r
        <label for="filename">Filename:</label>\r
        <input type="text" id="filename" name="filename" value="my_drawing" />\r
        <button data-format="png" id="download-png">Download as PNG</button>\r
        <button data-format="jpeg" id="download-jpeg">Download as JPEG</button>\r
    </div>\r
\r
</section>`;let a={p5Instance:null},r={};r.init=function(e){a.p5Instance=e;let t=document.getElementById("appToModify"),n=document.getElementById("export-section");n&&n.remove(),o.render(t),r.attachListeners()};r.attachListeners=function(){document.querySelectorAll('button[id^="download"]').forEach(t=>{t.addEventListener("click",()=>{let n=t.getAttribute("data-format"),i=document.querySelector("#filename").value;o.exportCanvas(i,n)})})};let o={};o.render=function(e){return console.log(e),e.innerHTML=l,e};o.exportCanvas=function(e,t){if(a.p5Instance){a.p5Instance.saveCanvas(e,t),console.log(`Canvas sauvegardé: ${e}.${t}`);let n=document.getElementById("export-section");n&&n.remove()}};export{r as C};
