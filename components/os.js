document.addEventListener('DOMContentLoaded', () => {
    fetchOperatingSystems();
});

function fetchOperatingSystems() {
    fetch('/api/os.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(displayOperatingSystems)
        .catch(error => console.error('Error fetching Operating Systems:', error));
}

function displayOperatingSystems(oss) {
    const osList = document.getElementById('os-list');
    osList.innerHTML = '';

    oss.forEach(os => {
        const osElement = document.createElement('div');
        osElement.className = 'os-item';
        osElement.innerHTML = `
            <img src="${os.imageUrl}" alt="${os.name}" class="os-image" style="width: 50px; height: auto; margin-right: 10px;">
            <span class="os-name">${os.name}</span>
            <span class="os-price">${os.price}</span>
            <button class="os-select-button" onclick="selectOS('${os.id}', '${os.name}', '${os.price}', '${os.imageUrl}', '${os.amazonLink || ''}')">Select</button>
            ${os.amazonLink ? `<a class="os-buy" href="${os.amazonLink}" target="_blank">Buy on Amazon</a>` : ''}
        `;
        osList.appendChild(osElement);
    });
}

function selectOS(osId, osName, osPrice, osImageUrl, osAmazonLink) {
    const osDetails = {
        id: osId,
        name: osName,
        price: osPrice,
        imageUrl: osImageUrl,
        amazonLink: osAmazonLink
    };
    localStorage.setItem('selectedOs', JSON.stringify(osDetails));
    alert(`You have selected Operating System: ${osName}`);
    window.location.href = '/build.html';
}
