const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

const triageCategories = [
  {
    category: "Category 1 (RED)",
    severity: "Life Threatening Conditions",
    responseTime: "Seen Immediately",
    symptoms: [
      "cardiac arrest", "respiratory arrest", "extreme respiratory distress",
      "severe shock", "prolonged seizure", "GCS less than 9", "IV overdose",
      "severe behavioral disorder"
    ]
  },
  {
    category: "Category 2 (ORANGE)",
    severity: "Imminently Life Threatening or Severe Pain",
    responseTime: "Seen within 10 minutes",
    symptoms: [
      "airway risk", "febrile neutropenia", "acute stroke", "testicular torsion",
      "severe hypertension", "toxic ingestion", "severe chest pain", "ectopic pregnancy"
    ]
  },
  {
    category: "Category 3 (GREEN)",
    severity: "Potentially Life Threatening or Severe Pain",
    responseTime: "Seen within 30 minutes",
    symptoms: [
      "vomiting", "dehydration", "seizure", "head injury", "moderate shortness of breath",
      "stable sepsis", "behavioral issue", "limb injury", "moderate blood loss"
    ]
  },
  {
    category: "Category 4 (BLUE)",
    severity: "Potentially Serious Condition",
    responseTime: "Seen within 60 minutes",
    symptoms: [
      "minor head injury", "vomiting without dehydration", "swollen eye",
      "mild pain", "soft tissue injury", "uncomplicated fracture", "fever"
    ]
  },
  {
    category: "Category 5 (WHITE)",
    severity: "Less Urgent or Administrative",
    responseTime: "Seen within 120 minutes",
    symptoms: [
      "mild symptoms", "minor abrasions", "medication refill", "no risk factors",
      "chronic psychiatric symptoms"
    ]
  }
];

// based on symptoms
function findTriageCategory(symptomInput) {
  const lowerSymptom = symptomInput.toLowerCase();
  for (const triage of triageCategories) {
    for (const keyword of triage.symptoms) {
      if (lowerSymptom.includes(keyword.toLowerCase())) {
        return triage;
      }
    }
  }
  return {
    category: "Unclassified",
    severity: "Unknown",
    responseTime: "Refer to triage nurse",
  };
}

app.post('/triage', (req, res) => {
  const { symptom } = req.body;

  if (!symptom) {
    return res.status(400).json({ error: "Symptom is required" });
  }

  const result = findTriageCategory(symptom);
  res.json({
    input: symptom,
    triageCategory: result.category,
    severity: result.severity,
    responseTime: result.responseTime,
  });
});

app.listen(PORT, () => {
  console.log(`Triage system backend is running at http://localhost:${PORT}`);
});
