document.addEventListener('DOMContentLoaded', function() {
        displaySelectedCPU();
        });

        function displaySelectedCPU() {
    const selectedCPU = localStorage.getItem('selectedCPU');
    if (selectedCPU) {
        try {
            const cpuDetails = JSON.parse(selectedCPU);
            document.getElementById('cpu-name').textContent = cpuDetails.name;
        } catch (error) {
            console.error('Failed to parse CPU details:', error);
            setNoCPUSelected();
        }
    } else {
        setNoCPUSelected();
    }
}
