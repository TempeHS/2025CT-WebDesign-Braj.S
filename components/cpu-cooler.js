document.addEventListener('DOMContentLoaded', () => {
    fetchCPUCoolers();
});

function fetchCPUCoolers() {
    fetch('/api/cpu-cooler.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(displayCPUCoolers)
        .catch(error => console.error('Error fetching CPU Coolers:', error));
}

function displayCPUCoolers(coolers) {
    const coolerList = document.getElementById('cpu-cooler-list');
    coolerList.innerHTML = '';

    coolers.forEach(cooler => {
        const coolerElement = document.createElement('div');
        coolerElement.className = 'cooler-item';
        coolerElement.innerHTML = `
            <img src="${cooler.imageUrl}" alt="${cooler.name}" class="cooler-image" style="width: 50px; height: auto; margin-right: 10px;">
            <span class="cooler-name">${cooler.name}</span>
            <span class="cooler-price">${cooler.price}</span>
            <button class="cooler-select-button" onclick="selectCooler('${cooler.id}', '${cooler.name}', '${cooler.price}', '${cooler.imageUrl}', '${cooler.amazonLink || ''}')">Select</button>
            ${cooler.amazonLink ? `<a class="cooler-buy" href="${cooler.amazonLink}" target="_blank">Buy on Amazon</a>` : ''}
        `;
        coolerList.appendChild(coolerElement);
    });
}

function selectCooler(coolerId, coolerName, coolerPrice, coolerImageUrl, coolerAmazonLink) {
    const coolerDetails = {
        id: coolerId,
        name: coolerName,
        price: coolerPrice,
        imageUrl: coolerImageUrl,
        amazonLink: coolerAmazonLink
    };
    localStorage.setItem('selectedCpuCooler', JSON.stringify(coolerDetails));
    alert(`You have selected CPU Cooler: ${coolerName}`);
    window.location.href = '/build.html';
}
