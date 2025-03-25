export default function parse(element, {document}) {
    // Helper function for creating bold headers
    const createHeader = (text) => {
        const strongHeader = document.createElement('strong');
        strongHeader.textContent = text;
        return strongHeader;
    };

    // Extract footer sections
    const footerSections = element.querySelectorAll('awt-footer-section');

    // Prepare cells for the table
    const cells = [];

    // Add the header row
    cells.push([createHeader('Columns')]);

    // Process each footer section
    const columns = [];
    footerSections.forEach((section) => {
        const columnContent = [];

        // Add the column title
        const titleHeader = document.createElement('h2');
        titleHeader.textContent = section.getAttribute('footertitle');
        titleHeader.style.fontWeight = 'bold';
        columnContent.push(titleHeader);

        // Add links within the section
        const links = section.querySelectorAll('a');
        links.forEach((link) => {
            const linkElement = document.createElement('p');
            const anchor = document.createElement('a');
            anchor.textContent = link.textContent;
            anchor.href = link.href;
            linkElement.appendChild(anchor);
            columnContent.push(linkElement);
        });

        columns.push(columnContent);
    });

    // Add the row for columns
    cells.push(columns);

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block
    element.replaceWith(block);
}