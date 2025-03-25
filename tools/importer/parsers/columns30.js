export default function parse(element, {document}) {
    // Ensure dynamic extraction of content from the provided element
    const title = element.querySelector('.awt-error-page__title');
    const description = element.querySelector('.awt-error-page__description');
    const buttons = element.querySelectorAll('awt-btn');

    // Create structured rows dynamically
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    const contentRows = Array.from(buttons).map(button => {
        const link = document.createElement('a');
        link.href = button.getAttribute('href');
        link.textContent = button.textContent.trim();
        return [link];
    });

    const descriptionRow = [
        title ? title.textContent.trim() : '',
        description ? description.innerHTML : ''
    ];

    // Combine rows into a cell structure
    const cells = [
        headerRow,
        descriptionRow,
        ...contentRows
    ];

    // Create the table block using the helper function
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element dynamically
    element.replaceWith(block);
}