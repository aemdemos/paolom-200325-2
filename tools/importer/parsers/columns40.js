export default function parse(element, {document}) {
    // Helper function to extract tooltip content
    function extractTooltipContent(el) {
        const tooltipSpan = el.querySelector('.awt-tooltip > span');
        return tooltipSpan ? tooltipSpan.textContent : "";
    }

    // Extract relevant data from the given element
    const paragraphs = Array.from(element.querySelectorAll('awt-article-section div[slot="paragraph"]'));

    const cells = [];

    // Create the header row
    const headerRow = ["Columns"];
    cells.push(headerRow);

    paragraphs.forEach((paragraph) => {
        const content = [];

        paragraph.childNodes.forEach((child) => {
            if (child.nodeType === 3) {
                // Text node
                content.push(child.textContent.trim());
            } else if (child.tagName === 'SPAN' && child.classList.contains('awt-tooltip')) {
                const tooltipText = extractTooltipContent(child);
                content.push(`${child.childNodes[0].textContent.trim()} (${tooltipText})`);
            } else if (child.tagName === 'SUP') {
                content.push(`(${child.textContent.trim()})`);
            }
        });

        cells.push([content.join(' ')]);
    });

    // Extract image data
    const images = Array.from(element.querySelectorAll('awt-image'));
    images.forEach((image) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.getAttribute('src');
        imgElement.alt = image.getAttribute('altimage') || "";

        const references = image.getAttribute('references');
        const referenceText = references ? `References: ${references}` : "";

        cells.push([imgElement, document.createTextNode(referenceText)]);
    });

    // Create the table block
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block
    element.replaceWith(block);
}