// MOLARITY: M = mass / (molar mass × volume)
function calculateMolarity() {
  const molarMass = parseFloat(document.getElementById("molarMass").value);
  const soluteMass = parseFloat(document.getElementById("soluteMass").value);
  const solutionVolume = parseFloat(document.getElementById("solutionVolume").value);

  if (molarMass > 0 && soluteMass > 0 && solutionVolume > 0) {
    const molarity = soluteMass / (molarMass * solutionVolume);
    document.getElementById("molarityResult").innerText = 
      `Molarity = ${molarity.toFixed(3)} mol/L`;
  } else {
    document.getElementById("molarityResult").innerText = "Please enter valid values.";
  }
}

// DILUTION: C1V1 = C2V2
function calculateDilution() {
  const c1 = parseFloat(document.getElementById("c1").value);
  const v1 = parseFloat(document.getElementById("v1").value);
  const c2 = parseFloat(document.getElementById("c2").value);

  if (c1 > 0 && v1 > 0 && c2 > 0) {
    const v2 = (c1 * v1) / c2;
    document.getElementById("dilutionResult").innerText =
      `Final Volume (V2) = ${v2.toFixed(3)} L`;
  } else {
    document.getElementById("dilutionResult").innerText = "Please enter valid values.";
  }
}

// UNIT CONVERSION (basic weights & volumes)
function convertUnits() {
  const value = parseFloat(document.getElementById("value").value);
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;

  const conversions = {
    mg: 0.001,
    g: 1,
    kg: 1000,
    ml: 0.001,
    l: 1
  };

  if (!isNaN(value)) {
    const baseValue = value * conversions[fromUnit];
    const result = baseValue / conversions[toUnit];
    document.getElementById("conversionResult").innerText =
      `${value} ${fromUnit} = ${result.toFixed(3)} ${toUnit}`;
  } else {
    document.getElementById("conversionResult").innerText = "Please enter a number.";
  }
}

// pH = -log10([H+])
function calculatePH() {
  const hConcentration = parseFloat(document.getElementById("hConcentration").value);

  if (hConcentration > 0) {
    const pH = -Math.log10(hConcentration);
    document.getElementById("phResult").innerText =
      `pH = ${pH.toFixed(2)}`;
  } else {
    document.getElementById("phResult").innerText = "Enter a positive [H+] value.";
  }
}

// NORMALITY: N = equivalents / volume
function calculateNormality() {
  const equivalents = parseFloat(document.getElementById("equivalents").value);
  const volume = parseFloat(document.getElementById("solutionVolumeN").value);

  if (equivalents > 0 && volume > 0) {
    const normality = equivalents / volume;
    document.getElementById("normalityResult").innerText =
      `Normality = ${normality.toFixed(3)} N`;
  } else {
    document.getElementById("normalityResult").innerText = "Enter valid values.";
  }
}

// MOLECULAR WEIGHT: MW = mass / moles
function calculateMolWeight() {
  const mass = parseFloat(document.getElementById("compoundMass").value);
  const moles = parseFloat(document.getElementById("moles").value);

  if (mass > 0 && moles > 0) {
    const mw = mass / moles;
    document.getElementById("molWeightResult").innerText =
      `Molecular Weight = ${mw.toFixed(2)} g/mol`;
  } else {
    document.getElementById("molWeightResult").innerText = "Enter valid values.";
  }
}

// GAS LAW: P = nRT / V
function calculateGasLaw() {
  const n = parseFloat(document.getElementById("n").value);
  const T = parseFloat(document.getElementById("t").value);
  const V = parseFloat(document.getElementById("vGas").value);

  const R = 0.0821; // Ideal gas constant (L·atm/mol·K)

  if (n > 0 && T > 0 && V > 0) {
    const P = (n * R * T) / V;
    document.getElementById("gasResult").innerText =
      `Pressure = ${P.toFixed(2)} atm`;
  } else {
    document.getElementById("gasResult").innerText = "Enter valid values.";
  }
}

// TEMPERATURE CONVERSION
function convertTemperature() {
  let tempValue = parseFloat(document.getElementById("tempValue").value);
  const from = document.getElementById("fromTemp").value;
  const to = document.getElementById("toTemp").value;

  if (isNaN(tempValue)) {
    document.getElementById("tempResult").innerText = "Enter a number.";
    return;
  }

  // Convert input to Celsius
  if (from === "f") tempValue = (tempValue - 32) * 5 / 9;
  else if (from === "k") tempValue = tempValue - 273.15;

  let result = tempValue;
  if (to === "f") result = (tempValue * 9 / 5) + 32;
  else if (to === "k") result = tempValue + 273.15;

  document.getElementById("tempResult").innerText =
    `Converted Value = ${result.toFixed(2)} °${to.toUpperCase()}`;
}
