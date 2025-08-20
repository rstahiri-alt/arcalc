// -------- helpers --------
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

function showError(elId, msg = "⚠️ Please fill all fields correctly.") {
  document.getElementById(elId).innerHTML = msg;
}

// -------- existing calculators --------
// Molarity
function calculateMolarity() {
  const M = parseFloat(document.getElementById("molarMass").value);
  const m = parseFloat(document.getElementById("soluteMass").value);
  const V = parseFloat(document.getElementById("solutionVolume").value);
  if (isNaN(M) || isNaN(m) || isNaN(V) || V === 0) return showError("molarityResult");

  const moles = m / M;
  const molarity = moles / V;
  document.getElementById("molarityResult").innerHTML =
    `<strong>Result:</strong> ${molarity.toFixed(3)} mol/L<br>
     Step 1: n = m/M = ${m} g / ${M} g·mol⁻¹ = ${moles.toFixed(3)} mol<br>
     Step 2: M = n/V = ${moles.toFixed(3)} / ${V} L`;
}

// Dilution (C1V1=C2V2 → V2 = C1V1/C2)
function calculateDilution() {
  const C1 = parseFloat(document.getElementById("c1").value);
  const V1 = parseFloat(document.getElementById("v1").value);
  const C2 = parseFloat(document.getElementById("c2").value);
  if (isNaN(C1) || isNaN(V1) || isNaN(C2) || C2 === 0) return showError("dilutionResult");

  const V2 = (C1 * V1) / C2;
  document.getElementById("dilutionResult").innerHTML =
    `<strong>Result:</strong> V₂ = ${formatValue(V2, "L")}<br>
     Step: V₂ = (C₁·V₁)/C₂ = (${C1}×${V1})/${C2}`;
}

// Unit conversion (basic mass/volume)
function convertUnits() {
  const value = parseFloat(document.getElementById("value").value);
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;
  if (isNaN(value)) return showError("conversionResult", "⚠️ Enter a value.");

  let factor = 1;
  const weight = { mg: 1, g: 1000, kg: 1e6 };
  const volume = { ml: 1, l: 1000 };
  if (from in weight && to in weight) factor = weight[from] / weight[to];
  else if (from in volume && to in volume) factor = volume[from] / volume[to];
  else return showError("conversionResult", "⚠️ Convert within mass or within volume units.");

  const result = value * factor;
  document.getElementById("conversionResult").innerHTML =
    `<strong>Result:</strong> ${result} ${to}`;
}

// pH
function calculatePH() {
  const h = parseFloat(document.getElementById("hConcentration").value);
  if (isNaN(h) || h <= 0) return showError("phResult", "⚠️ Enter positive [H+].");
  const pH = -Math.log10(h);
  document.getElementById("phResult").innerHTML =
    `<strong>Result:</strong> pH = ${pH.toFixed(2)}<br>
     Step: pH = −log₁₀(${h})`;
}

// Normality
function calculateNormality() {
  const eq = parseFloat(document.getElementById("equivalents").value);
  const V = parseFloat(document.getElementById("solutionVolumeN").value);
  if (isNaN(eq) || isNaN(V) || V === 0) return showError("normalityResult");

  const N = eq / V;
  document.getElementById("normalityResult").innerHTML =
    `<strong>Result:</strong> ${N.toFixed(3)} N<br>
     Step: N = eq/V = ${eq}/${V}`;
}

// Molecular weight
function calculateMolWeight() {
  const mass = parseFloat(document.getElementById("compoundMass").value);
  const moles = parseFloat(document.getElementById("moles").value);
  if (isNaN(mass) || isNaN(moles) || moles === 0) return showError("molWeightResult");

  const MW = mass / moles;
  document.getElementById("molWeightResult").innerHTML =
    `<strong>Result:</strong> ${MW.toFixed(3)} g·mol⁻¹<br>
     Step: MW = m/n = ${mass} / ${moles}`;
}

// Ideal gas law
function calculateGasLaw() {
  const n = parseFloat(document.getElementById("n").value);
  const T = parseFloat(document.getElementById("t").value);
  const V = parseFloat(document.getElementById("vGas").value);
  if (isNaN(n) || isNaN(T) || isNaN(V) || V === 0) return showError("gasResult");

  const R = 0.0821; // L·atm·mol⁻¹·K⁻¹
  const P = (n * R * T) / V;
  document.getElementById("gasResult").innerHTML =
    `<strong>Result:</strong> P = ${P.toFixed(2)} atm<br>
     Step: P = nRT/V = (${n}×${R}×${T})/${V}`;
}

// Temperature
function convertTemperature() {
  const val = parseFloat(document.getElementById("tempValue").value);
  const from = document.getElementById("fromTemp").value;
  const to = document.getElementById("toTemp").value;
  if (isNaN(val)) return showError("tempResult", "⚠️ Enter a value.");

  let celsius;
  if (from === "c") celsius = val;
  if (from === "f") celsius = (val - 32) * 5/9;
  if (from === "k") celsius = val - 273.15;

  let result;
  if (to === "c") result = celsius;
  if (to === "f") result = celsius * 9/5 + 32;
  if (to === "k") result = celsius + 273.15;

  document.getElementById("tempResult").innerHTML =
    `<strong>Result:</strong> ${result.toFixed(2)} °${to.toUpperCase()}`;
}

