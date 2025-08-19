// Molarity Calculator
document.getElementById('molarityForm').addEventListener('submit', function(e){
    e.preventDefault();
    const moles = parseFloat(document.getElementById('moles').value);
    const volume = parseFloat(document.getElementById('volume').value);
    const molarity = moles / volume;
    document.getElementById('molarityResult').innerText = `Molarity: ${molarity.toFixed(4)} M`;
});

// Dilution Calculator (C1V1 = C2V2)
document.getElementById('dilutionForm').addEventListener('submit', function(e){
    e.preventDefault();
    const c1 = parseFloat(document.getElementById('c1').value);
    const v1 = parseFloat(document.getElementById('v1').value);
    const v2 = parseFloat(document.getElementById('v2').value);
    const c2 = (c1 * v1) / v2;
    document.getElementById('dilutionResult').innerText = `Final Concentration: ${c2.toFixed(4)} M`;
});

// Unit Conversion
document.getElementById('unitForm').addEventListener('submit', function(e){
    e.preventDefault();
    const value = parseFloat(document.getElementById('unitValue').value);
    const from = document.getElementById('unitFrom').value;
    const to = document.getElementById('unitTo').value;

    let grams = value;
    // Convert to grams or liters
    switch(from){
        case 'kg': grams = value * 1000; break;
        case 'mg': grams = value / 1000; break;
        case 'g': grams = value; break;
        case 'L': grams = value; break;
        case 'mL': grams = value / 1000; break;
    }

    let result = grams;
    switch(to){
        case 'kg': result = grams / 1000; break;
        case 'mg': result = grams * 1000; break;
        case 'g': result = grams; break;
        case 'L': result = grams; break;
        case 'mL': result = grams * 1000; break;
    }

    document.getElementById('unitResult').innerText = `Converted value: ${result.toFixed(4)} ${to}`;
});

// pH Calculator
document.getElementById('phForm').addEventListener('submit', function(e){
    e.preventDefault();
    const H = parseFloat(document.getElementById('hConcentration').value);
    const pH = -Math.log10(H);
    document.getElementById('phResult').innerText = `pH: ${pH.toFixed(2)}`;
});

// Percentage Solution
document.getElementById('percentageForm').addEventListener('submit', function(e){
    e.preventDefault();
    const mass = parseFloat(document.getElementById('soluteMass').value);
    const volume = parseFloat(document.getElementById('solutionVol').value);
    const percent = (mass / volume) * 100;
    document.getElementById('percentageResult').innerText = `Percentage: ${percent.toFixed(2)}% w/v`;
});

// Buffer Solution
document.getElementById('bufferForm').addEventListener('submit', function(e){
    e.preventDefault();
    const pKa = parseFloat(document.getElementById('pKa').value);
    const Aminus = parseFloat(document.getElementById('Aminus').value);
    const HA = parseFloat(document.getElementById('HA').value);
    const pH = pKa + Math.log10(Aminus / HA);
    document.getElementById('bufferResult').innerText = `pH: ${pH.toFixed(2)}`;
});
