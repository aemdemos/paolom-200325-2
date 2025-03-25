export default function parse(element, {document}) {
    // Validate element is not null or undefined
    if (!element || !document) {
        throw new Error('Element or document is missing');
    }

    // Create the header row dynamically to match the block type
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Tabs';

    // Dynamically extract content from the provided HTML
    const spanElement = element.querySelector('span'); // Extract the span text
    const anchorElement = element.querySelector('a'); // Extract the anchor element

    // Handle cases where elements might be missing
    let tabOneContent, tabTwoContent;

    if (spanElement) {
        tabOneContent = document.createElement('p');
        tabOneContent.textContent = spanElement.textContent.trim(); // Ensure text is trimmed
    } else {
        tabOneContent = document.createElement('p');
        tabOneContent.textContent = 'No content available for Tab One'; // Fallback content
    }

    if (anchorElement) {
        tabTwoContent = anchorElement.cloneNode(true); // Clone anchor to preserve attributes
    } else {
        tabTwoContent = document.createElement('p');
        tabTwoContent.textContent = 'No content available for Tab Two'; // Fallback content
    }

    // Construct the cells array for the table
    const cells = [
        headerRow, // Header row
        ['Tab One', tabOneContent],
        ['Tab Two', tabTwoContent],
    ];

    // Create the block table using the provided helper function
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the newly created block table
    element.replaceWith(blockTable);

    // Return the block table for further processing if needed
    return blockTable;
}