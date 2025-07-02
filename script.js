// When loading the page, load from localStorage.
const patientList = JSON.parse(localStorage.getItem('patientList')) || [];
const inputElement = document.querySelector('.js-condition-input');
let condition;

renderPatientList();

function renderPatientList() {
  let patientListHTML = '';

  for (let i = 0; i < patientList.length; i++) {
    const patientObject = patientList[i];
    const { condition, severity } = patientObject;
    const html = `
      <div>${severity}</div>
      <div>${condition}</div>
      <button onclick="
        patientList.splice(${i}, 1);
        renderPatientList();
        
        // Whenever we update the patient list, save in localStorage.
        saveToStorage();
      " class="delete-patient-button">Delete</button>
    `;
    patientListHTML += html;
  }

  document.querySelector('.js-patient-list').innerHTML = patientListHTML;
}

function addPatient() {
  condition = inputElement.value;
  const severity = Math.floor(Math.random() * 4) + 1;
  patientList.push({
    condition,
    severity
  });

  inputElement.value = '';

  renderPatientList();

  // Whenever we update the patient list, save in localStorage.
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('patientList', JSON.stringify(patientList));
}

// Triage System
// Output: Severity & Priority Level
