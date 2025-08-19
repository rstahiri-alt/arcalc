// Utility: format values with auto-scaling units
function formatValue(value, unit) {
  if (unit === "L") {
    if (value < 0.001) return (value * 1e6).toFixed(2) + " µL";
    if (value < 1) return (value * 1000).toFixed(2) + " mL";
    return value.toFixed(3) + " L";
  }
  if (unit === "g") {
    if (value < 0.001) return (value * 1e6).toFixed(2) + " µg";
    if (value < 1) return (value * 1000).toFixed(2) + " mg";
    return value.toFixed(3) + " g";
  }
  return value.toFixed(3) + " " + unit;
}

// --- Molarity ---
function calculateMolarity() {
  const M = parseFloat(document.getElementById("molarMass").value);
  const m = parseFloat(document.getElementById("soluteMass").value);
  const V = parseFloat(document.getElementById("solutionVolume").value);

  if (isNaN(M) || isNaN(m) || isNaN(V) || V === 0) {
    document.getElementById("molarityResult").innerHTML = "⚠️ Please fill all fields correctly.";
    return;
  }

  const moles = m / M;
  const molarity = moles / V;

  document.getElementById("molarityResult").innerHTML =
    `<strong>Result:</strong> ${molarity.toFixed(3)} mol/L<br>
     Step 1: Moles = Mass / Molar Mass = ${m} g / ${M} g/mol = ${moles.toFixed(3)} mol<br>
     Step 2: Molarity = Moles / Volume = ${moles.toFixed(3)} mol / ${V} L`;
}

// --- Dilution ---
function calculateDilution() {
  const C1 = parseFloat(document.getElementById("c1").value);
  const V1 = parseFloat(document.getElementById("v1").value);
  const C2 = parseFloat(document.getElementById("c2").value);

  if (isNaN(C1) || isNaN(V1) || isNaN(C2) || C2 === 0) {
    document.getElementById("dilutionResult").innerHTML = "⚠️ Please fill all fields correctly.";
    return;
  }

  const V2 = (C1 * V1) / C2;
  document.getElementById("dilutionResult").innerHTML =
    `<strong>Result:</strong> V2 = ${formatValue(V2, "L")}<br>
     Step 1: Formula → C1·V1 = C2·V2<br>
     Step 2: V2 = (C1·V1)/C2 = (${C1} × ${V1}) / ${C2}`;
}

// --- Unit Conversion ---
function convertUnits() {
  const value = parseFloat(document.getElementById("value").value);
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;

  if (isNaN(value)) {
    document.getElementById("conversionResult").innerHTML = "⚠️ Please enter a value.";
    return;
  }

  let factor = 1;

  // weight conversions
  const weightUnits = { mg: 1, g: 1000, kg: 1e6 };
  if (from in weightUnits && to in weightUnits) {
    factor = weightUnits[from] / weightUnits[to];
  }

  // volume conversions
  const volumeUnits = { ml: 1, l: 1000 };
  if (from in volumeUnits && to in volumeUnits) {
    factor = volumeUnits[from] / volumeUnits[to];
  }

  const result = value * factor;
  document.getElementById("conversionResult").innerHTML =
    `<strong>Result:</strong> ${result} ${to}`;
}

// --- pH ---
function calculatePH() {
  const h = parseFloat(document.getElementById("hConcentration").value);
  if (isNaN(h) || h <= 0) {
    document.getElementById("phResult").innerHTML = "⚠️ Enter valid [H+].";
    return;
  }
  const pH = -Math.log10(h);
  document.getElementById("phResult").innerHTML =
    `<strong>Result:</strong> pH = ${pH.toFixed(2)}<br>
     Step: pH = -log10([H+]) = -log10(${h})`;
}

// --- Normality ---
function calculateNormality() {
  const eq = parseFloat(document.getElementById("equivalents").value);
  const V = parseFloat(document.getElementById("solutionVolumeN").value);

  if (isNaN(eq) || isNaN(V) || V === 0) {
    document.getElementById("normalityResult").innerHTML = "⚠️ Fill all fields.";
    return;
  }

  const N = eq / V;
  document.getElementById("normalityResult").innerHTML =
    `<strong>Result:</strong> ${N.toFixed(3)} N<br>
     Step: N = Equivalents / Volume = ${eq} / ${V}`;
}

