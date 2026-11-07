'use strict';
const $=id=>document.getElementById(id);
let rows=[],page=1,sortKey='id',sortDirection=1;
const sortButtons=[...document.querySelectorAll('[data-sort]')];
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function selectedRows(){
  const query=$('search').value.trim().toLowerCase(),species=$('species').value;
  return rows.filter(r=>(species==='all'||r.species===species)&&(!query||String(r.id).includes(query)||r.species.includes(query)))
    .sort((a,b)=>{const av=sortKey==='id'?a.id:sortKey==='species'?a.species:a.x[Number(sortKey)],bv=sortKey==='id'?b.id:sortKey==='species'?b.species:b.x[Number(sortKey)];return (typeof av==='string'?av.localeCompare(bv):av-bv)*sortDirection||a.id-b.id;});
}
function render(){
  const filtered=selectedRows(),size=Number($('pageSize').value),pages=Math.max(1,Math.ceil(filtered.length/size));
  page=Math.min(page,pages);const start=(page-1)*size,shown=filtered.slice(start,start+size);
  $('tableBody').innerHTML=shown.length?shown.map(r=>`<tr><td>${r.id}</td>${r.x.map(v=>`<td>${v.toFixed(1)}</td>`).join('')}<td><span class="species-badge species-${r.species}">${escapeHtml(r.species)}</span></td></tr>`).join(''):'<tr><td colspan="6" class="table-message">No matching data. Change the search term or flower species.</td></tr>';
  $('rowStatus').textContent=filtered.length?`${start+1}–${Math.min(start+size,filtered.length)} / ${filtered.length} rows · Total ${rows.length}`:`0 rows · Total ${rows.length}`;
  $('pageStatus').textContent=`${page} / ${pages}`;$('previous').disabled=page===1;$('next').disabled=page===pages;
  sortButtons.forEach(b=>{const active=b.dataset.sort===sortKey;b.parentElement.removeAttribute('aria-sort');if(active)b.parentElement.setAttribute('aria-sort',sortDirection===1?'ascending':'descending');b.querySelector('span').textContent=active?(sortDirection===1?'↑':'↓'):'↕';});
}
['search','species','pageSize'].forEach(id=>$(id).addEventListener(id==='search'?'input':'change',()=>{page=1;render();}));
$('reset').addEventListener('click',()=>{$('search').value='';$('species').value='all';$('pageSize').value='25';page=1;sortKey='id';sortDirection=1;render();});
$('previous').addEventListener('click',()=>{page--;render();});$('next').addEventListener('click',()=>{page++;render();});
sortButtons.forEach(b=>b.addEventListener('click',()=>{sortDirection=sortKey===b.dataset.sort?-sortDirection:1;sortKey=b.dataset.sort;page=1;render();}));
fetch('data.json').then(r=>{if(!r.ok)throw Error('data');return r.json();}).then(data=>{
  const iris=data.iris;
  if(!iris||iris.X.length!==150||iris.y.length!==150)throw Error('shape');
  rows=iris.X.map((x,i)=>{const species=iris.names[iris.y[i]];if(x.length!==4||!x.every(Number.isFinite)||!['setosa','versicolor','virginica'].includes(species))throw Error('row');return {id:i+1,x,species};});
  ['search','species','pageSize','reset'].forEach(id=>$(id).disabled=false);sortButtons.forEach(b=>b.disabled=false);render();
}).catch(()=>{
  $('tableBody').innerHTML='<tr><td colspan="6" class="table-message">The dataset could not be loaded. Reload the page or download the CSV.<button id="reloadData" type="button">Reload</button></td></tr>';
  $('rowStatus').textContent='Data loading error';$('reloadData').addEventListener('click',()=>location.reload());
});
