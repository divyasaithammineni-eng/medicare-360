const $=s=>document.querySelector(s);
const today=()=>new Date().toISOString().slice(0,10);
const uid=(prefix)=>prefix+"-"+Date.now().toString().slice(-7)+"-"+Math.floor(Math.random()*90+10);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const initials=n=>String(n||"?").split(" ").filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase();

const seed={
patients:[
{id:"PAT-1001",name:"Aarav Sharma",dob:"1994-05-12",gender:"Male",phone:"9876543210",email:"aarav@example.com",address:"Vijayawada",blood:"O+",history:"Seasonal allergies",conditions:"None",allergies:"Pollen"},
{id:"PAT-1002",name:"Ananya Reddy",dob:"1988-11-23",gender:"Female",phone:"9876543211",email:"ananya@example.com",address:"Guntur",blood:"B+",history:"Migraine",conditions:"Migraine",allergies:"None"},
{id:"PAT-1003",name:"Rahul Kumar",dob:"2001-02-08",gender:"Male",phone:"9876543212",email:"rahul@example.com",address:"Bhimavaram",blood:"A+",history:"No significant history",conditions:"None",allergies:"None"},
{id:"PAT-1004",name:"Priya Nair",dob:"1979-08-17",gender:"Female",phone:"9876543213",email:"priya@example.com",address:"Eluru",blood:"AB+",history:"Thyroid follow-up",conditions:"Hypothyroidism",allergies:"None"},
{id:"PAT-1005",name:"Vikram Rao",dob:"1968-01-30",gender:"Male",phone:"9876543214",email:"vikram@example.com",address:"Ongole",blood:"O-",history:"Blood pressure monitoring",conditions:"Hypertension",allergies:"Penicillin"},
{id:"PAT-1006",name:"Meera Das",dob:"1997-06-04",gender:"Female",phone:"9876543215",email:"meera@example.com",address:"Rajahmundry",blood:"A-",history:"Routine checkup",conditions:"None",allergies:"None"},
{id:"PAT-1007",name:"Kiran Teja",dob:"1983-03-19",gender:"Male",phone:"9876543216",email:"kiran@example.com",address:"Tenali",blood:"B-",history:"Back pain",conditions:"Back pain",allergies:"Dust"},
{id:"PAT-1008",name:"Sana Fatima",dob:"1992-12-11",gender:"Female",phone:"9876543217",email:"sana@example.com",address:"Vijayawada",blood:"O-",history:"Asthma review",conditions:"Asthma",allergies:"Dust"}
],
doctors:[
{id:"DOC-201",name:"Dr. Arjun Mehta",spec:"Cardiologist",qualification:"MD, DM Cardiology",experience:12,phone:"9000010001",email:"arjun@medicare.demo",fee:800,days:"Mon, Tue, Wed, Fri",timings:"09:00–13:00",status:"Active"},
{id:"DOC-202",name:"Dr. Neha Kapoor",spec:"Neurologist",qualification:"MD Neurology",experience:9,phone:"9000010002",email:"neha@medicare.demo",fee:900,days:"Mon, Wed, Thu",timings:"10:00–14:00",status:"Active"},
{id:"DOC-203",name:"Dr. Rohan Iyer",spec:"Dermatologist",qualification:"MD Dermatology",experience:7,phone:"9000010003",email:"rohan@medicare.demo",fee:600,days:"Tue, Thu, Sat",timings:"09:00–12:00",status:"Active"},
{id:"DOC-204",name:"Dr. Kavya Rao",spec:"Pediatrician",qualification:"MD Pediatrics",experience:11,phone:"9000010004",email:"kavya@medicare.demo",fee:700,days:"Mon–Fri",timings:"11:00–15:00",status:"Active"},
{id:"DOC-205",name:"Dr. Sameer Khan",spec:"Orthopedic",qualification:"MS Orthopedics",experience:15,phone:"9000010005",email:"sameer@medicare.demo",fee:850,days:"Mon, Tue, Fri",timings:"14:00–18:00",status:"Active"},
{id:"DOC-206",name:"Dr. Anjali Varma",spec:"General Physician",qualification:"MBBS, MD",experience:8,phone:"9000010006",email:"anjali@medicare.demo",fee:500,days:"Mon–Sat",timings:"09:00–17:00",status:"Active"},
{id:"DOC-207",name:"Dr. Joseph Mathew",spec:"Dentist",qualification:"BDS, MDS",experience:10,phone:"9000010007",email:"joseph@medicare.demo",fee:550,days:"Tue–Sat",timings:"10:00–16:00",status:"Active"},
{id:"DOC-208",name:"Dr. Pooja Singh",spec:"Gynecologist",qualification:"MS Obstetrics & Gynecology",experience:13,phone:"9000010008",email:"pooja@medicare.demo",fee:750,days:"Mon, Wed, Fri",timings:"10:00–14:00",status:"Active"}
],
appointments:[]
};

