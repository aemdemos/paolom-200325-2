export default function parse(element, {document}) {
    // Helper function to create content from an element
    function extractContent(el) {
        if (!el) return '';
        if (el.tagName === 'IMG') {
            const img = document.createElement('img');
            img.src = el.getAttribute('src');
            img.alt = el.getAttribute('altimage') || '';
            return img;
        }
        if (el.tagName === 'A') {
            const link = document.createElement('a');
            link.href = el.getAttribute('href');
            link.textContent = el.textContent;
            return link;
        }
        return el.textContent || '';
    }

    // Extracting relevant content
    const containers = element.querySelectorAll('awt-container');

    // Create the header row for the table
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    const contentRows = [];
    
    containers.forEach((container) => {
        const article = container.querySelector('awt-article');
        const image = container.querySelector('awt-image');

        const articleDiv = article ? article.querySelector('div') : null;

        const parsedArticle = articleDiv ? extractContent(articleDiv) : '';
        const parsedImage = image ? extractContent(image) : '';

        const row = [parsedArticle, parsedImage];
        contentRows.push(row);
    });

    // Construct table structure using WebImporter.DOMUtils
    const tableCells = [headerRow, ...contentRows];
    const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

    // Replace the original element with the new structured table
    element.replaceWith(blockTable);
}