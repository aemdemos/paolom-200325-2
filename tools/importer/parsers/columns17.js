export default function parse(element, {document}) {
    const cells = [];

    // Header row
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Columns';
    cells.push(headerRow);

    // Extract image and description
    const previewImage = element.querySelector('.awt-accordion-card__preview-image img');
    const previewDescription = element.querySelector('.awt-accordion-card__preview-description');

    // Image cell
    const imageCell = previewImage ? document.createElement('img') : '';
    if (imageCell) {
        imageCell.src = previewImage.src;
    }

    // Description cell
    const descriptionCell = document.createElement('div');
    if (previewDescription) {
        descriptionCell.innerHTML = previewDescription.innerHTML;
    } else {
        descriptionCell.textContent = '';
    }

    cells.push([imageCell, descriptionCell]);

    // Extract history content
    const historyContent = element.querySelectorAll('.awt-accordion-card__history p');
    const historyTexts = Array.from(historyContent).map((p) => {
        const text = document.createElement('div');
        text.innerHTML = p.innerHTML;
        return text;
    });
    if (historyTexts.length > 0) {
        cells.push([historyTexts]);
    } else {
        cells.push(['']); // Handle empty history case
    }

    // Create the table block
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(block);
}