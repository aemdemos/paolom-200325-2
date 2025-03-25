export default function parse(element, {document}) {
    // Step 1: Create header row dynamically
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Quote';
    const blockNameRow = [headerCell];

    // Step 2: Extract quote content dynamically
    const quoteTextElement = element.querySelector('.awt-wrapper-header-megamenu__desktop .awt-wrapper-actions__links');

    if (!quoteTextElement || !quoteTextElement.textContent.trim()) {
        console.warn('Relevant quote content not found or is empty. Using a placeholder.');
        const placeholderDiv = document.createElement('div');
        placeholderDiv.textContent = 'No quote content available';

        const cells = [
            blockNameRow, // Header row
            [placeholderDiv] // Placeholder text row
        ];

        const block = WebImporter.DOMUtils.createTable(cells, document);
        element.replaceWith(block);
        return;
    }

    const quoteContent = quoteTextElement.textContent.trim();
    const quoteDiv = document.createElement('div');
    quoteDiv.textContent = quoteContent;

    // Step 3: Assemble cells array for the table creation
    const cells = [
        blockNameRow, // Header row
        [quoteDiv]    // Quote text row
    ];

    // Step 4: Create table using WebImporter.DOMUtils
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Step 5: Replace original element with the new table block
    element.replaceWith(block);
}