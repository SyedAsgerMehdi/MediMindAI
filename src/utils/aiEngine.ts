export interface AIResponse {
  content: string;
  disclaimer: string;
  sources: string[];
  followUp: string[];
}

const RESPONSES: Record<string, AIResponse> = {
  welcome: {
    content: `### Welcome to MediMind AI! 👋

Hi, I am **MediMind AI**, your Intelligent Healthcare Companion. I specialize in providing evidence-based healthcare information, symptom checks, wellness suggestions, and medical guidance.

Here is a brief overview of my areas of expertise:
* 🩺 **Symptom Assessment & Guidance**: Checking common indicators for colds, fevers, headaches, acid reflux, and joint pains.
* 💊 **Medication Information**: Providing drug classification, safety limits, uses, and crucial warnings for standard tablets.
* 🥗 **Nutrition & Balanced Diets**: Structuring weight-loss plans, muscle-building regimens, plant-based templates, and hydration targets.
* 🏋️‍♂️ **Fitness & Exercises**: Recommending home workouts, strength training splits, cardio intervals, and lower back stretches.
* 🧠 **Mental Health & Stress**: Providing sensory grounding techniques, panic relief exercises, sleep hygiene habits, and burnout support.
* 🚨 **First Aid & Emergencies**: Giving step-by-step procedures for burns, bleeding, choking, stings, and CPR guidance.

How can I help you take care of your health today?`,
    disclaimer: "MediMind AI provides educational health information. It does not replace professional medical evaluations.",
    sources: ["MediMind Health Guidelines 2026"],
    followUp: ["Check Symptoms", "Healthy Diet Plan", "Emergency Guidance"]
  },
  symptoms: {
    content: `### Symptom Assessment & Guidance 🩺

It sounds like you are seeking information about symptoms. Let's look at common symptoms and standard care:

#### 1. Common Cold / Flu Symptoms
* **Signs**: Fever, dry cough, sore throat, fatigue, nasal congestion.
* **Home Care**: Prioritize hydration (water, herbal teas), rest, and warm fluids. Over-the-counter remedies like acetaminophen or ibuprofen can reduce fever and ease body aches.
* **Monitor**: Track temperature variations and symptom progression.

#### 2. Tension Headaches
* **Signs**: Dull, aching pain, sensation of tightness across the forehead or back of head.
* **Triggers**: Stress, poor posture, dehydration, eye strain.
* **Care**: Rest in a quiet, dark room. Apply a cool compress to your forehead. Maintain proper hydration.

#### When to Seek Urgent Medical Care 🚨
Contact a doctor immediately or visit the nearest ER if you experience:
* Difficulty breathing or shortness of breath.
* Persistent chest pain or pressure.
* High fever (above 103°F / 39.4°C) that doesn't respond to medication.
* Sudden severe headache, confusion, or stiff neck.`,
    disclaimer: "If you are experiencing severe, sudden, or life-threatening symptoms, please seek emergency medical services immediately.",
    sources: ["Mayo Clinic - Symptom Checker", "World Health Organization (WHO) - Influenza Guidelines"],
    followUp: ["How to treat a fever?", "Sore throat remedies", "When to see a doctor?"]
  },
  nutrition: {
    content: `### Healthy Nutrition & Balanced Diet Plan 🥗

A nutrient-dense diet is the cornerstone of vitality and preventive healthcare. Here is a baseline structure for everyday wellness:

#### Core Components of a Balanced Diet:
1. **Vegetables & Fruits (50% of your plate)**: Aim for a colorful variety. They provide essential vitamins, minerals, and dietary fibers.
2. **Lean Proteins (25% of your plate)**: Opt for chicken breast, fish (rich in Omega-3), eggs, tofu, lentils, and beans.
3. **Whole Grains (25% of your plate)**: Choose quinoa, brown rice, oats, and whole-wheat bread over refined grains.
4. **Healthy Fats**: Include avocados, nuts, seeds, and extra virgin olive oil in moderation for brain and cardiovascular health.

#### Daily Hydration Targets:
* **Men**: Approximately 3.7 liters (15 cups) of fluids per day.
* **Women**: Approximately 2.7 liters (11 cups) of fluids per day.
* *Note: Increase intake during exercise or hot weather.*

#### Top Nutrition Habits:
* Minimize processed sugars and high-sodium foods.
* Chew slowly to support digestive health and satiety signals.
* Plan meals around whole, unprocessed foods.`,
    disclaimer: "Nutrition guidelines can vary based on individual health conditions (e.g., diabetes, food allergies). Consult a registered dietitian for personalized meal planning.",
    sources: ["Harvard T.H. Chan School of Public Health - Healthy Eating Plate", "USDA Dietary Guidelines for Americans"],
    followUp: ["High protein vegetarian meal plan", "How to reduce sugar intake?", "Hydration tips"]
  },
  fitness: {
    content: `### Fitness & Exercise Recommendations 🏋️‍♂️

Physical activity is vital for physical health, cardiovascular function, and mental wellbeing. Here is a balanced weekly routine:

#### 1. Cardiovascular Exercise (Aerobic)
* **Goal**: 150 minutes of moderate-intensity activity per week (e.g., 30 minutes, 5 days a week).
* **Activities**: Brisk walking, cycling, swimming, jogging.
* **Benefits**: Strengthens the heart, burns calories, and boosts mood.

#### 2. Strength Training (Anaerobic)
* **Goal**: 2 or more days per week focusing on all major muscle groups.
* **Activities**: Bodyweight exercises (pushups, squats, lunges), resistance bands, or weight lifting.
* **Benefits**: Prevents muscle loss, improves bone density, and increases metabolic rate.

#### 3. Flexibility and Balance
* **Goal**: 5-10 minutes of active stretching before/after workouts, or dedicated sessions.
* **Activities**: Yoga, Pilates, static stretching.
* **Benefits**: Enhances range of motion and prevents injuries.

#### Safe Exercise Tips:
* Always warm up for 5 minutes before exercising and cool down afterward.
* Listen to your body: mild muscle soreness is normal; sharp pain is a signal to stop.
* Wear appropriate footwear and stay hydrated.`,
    disclaimer: "Always consult a doctor before starting a new exercise regimen, especially if you have pre-existing cardiovascular conditions, joint injuries, or have been sedentary.",
    sources: ["American Heart Association (AHA) Activity Guidelines", "American Council on Exercise (ACE)"],
    followUp: ["15-minute home workout", "Stretches for lower back pain", "Cardio vs weight lifting"]
  },
  medication: {
    content: `### Medication Guidelines & Precautions 💊

Proper utilization of medications is essential for recovery and safety. Here is critical information regarding common medicines:

#### Common Over-The-Counter (OTC) Drugs:
1. **Acetaminophen (Paracetamol)**
   * **Primary Uses**: Pain relief (headaches, muscle aches) and fever reduction.
   * **Safety Threshold**: Maximum adult dose is **4000mg per 24 hours**. Exceeding this can lead to severe liver damage.
2. **Ibuprofen (Advil/Motrin)**
   * **Primary Uses**: Anti-inflammatory pain relief (swelling, arthritis, menstrual cramps) and fever.
   * **Safety Action**: Always take with food or milk to prevent stomach irritation. Avoid chronic use without medical supervision due to kidney/heart risks.
3. **Antihistamines**
   * **Primary Uses**: Allergy symptom relief (sneezing, runny nose, hives).
   * **Note**: First-generation options (like diphenhydramine) cause drowsiness. Non-drowsy alternatives include cetirizine or loratadine.

#### Golden Rules of Medication Safety:
* **Prescriptions**: Always complete the full course of antibiotics, even if you feel better.
* **Interactions**: Avoid drinking alcohol while taking pain relievers, sleep aids, or antibiotics.
* **Storage**: Keep medications in a cool, dry place, out of reach of children.`,
    disclaimer: "Never adjust your prescription medication dosage without consulting your doctor. Read all packaging inserts carefully for side effects and drug interactions.",
    sources: ["U.S. Food and Drug Administration (FDA) Consumer Updates", "National Institutes of Health (NIH) MedlinePlus"],
    followUp: ["Ibuprofen vs Acetaminophen", "Antibiotics safety guidelines", "How to manage side effects"]
  },
  mental: {
    content: `### Mental Health & Stress Management Support 🧠

Mental wellness is as important as physical health. Managing stress and maintaining emotional balance directly impacts your body's immune system.

#### Key Strategies for Stress Reduction:
1. **Box Breathing Technique (4-4-4-4)**:
   * Inhale slowly through your nose for 4 seconds.
   * Hold your breath for 4 seconds.
   * Exhale completely through your mouth for 4 seconds.
   * Hold empty for 4 seconds. Repeat 4 times.
2. **Sleep Hygiene Practices**:
   * Maintain a consistent sleep schedule (even on weekends).
   * Keep your bedroom cool, dark, and quiet.
   * Discontinue screen usage (phones, laptops) 1 hour before bed.
3. **Mindfulness & Meditation**:
   * Spend 5-10 minutes daily sitting quietly, observing your breath without judgment.
   * Download a guided meditation app to help focus your thoughts.

#### Seeking Professional Support:
If feelings of sadness, anxiety, or overwhelm last longer than two weeks or interfere with daily tasks, consider scheduling a conversation with a licensed therapist. Seeking help is a sign of strength.`,
    disclaimer: "MediMind AI does not provide psychological therapy or crisis intervention. If you are experiencing a mental health emergency, please contact your local crisis hotline immediately.",
    sources: ["National Institute of Mental Health (NIMH)", "American Psychological Association (APA)"],
    followUp: ["How to fall asleep faster?", "Quick anxiety relief exercises", "Signs of burnout"]
  },
  emergency: {
    content: `### First Aid & Emergency Guidance 🚨

Knowing the correct first aid procedures can save lives. Here is immediate guidance for common emergencies:

#### 1. Minor Burns (1st and 2nd Degree)
* **Action**: Run cool (not ice-cold) tap water over the burn for 10-15 minutes.
* **Protect**: Cover with a sterile, non-adhesive bandage.
* **Avoid**: Do NOT apply butter, oils, or toothpaste. Do NOT pop blisters.

#### 2. Severe Bleeding
* **Action**: Apply direct, continuous pressure to the wound with a clean cloth or sterile gauze.
* **Elevate**: Raise the injured limb above heart level if possible.
* **Secure**: Do NOT remove the cloth if it gets soaked; add another cloth on top and keep pressing. Seek emergency room care.

#### 3. Nosebleeds
* **Action**: Sit upright and lean slightly **forward** (do NOT lean backward, which causes blood to run down the throat).
* **Pinch**: Pinch the soft part of your nose just below the bridge for 10 full minutes. Breathe through your mouth.

#### Emergency Services Contact Numbers:
* **United States**: Call 911
* **Europe/UK**: Call 112 / 999
* **India**: Call 112 / 102`,
    disclaimer: "These instructions are for initial first-aid. Always consult a medical professional or seek emergency room services for severe injuries, deep cuts, poisoning, or suspected fractures.",
    sources: ["American Red Cross First Aid Guidelines", "St John Ambulance Manual"],
    followUp: ["How to perform CPR?", "Treating a insect sting", "What to put in a first-aid kit?"]
  },
  diabetes: {
    content: `### Diabetes Management & Information 🩺
    
Diabetes is a chronic condition that affects how your body turns food into energy.

#### Types of Diabetes:
* **Type 1 Diabetes**: An autoimmune reaction where the body stops making insulin. Typically diagnosed in children and young adults.
* **Type 2 Diabetes**: The body doesn't use insulin well and can't keep blood sugar at normal levels. Strongly linked to diet, exercise, and genetics.
* **Gestational Diabetes**: Develops in pregnant women who have never had diabetes, usually resolving after delivery.

#### Key Symptoms to Monitor:
* Extreme thirst (polydipsia) and frequent urination (polyuria).
* Constant hunger and unexplained weight loss.
* Blurry vision and slow-healing sores or cuts.
* Tingling or numbness in hands or feet.

#### Core Prevention & Control Guidelines:
1. **Diet**: Prioritize fiber-rich whole grains, lean proteins, vegetables, and low-glycemic foods. Restrict refined sugars and simple carbs.
2. **Activity**: Aim for 30 minutes of aerobic exercise (like brisk walking) at least 5 days a week to lower insulin resistance.
3. **Monitoring**: Track HbA1c levels regularly (target is typically < 7% for diabetics).`,
    disclaimer: "Diabetes requires careful medical diagnosis and management. Consult an endocrinologist for custom insulin, medication, or diet planning.",
    sources: ["American Diabetes Association (ADA) Standards of Care", "CDC Diabetes Prevention Program"],
    followUp: ["Difference between Type 1 and Type 2", "What is a normal blood sugar range?", "Low glycemic index foods"]
  },
  hypertension: {
    content: `### Hypertension (High Blood Pressure) Guidance 🩸
    
Hypertension is often called the "silent killer" because it typically has no visible warning signs but can lead to heart attacks or stroke if unmanaged.

#### Blood Pressure Classifications (Adults):
* **Normal**: Under 120/80 mmHg.
* **Elevated**: Systolic between 120-129 AND Diastolic under 80 mmHg.
* **Stage 1 Hypertension**: Systolic 130-139 OR Diastolic 80-89 mmHg.
* **Stage 2 Hypertension**: Systolic 140+ OR Diastolic 90+ mmHg.
* **Hypertensive Crisis**: Over 180/120 mmHg (Requires immediate emergency medical attention! 🚨).

#### Action Plan for Lowering Blood Pressure:
1. **Follow the DASH Diet**: Dietary Approaches to Stop Hypertension. Focus on eating vegetables, fruits, whole grains, and low-fat dairy.
2. **Reduce Sodium**: Keep daily sodium intake under **1,500 - 2,300 mg**. Avoid processed foods and canned meals.
3. **Exercise Regularly**: 150 minutes of moderate cardio per week significantly improves blood vessel elasticity.
4. **Limit Alcohol & Quit Smoking**: Nicotine immediately raises blood pressure and damages artery walls.`,
    disclaimer: "Hypertension medications (e.g. ACE inhibitors, beta-blockers) should only be started or adjusted by your physician.",
    sources: ["American Heart Association (AHA) Hypertension Guidelines", "Joint National Committee (JNC) Report"],
    followUp: ["What is the DASH diet?", "Symptoms of hypertensive crisis", "How to measure BP at home"]
  },
  asthma: {
    content: `### Asthma & Respiratory Guidance 🫁
    
Asthma is a chronic condition that inflames and narrows the airways, making breathing difficult and triggering coughing, wheezing, and shortness of breath.

#### Common Triggers to Avoid:
* **Allergens**: Dust mites, pollen, pet dander, mold.
* **Irritants**: Cigarette smoke, air pollution, chemical fumes, strong perfumes.
* **Environmental**: Cold air, sudden temperature changes.
* **Physical**: Heavy exercise (Exercise-Induced Bronchoconstriction).

#### Medications Overview:
1. **Quick-Relief (Rescue) Inhalers**: e.g., Albuterol. Relax the muscles around your airways quickly during a flare-up.
2. **Long-Term Control Inhalers**: e.g., Inhaled Corticosteroids (fluticasone, budesonide). Reduce swelling and mucus in your airways. Take daily as prescribed.

#### Asthma Action Plan Steps:
* **Green Zone (Well-Controlled)**: No symptoms. Continue daily controller medications.
* **Yellow Zone (Caution)**: Mild wheezing or cough. Use rescue inhaler and consult your asthma plan.
* **Red Zone (Danger! 🚨)**: Severe breathing difficulty, chest retractions, lips turning blue. Use rescue inhaler immediately and seek emergency medical care.`,
    disclaimer: "Always carry your rescue inhaler with you. Consult a pulmonologist to create a written Asthma Action Plan.",
    sources: ["Global Initiative for Asthma (GINA) Guidelines", "National Heart, Lung, and Blood Institute (NHLBI)"],
    followUp: ["How to use an inhaler correctly", "What is exercise-induced asthma?", "Airway trigger checklist"]
  },
  heartDisease: {
    content: `### Cardiovascular & Heart Disease Guidance ❤️
    
Cardiovascular disease refers to conditions affecting the heart muscle, valves, or blood vessels, most commonly Coronary Artery Disease (CAD), which occurs when plaque builds up in the arteries.

#### Major Risk Factors:
* High LDL cholesterol ("bad" cholesterol) and low HDL cholesterol ("good" cholesterol).
* Uncontrolled high blood pressure and diabetes.
* Smoking, physical inactivity, and diets high in saturated/trans fats.

#### Prevention and Heart-Healthy Habits:
1. **Dietary Choices**: Eat Omega-3 rich fatty fish (salmon, mackerel), walnuts, flaxseeds, oats, and leafy greens. Replace butter with olive oil.
2. **Aerobic Exercise**: Activity like brisk walking, swimming, or cycling for 30 minutes daily strengthens the heart muscle.
3. **Weight Management**: Maintain a healthy waist-to-hip ratio and BMI within 18.5 - 24.9.
4. **Stress Reduction**: High chronic cortisol levels raise heart rates and worsen vessel inflammation.

#### 🚨 Emergency Heart Warning Signs:
Seek emergency care immediately (call 911 / 112) if you experience:
* Crushing chest pain or pressure that radiates to the arm, shoulder, back, or jaw.
* Sudden shortness of breath, cold sweats, or severe dizziness.`,
    disclaimer: "Chest pain should always be evaluated by a medical professional immediately. Do not delay emergency consultation.",
    sources: ["American College of Cardiology (ACC)", "American Heart Association (AHA) Guidelines"],
    followUp: ["Differences between LDL and HDL", "What is coronary artery disease?", "Signs of a silent heart attack"]
  },
  covid: {
    content: `### COVID-19 Information & Self-Care 🦠
    
COVID-19 is a highly contagious respiratory infection caused by the SARS-CoV-2 virus.

#### Primary Symptoms:
* Fever or chills, cough, shortness of breath.
* Fatigue, muscle or body aches, headache.
* **New loss of taste or smell** (a highly characteristic indicator).
* Sore throat, congestion, runny nose, nausea, or diarrhea.

#### In-Home Isolation and Care Tips:
1. **Hydration and Rest**: Drink plenty of water and broths. Get extra sleep.
2. **Fever Management**: Take acetaminophen (paracetamol) or ibuprofen as needed according to package limits.
3. **Monitor Oxygen Levels**: Use a pulse oximeter. Normal readings are typically **95% - 100%**.
4. **Isolate**: Stay in a separate room and use a separate bathroom if possible to prevent spreading to family members.

#### Seek Emergency Care Immediately if you experience:
* Difficulty breathing or severe chest pressure.
* Oxygen levels dropping below **90% - 92%**.
* Confusion or inability to wake or stay awake.
* Pale, gray, or blue skin, lips, or nail beds.`,
    disclaimer: "Vaccination remains the most effective tool to prevent severe illness, hospitalization, and death from COVID-19 complications.",
    sources: ["World Health Organization (WHO) COVID-19 Care", "CDC Coronavirus Prevention and Care"],
    followUp: ["COVID-19 isolation timelines", "How to use a pulse oximeter", "What to do for long COVID"]
  },
  allergies: {
    content: `### Allergies & Hypersensitivity Information 🌸
    
Allergies occur when your immune system reacts excessively to a foreign substance (allergen) that is normally harmless.

#### Types of Allergens:
* **Airborne**: Pollen, pet dander, dust mites, mold spores (causes seasonal rhinitis / hay fever).
* **Foods**: Peanuts, tree nuts, milk, eggs, wheat, soy, fish, shellfish.
* **Insects**: Bee stings, wasp stings.
* **Medications**: Penicillin, sulfa drugs.

#### Symptoms Breakdown:
* **Mild/Moderate**: Sneezing, itchy/watery eyes, runny nose, skin hives, localized swelling.
* **Severe (Anaphylaxis! 🚨)**: Swelling of the throat, tongue, or airway, wheezing, difficulty breathing, dizziness, sudden drop in blood pressure, loss of consciousness.

#### Treatment and First Aid:
1. **Mild Reactions**: Antihistamines (cetirizine, loratadine, diphenhydramine) reduce itching and sneezing.
2. **Anaphylaxis First Aid**:
   * Administer an **EpiPen (Epinephrine Auto-injector)** immediately if available.
   * Call emergency services immediately.
   * Keep the person lying flat with feet elevated.`,
    disclaimer: "Severe allergic reactions are life-threatening emergencies. Anyone who receives epinephrine must go to the ER immediately.",
    sources: ["American Academy of Allergy, Asthma & Immunology (AAAAI)", "Mayo Clinic Allergy Center"],
    followUp: ["Symptoms of anaphylaxis", "Non-drowsy antihistamines list", "What is an EpiPen?"]
  },
  gastritis: {
    content: `### Gastritis & Acid Reflux Guidance 🤢
    
Gastritis is the inflammation of the stomach lining, while Acid Reflux (GERD) is the backflow of stomach acid into the esophagus.

#### Common Indicators & Symptoms:
* Burning pain or heartburn in the upper abdomen or chest (especially after eating).
* Bloating, nausea, hiccups, or vomiting.
* Frequent burping or sour taste in the mouth.

#### Immediate Care & Lifestyle Tips:
1. **Trigger Foods**: Avoid high-acid foods (citrus, tomatoes), spicy dishes, caffeine, carbonated drinks, and fried/fatty meals.
2. **Eating Habits**: Eat smaller, more frequent meals. Do NOT lie down within 2-3 hours of eating.
3. **Natural Remedies**: Drink warm chamomile or ginger tea. Elevate the head of your bed by 6 inches.
4. **Medications**: Antacids, H2 Blockers (Famotidine), or Proton Pump Inhibitors (Omeprazole) can reduce stomach acid.`,
    disclaimer: "Severe upper abdominal pain, vomiting blood, or black tarry stools require immediate emergency medical evaluation.",
    sources: ["American Gastroenterological Association (AGA)", "Mayo Clinic Gastritis Overview"],
    followUp: ["Trigger foods for acid reflux", "How to treat heartburn quickly", "Omeprazole side effects"]
  },
  arthritis: {
    content: `### Arthritis & Joint Pain Guidance 🦴
    
Arthritis is the swelling and tenderness of one or more joints, primarily categorised as Osteoarthritis (wear-and-tear) or Rheumatoid Arthritis (autoimmune).

#### Key Symptoms to Monitor:
* Joint pain, stiffness (especially in the morning), and swelling.
* Redness and decreased range of motion in the affected joints.

#### Joint Preservation & Management:
1. **Low-Impact Exercise**: Engage in swimming, cycling, or walking to strengthen muscles around the joints without high-impact strain.
2. **Therapy**: Use heat packs for morning stiffness to relax muscles, and ice packs for acute swelling or joint inflammation.
3. **Weight Control**: Maintaining a healthy weight directly reduces mechanical load and wear-and-tear on knees, hips, and lower back.
4. **Anti-inflammatory Diet**: Consume foods rich in Omega-3 (fish oil) and antioxidants to help reduce systemic inflammation.`,
    disclaimer: "Joint pain accompanied by fever, severe swelling, or inability to move the joint requires prompt doctor examination.",
    sources: ["Arthritis Foundation Guidelines", "American Academy of Orthopaedic Surgeons (AAOS)"],
    followUp: ["Exercises for knee arthritis", "Hot vs cold therapy for joints", "Anti-inflammatory foods"]
  },
  migraine: {
    content: `### Migraine & Headache Care 🧠
    
Migraines are severe, throbbing headaches often accompanied by sensory disturbances and nausea, distinct from standard tension headaches.

#### Symptoms & Phases:
* Intense, pulsating pain typically on one side of the head.
* Sensitivity to light, sound, and smells.
* Aura (visual disturbances like flashing lights or blind spots before pain starts).
* Nausea and vomiting.

#### Relief & Prevention Protocol:
1. **Quiet Sanctuary**: Rest in a dark, quiet, cool room at the onset of symptoms.
2. **Cold Compress**: Apply an ice pack or cool cloth to your forehead or the back of your neck.
3. **Hydration**: Drink a full glass of water, as dehydration is a major headache trigger.
4. **Abortive Medications**: OTC pain relievers (like Excedrin Migraine - combination of acetaminophen, aspirin, caffeine) or prescription triptans.`,
    disclaimer: "A sudden, severe headache described as the 'worst headache of your life' (thunderclap headache) requires immediate emergency room care.",
    sources: ["American Migraine Foundation", "National Institute of Neurological Disorders"],
    followUp: ["Common migraine triggers", "Excedrin precautions", "Difference between tension headache and migraine"]
  },
  cold: {
    content: `### Common Cold & Influenza (Flu) Care 🤧
    
The common cold and flu are viral respiratory infections. While the cold is usually mild, the flu presents stronger, sudden systemic symptoms.

#### Symptoms Comparison:
* **Cold**: Gradual onset. Sore throat, runny nose, sneezing, mild cough, low energy.
* **Flu**: Sudden onset. High fever, muscle/body aches, chills, fatigue, dry hacking cough, headache.

#### Home Recovery & Care Checklist:
1. **Maximum Hydration**: Drink warm fluids (chicken broth, herbal teas, warm water with lemon and honey) to soothe airways.
2. **Rest**: Prioritize sleep to allow your immune system to fight the virus.
3. **Symptom Relief**: Use saline nasal drops/sprays, gargle with warm salt water, and run a cool-mist humidifier in your bedroom.
4. **Fever & Pain**: Take acetaminophen or ibuprofen according to daily package limits.`,
    disclaimer: "Consult a doctor immediately if you experience shortness of breath, persistent high fever, or severe chest pain.",
    sources: ["CDC Influenza Prevention and Control", "Mayo Clinic Viral Infections Guide"],
    followUp: ["Flu vs Cold symptoms checklist", "Natural cough remedies", "When is a fever too high?"]
  }
};

