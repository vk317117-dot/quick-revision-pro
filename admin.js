const examSelect=document.getElementById("examSelect");
const topicSelect=document.getElementById("topicSelect");
const topicExam=document.getElementById("topicExam");

async function addExam(){
const name=document.getElementById("newExam").value.trim();
if(!name){alert("Exam name डालें");return;}

await db.collection("exams").add({
name:name,
createdAt:new Date()
});

document.getElementById("newExam").value="";
loadExams();
alert("Exam Added ✅");
}

async function loadExams(){
const snap=await db.collection("exams").orderBy("name").get();

examSelect.innerHTML="<option>Select Exam</option>";
topicExam.innerHTML="<option>Select Exam</option>";
document.getElementById("examList").innerHTML="";

snap.forEach(doc=>{
const d=doc.data();

examSelect.innerHTML+=`<option value="${d.name}">${d.name}</option>`;
topicExam.innerHTML+=`<option value="${d.name}">${d.name}</option>`;

document.getElementById("examList").innerHTML+=`
<p>${d.name} <button onclick="deleteExam('${doc.id}')">Delete</button></p>
`;
});
}

async function deleteExam(id){
if(confirm("Delete Exam?")){
await db.collection("exams").doc(id).delete();
loadExams();
}
}

async function addTopic(){
const exam=topicExam.value;
const topic=document.getElementById("newTopic").value.trim();

if(exam==="Select Exam" || !topic){
alert("Exam और Topic दोनों डालें");
return;
}

await db.collection("topics").add({
exam:exam,
name:topic,
createdAt:new Date()
});

document.getElementById("newTopic").value="";
loadTopics();
alert("Topic Added ✅");
}

async function loadTopics(){
const snap=await db.collection("topics").orderBy("name").get();

topicSelect.innerHTML="<option>Select Topic</option>";
document.getElementById("topicList").innerHTML="";

snap.forEach(doc=>{
const d=doc.data();

topicSelect.innerHTML+=`<option value="${d.name}">${d.name}</option>`;

document.getElementById("topicList").innerHTML+=`
<p>${d.exam} - ${d.name} <button onclick="deleteTopic('${doc.id}')">Delete</button></p>
`;
});
}

async function deleteTopic(id){
if(confirm("Delete Topic?")){
await db.collection("topics").doc(id).delete();
loadTopics();
}
}

async function saveQuestion(){
const textareas=document.querySelectorAll("textarea");
const inputs=document.querySelectorAll("input[type='text']");

const exam=examSelect.value;
const topic=topicSelect.value;
const question=textareas[0].value.trim();

if(exam==="Select Exam" || topic==="Select Topic" || !question){
alert("Exam, Topic और Question भरें");
return;
}

const duplicate=await db.collection("questions")
.where("question","==",question)
.get();

if(!duplicate.empty){
alert("⚠ यह question पहले से मौजूद है");
return;
}

await db.collection("questions").add({
exam:exam,
topic:topic,
question:question,
options:[inputs[1].value,inputs[2].value,inputs[3].value,inputs[4].value],
correct:document.querySelectorAll("select")[2].value,
solution:textareas[1].value,
createdAt:new Date()
});

alert("Question Saved ✅");
}

window.onload=()=>{
loadExams();
loadTopics();
};