// Buffer (Henderson–Hasselbalch)
function calculateBuffer() {
  const pKa = parseFloat(document.getElementById("pKa").value);
  const pH = parseFloat(document.getElementById("desiredPH").value);
  const acidConc = parseFloat(document.getElementById("acidConc").value);
  if (isNaN(pKa) || isNaN(pH) || isNaN(acidConc) || acidConc <= 0) return showError("bufferResult");

  const ratio = Math.pow(10, pH - pKa);
  const baseConc = acidConc * ratio;
  document.getElementById("bufferResult").innerHTML =
    `<strong>Result:</strong> For pH ${pH}, [Base]/[Acid] = ${ratio.toFixed(2)}<br>
     If [Acid] = ${acidConc} M → [Base] ≈ ${baseConc.toFixed(3)} M<br>
     Step: pH = pKa + log([Base]/[Acid])`;
}

// Solution prep (from solid)
function calculateSolutionPrep() {
  const conc = parseFloat(document.getElementById("desiredConc").value);
  const vol = parseFloat(document.getElementById("desiredVol").value);
  const M = parseFloat(document.getElementById("prepMolarMass").value);
  if (isNaN(conc) || isNaN(vol) || isNaN(M)) return showError("solutionPrepResult");

  const moles = conc * vol;
  const mass = moles * M;
  document.getElementById("solutionPrepResult").innerHTML =
    `<strong>Result:</strong> Weigh ${formatValue(mass, "g")} and dissolve to ${formatValue(vol, "L")} for ${conc} M.<br>
     Step 1: n = C·V = ${conc}×${vol} = ${moles.toFixed(3)} mol<br>
     Step 2: m = n·M = ${moles.toFixed(3)}×${M} = ${mass.toFixed(3)} g`;
}

// -------- NEW calculators --------
// Beer–Lambert: A = ε·c·l
function calculateBeerLambert() {
  const eps = parseFloat(document.getElementById("epsilon").value);
  const l = parseFloat(document.getElementById("pathlength").value);
  const c = parseFloat(document.getElementById("bl_conc").value);
  if (isNaN(eps) || isNaN(l) || isNaN(c)) return showError("beerLambertResult");

  const A = eps * c * l;
  document.getElementById("beerLambertResult").innerHTML =
    `<strong>Result:</strong> A = ${A.toFixed(3)}<br>
     Step: A = ε·c·l = ${eps}×${c}×${l}`;
}

// % Solution prep (w/v or v/v)
// w/v: grams needed = (%/100) * volume_mL
// v/v: mL needed   = (%/100) * volume_mL
function calculatePercentSolution() {
  const type = document.getElementById("percentType").value; // "w/v" or "v/v"
  const pct = parseFloat(document.getElementById("percentValue").value);
  const Vml = parseFloat(document.getElementById("percentVolume").value);
  if (isNaN(pct) || isNaN(Vml)) return showError("percentSolutionResult");

  if (type === "w/v") {
    const grams = (pct / 100) * Vml; // grams per 100 mL
    document.getElementById("percentSolutionResult").innerHTML =
      `<strong>Result:</strong> Weigh ${formatValue(grams / 1000, "g")} and bring to ${Vml} mL total.<br>
       Step: g needed = (%/100)×V(mL) = ${pct}/100×${Vml} = ${grams.toFixed(2)} g`;
  } else {
    const mLsolute = (pct / 100) * Vml;
    document.getElementById("percentSolutionResult").innerHTML =
      `<strong>Result:</strong> Measure ${mLsolute.toFixed(2)} mL solute and bring to ${Vml} mL total.<br>
       Step: mL solute = (%/100)×V = ${pct}/100×${Vml}`;
  }
}

// RPM → RCF: RCF = 1.118×10⁻⁵ × r(cm) × RPM²
function calculateRCF() {
  const r = parseFloat(document.getElementById("radius").value);
  const rpm = parseFloat(document.getElementById("rpm").value);
  if (isNaN(r) || isNaN(rpm)) return showError("rcfResult");

  const RCF = 1.118e-5 * r * rpm * rpm;
  document.getElementById("rcfResult").innerHTML =
    `<strong>Result:</strong> RCF ≈ ${RCF.toFixed(1)} × g<br>
     Step: RCF = 1.118×10⁻⁵ × ${r} × ${rpm}²`;
}

// ppm / ppb / % converter (simple relationships)
// 1% = 10,000 ppm ; 1 ppm = 0.0001% ; 1 ppm = 1000 ppb
function convertPPM() {
  const val = parseFloat(document.getElementById("ppmInput").value);
  const unit = document.getElementById("ppmUnit").value;
  if (isNaN(val)) return showError("ppmResult", "⚠️ Enter a value.");

  let ppm, ppb, pct;
  if (unit === "ppm") {
    ppm = val;
    ppb = val * 1000;
    pct = val / 10000;
  } else if (unit === "ppb") {
    ppm = val / 1000;
    ppb = val;
    pct = ppm / 10000;
  } else {
    pct = val;
    ppm = val * 10000;
    ppb = ppm * 1000;
  }

  document.getElementById("ppmResult").innerHTML =
    `<strong>Result:</strong><br>
     % = ${pct.toExponential(3)}<br>
     ppm = ${ppm.toExponential(3)}<br>
     ppb = ${ppb.toExponential(3)}<br>
     (Assumes dilute aqueous solutions: 1 mg/L ≈ 1 ppm)`;
}
