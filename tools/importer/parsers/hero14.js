export default function parse(element, {document}) {
    // Ensure the element exists before proceeding
    if (!element) {
        console.error('Provided element is null or undefined.');
        return;
    }

    // Safely access the background image
    const backgroundImage = element.querySelector('img[slot="background"]');
    const article = element.querySelector('awt-article');
    const standfirst = article ? article.getAttribute('standfirst') : null;
    const ctaButton = article ? article.querySelector('awt-btn') : null;

    const cells = [];

    // Add the block type header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Hero';
    const headerRow = [headerCell];
    cells.push(headerRow);

    // Construct the content row
    const contentRow = [];

    if (backgroundImage) {
        const imgElement = document.createElement('img');
        imgElement.src = backgroundImage.src;
        imgElement.alt = backgroundImage.alt;
        contentRow.push(imgElement);
    }

    if (standfirst) {
        const divElement = document.createElement('div');
        divElement.innerHTML = standfirst;
        contentRow.push(divElement);
    }

    if (ctaButton && ctaButton.textContent.trim()) {
        const buttonElement = document.createElement('a');
        buttonElement.href = ctaButton.getAttribute('href');
        buttonElement.textContent = ctaButton.textContent.trim();
        contentRow.push(buttonElement);
    }

    // Only add the content row if it contains content
    if (contentRow.length > 0) {
        cells.push(contentRow);
    }

    // Create the table block
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}