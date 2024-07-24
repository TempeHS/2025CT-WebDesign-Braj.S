document.addEventListener('DOMContentLoaded', () => {
    fetchStorages();
});

function fetchStorages() {
    fetch('/api/storage.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(displayStorages)
        .catch(error => console.error('Error fetching Storages:', error));
}

function displayStorages(storages) {
    const storageList = document.getElementById('storage-list');
    storageList.innerHTML = '';

    storages.forEach(storage => {
        const storageElement = document.createElement('div');
        storageElement.className = 'storage-item';
        storageElement.innerHTML = `
            <img src="${storage.imageUrl}" alt="${storage.name}" class="storage-image" style="width: 50px; height: auto; margin-right: 10px;">
            <span class="storage-name">${storage.name}</span>
            <span class="storage-price">${storage.price}</span>
            <button class="storage-select-button" onclick="selectStorage('${storage.id}', '${storage.name}', '${storage.price}', '${storage.imageUrl}', '${storage.amazonLink || ''}')">Select</button>
            ${storage.amazonLink ? `<a class="storage-buy" href="${storage.amazonLink}" target="_blank">Buy on Amazon</a>` : ''}
        `;
        storageList.appendChild(storageElement);
    });
}

function selectStorage(storageId, storageName, storagePrice, storageImageUrl, storageAmazonLink) {
    const storageDetails = {
        id: storageId,
        name: storageName,
        price: storagePrice,
        imageUrl: storageImageUrl,
        amazonLink: storageAmazonLink
    };
    localStorage.setItem('selectedStorage', JSON.stringify(storageDetails));
    alert(`You have selected Storage: ${storageName}`);
    window.location.href = '/build.html';
}
