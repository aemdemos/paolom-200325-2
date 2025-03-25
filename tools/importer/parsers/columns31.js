export default function parse(element, {document}) {
    const createTable = WebImporter.DOMUtils.createTable;

    // Extracting content from the element
    const tabs = element.querySelectorAll('awt-tab-menu awt-tab-item');

    const cells = [];

    // Header Row (Columns block)
    const headerRow = ['Columns block'];
    cells.push(headerRow);

    // Content rows
    tabs.forEach(tab => {
        const buttonText = tab.querySelector('button').textContent;
        const tabContent = element.querySelector(`div[id="${tab.getAttribute('contentid')}"] awt-image`);

        if (tabContent) {
            const image = document.createElement('img');
            image.src = tabContent.getAttribute('src');
            image.alt = tabContent.getAttribute('references') || '';
            cells.push([buttonText, image]);
        } else {
            cells.push([buttonText, 'No content available']); // Handle missing content edge case
        }
    });

    // Create table block
    const block = createTable(cells, document);

    // Replace original element with block
    element.replaceWith(block);
}