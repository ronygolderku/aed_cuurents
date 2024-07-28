document.addEventListener("DOMContentLoaded",(function(){const{S3:t}=AWS,e=new t({accessKeyId:"4b68780a4be74f31aa2e7cbc4de6dd2f",secretAccessKey:"92dcce9fa2034ac7af8fd4c92182567e",endpoint:"https://projects.pawsey.org.au",s3ForcePathStyle:!0,region:"us-east-1"});function o(t,e){const o=t.split("\n").filter((t=>""!==t.trim())),n=o[0].split(e).map((t=>t.trim()));return o.slice(1).map((t=>{const o=t.split(e).map((t=>t.trim()));let a={};return n.forEach(((t,e)=>{void 0!==o[e]&&(a[t]=o[e])})),a}))}let n=null;fetch("static/data/points.csv").then((t=>t.text())).then((t=>{const a=function(t){const a=L.layerGroup();return t.forEach((t=>{const r=t.Points,i=parseFloat(t.latitude),l=parseFloat(t.longitude);if(isNaN(i)||isNaN(l))console.warn("Invalid latitude or longitude for point:",t);else{const t=L.marker([i,l]).bindTooltip(`<b>Point No: ${r}</b><br>Latitude: ${i}<br>Longitude: ${l}`,{permanent:!1,direction:"top"}).on("click",(()=>{!async function(t){const a=`csiem-data/data-lake/ESA/Sentinel/Points/CMEMS_OLCI_CHL_point_${t}.csv`,r=await async function(t){try{const o={Bucket:"wamsi-westport-project-1-1",Key:t};return(await e.getObject(o).promise()).Body.toString("utf-8")}catch(t){return console.error("Error fetching object from S3:",t),null}}(a);r&&function(t,e){const o=t.map((t=>new Date(t.time))),a=t.map((t=>parseFloat(t.CHL))),r=document.getElementById("chart").getContext("2d");n&&n.destroy(),document.getElementById("chart-container").style.display="block",n=new Chart(r,{type:"line",data:{labels:o,datasets:[{label:`Sentinel Chlorophyll-a (CHL) at Station ${e}`,data:a,borderColor:"rgba(75, 192, 192, 1)",borderWidth:1,fill:!1}]},options:{responsive:!0,scales:{x:{type:"time",time:{unit:"day",tooltipFormat:"yyyy-MM-dd",displayFormats:{day:"yyyy-MM-dd"}},title:{display:!0,text:"Time"}},y:{title:{display:!0,text:"Chlorophyll (CHL) [mg/m³]"}}}}})}(o(r,","),t)}(r)}));a.addLayer(t)}})),layerControl.addOverlay(a,"Sentinel Chl-a"),a}(o(t,","));map.on("overlayremove",(function(t){t.layer===a&&(document.getElementById("chart-container").style.display="none",n&&(n.destroy(),n=null))}))})).catch((t=>console.error("Error fetching CSV data:",t)))}));