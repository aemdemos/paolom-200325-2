export default function parse(element, {document}) {
    // Define the header row exactly as per the example
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Cards';
    const headerRow = [headerCell];

    // Function to handle nested hierarchical menus and avoid duplicates
    const extractMenuItems = (menu, parentLabel = '') => {
        const rows = [];
        const menuLabel = menu.getAttribute('menu-label') || menu.getAttribute('trigger-content');
        const linkItems = menu.querySelectorAll('a');

        const currentLabel = parentLabel ? `${parentLabel} > ${menuLabel}` : menuLabel;

        if (linkItems.length > 0) {
            linkItems.forEach((link) => {
                const textContent = link.textContent.trim();
                const href = link.getAttribute('href');

                // Avoid duplicates
                if (!rows.some(row => row[1]?.textContent === textContent && row[2]?.textContent === href)) {
                    rows.push([
                        currentLabel || '',
                        document.createTextNode(textContent),
                        href ? document.createTextNode(href) : ''
                    ]);
                }
            });
        } else if (menuLabel) {
            rows.push([
                currentLabel,
                '',
                ''
            ]);
        }

        const nestedMenus = menu.querySelectorAll('awtcustom-header-menu');
        nestedMenus.forEach((nestedMenu) => {
            rows.push(...extractMenuItems(nestedMenu, currentLabel));
        });

        return rows;
    };

    // Extract navigation items and build rows dynamically
    const rows = [];
    const navItems = element.querySelectorAll('awtcustom-header-nav-item, awtcustom-header-menu');

    navItems.forEach((navItem) => {
        rows.push(...extractMenuItems(navItem));
    });

    // Filter out duplicates before adding to cells
    const uniqueRows = rows.filter((row, index, self) => {
        return index === self.findIndex((r) => r[1]?.textContent === row[1]?.textContent && r[2]?.textContent === row[2]?.textContent);
    });

    // Combine header and rows into table data
    const cells = [
        headerRow,
        ...uniqueRows
    ];

    // Create the table using the helper function
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new structured table
    element.replaceWith(table);
}