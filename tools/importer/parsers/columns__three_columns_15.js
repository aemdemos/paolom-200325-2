export default function parse(element, {document}) {
    const cards = element.querySelectorAll('awt-category-card');

    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const cells = [[headerCell]];

    const row = Array.from(cards).map(card => {
        const imgEl = card.querySelector('img');
        const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
        const img = document.createElement('img');
        if (imgSrc) {
            img.src = imgSrc;
        }

        const titleEl = card.querySelector('h4');
        const title = titleEl ? titleEl.textContent.trim() : 'Untitled';
        const heading = document.createElement('h2');
        heading.textContent = title;

        const descriptionEl = card.querySelector('p');
        const description = descriptionEl ? descriptionEl.textContent.trim() : 'No description available.';
        const paragraph = document.createElement('p');
        paragraph.textContent = description;

        const linkEl = card.querySelector('awt-btn');
        const linkHref = linkEl ? linkEl.getAttribute('href').trim() : '#';
        const linkText = linkEl ? linkEl.textContent.trim() : 'Read more';
        const anchor = document.createElement('a');
        anchor.href = linkHref;
        anchor.textContent = linkText;

        return [img, heading, paragraph, anchor];
    });

    cells.push(row);

    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
}