function load(){
try{
let x=JSON.parse(localStorage.getItem("medicare360"));
if(x&&x.patients&&x.doctors&&x.appointments)return x;
}catch(e){}
return structuredClone(seed);
}

let db=load(),page="dashboard",filterStatus="All";

if(!db.appointments.length){
let dates=[today(),today(),today(),shiftDate(1),shiftDate(2),shiftDate(-1),shiftDate(3),today(),shiftDate(4),today(),shiftDate(2),shiftDate(5)];
let pairs=[[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[0,5],[2,3],[4,0],[1,6]];
db.appointments=pairs.map((p,i)=>({
id:"APT-"+(3001+i),
patientId:db.patients[p[0]].id,
doctorId:db.doctors[p[1]].id,
date:dates[i],
time:["09:00","10:00","11:00","12:00","14:00","15:00","09:30","13:00","16:00","10:30","11:30","15:30"][i],
reason:["Routine consultation","Follow-up","Health checkup","Consultation"][i%4],
status:dates[i]<today()?"Completed":"Confirmed"
}));
}

function shiftDate(n){
let d=new Date();
d.setDate(d.getDate()+n);
return d.toISOString().slice(0,10);
}

function save(){
localStorage.setItem("medicare360",JSON.stringify(db));
}

function toast(msg,error=false){
let t=$("#toast");
t.textContent=msg;
t.className="toast show"+(error?" error":"");
clearTimeout(window.toastTimer);
window.toastTimer=setTimeout(()=>t.className="toast",2600);
}

function go(p){
page=p;
document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===p));
$("#pageTitle").textContent=({dashboard:"Dashboard",patients:"Patient Management",doctors:"Doctor Management",appointments:"Appointment Management",schedule:"Daily Schedule"})[p];
render();
}

$("#nav").addEventListener("click",e=>{
let b=e.target.closest("button[data-page]");
if(b)go(b.dataset.page);
});

function patient(id){return db.patients.find(x=>x.id===id)}
function doctor(id){return db.doctors.find(x=>x.id===id)}

function status(s){
return `<span class="pill ${esc(s)}">${esc(s)}</span>`;
}

function head(title,sub,btn="",act=""){
return `<div class="pagehead"><div><h1>${title}</h1><p>${sub}</p></div>${btn?`<button class="btn" onclick="${act}">${btn}</button>`:""}</div>`;
}

function render(){
save();
if(page==="dashboard")dashboard();
if(page==="patients")patientsPage();
if(page==="doctors")doctorsPage();
if(page==="appointments")appointmentsPage();
if(page==="schedule")schedulePage();
}

