export default function parse(element, {document}) {
    // Helper function to extract text content from child nodes
    const extractText = (el) => {
        if (!el) return '';
        return el.textContent.trim();
    };

    // Extract the tabs and associated content
    const tabs = Array.from(element.querySelectorAll('awt-tab-item button'));
    const contents = Array.from(element.querySelectorAll('[slot="content"]'));

    // Build the cell structure for the table
    const cells = [];

    // Header row defining the block type
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];
    cells.push(headerRow);

    // Rows with tab content
    const contentRows = tabs.map((tab, index) => {
        const title = document.createElement('h2');
        title.textContent = extractText(tab);

        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = contents[index] ? contents[index].innerHTML : '';

        return [title, contentDiv];
    });

    cells.push(...contentRows);

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the input element with the new structured block table
    element.replaceWith(blockTable);
}