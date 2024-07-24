document.addEventListener('DOMContentLoaded', () => {
    fetchPSUs();
});

function fetchPSUs() {
    fetch('/api/psu.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(displayPSUs)
        .catch(error => console.error('Error fetching PSUs:', error));
}

function displayPSUs(psus) {
    const psuList = document.getElementById('psu-list');
    psuList.innerHTML = '';

    psus.forEach(psu => {
        const psuElement = document.createElement('div');
        psuElement.className = 'psu-item';
        psuElement.innerHTML = `
            <img src="${psu.imageUrl}" alt="${psu.name}" class="psu-image" style="width: 50px; height: auto; margin-right: 10px;">
            <span class="psu-name">${psu.name}</span>
            <span class="psu-price">${psu.price}</span>
            <button class="psu-select-button" onclick="selectPSU('${psu.id}', '${psu.name}', '${psu.price}', '${psu.imageUrl}', '${psu.amazonLink || ''}')">Select</button>
            ${psu.amazonLink ? `<a class="psu-buy" href="${psu.amazonLink}" target="_blank">Buy on Amazon</a>` : ''}
        `;
        psuList.appendChild(psuElement);
    });
}

function selectPSU(psuId, psuName, psuPrice, psuImageUrl, psuAmazonLink) {
    const psuDetails = {
        id: psuId,
        name: psuName,
        price: psuPrice,
        imageUrl: psuImageUrl,
        amazonLink: psuAmazonLink
    };
    localStorage.setItem('selectedPsu', JSON.stringify(psuDetails));
    alert(`You have selected Power Supply: ${psuName}`);
    window.location.href = '/build.html';
}
