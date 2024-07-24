document.addEventListener('DOMContentLoaded', () => {
    fetchMonitors();
});

function fetchMonitors() {
    fetch('/api/monitor.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(displayMonitors)
        .catch(error => console.error('Error fetching Monitors:', error));
}

function displayMonitors(monitors) {
    const monitorList = document.getElementById('monitor-list');
    monitorList.innerHTML = '';

    monitors.forEach(monitor => {
        const monitorElement = document.createElement('div');
        monitorElement.className = 'monitor-item';
        monitorElement.innerHTML = `
            <img src="${monitor.imageUrl}" alt="${monitor.name}" class="monitor-image" style="width: 50px; height: auto; margin-right: 10px;">
            <span class="monitor-name">${monitor.name}</span>
            <span class="monitor-price">${monitor.price}</span>
            <button class="monitor-select-button" onclick="selectMonitor('${monitor.id}', '${monitor.name}', '${monitor.price}', '${monitor.imageUrl}', '${monitor.amazonLink || ''}')">Select</button>
            ${monitor.amazonLink ? `<a class="monitor-buy" href="${monitor.amazonLink}" target="_blank">Buy on Amazon</a>` : ''}
        `;
        monitorList.appendChild(monitorElement);
    });
}

function selectMonitor(monitorId, monitorName, monitorPrice, monitorImageUrl, monitorAmazonLink) {
    const monitorDetails = {
        id: monitorId,
        name: monitorName,
        price: monitorPrice,
        imageUrl: monitorImageUrl,
        amazonLink: monitorAmazonLink
    };
    localStorage.setItem('selectedMonitor', JSON.stringify(monitorDetails));
    alert(`You have selected Monitor: ${monitorName}`);
    window.location.href = '/build.html';
}
