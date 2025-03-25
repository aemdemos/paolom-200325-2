export default function parse(element, {document}) {
    // Extract title dynamically
    const titleElement = element.querySelector('p');
    const titleText = titleElement ? titleElement.textContent.trim() : 'No Title';

    // Create table header as in the example
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Accordion';
    const headerRow = [headerCell];

    // Create table cells dynamically
    const cells = [
        // Header row for the block type
        headerRow,
        // Content row with extracted data
        [titleText, '']
    ];

    // Generate the table using WebImporter helper function
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with the new table
    element.replaceWith(table);
}