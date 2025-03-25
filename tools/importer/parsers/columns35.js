export default function parse(element, {document}) {
    // Create header row for the table
    const headerRow = ['Columns'];

    // Extract content dynamically from the element
    const titleText = element.querySelector("[slot='textTitle']")?.innerText || '';
    const descriptionText = element.querySelector("[slot='textDescription']")?.innerHTML || '';
    const imageSrc = element.querySelector("img[slot='background-image']")?.getAttribute('src') || null;
    const registerButton = element.querySelector("awt-btn[slot='cta_buttons']") || null;

    // Create a multi-column structure for content
    const contentRow = [];

    // Left column: title, description, and button grouped together
    const leftCellContent = [];
    if (titleText) {
        const titleElement = document.createElement('p');
        titleElement.textContent = titleText;
        leftCellContent.push(titleElement);
    }

    if (descriptionText) {
        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = descriptionText;
        leftCellContent.push(descriptionElement);
    }

    if (registerButton && registerButton.getAttribute('href')) {
        const buttonElement = document.createElement('a');
        buttonElement.href = registerButton.getAttribute('href');
        buttonElement.textContent = registerButton.textContent.trim();
        leftCellContent.push(buttonElement);
    }

    contentRow.push(leftCellContent);

    // Right column: image (if available)
    if (imageSrc) {
        const imageElement = document.createElement('img');
        imageElement.src = imageSrc;
        contentRow.push([imageElement]);
    } else {
        contentRow.push([]); // Add empty cell if no image is present
    }

    // Combine header and content into a table
    const cells = [
        headerRow,
        contentRow
    ];

    // Create the block table using WebImporter.DOMUtils.createTable
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(block);
}