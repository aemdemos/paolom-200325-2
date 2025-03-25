export default function parse(element, {document}) {
    // Helper function to create the table
    function createContentCell(card) {
        const title = card.querySelector('h4')?.textContent || '';
        const description = card.querySelector('[slot="cardDescription"]')?.innerHTML || '';
        const image = card.querySelector('img');
        const imageElement = document.createElement('img');
        if (image) {
            imageElement.src = image.src;
            imageElement.alt = image.alt || '';
        }

        const titleElement = document.createElement('h4');
        titleElement.textContent = title;

        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = description;

        return [imageElement, titleElement, descriptionElement];
    }

    // Extract cards from the container
    const cards = element.querySelectorAll('awt-category-card');

    // Prepare header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Prepare content row
    const contentRow = Array.from(cards).map(card => createContentCell(card));

    // Create table
    const cells = [
        headerRow,
        contentRow
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the generated table
    element.replaceWith(blockTable);
}