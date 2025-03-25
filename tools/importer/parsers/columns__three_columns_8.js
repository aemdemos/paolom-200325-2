export default function parse(element, {document}) {
    const sections = element.querySelectorAll('awt-footer-section');
    const footerBlocks = [];

    // Extract content from each footer section
    sections.forEach(section => {
        const title = section.getAttribute('footertitle');
        const links = Array.from(section.querySelectorAll('a')).map(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.target = link.target;
            linkElement.innerHTML = link.innerHTML;
            return linkElement;
        });

        const titleElement = document.createElement('strong');
        titleElement.textContent = title;

        footerBlocks.push([titleElement, links]);
    });

    // Create the table block
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];
    const cells = [headerRow, ...footerBlocks];
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new table block
    element.replaceWith(block);

    return block;
}