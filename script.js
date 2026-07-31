
const collectionBreadth = app => app.categories.length;
let dataset;

function render(){
  const q=document.querySelector("#search").value.toLowerCase();
  const cat=document.querySelector("#category").value;
  const sort=document.querySelector("#sort").value;
  let rows=dataset.apps.filter(a=>(a.name+" "+a.company).toLowerCase().includes(q) && (!cat||a.categories.includes(cat)));
  rows.sort((a,b)=> sort==="name"?a.name.localeCompare(b.name):sort==="count"?b.categories.length-a.categories.length:score(b)-score(a));
  document.querySelector("#summary").innerHTML=`<span class="pill">${rows.length} apps shown</span><span class="pill">${rows.filter(a=>a.tracking).length} disclose tracking</span><span class="pill">${new Set(rows.flatMap(a=>a.categories)).size} data categories</span>`;
  document.querySelector("#cards").innerHTML=rows.map(a=>`<article class="app-card">
    <div class="company">${a.company}</div><h3>${a.name}</h3>
    <div class="score">${collectionBreadth(a)}</div> <small>data categories disclosed</small>
    <p class="${a.tracking?'track':''}">${a.tracking?'Tracking disclosed':'No tracking category shown in this snapshot'}</p>
    <div class="tags">${a.categories.map(c=>`<span class="tag">${c}</span>`).join("")}</div>
    <a class="source-link" href="${a.source}">View app-store source ↗</a>
  </article>`).join("") || "<p>No apps match these filters.</p>";
}
fetch("data.json").then(r=>r.json()).then(data=>{
 dataset=data;
 const cats=[...new Set(data.apps.flatMap(a=>a.categories))].sort();
 document.querySelector("#category").innerHTML+=[...cats].map(c=>`<option>${c}</option>`).join("");
 document.querySelectorAll("input,select").forEach(el=>el.addEventListener("input",render));
 document.querySelector("#appSources").innerHTML="<h3>App-store records used</h3><ul>"+data.apps.map(a=>`<li><a href="${a.source}">${a.name} — Apple App Store privacy label</a></li>`).join("")+"</ul>";
 render();
}).catch(()=>document.querySelector("#cards").innerHTML="<p>Could not load data.json. Run the site through a local server rather than opening index.html directly.</p>");
