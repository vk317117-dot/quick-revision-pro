console.log("Admin JS Loaded");

const examSelect = document.getElementById("examSelect");
const topicSelect = document.getElementById("topicSelect");
const topicExam = document.getElementById("topicExam");

window.addExam = async function(){
  const name = document.getElementById("newExam").value.trim();
  if(!name){ alert("Exam name डालें"); return; }

  await db.collection("exams").add({
    name: name,
    createdAt: new Date()
  });

  alert("Exam Added ✅");
  document.getElementById("newExam").value = "";
  loadExams();
};

window.addTopic = async function(){
  const exam = topicExam.value;
  const name = document.getElementById("newTopic").value.trim();

  if(!exam || exam === "Select Exam" || !name){
    alert("Exam और Topic डालें");
    return;
  }

  await db.collection("topics").add({
    exam: exam,
    name: name,
    createdAt: new Date()
  });

  alert("Topic Added ✅");
  document.getElementById("newTopic").value = "";
  loadTopics();
};

async function loadExams(){
  const snap = await db.collection("exams").orderBy("name").get();

  examSelect.innerHTML = `<option>Select Exam</option>`;
  topicExam.innerHTML = `<option>Select Exam</option>`;
  document.getElementById("examList").innerHTML = "";

  snap.forEach(doc=>{
    const d = doc.data();
    examSelect.innerHTML += `<option value="${d.name}">${d.name}</option>`;
    topicExam.innerHTML += `<option value="${d.name}">${d.name}</option>`;
    document.getElementById("examList").innerHTML += `<p>${d.name}</p>`;
  });
}

async function loadTopics(){
  const snap = await db.collection("topics").orderBy("name").get();

  topicSelect.innerHTML = `<option>Select Topic</option>`;
  document.getElementById("topicList").innerHTML = "";

  snap.forEach(doc=>{
    const d = doc.data();
    topicSelect.innerHTML += `<option value="${d.name}">${d.name}</option>`;
    document.getElementById("topicList").innerHTML += `<p>${d.exam} - ${d.name}</p>`;
  });
}

window.saveQuestion = async function(){
  alert("Save Question working ✅");
};

loadExams();
loadTopics();
