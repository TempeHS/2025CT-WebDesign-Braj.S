document.addEventListener('DOMContentLoaded', () => {
    fetchCPUs();
});

function fetchCPUs() {
    fetch('/api/cpu.json')
        .then(response => response.json())
        .then(displayCPUs)
}

function displayCPUs(cpus) {
    const cpuList = document.getElementById('cpu-list');
    cpuList.innerHTML = '';

    cpus.forEach(cpu => {
        const cpuElement = document.createElement('div');
        cpuElement.className = 'cpu-item';
        cpuElement.innerHTML = `
            <h3>${cpu.name} (${cpu.brand})</h3>
            <p>Cores: ${cpu.cores}, Speed: ${cpu.speed}</p>
            <p>Price: <span id="price-${cpu.id}">${cpu.price}</span></p>
            <button onclick="selectCPU('${cpu.id}', '${cpu.name}', '${cpu.price}')">Select</button>
        `;
        cpuList.appendChild(cpuElement);
    });
}

function selectCPU(cpuId, cpuName, cpuPrice) {
    const cpuDetails = { id: cpuId, name: cpuName, price: cpuPrice };
    localStorage.setItem('selectedCPU', JSON.stringify(cpuDetails));
    alert(`You have selected CPU: ${cpuName}`);
}
