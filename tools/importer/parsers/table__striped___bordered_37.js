export default function parse(element, {document}) {
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Table (striped & bordered)';

    const flagImage = element.querySelector('.map-link-sections-row-flag img');
    const countryName = element.querySelector('.map-link-sections-row-country-name');
    const languageLink = element.querySelector('.map-link-sections-row-country-language a');

    const flagCell = document.createElement('img');
    flagCell.src = flagImage ? flagImage.src : '';
    flagCell.alt = flagImage ? flagImage.alt : '';

    const countryCell = document.createElement('p');
    countryCell.textContent = countryName ? countryName.textContent.trim() : '';

    const languageCell = document.createElement('a');
    languageCell.href = languageLink ? languageLink.href : '#';
    languageCell.textContent = languageLink ? languageLink.textContent.trim() : '';

    const cells = [
        headerRow,
        [flagCell, countryCell, languageCell]
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(blockTable);
}