export default function parse(element, {document}) {
    // Extract all awt-resource-item elements
    const resourceItems = Array.from(element.querySelectorAll('awt-resource-item'));

    // Define the header row for the Cards block
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Cards';

    // Map over resource items to create rows for the table
    const rows = resourceItems.map((resource) => {
        // Extract the icon element, assuming the icon attribute exists
        const icon = document.createElement('div');
        const iconType = resource.getAttribute('icon');
        if (iconType) {
            icon.textContent = iconType.toUpperCase(); // Display icon type dynamically
        } else {
            icon.textContent = 'ICON'; // Fallback text if icon is missing
        }

        // Extract the content from the text attribute
        const content = document.createElement('div');
        const rawText = resource.getAttribute('text');
        if (rawText) {
            content.innerHTML = rawText;
        } else {
            content.textContent = 'No description available'; // Fallback for missing text
        }

        // Extract the link and append it to the content
        const link = document.createElement('a');
        const href = resource.getAttribute('href');
        if (href) {
            link.href = href;
            link.target = '_blank';
            link.textContent = 'Read More'; // Fallback text for link display
            content.appendChild(link);
        }

        return [icon, content];
    });

    // Combine header row and data rows
    const cells = [headerRow, ...rows];

    // Create the block table using WebImporter.DOMUtils.createTable()
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}