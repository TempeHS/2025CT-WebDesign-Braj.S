document.addEventListener('DOMContentLoaded', () => {
    fetchGPUs();
});

function fetchGPUs() {
    fetch('/api/gpu.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(displayGPUs)
        .catch(error => console.error('Error fetching GPUs:', error));
}

function displayGPUs(gpus) {
    const gpuList = document.getElementById('gpu-list');
    gpuList.innerHTML = '';

    gpus.forEach(gpu => {
        const gpuElement = document.createElement('div');
        gpuElement.className = 'gpu-item';
        gpuElement.innerHTML = `
            <img src="${gpu.imageUrl}" alt="${gpu.name}" class="gpu-image" style="width: 50px; height: auto; margin-right: 10px;">
            <span class="gpu-name">${gpu.name}</span>
            <span class="gpu-price">${gpu.price}</span>
            <button class="gpu-select-button" onclick="selectGPU('${gpu.id}', '${gpu.name}', '${gpu.price}', '${gpu.imageUrl}', '${gpu.amazonLink || ''}')">Select</button>
            ${gpu.amazonLink ? `<a class="gpu-buy" href="${gpu.amazonLink}" target="_blank">Buy on Amazon</a>` : ''}
        `;
        gpuList.appendChild(gpuElement);
    });
}

function selectGPU(gpuId, gpuName, gpuPrice, gpuImageUrl, gpuAmazonLink) {
    const gpuDetails = {
        id: gpuId,
        name: gpuName,
        price: gpuPrice,
        imageUrl: gpuImageUrl,
        amazonLink: gpuAmazonLink
    };
    localStorage.setItem('selectedGpu', JSON.stringify(gpuDetails));
    alert(`You have selected GPU: ${gpuName}`);
    window.location.href = '/build.html';
}
