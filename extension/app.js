var tool={sum:function(e){return e.reduce(((e,t)=>e+t),0)},check_pair:function(e){return e%2==0},round_value:function(e,t){return Number.parseInt(e)||Number.parseFloat(e)?Math.round(e*Math.pow(10,t))/Math.pow(10,t):e}};function get_Average(e){let t,n,r,o,a,l;for(array_note_coef=[],i=0;i<=14;i++)1===e?(t=document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(5)`),n=document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(3)`),tds=document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(1)`)):2===e?(t=document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(6)`),n=document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(3)`),tds=document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(1)`)):3===e&&(t=document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(7)`),n=document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(3)`),tds=document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(1)`)),t.forEach((e=>{n.forEach((t=>{tds.forEach((n=>{array_note_coef.push([n.innerHTML.match(/(B\d+)/g).join(""),Number.parseFloat(t.innerHTML),Number.parseFloat(e.innerHTML.replace(",","."))])}))}))}));let c=[],d=0,g=0;for(i in array_note_coef)Number.isNaN(array_note_coef[i][2])||("B1"===array_note_coef[i][0]?(g+=array_note_coef[i][1]*array_note_coef[i][2],d+=array_note_coef[i][1],r=Math.round(g/d*100)/100):"B2"===array_note_coef[i][0]?(d=0,g=0,g+=array_note_coef[i][1]*array_note_coef[i][2],d+=array_note_coef[i][1],o=Math.round(g/d*100)/100):"B3"===array_note_coef[i][0]?(d=0,g=0,g+=array_note_coef[i][1]*array_note_coef[i][2],d+=array_note_coef[i][1],a=Math.round(g/d*100)/100):"B4"===array_note_coef[i][0]&&(d=0,g=0,g+=array_note_coef[i][1]*array_note_coef[i][2],d+=array_note_coef[i][1],l=Math.round(g/d*100)/100));return c.push(r,o,a,l),c=c.map((e=>void 0===e?"nc":e)),c}function get_moyenne_by_colArray(e){let t=e.map((e=>"nc"===e?0:e)),n=0,r=0;for(i in t)0!==t[i]&&(r=tool.sum(t),n++);return r/n}function CreateTable(){const e=document.querySelector("#marksForm\\:marksWidget\\:coursesTable_data"),t=document.createElement("tr");t.id="Blank",tdBlank=document.createElement("td"),tdBlank.innerHTML="",tdBlank.colSpan=7;const n=document.createElement("tr");n.id="_CC_Exam";const r=document.createElement("td"),o=document.createElement("td"),a=document.createElement("td"),l=document.createElement("td");r.innerHTML=`Aperçu de vos Moyennes du ${document.querySelector("#marksForm\\:j_idt172\\:periodSelect_label").innerHTML.match(/Semestre\s\d+/g).join("")}`,r.style.fontSize="27px",r.style.fontWeight=535,r.style.color="#264653",r.style.textAlign="center",r.colSpan=4,o.innerHTML="CC1",o.style.textAlign="center",o.style.fontSize="27px",o.style.fontWeight=535,o.style.color="#676562",a.innerHTML="CC2",a.style.textAlign="center",a.style.fontSize="27px",a.style.fontWeight=535,a.style.color="#676562",l.innerHTML="Exam",l.style.textAlign="center",l.style.fontSize="27px",l.style.fontWeight=535,l.style.color="#676562",n.append(r,o,a,l);const c=document.createElement("tr");c.id="B1";const d=document.createElement("td"),g=document.createElement("td"),i=document.createElement("td"),s=document.createElement("td");d.innerHTML="B1",d.style.textAlign="center",d.style.fontSize="27px",d.style.fontWeight=535,d.style.color="#676562",d.colSpan=4,g.innerHTML=tool.round_value(get_Average(1)[0],2),g.style.background="nc"===get_Average(1)[0]?"#bcbcbc":get_Average(1)[0]<10?"#e76f51":get_Average(1)<=12?"#f4a261":"#2a9d8f",g.style.textAlign="center",g.style.fontSize="20px",i.innerHTML=tool.round_value(get_Average(2)[0],2),i.style.background="nc"===get_Average(2)[0]?"#bcbcbc":get_Average(2)[0]<10?"#e76f51":get_Average(2)<=12?"#f4a261":"#2a9d8f",i.style.textAlign="center",i.style.fontSize="20px",s.innerHTML=tool.round_value(get_Average(3)[0],2),s.style.background="nc"===get_Average(3)[0]?"#bcbcbc":get_Average(3)[0]<10?"#e76f51":get_Average(3)<=12?"#f4a261":"#2a9d8f",s.style.textAlign="center",s.style.fontSize="20px";const _=document.createElement("tr");_.id="B2";const y=document.createElement("td"),u=document.createElement("td"),m=document.createElement("td"),f=document.createElement("td");y.innerHTML="B2",y.style.textAlign="center",y.style.fontSize="27px",y.style.fontWeight=535,y.style.color="#676562",y.colSpan=4,u.innerHTML=tool.round_value(get_Average(1)[1],2),u.style.background="nc"===get_Average(1)[1]?"#bcbcbc":get_Average(1)[1]<10?"#e76f51":get_Average(1)[1]<=12?"#f4a261":"#2a9d8f",u.style.textAlign="center",u.style.fontSize="20px",m.innerHTML=tool.round_value(get_Average(2)[1],2),m.style.background="nc"===get_Average(2)[1]?"#bcbcbc":get_Average(2)[1]<10?"#e76f51":get_Average(2)[1]<=12?"#f4a261":"#2a9d8f",m.style.textAlign="center",m.style.fontSize="20px",f.innerHTML=tool.round_value(get_Average(3)[1],2),f.style.background="nc"===get_Average(3)[1]?"#bcbcbc":get_Average(3)[1]<10?"#e76f51":get_Average(3)[1][1]<=12?"#f4a261":"#2a9d8f",f.style.textAlign="center",f.style.fontSize="20px";const A=document.createElement("tr");A.id="B3";const b=document.createElement("td"),v=document.createElement("td"),h=document.createElement("td"),p=document.createElement("td");b.innerHTML="B3",b.style.textAlign="center",b.style.fontSize="27px",b.style.fontWeight=535,b.style.color="#676562",b.colSpan=4,v.innerHTML=tool.round_value(get_Average(1)[2],2),v.style.background="nc"===get_Average(1)[2]?"#bcbcbc":get_Average(1)[2]<10?"#e76f51":get_Average(1)[2][1]<=12?"#f4a261":"#2a9d8f",v.style.textAlign="center",v.style.fontSize="20px",h.innerHTML=tool.round_value(get_Average(2)[2],2),h.style.background="nc"===get_Average(2)[2]?"#bcbcbc":get_Average(2)[2]<10?"#e76f51":get_Average(2)[2][1]<=12?"#f4a261":"#2a9d8f",h.style.textAlign="center",h.style.fontSize="20px",p.innerHTML=tool.round_value(get_Average(3)[2],2),p.style.background="nc"===get_Average(3)[2]?"#bcbcbc":get_Average(3)[2]<10?"#e76f51":get_Average(3)[2][1]<=12?"#f4a261":"#2a9d8f",p.style.textAlign="center",p.style.fontSize="20px";const x=document.createElement("tr");x.id="B4";const k=document.createElement("td"),S=document.createElement("td"),T=document.createElement("td"),E=document.createElement("td");k.innerHTML="B4",k.style.textAlign="center",k.style.fontSize="27px",k.style.fontWeight=535,k.style.color="#676562",k.colSpan=4,S.innerHTML=tool.round_value(get_Average(1)[3],2),S.style.background="nc"===get_Average(1)[3]?"#bcbcbc":get_Average(1)[3]<10?"#e76f51":get_Average(1)[3][1]<=12?"#f4a261":"#2a9d8f",S.style.textAlign="center",S.style.fontSize="20px",T.innerHTML=tool.round_value(get_Average(2)[3],2),T.style.background="nc"===get_Average(2)[3]?"#bcbcbc":get_Average(2)[3]<10?"#e76f51":get_Average(2)[3][1]<=12?"#f4a261":"#2a9d8f",T.style.textAlign="center",T.style.fontSize="20px",E.innerHTML=tool.round_value(get_Average(3)[3],2),E.style.background="nc"===get_Average(3)[3]?"#bcbcbc":get_Average(3)[3]<10?"#e76f51":get_Average(3)[3][1]<=12?"#f4a261":"#2a9d8f",E.style.textAlign="center",E.style.fontSize="20px";const M=document.createElement("tr");M.id="Moyenne_globale";const L=document.createElement("td"),H=document.createElement("td"),z=document.createElement("td"),W=document.createElement("td");L.innerHTML="Moyenne Globale",L.style.textAlign="center",L.style.fontSize="27px",L.style.fontWeight=535,L.style.color="#676562",L.colSpan=4,H.innerHTML=isNaN(get_moyenne_by_colArray(get_Average(1)))?"nc":tool.round_value(get_moyenne_by_colArray(get_Average(1)),2),H.style.textAlign="center",H.style.fontSize="20px",H.style.color="aliceblue",H.style.background=get_moyenne_by_colArray(get_Average(1))<10?"#e76f51":get_moyenne_by_colArray(get_Average(1))<=12?"#f4a261":"#264653",z.innerHTML=isNaN(get_moyenne_by_colArray(get_Average(2)))?"nc":tool.round_value(get_moyenne_by_colArray(get_Average(2)),2),z.style.textAlign="center",z.style.fontSize="20px",z.style.color="aliceblue",z.style.background=get_moyenne_by_colArray(get_Average(2))<10?"#e76f51":get_moyenne_by_colArray(get_Average(2))<=12?"#f4a261":"#264653",W.innerHTML=isNaN(get_moyenne_by_colArray(get_Average(3)))?"nc":tool.round_value(get_moyenne_by_colArray(get_Average(3)),2),W.style.textAlign="center",W.style.fontSize="20px",W.style.color="aliceblue",W.style.background=get_moyenne_by_colArray(get_Average(3))<10?"#e76f51":get_moyenne_by_colArray(get_Average(3))<=12?"#f4a261":"#264653",t.append(tdBlank),c.append(d,g,i,s),_.append(y,u,m,f),A.append(b,v,h,p),x.append(k,S,T,E),M.append(L,H,z,W),e.append(t,n,c,_,A,x,M)}const note=document.getElementById("marksForm:marksWidget:title");if(note.setAttribute("style","cursor: pointer; text-decoration: underline; font-size: 16px;"),"https://myges.fr/student/marks"===location.href){let e=0;note.addEventListener("click",(()=>{5!==document.querySelectorAll("#marksForm\\:marksWidget\\:coursesTable_head>tr>th").length?(tool.check_pair(e)?CreateTable():window.location.reload(),e=0,e++):alert("Pas de note")}))}