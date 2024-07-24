document.addEventListener('DOMContentLoaded', function() {
    const components = ['cpu', 'cpuCooler', 'motherboard', 'memory', 'storage', 'gpu', 'case', 'psu', 'os', 'monitor'];
    components.forEach(component => displaySelectedComponent(component));
});

function displaySelectedComponent(component) {
    const selectedComponent = localStorage.getItem(`selected${capitalize(component)}`);
    if (selectedComponent) {
        try {
            const componentDetails = JSON.parse(selectedComponent);
            document.getElementById(`${component}-name`).textContent = componentDetails.name;
            document.getElementById(`${component}-img`).src = componentDetails.imageUrl;
            document.getElementById(`${component}-price`).textContent = componentDetails.price;
            document.getElementById(`${component}-amazon-btn`).onclick = function() {
                window.location.href = componentDetails.amazonLink;
            };
        } catch (error) {
            console.error(`Failed to parse ${component} details:`, error);
            setNoComponentSelected(component);
        }
    } else {
        setNoComponentSelected(component);
    }
}

function setNoComponentSelected(component) {
    document.getElementById(`${component}-name`).textContent = 'None selected';
    document.getElementById(`${component}-img`).src = '';
    document.getElementById(`${component}-price`).textContent = '';
    document.getElementById(`${component}-amazon-btn`).onclick = null;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
