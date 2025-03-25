export default function parse(element, {document}) {
    const cards = element.querySelectorAll('awt-category-card');

    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Columns';

    const rows = Array.from(cards).map((card) => {
        const image = document.createElement('img');
        const imgElement = card.querySelector('img');
        if (imgElement) {
            image.src = imgElement.src;
            image.alt = imgElement.alt || '';
        }

        const title = document.createElement('h4');
        const titleElement = card.querySelector('.awt-category-card__title span');
        if (titleElement) {
            title.textContent = titleElement.textContent;
        }

        const description = document.createElement('p');
        const descriptionElement = card.querySelector('p');
        if (descriptionElement) {
            description.innerHTML = descriptionElement.innerHTML;
        }

        const link = document.createElement('a');
        const btnElement = card.querySelector('awt-btn');
        if (btnElement) {
            link.href = btnElement.getAttribute('href') || '#';
            link.textContent = 'Read more';
        }

        return [image, title, description, link];
    });

    const cells = [headerRow, ...rows];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(block);
}