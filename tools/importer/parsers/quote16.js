export default function parse(element, {document}) {
    // Check if the element exists and is valid
    if (!element) {
        console.error('Element is null or undefined.');
        return;
    }

    const blockName = 'Quote'; // Block name as defined in the guidelines

    // Extract text content dynamically from the element
    const quoteSection = element.querySelector('awtcustom-header-nav');
    let quoteText = '';

    if (quoteSection && quoteSection.innerText) {
        quoteText = quoteSection.innerText.trim(); // Ensure quoteText is safely extracted
    } else {
        console.warn('Quote section is missing or empty. Defaulting to placeholder text.');
        quoteText = 'No quote found'; // Fallback text
    }

    // Create the header row exactly as per the example
    const headerCell = document.createElement('strong');
    headerCell.textContent = blockName;
    const headerRow = [headerCell];

    // Create the quote row with the extracted or fallback text
    const quoteRow = [quoteText];

    // Define the cells array for the table
    const cells = [
        headerRow, // Header row
        quoteRow,  // Content row
    ];

    // Create the block table using WebImporter.DOMUtils.createTable()
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}