function dashboard(){
let todayApps=db.appointments.filter(a=>a.date===today()&&a.status!=="Cancelled");
let up=db.appointments.filter(a=>a.date>=today()&&a.status!=="Cancelled");
let completed=db.appointments.filter(a=>a.status==="Completed");
let cancel=db.appointments.filter(a=>a.status==="Cancelled");

let days=Array.from({length:7},(_,i)=>{
let d=shiftDate(i-3);
return {d,n:db.appointments.filter(a=>a.date===d&&a.status!=="Cancelled").length};
});

$("#app").innerHTML=head("Good day, Administrator 👋","Here’s what’s happening at your hospital today.")+`
<div class="stats">
 ${stat("Total Patients",db.patients.length,"Registered patient records","♙")}
 ${stat("Active Doctors",db.doctors.filter(d=>d.status==="Active").length,"Available medical professionals","⚕")}
 ${stat("Today's Appointments",todayApps.length,"Scheduled for today","▣")}
 ${stat("Upcoming Appointments",up.length,"Today and future bookings","◷")}
</div>
<div class="grid2">
<div class="panel">
<div class="panelhead"><h3>Appointment activity</h3><span>Last 7 days</span></div>
<div class="barlist">${days.map(x=>`<div class="barcol"><div class="bar" style="height:${Math.max(5,x.n*25)}%"></div><small>${new Date(x.d+"T00:00:00").toLocaleDateString("en",{weekday:"short"})}</small></div>`).join("")}</div>
<div class="legend"><span><i class="dot"></i>Appointments</span><span>Completed: ${completed.length}</span><span>Cancelled: ${cancel.length}</span></div>
</div>
<div class="panel">
<div class="panelhead"><h3>Quick actions</h3><span>Common tasks</span></div>
<div class="quickgrid">
<button class="quick" onclick="openPatient()"><span>♙</span><b>Add new patient</b><small>Create a patient record</small></button>
<button class="quick" onclick="openDoctor()"><span>⚕</span><b>Add new doctor</b><small>Register a specialist</small></button>
<button class="quick" onclick="openAppointment()"><span>▣</span><b>Book appointment</b><small>Schedule a consultation</small></button>
<button class="quick" onclick="go('schedule')"><span>▦</span><b>View schedule</b><small>See today's timetable</small></button>
</div>
</div>
</div>
<div class="panel">
<div class="panelhead"><h3>Today's appointments</h3><button class="linkbtn" onclick="go('appointments')">View all →</button></div>
${appointmentTable(todayApps.slice().sort((a,b)=>a.time.localeCompare(b.time)),false)}
</div>`;
}

function stat(l,v,n,i){
return `<div class="stat"><div class="statrow"><span class="statlabel">${l}</span><span class="staticon">${i}</span></div><div class="statvalue">${v}</div><div class="statnote">${n}</div></div>`;
}

function appointmentTable(list,withActions=true){
if(!list.length)return `<div class="empty">No appointments found.</div>`;
return `<div class="tablewrap"><table class="data">
<thead><tr><th>Appointment</th><th>Patient</th><th>Doctor</th><th>Date & time</th><th>Reason</th><th>Status</th>${withActions?"<th>Actions</th>":""}</tr></thead>
<tbody>${list.map(a=>`<tr>
<td><b>${esc(a.id)}</b></td>
<td>${esc(patient(a.patientId)?.name||"Deleted patient")}</td>
<td>${esc(doctor(a.doctorId)?.name||"Deleted doctor")}</td>
<td>${esc(a.date)}<br><small style="color:#8290a2">${esc(a.time)}</small></td>
<td>${esc(a.reason)}</td>
<td>${status(a.status)}</td>
${withActions?`<td><div class="actions"><button class="linkbtn" onclick="editAppointment('${a.id}')">Edit</button>${a.status!=="Cancelled"&&a.status!=="Completed"?`<button class="linkbtn del" onclick="cancelAppointment('${a.id}')">Cancel</button>`:""}</div></td>`:""}
</tr>`).join("")}</tbody></table></div>`;
}

function toolbar(placeholder,filters=""){
return `<div class="toolbar"><div class="search"><input id="searchInput" placeholder="${placeholder}" oninput="applySearch()"></div>${filters}</div>`;
}

