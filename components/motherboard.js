document.addEventListener('DOMContentLoaded', () => {
    fetchMotherboards();
});

function fetchMotherboards() {
    fetch('/api/motherboard.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(displayMotherboards)
        .catch(error => console.error('Error fetching Motherboards:', error));
}

function displayMotherboards(motherboards) {
    const motherboardList = document.getElementById('motherboard-list');
    motherboardList.innerHTML = '';

    motherboards.forEach(motherboard => {
        const motherboardElement = document.createElement('div');
        motherboardElement.className = 'motherboard-item';
        motherboardElement.innerHTML = `
            <img src="${motherboard.imageUrl}" alt="${motherboard.name}" class="motherboard-image" style="width: 50px; height: auto; margin-right: 10px;">
            <span class="motherboard-name">${motherboard.name}</span>
            <span class="motherboard-price">${motherboard.price}</span>
            <button class="motherboard-select-button" onclick="selectMotherboard('${motherboard.id}', '${motherboard.name}', '${motherboard.price}', '${motherboard.imageUrl}', '${motherboard.amazonLink || ''}')">Select</button>
            ${motherboard.amazonLink ? `<a class="motherboard-buy" href="${motherboard.amazonLink}" target="_blank">Buy on Amazon</a>` : ''}
        `;
        motherboardList.appendChild(motherboardElement);
    });
}

function selectMotherboard(motherboardId, motherboardName, motherboardPrice, motherboardImageUrl, motherboardAmazonLink) {
    const motherboardDetails = {
        id: motherboardId,
        name: motherboardName,
        price: motherboardPrice,
        imageUrl: motherboardImageUrl,
        amazonLink: motherboardAmazonLink
    };
    localStorage.setItem('selectedMotherboard', JSON.stringify(motherboardDetails));
    alert(`You have selected Motherboard: ${motherboardName}`);
    window.location.href = '/build.html';
}
