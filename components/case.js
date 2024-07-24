document.addEventListener('DOMContentLoaded', () => {
    fetchCases();
});

function fetchCases() {
    fetch('/api/case.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(displayCases)
        .catch(error => console.error('Error fetching Cases:', error));
}

function displayCases(cases) {
    const caseList = document.getElementById('case-list');
    caseList.innerHTML = '';

    cases.forEach(pcCase => {
        const caseElement = document.createElement('div');
        caseElement.className = 'case-item';
        caseElement.innerHTML = `
            <img src="${pcCase.imageUrl}" alt="${pcCase.name}" class="case-image" style="width: 50px; height: auto; margin-right: 10px;">
            <span class="case-name">${pcCase.name}</span>
            <span class="case-price">${pcCase.price}</span>
            <button class="case-select-button" onclick="selectCase('${pcCase.id}', '${pcCase.name}', '${pcCase.price}', '${pcCase.imageUrl}', '${pcCase.amazonLink || ''}')">Select</button>
            ${pcCase.amazonLink ? `<a class="case-buy" href="${pcCase.amazonLink}" target="_blank">Buy on Amazon</a>` : ''}
        `;
        caseList.appendChild(caseElement);
    });
}

function selectCase(caseId, caseName, casePrice, caseImageUrl, caseAmazonLink) {
    const caseDetails = {
        id: caseId,
        name: caseName,
        price: casePrice,
        imageUrl: caseImageUrl,
        amazonLink: caseAmazonLink
    };
    localStorage.setItem('selectedCase', JSON.stringify(caseDetails));
    alert(`You have selected Case: ${caseName}`);
    window.location.href = '/build.html';
}