function patientsPage(){
let q=$("#searchInput")?.value||"";
let list=db.patients.filter(p=>(p.name+" "+p.id+" "+p.phone).toLowerCase().includes(q.toLowerCase()));
$("#app").innerHTML=head("Patients","Manage patient records, medical history and contact information.","＋ Add patient","openPatient()")+`<div class="panel">${toolbar("Search by patient name, ID or phone")}<div id="tableArea">${patientTable(list)}</div></div>`;
}

function patientTable(list){
return list.length?`<div class="tablewrap"><table class="data">
<thead><tr><th>Patient</th><th>Patient ID</th><th>Gender / Age</th><th>Phone</th><th>Blood group</th><th>Appointments</th><th>Actions</th></tr></thead>
<tbody>${list.map(p=>`<tr>
<td><div class="person"><div class="miniavatar">${initials(p.name)}</div><div><b>${esc(p.name)}</b><small>${esc(p.email)}</small></div></div></td>
<td>${esc(p.id)}</td><td>${esc(p.gender)} / ${age(p.dob)}</td><td>${esc(p.phone)}</td><td>${esc(p.blood||"—")}</td>
<td>${db.appointments.filter(a=>a.patientId===p.id).length}</td>
<td><div class="actions">
<button class="linkbtn" onclick="viewPatient('${p.id}')">View</button>
<button class="linkbtn" onclick="openPatient('${p.id}')">Edit</button>
<button class="linkbtn del" onclick="deletePatient('${p.id}')">Delete</button>
</div></td></tr>`).join("")}</tbody></table></div>`:`<div class="empty">No patients match your search.</div>`;
}

function age(d){
if(!d)return "—";
let b=new Date(d),n=new Date();
let a=n.getFullYear()-b.getFullYear();
if(n.getMonth()<b.getMonth()||(n.getMonth()===b.getMonth()&&n.getDate()<b.getDate()))a--;
return a;
}

function doctorsPage(){
let q=$("#searchInput")?.value||"";
let list=db.doctors.filter(d=>(d.name+" "+d.id+" "+d.spec).toLowerCase().includes(q.toLowerCase()));
$("#app").innerHTML=head("Doctors","Manage medical professionals, specializations and availability.","＋ Add doctor","openDoctor()")+`<div class="panel">${toolbar("Search by doctor name, ID or specialization",`<select id="docFilter" onchange="applySearch()"><option value="All">All specializations</option>${specs.map(s=>`<option>${s}</option>`).join("")}</select>`)}<div id="tableArea">${doctorTable(list)}</div></div>`;
}

const specs=["Cardiologist","Neurologist","Dermatologist","Pediatrician","Orthopedic","General Physician","Dentist","Gynecologist"];

function doctorTable(list){
return list.length?`<div class="tablewrap"><table class="data">
<thead><tr><th>Doctor</th><th>Doctor ID</th><th>Specialization</th><th>Experience</th><th>Consultation</th><th>Availability</th><th>Status</th><th>Actions</th></tr></thead>
<tbody>${list.map(d=>`<tr>
<td><div class="person"><div class="miniavatar">${initials(d.name)}</div><div><b>${esc(d.name)}</b><small>${esc(d.qualification)}</small></div></div></td>
<td>${esc(d.id)}</td><td>${esc(d.spec)}</td><td>${d.experience} years</td><td>₹${d.fee}</td><td>${esc(d.timings)}</td><td>${status(d.status)}</td>
<td><div class="actions">
<button class="linkbtn" onclick="viewDoctor('${d.id}')">View</button>
<button class="linkbtn" onclick="openDoctor('${d.id}')">Edit</button>
<button class="linkbtn del" onclick="deleteDoctor('${d.id}')">Delete</button>
</div></td></tr>`).join("")}</tbody></table></div>`:`<div class="empty">No doctors found.</div>`;
}

function appointmentsPage(){
let q=$("#searchInput")?.value||"",f=$("#apptFilter")?.value||"All";
let list=db.appointments.filter(a=>{
let p=patient(a.patientId),d=doctor(a.doctorId);
return (a.id+" "+(p?.name||"")+" "+(d?.name||"")+" "+a.date).toLowerCase().includes(q.toLowerCase())&&(f==="All"||a.status===f);
}).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));