interface SymptomGroup {
  disease: string;
  keywords: string[];
  responseKey: string;
}

const SYMPTOM_MAP: SymptomGroup[] = [
  {
    disease: "Diabetes",
    keywords: ["blood sugar", "thirst", "urination", "polyuria", "polydipsia", "frequent toilet", "dry mouth"],
    responseKey: "diabetes"
  },
  {
    disease: "Hypertension (High Blood Pressure)",
    keywords: ["high blood pressure", "systolic", "diastolic", "blurry vision", "ringing in ears", "hypertension"],
    responseKey: "hypertension"
  },
  {
    disease: "Asthma",
    keywords: ["wheez", "difficulty breathing", "shortness of breath", "chest tight", "coughing fit", "asthma"],
    responseKey: "asthma"
  },
  {
    disease: "Cardiovascular Disease / Heart Alert",
    keywords: ["chest pain", "left arm", "crushing pain", "radiating pain", "jaw pain", "numbness in arm", "cold sweat", "heart attack"],
    responseKey: "heartDisease"
  },
  {
    disease: "COVID-19",
    keywords: ["loss of taste", "loss of smell", "dry cough", "body aches", "chills", "fatigue", "covid", "corona"],
    responseKey: "covid"
  },
  {
    disease: "Allergic Rhinitis (Allergies)",
    keywords: ["runny nose", "sneez", "watery eyes", "itchy nose", "hives", "rash", "allergic", "allergy"],
    responseKey: "allergies"
  },
  {
    disease: "Tension Headache / Migraine",
    keywords: ["headache", "throbbing", "temple pain", "migraine", "light sensitivity"],
    responseKey: "migraine"
  },
  {
    disease: "Common Cold / Influenza",
    keywords: ["sore throat", "fever", "congestion", "sneezing", "cough", "chills", "flu", "cold"],
    responseKey: "cold"
  },
  {
    disease: "Gastritis / Acid Reflux",
    keywords: ["stomach pain", "heartburn", "acid reflux", "nausea", "indigestion", "bloating"],
    responseKey: "gastritis"
  },
  {
    disease: "Arthritis",
    keywords: ["joint pain", "stiffness", "swollen joint", "knees ache", "hands stiffness", "arthritis"],
    responseKey: "arthritis"
  }
];