// --- Molecular Weight ---
function calculateMolWeight() {
  const mass = parseFloat(document.getElementById("compoundMass").value);
  const moles = parseFloat(document.getElementById("moles").value);

  if (isNaN(mass) || isNaN(moles) || moles === 0) {
    document.getElementById("molWeightResult").innerHTML = "⚠️ Fill all fields.";
    return;
  }

  const MW = mass / moles;
  document.getElementById("molWeightResult").innerHTML =
    `<strong>Result:</strong> ${MW.toFixed(3)} g/mol<br>
     Step: Molecular Weight = Mass / Moles = ${mass} g / ${moles} mol`;
}

// --- Gas Law ---
function calculateGasLaw() {
  const n = parseFloat(document.getElementById("n").value);
  const T = parseFloat(document.getElementById("t").value);
  const V = parseFloat(document.getElementById("vGas").value);

  if (isNaN(n) || isNaN(T) || isNaN(V) || V === 0) {
    document.getElementById("gasResult").innerHTML = "⚠️ Fill all fields.";
    return;
  }

  const R = 0.0821; // L·atm/(mol·K)
  const P = (n * R * T) / V;

  document.getElementById("gasResult").innerHTML =
    `<strong>Result:</strong> P = ${P.toFixed(2)} atm<br>
     Step: P = nRT/V = (${n} × ${R} × ${T}) / ${V}`;
}

// --- Temperature ---
function convertTemperature() {
  const val = parseFloat(document.getElementById("tempValue").value);
  const from = document.getElementById("fromTemp").value;
  const to = document.getElementById("toTemp").value;

  if (isNaN(val)) {
    document.getElementById("tempResult").innerHTML = "⚠️ Enter a value.";
    return;
  }

  let celsius;

  if (from === "c") celsius = val;
  if (from === "f") celsius = (val - 32) * (5 / 9);
  if (from === "k") celsius = val - 273.15;

  let result;
  if (to === "c") result = celsius;
  if (to === "f") result = (celsius * 9) / 5 + 32;
  if (to === "k") result = celsius + 273.15;

  document.getElementById("tempResult").innerHTML =
    `<strong>Result:</strong> ${result.toFixed(2)} °${to.toUpperCase()}`;
}

// --- Buffer (Henderson–Hasselbalch) ---
function calculateBuffer() {
  const pKa = parseFloat(document.getElementById("pKa").value);
  const pH = parseFloat(document.getElementById("desiredPH").value);
  const acidConc = parseFloat(document.getElementById("acidConc").value);

  if (isNaN(pKa) || isNaN(pH) || isNaN(acidConc) || acidConc <= 0) {
    document.getElementById("bufferResult").innerHTML = "⚠️ Fill all fields.";
    return;
  }

  const ratio = Math.pow(10, pH - pKa);
  const baseConc = acidConc * ratio;

  document.getElementById("bufferResult").innerHTML =
    `<strong>Result:</strong> To prepare pH ${pH}, base/acid ratio = ${ratio.toFixed(2)}<br>
     If [Acid] = ${acidConc} M → [Base] ≈ ${baseConc.toFixed(3)} M<br>
     Step: pH = pKa + log([Base]/[Acid])`;
}

// --- Solution Prep ---
function calculateSolutionPrep() {
  const conc = parseFloat(document.getElementById("desiredConc").value);
  const vol = parseFloat(document.getElementById("desiredVol").value);
  const M = parseFloat(document.getElementById("prepMolarMass").value);

  if (isNaN(conc) || isNaN(vol) || isNaN(M)) {
    document.getElementById("solutionPrepResult").innerHTML = "⚠️ Fill all fields.";
    return;
  }

  const moles = conc * vol;
  const mass = moles * M;

  document.getElementById("solutionPrepResult").innerHTML =
    `<strong>Result:</strong> Weigh ${formatValue(mass, "g")} solute and dissolve in ${formatValue(vol, "L")} to prepare ${conc} M solution.<br>
     Step 1: Moles = Conc × Vol = ${conc} × ${vol} = ${moles.toFixed(3)} mol<br>
     Step 2: Mass = Moles × Molar Mass = ${moles.toFixed(3)} × ${M} g/mol`;
}