$("#app").innerHTML=head("Appointments","Schedule and track patient consultations.","＋ Book appointment","openAppointment()")+`<div class="panel">${toolbar("Search appointment, patient or doctor",`<select id="apptFilter" onchange="applySearch()"><option>All</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></select>`)}<div id="tableArea">${appointmentTable(list,true)}</div></div>`;
}

function schedulePage(){
let selected=$("#scheduleDate")?.value||today();
let list=db.appointments.filter(a=>a.date===selected&&a.status!=="Cancelled").sort((a,b)=>a.time.localeCompare(b.time));
let grouped=db.doctors.map(d=>({d,items:list.filter(a=>a.doctorId===d.id)})).filter(x=>x.items.length);

$("#app").innerHTML=head("Daily Schedule","Doctor-wise appointment timetable for the selected date.")+`<div class="panel">
<div class="toolbar"><input type="date" id="scheduleDate" value="${selected}" onchange="schedulePage()"><span style="font-size:12px;color:#718096;align-self:center">${list.length} appointment(s)</span></div>
${grouped.length?`<div class="schedule">${grouped.map(g=>`<div class="schedulecard">
<h4>${esc(g.d.name)} <span style="font-weight:400;color:#718096">· ${esc(g.d.spec)}</span></h4>
${g.items.map(a=>`<div class="slot"><b>${esc(a.time)} — ${esc(patient(a.patientId)?.name||"Unknown patient")}</b><small>${esc(a.reason)} · ${status(a.status)}</small></div>`).join("")}
</div>`).join("")}</div>`:`<div class="empty">No appointments scheduled for this date.</div>`}
</div>`;
}

function applySearch(){
let q=$("#searchInput")?.value||"";

if(page==="patients"){
$("#tableArea").innerHTML=patientTable(db.patients.filter(p=>(p.name+" "+p.id+" "+p.phone).toLowerCase().includes(q.toLowerCase())));
}

if(page==="doctors"){
let f=$("#docFilter")?.value||"All";
$("#tableArea").innerHTML=doctorTable(db.doctors.filter(d=>(d.name+" "+d.id+" "+d.spec).toLowerCase().includes(q.toLowerCase())&&(f==="All"||d.spec===f)));
}

if(page==="appointments"){
let f=$("#apptFilter")?.value||"All";
$("#tableArea").innerHTML=appointmentTable(db.appointments.filter(a=>{
let p=patient(a.patientId),d=doctor(a.doctorId);
return(a.id+" "+(p?.name||"")+" "+(d?.name||"")+" "+a.date).toLowerCase().includes(q.toLowerCase())&&(f==="All"||a.status===f);
}),true);
}
}

function field(label,name,type="text",value="",required=true,extra=""){
return `<div class="field"><label>${label}${required?" *":""}</label><input name="${name}" type="${type}" value="${esc(value)}" ${required?"required":""} ${extra}></div>`;
}

function selectField(label,name,options,value="",required=true){
return `<div class="field"><label>${label}${required?" *":""}</label><select name="${name}" ${required?"required":""}><option value="">Select ${label.toLowerCase()}</option>${options.map(o=>`<option value="${esc(o)}" ${o===value?"selected":""}>${esc(o)}</option>`).join("")}</select></div>`;
}

function areaField(label,name,value=""){
return `<div class="field full"><label>${label}</label><textarea name="${name}">${esc(value)}</textarea></div>`;
}

function openModal(title,body,onSubmit){
$("#modalTitle").textContent=title;
$("#modalBody").innerHTML=body;
$("#modalback").classList.add("show");
$("#modalBody form").onsubmit=e=>{
e.preventDefault();
onSubmit(new FormData(e.target));
};
}

function closeModal(){
$("#modalback").classList.remove("show");
}

