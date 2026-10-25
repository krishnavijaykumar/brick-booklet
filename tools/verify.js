// Checks every design in the library: it must fit the default brick box,
// obey the stacking rules, build correctly in instruction order, and be unique.
// Usage: node tools/verify.js
const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const engine=html.slice(html.indexOf('/*ENGINE*/'),html.indexOf('/*END ENGINE*/'));
const run=new Function(engine+`
const inv=defaultInventory().counts;let bad=[];const sigs=new Set();
CATALOG.forEach(([fi,ci,n],i)=>{const d=generateFamily(fi,ci,inv,0);const [w,h]=d.base.split('x').map(Number);const base={w,d:h};
  const label='No. '+(1001+i)+' '+d.name;
  if(d.bricks.length!==n)bad.push(label+': piece count changed ('+n+' -> '+d.bricks.length+')');
  if(!validateDesign(d.bricks,base).ok)bad.push(label+': breaks the stacking rules');
  if(!validateOrder(d.bricks,base,1)||!validateOrder(d.bricks,base,3))bad.push(label+': instructions are out of order');
  for(const [k,c] of Object.entries(partsCount(d.bricks)))if(c>(inv[k]||0))bad.push(label+': needs '+c+' x '+k+', box has '+(inv[k]||0));
  const s=d.bricks.map(b=>[b.t,b.x,b.z,b.y,b.r].join(':')).sort().join('|');if(sigs.has(s))bad.push(label+': duplicate of another design');sigs.add(s);
});
return {count:CATALOG.length,bad};`);
const t0=Date.now();const r=run();
if(r.bad.length){console.error(r.bad.slice(0,50).join('\n'));console.error(r.bad.length+' problem(s) in '+r.count+' designs');process.exit(1)}
console.log('All '+r.count+' library designs pass ('+(Date.now()-t0)+' ms).');
