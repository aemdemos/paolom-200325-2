export default function parse(element, {document}) {
    const cells = [];

    // Header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Cards (no images)';
    const headerRow = [headerCell];
    cells.push(headerRow);

    // Process nav items in the header
    const navItems = element.querySelectorAll('awtcustom-header-nav-item');
    navItems.forEach((navItem) => {
        const anchor = navItem.querySelector('a');
        if (anchor) {
            const title = anchor.textContent.trim();

            const heading = document.createElement('strong');
            heading.textContent = title;

            // Push single-cell row with the heading element
            cells.push([heading]);
        }
    });

    // Create the table
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element
    element.replaceWith(table);
}