function openPatient(id=""){
let p=id?patient(id):{};

openModal(id?"Edit patient":"Register patient",`<form><div class="formgrid">
${field("Full name","name","text",p.name||"")}
${field("Date of birth","dob","date",p.dob||"")}
${selectField("Gender","gender",["Male","Female","Other"],p.gender||"")}
${field("Phone number","phone","tel",p.phone||"",true,'pattern="[0-9+ -]{8,15}"')}
${field("Email","email","email",p.email||"",false)}
${field("Address","address","text",p.address||"")}
${selectField("Blood group","blood",["A+","A-","B+","B-","AB+","AB-","O+","O-"],p.blood||"",false)}
${areaField("Medical history","history",p.history||"")}
${areaField("Existing conditions","conditions",p.conditions||"")}
${areaField("Allergies","allergies",p.allergies||"")}
</div>
<div class="formactions">
<button type="button" class="btn secondary" onclick="closeModal()">Cancel</button>
<button class="btn">${id?"Save changes":"Register patient"}</button>
</div></form>`,f=>{
let v=Object.fromEntries(f);
if(db.patients.some(x=>x.phone===v.phone&&x.id!==id)){
toast("A patient with this phone number already exists.",true);
return;
}
if(id)Object.assign(p,v);
else db.patients.unshift({id:uid("PAT"),...v});
save();
closeModal();
render();
toast(id?"Patient updated successfully":"Patient registered successfully");
});
}

function openDoctor(id=""){
let d=id?doctor(id):{};

openModal(id?"Edit doctor":"Add doctor",`<form><div class="formgrid">
${field("Doctor name","name","text",d.name||"")}
${selectField("Specialization","spec",specs,d.spec||"")}
${field("Qualification","qualification","text",d.qualification||"")}
${field("Years of experience","experience","number",d.experience||"",true,'min="0" max="60"')}
${field("Phone number","phone","tel",d.phone||"",true,'pattern="[0-9+ -]{8,15}"')}
${field("Email","email","email",d.email||"")}
${field("Consultation fee (₹)","fee","number",d.fee||"",true,'min="0"')}
${field("Available days","days","text",d.days||"Mon–Fri")}
${field("Consultation timings","timings","text",d.timings||"09:00–17:00")}
${selectField("Status","status",["Active","Inactive"],d.status||"Active")}
</div>
<div class="formactions">
<button type="button" class="btn secondary" onclick="closeModal()">Cancel</button>
<button class="btn">${id?"Save changes":"Add doctor"}</button>
</div></form>`,f=>{
let v=Object.fromEntries(f);
v.experience=Number(v.experience);
v.fee=Number(v.fee);
if(id)Object.assign(d,v);
else db.doctors.unshift({id:uid("DOC"),...v});
save();
closeModal();
render();
toast(id?"Doctor updated":"Doctor added successfully");
});
}

function openAppointment(id=""){
let a=id?db.appointments.find(x=>x.id===id):{};
let active=db.doctors.filter(d=>d.status==="Active");

openModal(id?"Reschedule appointment":"Book appointment",`<form><div class="formgrid">
${selectField("Patient","patientId",db.patients.map(p=>p.id+" — "+p.name),a.patientId?a.patientId+" — "+(patient(a.patientId)?.name||""):"")}
${selectField("Doctor","doctorId",active.map(d=>d.id+" — "+d.name+" ("+d.spec+")"),a.doctorId?a.doctorId+" — "+(doctor(a.doctorId)?.name||"")+" ("+(doctor(a.doctorId)?.spec||"")+")":"")}
${field("Appointment date","date","date",a.date||today(),true,`min="${today()}"`)}
${field("Appointment time","time","time",a.time||"09:00")}
${field("Reason for visit","reason","text",a.reason||"")}
${id?selectField("Status","status",["Confirmed","Completed","Cancelled"],a.status||"Confirmed"):''}
</div>
<div class="formactions">
<button type="button" class="btn secondary" onclick="closeModal()">Cancel</button>
<button class="btn">${id?"Save appointment":"Confirm booking"}</button>
</div></form>`,f=>{
let v=Object.fromEntries(f);
v.patientId=v.patientId.split(" — ")[0];
v.doctorId=v.doctorId.split(" — ")[0];

if(v.date<today()){
toast("Appointments cannot be scheduled in the past.",true);
return;
}

if(!patient(v.patientId)||!doctor(v.doctorId)){
toast("Select a valid patient and doctor.",true);
return;
}

if(doctor(v.doctorId).status!=="Active"){
toast("This doctor is inactive.",true);
return;
}

let conflict=db.appointments.find(x=>x.id!==id&&x.doctorId===v.doctorId&&x.date===v.date&&x.time===v.time&&x.status!=="Cancelled");

if(conflict){
toast("Time slot unavailable: this doctor already has an appointment.",true);
return;
}

if(id)Object.assign(a,v);
else db.appointments.unshift({id:uid("APT"),...v,status:"Confirmed"});

save();
closeModal();
render();
toast(id?"Appointment updated":"Appointment booked successfully");
});
}

