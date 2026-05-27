const saveBtn = document.querySelector("button");

saveBtn.addEventListener("click", saveQuestion);

async function saveQuestion(){

const selects = document.querySelectorAll("select");
const textareas = document.querySelectorAll("textarea");
const inputs = document.querySelectorAll("input[type='text']");

const exam = selects[0].value;
const topic = selects[1].value;

const question = textareas[0].value;

const optionA = inputs[0].value;
const optionB = inputs[1].value;
const optionC = inputs[2].value;
const optionD = inputs[3].value;

const correct = selects[2].value;

const solution = textareas[1].value;

if(question===""){
alert("Enter Question");
return;
}

try{

const duplicate = await db.collection("questions")
.where("question","==",question)
.get();

if(!duplicate.empty){

alert("⚠ Question Already Exists");

return;

}

await db.collection("questions").add({

exam,
topic,
question,

options:[
optionA,
optionB,
optionC,
optionD
],

correct,
solution,

createdAt:new Date()

});

alert("✅ Question Saved");

textareas[0].value="";
textareas[1].value="";

inputs.forEach(input=>{
input.value="";
});

}
catch(error){

alert(error.message);

}

}
