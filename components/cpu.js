document.addEventListener('DOMContentLoaded', () => {
    fetchCPUs();
});

function fetchCPUs() {
    fetch('/api/cpu.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(displayCPUs)
        .catch(error => console.error('Error fetching CPUs:', error));
}

function displayCPUs(cpus) {
    const cpuList = document.getElementById('cpu-list');
    cpuList.innerHTML = '';

    cpus.forEach(cpu => {
        const cpuElement = document.createElement('div');
        cpuElement.className = 'cpu-item';
        cpuElement.innerHTML = `
            <img src="${cpu.imageUrl}" alt="${cpu.name}" class="cpu-image" style="width: 50px; height: auto; margin-right: 10px;">
            <span class="cpu-name">${cpu.name}</span>
            <span class="cpu-price">${cpu.price}</span>
            <button class="cpu-select-button" onclick="selectCPU('${cpu.id}', '${cpu.name}', '${cpu.price}', '${cpu.imageUrl}', '${cpu.amazonLink || ''}')">Select</button>
            ${cpu.amazonLink ? `<a class="cpu-buy" href="${cpu.amazonLink}" target="_blank">Buy on Amazon</a>` : ''}
        `;
        cpuList.appendChild(cpuElement);
    });
}

function selectCPU(cpuId, cpuName, cpuPrice, cpuImageUrl, cpuAmazonLink) {
    const cpuDetails = {
        id: cpuId,
        name: cpuName,
        price: cpuPrice,
        imageUrl: cpuImageUrl,
        amazonLink: cpuAmazonLink
    };
    localStorage.setItem('selectedCpu', JSON.stringify(cpuDetails));
    alert(`You have selected CPU: ${cpuName}`);
    window.location.href = '/build.html';
}
