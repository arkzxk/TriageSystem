const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// sample symptom-based classification
const symptomSeverityMap = {
  "chest pain": { severity: "High", priority: 1 },
  "shortness of breath": { severity: "High", priority: 1 },
  "abdominal pain": { severity: "Medium", priority: 2 },
  "headache": { severity: "Low", priority: 3 },
  "fever": { severity: "Medium", priority: 2 },
  "nausea": { severity: "Low", priority: 3 },
  "unconsciousness": { severity: "Critical", priority: 0 },
  "dizziness": { severity: "Medium", priority: 2 },
  "vomiting blood": { severity: "High", priority: 1 },
  "mild cough": { severity: "Low", priority: 3 },
};

app.post('/triage', (req, res) => {
  const symptoms = req.body.symptoms; // Array of symptoms

  if (!Array.isArray(symptoms) || symptoms.length === 0) {
    return res.status(400).json({ error: "Please provide a list of symptoms." });
  }

  // determine the highest priority among the symptoms
  let result = symptoms.map(symptom => {
    const lower = symptom.toLowerCase();
    if (symptomSeverityMap[lower]) {
      return { symptom, ...symptomSeverityMap[lower] };
    } else {
      return { symptom, severity: "Unknown", priority: 4 };
    }
  });

  // determine final triage priority (lowest numerical value = highest priority)
  const finalPriority = Math.min(...result.map(r => r.priority));
  const overallSeverity = result.find(r => r.priority === finalPriority)?.severity || "Unknown";

  res.json({
    symptoms: result,
    overallSeverity,
    priorityLevel: finalPriority
  });
});

app.listen(3000, () => {
  console.log('Triage system running on http://localhost:3000');
});