function cancelAppointment(id){
let a=db.appointments.find(x=>x.id===id);
if(!a||!confirm("Cancel this appointment?"))return;
a.status="Cancelled";
save();
render();
toast("Appointment cancelled");
}

function deletePatient(id){
if(db.appointments.some(a=>a.patientId===id&&a.status!=="Cancelled")){
toast("Cancel or complete this patient's active appointments before deleting.",true);
return;
}
if(confirm("Delete this patient record?")){
db.patients=db.patients.filter(p=>p.id!==id);
save();
render();
toast("Patient deleted");
}
}

function deleteDoctor(id){
if(db.appointments.some(a=>a.doctorId===id&&a.status!=="Cancelled"&&a.date>=today())){
toast("This doctor has upcoming appointments. Cancel or reassign them first.",true);
return;
}
if(confirm("Delete this doctor record?")){
db.doctors=db.doctors.filter(d=>d.id!==id);
save();
render();
toast("Doctor deleted");
}
}

function viewPatient(id){
let p=patient(id);
openModal("Patient profile",`<div class="notice">Patient ID: ${esc(p.id)}</div>
<div class="profilegrid">
${profile("Full name",p.name)}
${profile("Date of birth",p.dob)}
${profile("Age",age(p.dob))}
${profile("Gender",p.gender)}
${profile("Phone",p.phone)}
${profile("Email",p.email)}
${profile("Blood group",p.blood)}
${profile("Address",p.address)}
${profile("Medical history",p.history)}
${profile("Conditions",p.conditions)}
${profile("Allergies",p.allergies)}
</div>
<div style="margin-top:20px"><b style="font-size:13px">Appointment history</b>${appointmentTable(db.appointments.filter(a=>a.patientId===id),false)}</div>
<div class="formactions"><button class="btn" onclick="closeModal()">Close</button></div>`);
}

function viewDoctor(id){
let d=doctor(id);
openModal("Doctor profile",`<div class="notice">Doctor ID: ${esc(d.id)}</div>
<div class="profilegrid">
${profile("Doctor name",d.name)}
${profile("Specialization",d.spec)}
${profile("Qualification",d.qualification)}
${profile("Experience",d.experience+" years")}
${profile("Phone",d.phone)}
${profile("Email",d.email)}
${profile("Consultation fee","₹"+d.fee)}
${profile("Available days",d.days)}
${profile("Timings",d.timings)}
${profile("Status",d.status)}
</div>
<div style="margin-top:20px"><b style="font-size:13px">Appointments</b>${appointmentTable(db.appointments.filter(a=>a.doctorId===id),false)}</div>
<div class="formactions"><button class="btn" onclick="closeModal()">Close</button></div>`);
}

function profile(k,v){
return `<div class="profileitem"><small>${esc(k)}</small><b>${esc(v||"—")}</b></div>`;
}

$("#modalback").addEventListener("click",e=>{
if(e.target.id==="modalback")closeModal();
});

document.addEventListener("keydown",e=>{
if(e.key==="Escape")closeModal();
});

render();