document.addEventListener('DOMContentLoaded', () => {
    fetchMemories();
});

function fetchMemories() {
    fetch('/api/memory.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(displayMemories)
        .catch(error => console.error('Error fetching Memories:', error));
}

function displayMemories(memories) {
    const memoryList = document.getElementById('memory-list');
    memoryList.innerHTML = '';

    memories.forEach(memory => {
        const memoryElement = document.createElement('div');
        memoryElement.className = 'memory-item';
        memoryElement.innerHTML = `
            <img src="${memory.imageUrl}" alt="${memory.name}" class="memory-image" style="width: 50px; height: auto; margin-right: 10px;">
            <span class="memory-name">${memory.name}</span>
            <span class="memory-price">${memory.price}</span>
            <button class="memory-select-button" onclick="selectMemory('${memory.id}', '${memory.name}', '${memory.price}', '${memory.imageUrl}', '${memory.amazonLink || ''}')">Select</button>
            ${memory.amazonLink ? `<a class="memory-buy" href="${memory.amazonLink}" target="_blank">Buy on Amazon</a>` : ''}
        `;
        memoryList.appendChild(memoryElement);
    });
}

function selectMemory(memoryId, memoryName, memoryPrice, memoryImageUrl, memoryAmazonLink) {
    const memoryDetails = {
        id: memoryId,
        name: memoryName,
        price: memoryPrice,
        imageUrl: memoryImageUrl,
        amazonLink: memoryAmazonLink
    };
    localStorage.setItem('selectedMemory', JSON.stringify(memoryDetails));
    alert(`You have selected Memory: ${memoryName}`);
    window.location.href = '/build.html';
}
