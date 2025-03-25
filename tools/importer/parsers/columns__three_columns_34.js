export default function parse(element, {document}) {
    // Helper function to create an image element
    function createImage(src, alt) {
        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.setAttribute('alt', alt);
        return img;
    }

    // Extract cards from the container
    const cards = element.querySelectorAll('awt-category-card');

    // Prepare the header row
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Columns';

    // Prepare the content row
    const contentRow = Array.from(cards).map(card => {
        const title = card.querySelector('h4[slot="cardCategory"]')?.textContent || '';
        const description = card.querySelector('div[slot="cardDescription"]')?.innerHTML || '';
        const imageSrc = card.querySelector('img[slot="image-category"]')?.getAttribute('src') || '';
        const imageAlt = card.querySelector('img[slot="image-category"]')?.getAttribute('alt') || '';
        const href = card.getAttribute('href') || '';

        const columnHeader = document.createElement('h3');
        columnHeader.textContent = title;

        const columnDescription = document.createElement('p');
        columnDescription.innerHTML = description;

        const columnImage = createImage(imageSrc, imageAlt);

        const columnLink = document.createElement('a');
        columnLink.setAttribute('href', href);
        columnLink.append(columnImage);

        return [columnLink, columnHeader, columnDescription];
    });

    // Assemble the cells array
    const cells = [headerRow, contentRow];

    // Create the table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element
    element.replaceWith(blockTable);
}