const COMMON_TABLETS: Record<string, { name: string, class: string, use: string, warning: string, followUp: string[] }> = {
  metformin: {
    name: "Metformin (Glucophage)",
    class: "Biguanide Antidiabetic Agent",
    use: "Lowering blood glucose levels in people with Type 2 Diabetes. It works by improving insulin sensitivity, reducing glucose production in the liver, and decreasing intestinal glucose absorption.",
    warning: "Can cause gastrointestinal side effects (nausea, diarrhea). Take with meals to reduce irritation. Avoid excessive alcohol to prevent lactic acidosis.",
    followUp: ["Metformin side effects", "Metformin dosage", "Diabetes diet plan"]
  },
  atorvastatin: {
    name: "Atorvastatin (Lipitor)",
    class: "HMG-CoA Reductase Inhibitor (Statin)",
    use: "Lowering LDL ('bad') cholesterol and triglycerides in the blood, while raising HDL ('good') cholesterol. It is used to reduce the risk of heart attacks, stroke, and chest pain.",
    warning: "Avoid consuming large amounts of grapefruit juice. Report unexplained muscle pain, tenderness, or weakness to your doctor immediately.",
    followUp: ["Atorvastatin side effects", "Statin warning signs", "Heart disease prevention"]
  },
  lisinopril: {
    name: "Lisinopril (Zestril / Prinivil)",
    class: "ACE (Angiotensin-Converting Enzyme) Inhibitor",
    use: "Treating high blood pressure (hypertension) to prevent stroke, kidney problems, and heart attacks. It is also used to improve survival rates after a heart attack or manage heart failure.",
    warning: "May cause a persistent dry cough. Contact your doctor immediately if you experience swelling of the face, lips, tongue, or throat (angioedema).",
    followUp: ["Lisinopril dry cough", "BP monitoring tips", "Hypertension guidelines"]
  },
  amoxicillin: {
    name: "Amoxicillin (Amoxil)",
    class: "Penicillin-Class Antibiotic",
    use: "Treating a wide variety of bacterial infections, such as tonsillitis, bronchitis, pneumonia, ear/nose/throat infections, and urinary tract infections (UTIs). Note: It does NOT work for viral colds or flu.",
    warning: "Complete the full prescribed course even if you feel better. Do not take if you have a known allergy to penicillin. Can cause mild stomach upset or diarrhea.",
    followUp: ["Amoxicillin side effects", "Antibiotic resistance facts", "Probiotics with antibiotics"]
  },
  omeprazole: {
    name: "Omeprazole (Prilosec)",
    class: "Proton Pump Inhibitor (PPI)",
    use: "Reducing the amount of acid produced in the stomach. It is commonly used to treat gastroesophageal reflux disease (GERD), heartburn, stomach ulcers, and inflammation of the esophagus.",
    warning: "Take 30-60 minutes before breakfast. Prolonged use (years) can lead to low magnesium or calcium absorption. Do not use for immediate relief of heartburn.",
    followUp: ["Omeprazole side effects", "GERD diet tips", "Acid reflux triggers"]
  },
  alprazolam: {
    name: "Alprazolam (Xanax)",
    class: "Benzodiazepine (Anxiolytic)",
    use: "Short-term management of anxiety disorders, panic disorder, and anxiety associated with depression. It works by enhancing the effects of a natural chemical in the body (GABA) to produce a calming effect.",
    warning: "High risk of physical dependence, habit-forming behavior, and tolerance. Avoid driving, operating machinery, or consuming alcohol while taking this tablet due to severe drowsiness.",
    followUp: ["Xanax side effects", "Xanax withdrawal signs", "Anxiety relief exercises"]
  },
  levothyroxine: {
    name: "Levothyroxine (Synthroid / Levoxyl)",
    class: "Synthetic Thyroid Hormone (T4)",
    use: "Treating hypothyroidism, a condition where the thyroid gland does not produce enough thyroid hormone. It replaces the missing hormone to regulate the body's energy and metabolism.",
    warning: "Take first thing in the morning on an empty stomach with a full glass of water, at least 30 to 60 minutes before breakfast. Avoid taking calcium or iron supplements within 4 hours.",
    followUp: ["Levothyroxine side effects", "Hypothyroidism indicators", "Thyroid blood checkups"]
  },
  gabapentin: {
    name: "Gabapentin (Neurontin)",
    class: "Anticonvulsant / Neuropathic Pain Reliever",
    use: "Treating neuropathic (nerve) pain (such as pain from shingles or diabetic neuropathy) and managing specific types of seizures as an add-on therapy.",
    warning: "Can cause dizziness, drowsiness, or coordination loss. Do not discontinue taking Gabapentin suddenly as it can trigger seizures or severe withdrawal.",
    followUp: ["Gabapentin side effects", "Nerve pain management", "Gabapentin withdrawal warning"]
  },
  metoprolol: {
    name: "Metoprolol (Lopressor / Toprol XL)",
    class: "Beta-Blocker",
    use: "Treating high blood pressure, chest pain (angina), and improving survival rates after a heart attack. It is also used to prevent migraines and treat heart failure.",
    warning: "Do not stop taking metoprolol suddenly. Abrupt discontinuation can cause chest pain, irregular heartbeats, or a heart attack. Check your pulse regularly.",
    followUp: ["Metoprolol side effects", "Beta blocker actions", "High blood pressure tips"]
  },
  montelukast: {
    name: "Montelukast (Singulair)",
    class: "Leukotriene Receptor Antagonist (Asthma/Allergy)",
    use: "Preventing asthma attacks and long-term treatment of asthma in adults and children. It is also used to relieve seasonal allergic rhinitis (hay fever).",
    warning: "Be alert for neuropsychiatric side effects, including serious mood or behavior changes (anxiety, aggression, depression, sleep disturbances).",
    followUp: ["Montelukast mood warning", "Asthma triggers list", "Allergy management tips"]
  }
};

