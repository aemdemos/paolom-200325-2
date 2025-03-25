export default function parse(element, {document}) {
    // Extract tab items and contents
    const tabs = Array.from(element.querySelectorAll('awt-tab-item'));
    const contents = Array.from(element.querySelectorAll('[slot="content"]'));

    // Create header row with block name
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Create rows for tab contents
    const contentRows = tabs.map((tab, index) => {
        const title = tab.querySelector('button')?.textContent;
        const contentSlot = contents[index];
        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = title;

        const contentElements = [];

        // Process images
        const image = contentSlot.querySelector('awt-image');
        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image.getAttribute('src');
            imgElement.alt = image.getAttribute('altimage') || '';
            contentElements.push(imgElement);
        }

        // Process articles and description
        const article = contentSlot.querySelector('awt-article-section > div[slot="paragraph"]');
        if (article) {
            const articleText = document.createElement('p');
            articleText.innerHTML = article.innerHTML;
            contentElements.push(articleText);
        }

        return [sectionTitle, contentElements];
    });

    // Merge rows into cells array
    const cells = [headerRow, ...contentRows];

    // Create table and replace element
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block); // Replace the original element with the new table
}