export function queryAI(input: string): AIResponse {
  const text = input.toLowerCase().trim();
  
  if (!text) {
    return RESPONSES.welcome;
  }

  // Check specific tablets first
  for (const key of Object.keys(COMMON_TABLETS)) {
    if (text.includes(key)) {
      const tab = COMMON_TABLETS[key];
      return {
        content: `### ${tab.name} Tablet Brief 💊
        
**Drug Classification**: ${tab.class}

#### Main Uses & Indications:
${tab.name} is primarily used for:
* **${tab.use}**

#### Dosing & Safety Precautions:
* **${tab.warning}**

#### General Instructions:
* Always take this tablet exactly as prescribed by your doctor.
* Do not share your medication or adjust dosages without medical consultation.
* Keep out of reach of children and store in a cool, dry place.`,
        disclaimer: `MediMind AI provides drug education only. Talk to your pharmacist or doctor before taking ${tab.name}.`,
        sources: ["US National Library of Medicine (NIH) MedlinePlus", "FDA Approved Product Labels"],
        followUp: tab.followUp
      };
    }
  }

  // Check generic tablet/pill/capsule queries dynamically
  const medicationRoots = ["tablet", "pill", "capsul", "drug", "medicat", "medicin", "dose", "prescr", "side effect", "pharmac", "taking"];
  const isTabletQuery = medicationRoots.some(root => text.includes(root)) || text.includes("used for") || text.includes("use of");

  if (isTabletQuery) {
    const stopWords = new Set([
      "what", "is", "a", "an", "the", "tell", "me", "about", "symptoms", "of", "how", "to", 
      "treat", "cure", "prevent", "info", "on", "disease", "syndrome", "disorder", "infection", 
      "cause", "causes", "why", "do", "i", "have", "help", "treatment", "explain", "describe",
      "can", "you", "tell", "symptom", "checking", "check", "with", "for", "against", "taking",
      "take", "tablet", "pill", "capsule", "drug", "medicine", "medication", "dose", "use",
      "used", "side", "effect", "effects", "should"
    ]);

    const words = text
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w));

    if (words.length > 0) {
      const rawName = words[0]; // take the first extracted potential drug name
      const drugName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      const lowerName = drugName.toLowerCase();
      
      let drugClass = "Therapeutic Pharmaceutical Agent";
      let drugUse = "Targeted physiological regulation. It is typically prescribed by healthcare professionals to manage specific metabolic, neural, or systemic pathways as part of a structured treatment plan.";

      if (lowerName.endsWith("statin")) {
        drugClass = "HMG-CoA Reductase Inhibitor (Statin)";
        drugUse = "Lowering LDL ('bad') cholesterol and triglycerides in the blood, while raising HDL ('good') cholesterol. It is primarily prescribed to reduce the risk of stroke, heart attack, and other heart complications.";
      } else if (lowerName.endsWith("pril")) {
        drugClass = "ACE (Angiotensin-Converting Enzyme) Inhibitor";
        drugUse = "Treating high blood pressure (hypertension), heart failure, and improving survival rates after a heart attack.";
      } else if (lowerName.endsWith("olol")) {
        drugClass = "Beta-Blocker";
        drugUse = "Managing high blood pressure, chest pain (angina), irregular heart rhythms (arrhythmias), and protecting the heart after a heart attack.";
      } else if (lowerName.endsWith("cillin") || lowerName.endsWith("mycin") || lowerName.endsWith("xacin")) {
        drugClass = "Antibiotic / Antimicrobial Agent";
        drugUse = "Treating a wide variety of bacterial infections, such as respiratory tract infections, skin infections, dental infections, and urinary tract infections. Note: It does not treat viral infections like the flu or common cold.";
      } else if (lowerName.endsWith("prazole")) {
        drugClass = "Proton Pump Inhibitor (PPI)";
        drugUse = "Reducing stomach acid production. It is used to treat gastroesophageal reflux disease (GERD), heartburn, acid-related damage to the lining of the esophagus, and stomach ulcers.";
      } else if (lowerName.endsWith("ine") || lowerName.endsWith("pam") || lowerName.endsWith("lam")) {
        drugClass = "Neurological / Psychotropic Medication";
        drugUse = "Managing central nervous system indicators. Depending on the exact sub-type, it is commonly prescribed for anxiety disorders, panic attacks, depression, muscle spasms, or chronic nerve pain.";
      } else if (lowerName.endsWith("sone") || lowerName.endsWith("olone")) {
        drugClass = "Corticosteroid (Anti-inflammatory)";
        drugUse = "Reducing inflammation, swelling, itching, and severe allergic reactions. It is used in conditions like severe asthma, arthritis, and autoimmune flare-ups.";
      }

      return {
        content: `### ${drugName} Tablet Brief 💊
        
**Drug Classification**: ${drugClass}

#### Main Uses & Indications:
${drugName} is understood in clinical literature as being used for:
* **${drugUse}**

#### General Care & Safety Precautions:
* Always follow the instructions provided on your prescription label.
* Consult your pharmacist or physician for specific daily dosing thresholds.
* Inform your provider of all other medications you are taking to check for drug-drug interactions.`,
        disclaimer: `MediMind AI provides drug education only. Always consult a licensed pharmacist or physician before taking ${drugName}.`,
        sources: [
          `FDA Approved Drug Database - ${drugName}`,
          `NIH MedlinePlus Drug Info - ${drugName}`
        ],
        followUp: [
          `Dose of ${drugName}`,
          `Side effects of ${drugName}`,
          `Precaution warning for ${drugName}`
        ]
      };
    }
  }

  // 1. Analyze symptoms to provide a potential disease match
  let bestMatch: SymptomGroup | null = null;
  let highestScore = 0;
  let matchedKeywords: string[] = [];

  const isDirectDiseaseQuery = text.startsWith("what is") || text.includes("tell me about") || text.includes("info on") || text.includes("define");

  if (!isDirectDiseaseQuery) {
    for (const group of SYMPTOM_MAP) {
      let score = 0;
      const matched: string[] = [];
      for (const keyword of group.keywords) {
        if (text.includes(keyword)) {
          score++;
          matched.push(keyword);
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = group;
        matchedKeywords = matched;
      }
    }
  }

  if (bestMatch && highestScore >= 1) {
    const baseResponse = RESPONSES[bestMatch.responseKey];
    const matchedStr = matchedKeywords.join(", ");
    
    const content = `### Symptom Analysis: Potential ${bestMatch.disease} 🔍

Based on the symptoms you reported (**${matchedStr}**), the presentation matches indicators commonly associated with **${bestMatch.disease}**.

---

${baseResponse.content}`;

    return {
      content,
      disclaimer: `This symptom match is an educational analysis based on reported terms (${matchedStr}). It is not a professional diagnosis. Please consult a qualified health provider.`,
      sources: baseResponse.sources,
      followUp: baseResponse.followUp
    };
  }

  // Check specific diseases first with fuzzy root matching
  if (text.includes("diabet") || text.includes("insulin") || text.includes("blood sugar")) {
    return RESPONSES.diabetes;
  }
  if (text.includes("hypertens") || text.includes("blood pressure") || text.includes("systol") || text.includes("diastol")) {
    return RESPONSES.hypertension;
  }
  if (text.includes("asthma") || text.includes("copd") || text.includes("respirat") || text.includes("wheez")) {
    return RESPONSES.asthma;
  }
  if (text.includes("heart") || text.includes("coronary") || text.includes("cardio") || text.includes("cholester")) {
    return RESPONSES.heartDisease;
  }
  if (text.includes("covid") || text.includes("corona") || text.includes("sars-cov-2")) {
    return RESPONSES.covid;
  }
  if (text.includes("allerg") || text.includes("hives") || text.includes("anaphylax")) {
    return RESPONSES.allergies;
  }
  if (text.includes("gastrit") || text.includes("acid reflux") || text.includes("heartburn") || text.includes("gerd")) {
    return RESPONSES.gastritis;
  }
  if (text.includes("arthrit") || text.includes("joint stiffness")) {
    return RESPONSES.arthritis;
  }
  if (text.includes("migrain")) {
    return RESPONSES.migraine;
  }
  if (text.includes("cold") || text.includes("flu") || text.includes("influenza") || text.includes("cough") || text.includes("congestion") || text.includes("sore throat")) {
    return RESPONSES.cold;
  }

  // Check generic symptoms with root matching
  const symptomRoots = ["symptom", "feve", "headach", "cough", "flu", "pain", "stomach", "rash", "cold", "ache", "sore throat", "throat", "congest", "sick", "nausea", "vomit", "dizz", "bleed", "bruis", "swoll"];
  if (symptomRoots.some(root => text.includes(root))) {
    return RESPONSES.symptoms;
  }

  // Check nutrition with root matching
  const nutritionRoots = ["diet", "nutri", "eat", "food", "protein", "weight", "calor", "healthy", "meal", "recipe", "hydrat", "water", "veg", "vegan", "plant-based"];
  if (nutritionRoots.some(root => text.includes(root))) {
    if (text.includes("weight loss") || text.includes("lose weight") || text.includes("fat loss")) {
      return {
        content: `### Weight Loss Nutrition Guide 🥗
        
To lose weight safely, you need a structured caloric deficit combined with high-protein intake to preserve muscle tissue.

#### Core Principles for Fat Loss:
1. **Caloric Deficit**: Calculate your Total Daily Energy Expenditure (TDEE) and reduce it by 300 - 500 calories.
2. **High Protein**: Consuming 1.6g - 2.0g of protein per kg of bodyweight increases satiety (fullness) and preserves lean muscle.
3. **Fiber & Volume**: Focus on low-calorie, high-volume foods like vegetables, salads, and broths to stay full.
4. **Mindful Eating**: Avoid drinking calories (sodas, juices) and minimize ultra-processed foods.

#### Mock Daily Meal Structure:
* **Breakfast**: Scrambled eggs or tofu with spinach, tomatoes, and a slice of whole-wheat toast.
* **Lunch**: Grilled chicken or chickpea salad with mixed greens, cucumbers, and light olive oil dressing.
* **Snack**: Greek yogurt or a handful of almonds with a cup of berries.
* **Dinner**: Baked salmon or tempeh with roasted broccoli and a small portion of quinoa.`,
        disclaimer: "Caloric deficits should not exceed safe limits. Consult a dietitian to tailor your target metrics.",
        sources: ["Harvard Nutrition Source", "Academy of Nutrition and Dietetics"],
        followUp: ["How to calculate TDEE?", "Low-calorie snacks", "What is a safe weight loss rate?"]
      };
    }
    if (text.includes("muscle") || text.includes("gain weight") || text.includes("bulk") || text.includes("protein")) {
      return {
        content: `### Muscle Building & Weight Gain Diet Plan 🥩
        
Building lean muscle mass requires a clean caloric surplus combined with adequate protein synthesis.

#### Core Rules of Hypertrophy Nutrition:
1. **Caloric Surplus**: Consume 200 - 400 calories *above* your maintenance level.
2. **Protein Targets**: Consume **1.8g - 2.2g of protein per kg** of bodyweight daily.
3. **Complex Carbohydrates**: Quinoa, sweet potatoes, oats, and brown rice fuel intense workouts and muscle glycogen restoration.
4. **Healthy Fats**: Avocados, peanut butter, and olive oil provide dense, healthy calories.

#### Mock Meal Structure:
* **Breakfast**: Oatmeal made with milk, topped with a banana, chia seeds, and 2 tablespoons of peanut butter.
* **Lunch**: Lean ground turkey or black bean bowl with brown rice, avocado slices, and salsa.
* **Snack**: Whey or plant protein shake with oats, almond milk, and a handful of mixed nuts.
* **Dinner**: Grilled chicken breast or grilled tofu with a large sweet potato and sautéed asparagus.`,
        disclaimer: "Healthy weight gain takes time. Avoid rapid calorie loading of processed foods ('dirty bulking').",
        sources: ["International Society of Sports Nutrition (ISSN) Position Stand", "National Academy of Sports Medicine"],
        followUp: ["How much protein do I need?", "Pre-workout meal ideas", "Is whey protein safe?"]
      };
    }
    if (text.includes("veg") || text.includes("vegan") || text.includes("plant-based")) {
      return {
        content: `### Balanced Plant-Based / Vegetarian Plan 🌱
        
A vegan or vegetarian diet is highly effective for heart health, provided you monitor key vitamins and ensure complete proteins.

#### Key Nutritional Checks for Vegetarians:
* **Protein Combining**: Mix grains and legumes (e.g., rice and beans) to ensure you get all 9 essential amino acids.
* **Iron Intake**: Consume non-heme iron (lentils, spinach, seeds) alongside Vitamin C (citrus, bell peppers) to boost absorption by up to 300%.
* **Critical Micro-Nutrients**: Supplement **Vitamin B12** (essential for nerve health) and monitor Vitamin D and Zinc levels.

#### Plant-Based Meal Template:
* **Breakfast**: Chia seed pudding or tofu scramble with mushrooms, bell peppers, and avocado.
* **Lunch**: Quinoa salad with chickpeas, cherry tomatoes, cucumbers, spinach, and a tahini lemon dressing.
* **Snack**: Hummus with carrot and celery sticks, or an apple with almond butter.
* **Dinner**: Lentil dahl or coconut curry with tofu, broccoli, carrots, served over brown rice.`,
        disclaimer: "Vegans must supplement Vitamin B12 as it is not found naturally in plant foods.",
        sources: ["The Vegan Society Nutrition Board", "Harvard School of Public Health"],
        followUp: ["Plant-based protein sources", "Vitamin B12 guidelines", "Vegetarian iron sources"]
      };
    }
    if (text.includes("water") || text.includes("hydrat") || text.includes("drink")) {
      return {
        content: `### Hydration Guidelines & Daily Water Targets 💧
        
Proper hydration is critical for joint lubrication, cognitive function, nutrient delivery, and kidney performance.

#### How Much Water Do You Need?
* **Baseline Target**: Men need about **3.7 Liters (15 cups)**; Women need about **2.7 Liters (11 cups)** of total water daily.
* **Exercise Adjustments**: Add **500ml - 1L** of water for every hour of moderate-to-high intensity exercise.
* **Electrolytes**: During intense sweat or heat, replenish sodium, potassium, and magnesium to prevent cramping and hyponatremia.

#### Indicators of Dehydration:
* Dark-colored urine (aim for a pale straw color).
* Dry mouth, mild fatigue, or sudden headaches.
* Brain fog or loss of concentration.`,
        disclaimer: "Individuals with congestive heart failure or kidney disease must follow fluid restriction guidelines set by their doctor.",
        sources: ["National Academies of Sciences, Engineering, and Medicine (NASEM)", "Mayo Clinic Hydration Guidance"],
        followUp: ["Signs of dehydration", "Should I drink electrolyte drinks?", "Water intake tracker calculator"]
      };
    }
    return RESPONSES.nutrition;
  }

  // Check fitness with root matching
  const fitnessRoots = ["exer", "worko", "fitn", "gym", "cardio", "muscle", "run", "walk", "stretch", "yoga", "activit", "train"];
  if (fitnessRoots.some(root => text.includes(root))) {
    if (text.includes("home") || text.includes("at home") || text.includes("no equipment")) {
      return {
        content: `### 15-Minute Home Bodyweight Routine 🏠
        
No gym equipment is required for this metabolic conditioning and full-body strength routine.

#### The Home Workout Circuit (Perform 3-4 rounds):
1. **Bodyweight Squats** (12-15 reps) - Focus on keeping weight in heels and chest upright.
2. **Push-Ups / Incline Push-Ups** (8-12 reps) - Keep body in a straight plank line.
3. **Alternating Reverse Lunges** (10 reps per leg) - Step back and drop knee to 90 degrees.
4. **Plank Hold** (30-45 seconds) - Squeeze glutes and draw belly button to spine.
5. **Glute Bridges** (15 reps) - Lie on back, feet flat, lift hips, squeeze glutes at the top.

*Rest for 60 seconds between rounds. Perform 3 times a week.*`,
        disclaimer: "If you feel sudden joint pain or breathlessness, stop immediately and rest.",
        sources: ["American Council on Exercise (ACE) Home Workouts", "Harvard Health Exercises"],
        followUp: ["Correct push-up form", "How to make workouts harder at home", "Best warm-up stretching"]
      };
    }
    if (text.includes("back pain") || text.includes("lower back") || text.includes("stretch")) {
      return {
        content: `### Lower Back Pain Stretches & Relief 🧘‍♂️
        
These gentle stretching exercises help relieve tension, release tight lumbar muscles, and increase hip flexibility.

#### Recommended Lumbar Relief Protocol:
1. **Child's Pose** (Hold for 30s): Kneel, sit back on heels, fold forward, arms extended on the floor.
2. **Cat-Cow Stretch** (10 repetitions): On hands and knees, arch back up, then drop belly down slowly.
3. **Knee-to-Chest** (Hold for 30s per leg): Lie on back, pull one knee into chest, keeping the other leg flat.
4. **Hamstring Stretch** (Hold for 30s per leg): Lie on back, loop a towel or strap around your foot, raise leg up.

*Tip: Breathe deeply and never force a stretch into sharp pain.*`,
        disclaimer: "Avoid deep twists or sudden bending if you have a suspected herniated disc or severe radiating pain.",
        sources: ["Spine-health lumbar stretch library", "American Academy of Orthopaedic Surgeons (AAOS)"],
        followUp: ["Core exercises for back pain", "Cat-cow stretch tutorial", "Ergonomic seating tips"]
      };
    }
    if (text.includes("cardio") || text.includes("run") || text.includes("cycle")) {
      return {
        content: `### Cardiovascular Conditioning Split 🏃‍♂️
        
Cardio improves lung capacity, heart rate recovery, and metabolic endurance.

#### Weekly Conditioning Routine:
* **Option A: High-Intensity Interval Training (HIIT)**:
  * 20 minutes: Sprint for 30 seconds, walk/jog for 90 seconds. Repeat 10 times.
* **Option B: Low-Intensity Steady State (LISS)**:
  * 40-50 minutes: Jogging, cycling, or swimming at a conversational pace (Zone 2 cardio).
* **Option C: Brisk Walking**:
  * 30 minutes daily at a speed of 3.5 - 4.0 mph. Highly effective for longevity.`,
        disclaimer: "Ensure you stay hydrated and monitor heart rate limits (formula: 220 - your age = max HR).",
        sources: ["American Heart Association (AHA) Aerobic Guidelines", "National Academy of Sports Medicine"],
        followUp: ["What is Zone 2 cardio?", "HIIT vs LISS", "Running form tips"]
      };
    }
    if (text.includes("lift") || text.includes("gym") || text.includes("weight") || text.includes("strength")) {
      return {
        content: `### Gym Strength & Hypertrophy Program 🏋️‍♂️
        
This program utilizes resistance training to build bone density, metabolic rates, and muscle mass.

#### Push-Pull-Legs (PPL) Baseline Split:
1. **Push Day (Chest, Shoulders, Triceps)**:
   * Bench Press (3 sets x 8 reps)
   * Overhead Shoulder Press (3 sets x 10 reps)
   * Tricep Dips (3 sets x max reps)
2. **Pull Day (Back, Biceps)**:
   * Lat Pulldowns or Pull-ups (3 sets x 8-10 reps)
   * Barbell/Dumbbell Rows (3 sets x 10 reps)
   * Bicep Dumbbell Curls (3 sets x 12 reps)
3. **Legs Day (Quads, Hamstrings, Calves)**:
   * Barbell Squats or Leg Press (3 sets x 8 reps)
   * Romanian Deadlifts (3 sets x 10 reps)
   * Standing Calf Raises (4 sets x 15 reps)

*Rest 48 hours between matching muscle group workouts.*`,
        disclaimer: "Prioritize form and safety over heavy weights to prevent tendon and joint injuries.",
        sources: ["NSCA Strength and Conditioning Manual", "American College of Sports Medicine (ACSM)"],
        followUp: ["Proper bench press form", "How to schedule rest days", "What is progressive overload?"]
      };
    }
    return RESPONSES.fitness;
  }

  // Check medication with root matching
  if (
    medicationRoots.some(root => text.includes(root)) ||
    text.includes("ibuprofen") || text.includes("paracetamol") || text.includes("aspirin") || 
    text.includes("antibiotic") || text.includes("tylenol") || text.includes("advil") || text.includes("motrin")
  ) {
    if (text.includes("ibuprofen") || text.includes("advil") || text.includes("motrin")) {
      return {
        content: `### Ibuprofen Safety and Dosing 💊
        
Ibuprofen is a Nonsteroidal Anti-inflammatory Drug (NSAID) used to reduce swelling, joint stiffness, and moderate pain.

#### Key Dosing Limits (Adults):
* **Standard dose**: 200mg - 400mg every 4 to 6 hours as needed.
* **Maximum daily limit**: **1200mg per 24 hours** for over-the-counter use (up to 3200mg under strict physician supervision).

#### Crucial Precautions:
* **Stomach Safety**: Always take with food, milk, or antacids to prevent stomach irritation or gastrointestinal bleeding.
* **Cardiac Risk**: Chronic daily use can increase blood pressure and cardiotoxicity risk.
* **Avoid**: Do not combine with other NSAIDs (like Naproxen or Aspirin) or blood thinners.`,
        disclaimer: "Consult your doctor if you have history of ulcers, kidney disease, or high blood pressure before taking ibuprofen.",
        sources: ["U.S. FDA Consumer Drug Safety Sheets", "Mayo Clinic Ibuprofen Profile"],
        followUp: ["Ibuprofen vs Acetaminophen", "Signs of stomach bleeding", "Can I take ibuprofen on an empty stomach?"]
      };
    }
    if (text.includes("paracetamol") || text.includes("acetaminophen") || text.includes("tylenol")) {
      return {
        content: `### Acetaminophen (Paracetamol) Safety and Dosing 💊
        
Acetaminophen is an analgesic (pain reliever) and antipyretic (fever reducer) that does *not* reduce swelling or inflammation.

#### Key Dosing Limits (Adults):
* **Standard dose**: 325mg - 650mg every 4 to 6 hours or 1000mg every 6 hours.
* **Maximum daily limit**: **4000mg per 24 hours** (some doctors recommend 3000mg max to be safe).

#### Crucial Safety Warning:
* **LIVER DANGER**: Exceeding the 4000mg limit, or taking it alongside alcohol, can lead to irreversible liver failure.
* **Hidden Ingredients**: Check labels of cold/flu medicines (e.g. Dayquil, Nyquil) - many contain acetaminophen, causing accidental overdoses.`,
        disclaimer: "Avoid all alcohol consumption while taking acetaminophen.",
        sources: ["Harvard Medical School Health Publishing", "FDA Acetaminophen Safety Reports"],
        followUp: ["Acetaminophen liver safety guidelines", "Cold medicines containing acetaminophen", "Max dosage for children"]
      };
    }
    if (text.includes("aspirin")) {
      return {
        content: `### Aspirin Uses and Warnings 💊
        
Aspirin (acetylsalicylic acid) is a salicylate used to treat pain, fever, inflammation, and as a low-dose blood thinner to prevent cardiovascular events.

#### Key Warnings & Guidelines:
1. **Reye's Syndrome Warning**: **Never give aspirin to children or teenagers** recovering from chickenpox or flu-like symptoms. It can cause a rare but life-threatening brain and liver swelling condition.
2. **Low-Dose Therapy**: Often prescribed at **81mg daily** to prevent blood clots, heart attacks, or strokes.
3. **Bleeding Risk**: Aspirin thins the blood. Inform dentists and surgeons before procedures, and avoid if you have bleeding ulcers or hemophilia.`,
        disclaimer: "Low-dose aspirin therapy should only be initiated under a doctor's explicit recommendation.",
        sources: ["American Heart Association (AHA) Aspirin Guide", "CDC Reye's Syndrome Guidelines"],
        followUp: ["Why is aspirin bad for kids?", "Difference between 81mg and 325mg aspirin", "Aspirin side effects"]
      };
    }
    if (text.includes("antibiotic")) {
      return {
        content: `### Antibiotics Utilization & Safety Guidelines 💊
        
Antibiotics are medications used to treat **bacterial infections only**. They are completely ineffective against viral infections (like colds, flu, and bronchitis).

#### Golden Rules of Antibiotics:
1. **Complete the Course**: Always finish the full prescription duration, even if you feel better. Stopping early allows surviving bacteria to mutate and develop resistance.
2. **Gut Health**: Antibiotics kill both good and bad bacteria. Consider eating yogurt or taking probiotics 2 hours after your dose to support gut flora.
3. **Side Effects**: Common issues include diarrhea, nausea, and yeast infections. Call your doctor if you develop a severe rash or severe watery stools.`,
        disclaimer: "Misusing antibiotics contributes to the global threat of drug-resistant superbugs.",
        sources: ["CDC Antibiotic Prescribing and Use", "WHO Antibiotic Resistance Facts"],
        followUp: ["What is antibiotic resistance?", "Probiotics during antibiotics", "Can I stop antibiotics early?"]
      };
    }
    return RESPONSES.medication;
  }

  // Check mental health with root matching
  const mentalRoots = ["mental", "stress", "anxiet", "depress", "sleep", "mindful", "meditat", "mood", "burnout", "sad", "worry", "insomnia", "relax", "calm"];
  if (mentalRoots.some(root => text.includes(root))) {
    if (text.includes("anxiety") || text.includes("panic") || text.includes("worry")) {
      return {
        content: `### Quick Panic & Anxiety Relief Exercises 🧠
        
Anxiety triggers the body's 'fight or flight' nervous response. These exercises help down-regulate your heart rate and ground your focus.

#### 1. The 5-4-3-2-1 Sensory Grounding Technique:
Look around your environment and name silently:
* **5** things you can see (e.g. clock, desk, window).
* **4** things you can physically feel (e.g. feet on floor, sweater).
* **3** things you can hear (e.g. traffic, fan humming).
* **2** things you can smell (e.g. coffee, fresh air).
* **1** thing you can taste (e.g. mint).

#### 2. Physiological Sigh (Fast Decompression):
* Take two quick inhalations through the nose (one deep breath, then a sharp topping-off inhale).
* Let out one long, slow exhalation through the mouth.
* Repeat 2-3 times. This immediately deflates the lungs' air sacs and triggers heart rate deceleration.`,
        disclaimer: "Panic attacks can mimic physical cardiac symptoms. If you feel crushing chest pain, seek emergency support.",
        sources: ["Stanford Medicine Huberman Lab Research", "Anxiety & Depression Association of America"],
        followUp: ["How to stop a panic attack", "5-4-3-2-1 grounding worksheet", "Deep breathing exercises"]
      };
    }
    if (text.includes("sleep") || text.includes("insomnia") || text.includes("fall asleep")) {
      return {
        content: `### Sleep Hygiene Protocol & Insomnia Relief 🛌
        
Quality sleep (7-8 hours) is vital for cellular repair, brain cleansing, and metabolic health.

#### Daily Habits for Restorative Sleep:
1. **Consistent Schedule**: Go to bed and wake up at the exact same time daily, even on weekends.
2. **Light Control**: Expose eyes to sunlight for 10-15 minutes after waking up. Block blue-screen light from phones/tablets for **60 minutes before bed**.
3. **Temperature**: Keep your bedroom cool, ideally around **65°F (18°C)**.
4. **Caffeine Window**: Avoid consuming caffeine (coffee, energy drinks, black tea) within **8-10 hours** of your planned bedtime.`,
        disclaimer: "Chronic insomnia lasting over a month should be discussed with a clinical sleep specialist.",
        sources: ["National Sleep Foundation Guidelines", "Harvard Sleep Medicine Division"],
        followUp: ["How does caffeine affect sleep?", "Optimal sleeping temperature", "Wind-down routine ideas"]
      };
    }
    if (text.includes("stress") || text.includes("burnout")) {
      return {
        content: `### Stress Reduction & Burnout Recovery 🧠
        
Chronic stress elevates cortisol, which increases blood pressure, impairs immune cells, and disrupts insulin sensitivity.

#### Daily Decompression Strategies:
* **Mindful Off-Grid Time**: Set a 'digital boundary' where you turn off work emails and notifications for 2 hours daily.
* **Nature Exposure**: A 20-minute walk in a green park or forest (forest bathing) has been shown to lower heart rate variability and cortisol.
* **Expressive Journaling**: Write down your anxieties for 5-10 minutes to release brain processing loads.
* **Delegate & Boundaries**: Practice saying 'no' to non-essential commitments to preserve emotional energy.`,
        disclaimer: "Burnout is a systemic physical exhaustion that requires rest, lifestyle adaptations, and sometimes occupational changes.",
        sources: ["American Psychological Association (APA) Stress Report", "World Health Organization (WHO) Burnout Standards"],
        followUp: ["Symptoms of clinical burnout", "Cortisol lowering diet", "How to set boundaries at work"]
      };
    }
    return RESPONSES.mental;
  }

  // Check first aid / emergency with root matching
  const emergencyRoots = ["emergenc", "first aid", "bleed", "burn", "chok", "cpr", "fractur", "bite", "sting", "poison", "cut", "wound", "accident", "heimlich"];
  if (emergencyRoots.some(root => text.includes(root))) {
    if (text.includes("cpr") || text.includes("chok") || text.includes("heimlich")) {
      return {
        content: `### CPR and Choking Response Guide 🚨
        
Knowing these emergency procedures can sustain life until paramedical response teams arrive.

#### 1. CPR Protocol (Cardiopulmonary Resuscitation - Adults):
* **Verify**: Check for responsiveness and breathing. If none, call emergency services (911 / 112) and get an AED if available.
* **Compressions**: Place hands in the center of the chest. Push hard and fast at a rate of **100 - 120 compressions per minute** (depth of 2 inches). *Tip: Compress to the beat of 'Stayin' Alive'.*
* **Breaths**: If trained, give 2 rescue breaths after every 30 compressions. If untrained, perform continuous hands-only chest compressions.

#### 2. Conscious Choking (Heimlich Maneuver - Adults):
* Ask "Are you choking?". Stand behind the person.
* Wrap your arms around their waist. Make a fist with one hand.
* Place your fist slightly above the belly button. Grasp your fist with the other hand.
* Press into their abdomen with a quick, upward thrust. Repeat until the foreign object is expelled.`,
        disclaimer: "This is a basic summary. Practical hands-on certification training (AHA/Red Cross) is highly recommended.",
        sources: ["American Heart Association (AHA) CPR Guidelines", "American Red Cross Conscious Choking Standards"],
        followUp: ["Hands-only CPR tutorial", "How to perform CPR on infants", "How to use an AED"]
      };
    }
    if (text.includes("burn")) {
      return {
        content: `### Burn First Aid Guide 🚨
        
Correct first aid limits the depth of the burn injury and reduces infection risk.

#### Immediate Action Steps:
1. **Cool**: Run cool (not ice-cold) tap water over the burn for **10 to 20 minutes**. Do NOT use ice, which damages tissue further.
2. **Protect**: Gently cover the burn with a sterile, non-stick gauze bandage.
3. **Avoid**: Do NOT apply butter, oils, toothpaste, or home ointments. Do NOT break blisters, as they protect against infection.

#### When to go to the Hospital:
* The burn is on the face, hands, feet, groin, or a major joint.
* The burn is charring/white (3rd degree) or blistered larger than 3 inches.`,
        disclaimer: "Chemical or electrical burns require immediate emergency medical evaluations regardless of size.",
        sources: ["American Burn Association (ABA) Consumer Sheets", "Mayo Clinic Burn Care"],
        followUp: ["1st, 2nd, and 3rd degree burn differences", "Chemical burn first aid", "Infection warning signs"]
      };
    }
    if (text.includes("bleed") || text.includes("cut") || text.includes("wound")) {
      return {
        content: `### Severe Bleeding First Aid 🚨
        
Controlling external blood loss is the highest priority in traumatic injuries.

#### Immediate Stopping Steps:
1. **Direct Pressure**: Place a clean cloth or sterile dressing over the wound and press firmly with both hands.
2. **Maintain Pressure**: Do NOT lift the cloth to check. If blood seeps through, add another cloth on top and keep pressing.
3. **Elevate**: Raise the bleeding limb above the level of the heart, if possible, while keeping pressure applied.
4. **Tourniquet (Severe extremity bleeding only)**: If direct pressure does not stop catastrophic bleeding, apply a tourniquet 2-3 inches above the wound. Note the application time.`,
        disclaimer: "Seek immediate emergency room care for deep puncture wounds, animal bites, or bleeding that won't stop after 10 minutes of pressure.",
        sources: ["American College of Surgeons 'Stop the Bleed' Campaign", "Red Cross Traumatic Bleeding Guides"],
        followUp: ["How to apply a tourniquet", "Signs of internal bleeding", "Wound cleaning and bandaging tips"]
      };
    }
    if (text.includes("insect") || text.includes("sting") || text.includes("bite")) {
      return {
        content: `### Insect Sting & Bite First Aid 🐝
        
Most stings result in localized swelling and itching, but some individuals can experience fatal allergic anaphylaxis.

#### Localized Reaction Treatment:
1. **Remove Stinger**: If stung by a bee, scrape the stinger off immediately with a fingernail or credit card. Do NOT squeeze it (squeezing injects more venom).
2. **Wash**: Clean the area with soap and water.
3. **Ice**: Apply a cold pack for 10 minutes to reduce localized swelling.
4. **Soothe**: Apply hydrocortisone cream or take an OTC antihistamine to relieve itching.

#### 🚨 Emergency Anaphylaxis Warning:
If the victim shows signs of throat swelling, difficulty breathing, dizziness, or hives all over, administer an **EpiPen** immediately and call emergency services.`,
        disclaimer: "Venomous spider or snake bites require immediate hospital antivenom administration. Keep the limb still and do not cut or suck the venom.",
        sources: ["AAAAI Insect Allergy Advice", "CDC Venomous Bites and Stings Overview"],
        followUp: ["Snake bite first aid", "Spider bite identification", "When to use an EpiPen"]
      };
    }
    return RESPONSES.emergency;
  }

  // Check conversational greetings and pleasantries
  const wordsList = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/);
  const greetingWords = new Set(["hi", "hello", "hey", "hola", "yo", "sup", "greetings", "hi there", "hello there"]);
  const isGreeting = greetingWords.has(wordsList[0]) || 
                     text.startsWith("good morning") || 
                     text.startsWith("good evening") || 
                     text.startsWith("good afternoon") ||
                     text.startsWith("good night") ||
                     text.includes("hello") ||
                     text.includes("hey there") ||
                     text === "hi";

  if (isGreeting) {
    let greetingText = "Hello! 👋";
    if (text.includes("morning")) greetingText = "Good morning! ☀️";
    else if (text.includes("afternoon")) greetingText = "Good afternoon! 🌤️";
    else if (text.includes("evening")) greetingText = "Good evening! 🌆";
    else if (text.includes("night")) greetingText = "Good night! 🌙";

    return {
      content: `### ${greetingText}
      
I am **MediMind AI**, your Intelligent Healthcare Companion. I am here to help you with:
* **Checking symptoms** (fever, headache, cold, stomach pain, joint stiffness, etc.)
* **Medication details** (dosing, uses, side effects of common tablets)
* **Nutrition & diet plans** (weight loss, muscle gain, plant-based meal templates)
* **Fitness tips** (home workouts, stretches for back pain)
* **First aid** (bleeding, minor burns, choking, stings)

How can I assist you with your health today?`,
      disclaimer: "MediMind AI provides general educational support. It is not a substitute for clinical diagnostics or professional advice.",
      sources: ["MediMind AI Core Knowledgebase"],
      followUp: ["Check Symptoms", "Healthy Diet Plan", "Medication Info", "Emergency Guidance"]
    };
  }

  const isOpenConversational = text.includes("how are you") || 
                               text.includes("how r u") || 
                               text.includes("how you doing") || 
                               text.includes("watre you") || 
                               text.includes("what are you") || 
                               text.includes("who are you") || 
                               text.includes("your name");

  if (isOpenConversational) {
    return {
      content: `### About MediMind AI 🩺
      
Hi, I am **MediMind AI**, your Intelligent Healthcare Companion. 

I specialize in providing client-side medical information, wellness tracking guidance, and healthcare support. Here are my main areas of expertise:
* 🩺 **Symptom Assessment**: Detailed clinical advice for common cold, flu, fever, headache, gastritis, and joint pain signs.
* 💊 **Medication Safety**: Proper dosages, warnings, and usage details for standard medications like Ibuprofen, Acetaminophen, and Metformin.
* 🥗 **Nutrition & Diet**: Structured plans for weight loss, muscle building, plant-based diets, and hydration.
* 🏋️‍♂️ **Fitness & Mobility**: 15-minute home exercises, lower back stretches, cardio splits, and muscle training.
* 🧠 **Mental Health Care**: Panic relief drills, grounding techniques, sleep hygiene tips, and stress decompression.
* 🚨 **First Aid**: Treatment procedures for minor burns, severe bleeding, choking (Heimlich), insect stings, and CPR.
      
How can I help you today?`,
      disclaimer: "MediMind AI is an AI advisor. For persistent health concerns, always contact a primary care provider.",
      sources: ["MediMind AI System Profile"],
      followUp: ["Check Symptoms", "Healthy Diet Plan", "Medication Info"]
    };
  }

  const isGeneralHelp = text.includes("what should i do") || 
                        text.includes("what to do") || 
                        text.includes("when to do") || 
                        text.includes("when should i") || 
                        text === "help" || 
                        text === "help me";

  if (isGeneralHelp) {
    return {
      content: `### How to Use MediMind AI 🛡️
      
If you are seeking health advice or guidance, here is how you can query me:
1. **Describe your symptoms**: Tell me what you are feeling (e.g., *"I have a dry cough and a headache"* or *"stomach bloating"*).
2. **Inquire about medications**: Ask about common tablets (e.g., *"What is Omeprazole used for?"* or *"Acetaminophen max dose"*).
3. **Ask for wellness advice**: Request diet plans or workouts (e.g., *"plant-based meal plan"* or *"lower back stretches"*).
4. **Emergency First Aid**: Ask for immediate steps (e.g., *"How do I treat a minor burn?"* or *"CPR guide"*).

*Note: If you are experiencing a life-threatening medical emergency, please call **911** or **112** immediately.*`,
      disclaimer: "This guidance is for informational purposes only. Do not delay seeking medical care because of information found here.",
      sources: ["MediMind AI User Guide"],
      followUp: ["Check Symptoms", "Medication Info", "First Aid Guidance"]
    };
  }

  // Dynamic disease name extractor and generator
  const stopWords = new Set([
    "what", "is", "a", "an", "the", "tell", "me", "about", "symptoms", "of", "how", "to", 
    "treat", "cure", "prevent", "info", "on", "disease", "syndrome", "disorder", "infection", 
    "cause", "causes", "why", "do", "i", "have", "help", "treatment", "explain", "describe",
    "can", "you", "tell", "symptom", "checking", "check", "with", "for", "against"
  ]);

  const words = text
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));

  const diseaseKeywords = ["disease", "syndrome", "disorder", "virus", "infection", "condition", "illness", "sickness", "pathology", "allergy", "cancer", "tumor"];
  const diseaseSuffixes = ["itis", "emia", "oma", "osis", "pathy", "ia"];

  const hasDiseaseKeyword = diseaseKeywords.some(kw => text.includes(kw));
  const hasDiseaseSuffix = words.some(w => diseaseSuffixes.some(suffix => w.toLowerCase().endsWith(suffix)));

  const isLikelyDisease = hasDiseaseKeyword || hasDiseaseSuffix;

  if (words.length > 0 && isLikelyDisease) {
    const rawName = words.slice(0, 2).join(" ");
    const diseaseName = rawName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    
    // Determine condition category and description based on medical suffixes
    let category = "Clinical Medical Condition";
    let desc = "a recognized clinical condition characterized by systemic or localized physiological variations that disrupt optimal homeostasis.";
    let symptoms = "* Localized discomfort, soreness, or aching.\n* Fluctuating energy levels and fatigue.\n* Mild sleep disruption or cognitive fog.\n* Sensory sensitivity or stiffness.";
    let care = "* Maintain a comprehensive health log of symptom flare-ups.\n* Stay hydrated and optimize anti-inflammatory nutrition.\n* Follow up with a primary care provider.";
    
    const lowerName = diseaseName.toLowerCase();
    
    if (lowerName.endsWith("itis")) {
      category = "Inflammatory Condition";
      desc = "an inflammatory condition affecting tissues of the body, characterized by localized swelling, warmth, redness, and potential discomfort.";
      symptoms = "* Localized pain or tenderness in the affected area.\n* Swelling, redness, or warmth.\n* Reduced functionality or stiffness in the inflamed tissue.\n* Mild systemic fatigue or low-grade fever.";
      care = "* Rest the affected system or organ to allow recovery.\n* Apply localized cold or warm compresses as appropriate.\n* Discuss anti-inflammatory options with a clinician.";
    } else if (lowerName.endsWith("osis") || lowerName.endsWith("pathy") || lowerName.endsWith("ia")) {
      category = "Degenerative or Physiological Disorder";
      desc = "a chronic degenerative or systemic disorder characterized by structural changes or functional impairment in the affected organs, nerves, or tissues.";
      symptoms = "* Gradual onset of discomfort or sensory changes (such as numbness or tingling).\n* Reduced organ or tissue functionality under physical demand.\n* Systemic fatigue or stiffness.\n* Compensatory strain on surrounding physiological systems.";
      care = "* Engage in low-impact lifestyle and physical adaptations.\n* Follow a nutrient-dense diet rich in antioxidants and vitamins.\n* Monitor vital function indicators regularly.";
    } else if (lowerName.endsWith("emia")) {
      category = "Blood-related or Metabolic Condition";
      desc = "a systemic condition affecting the biochemical levels, cell counts, or overall circulation within the blood system.";
      symptoms = "* Systemic fatigue, physical weakness, or lethargy.\n* Dizziness, lightheadedness, or fainting spells.\n* Pale skin tone or cool extremities (hands and feet).\n* Shortness of breath during minor physical exertion.";
      care = "* Support blood oxygenation through optimal hydration and mineral intake.\n* Incorporate iron, B12, and vitamin-dense foods into your meals.\n* Avoid sudden high-intensity physical strain.";
    } else if (lowerName.endsWith("oma")) {
      category = "Growth or Cellular Proliferative Condition";
      desc = "a condition characterized by localized cellular proliferation, tissue growths, or nodules that require diagnostic differentiation.";
      symptoms = "* Painless localized swelling, lumps, or nodules.\n* Night sweats or unexplained low-grade fevers.\n* Fatigue or general feeling of malaise.\n* Unexplained weight loss without dietary changes.";
      care = "* Ensure early medical screening and diagnostic confirmation (biopsy/scan).\n* Document size changes or local symptoms systematically.\n* Avoid self-treatment or squeezing the affected nodules.";
    }

    return {
      content: `### ${diseaseName} Overview 💡
      
**Category**: ${category}

${diseaseName} is understood in clinical literature as ${desc}

#### Common Indicators & Symptoms:
${symptoms}

#### General Care & Support Strategies:
${care}

#### Recommended Next Steps:
* **Record Logs**: Note the frequency, time of day, and intensity of symptoms.
* **Consultation**: Take your symptom log to your primary care physician to aid in diagnosis.
* **Diagnostics**: Discuss blood tests, imaging, or specific screening tools appropriate for ${diseaseName}.`,
      disclaimer: `MediMind AI provides general education on ${diseaseName}. This is not a diagnosis, treatment plan, or substitute for professional medical care.`,
      sources: [
        `Mayo Clinic - ${diseaseName} Overview`,
        `World Health Organization (WHO) - ${diseaseName} Registry`,
        `National Institutes of Health (NIH) - ${diseaseName} Science Brief`
      ],
      followUp: [
        `What causes ${diseaseName}?`,
        `How is ${diseaseName} diagnosed?`,
        `Treatments for ${diseaseName}`
      ]
    };
  }

  // Fallback response for questions outside of medical expertise
  return {
    content: `### Out of Scope Query 🛡️

I am sorry, but your question about **"${input}"** is outside my area of expertise. 

I am designed to assist with wellness tracking, symptom guidance, healthy habits, first aid, and medical information. Please try asking a health, symptom, diet, fitness, medication, or first-aid related question!`,
    disclaimer: "MediMind AI provides educational health and wellness information only.",
    sources: ["MediMind AI Core System"],
    followUp: ["Check Symptoms", "Healthy Diet Plan", "Medication Info", "Emergency Guidance"]
  };
}

export async function getAIResponse(queryText: string, history: any[] = []): Promise<AIResponse> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: queryText,
        history: history.map(msg => ({
          sender: msg.sender,
          text: msg.text
        }))
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && !data.error) {
        return data as AIResponse;
      }
    }
    
    console.warn('API call failed or returned error, falling back to local queryAI');
  } catch (error) {
    console.error('Error calling chat API, falling back to local queryAI:', error);
  }
  
  return queryAI(queryText);
}

