export default function parse(element, {document}) {
    const cells = [];

    // Block name row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Cards';
    cells.push([headerCell]);

    // Extract legal links section
    const legalLinks = element.querySelector('.awt-footer-legal-links');
    if (legalLinks) {
        const links = Array.from(legalLinks.querySelectorAll('a')).map(link => {
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.textContent = link.textContent;
            return anchor;
        });

        const cellContent = document.createElement('div');
        links.forEach(link => {
            cellContent.appendChild(link);
            cellContent.appendChild(document.createTextNode(' • '));
        });
        if (cellContent.lastChild && cellContent.lastChild.nodeType === 3) {
            cellContent.removeChild(cellContent.lastChild); // Remove trailing separator
        }
        cells.push([cellContent, '']);
    }

    // Extract inquiries section
    const inquiries = element.querySelector('.awt-footer-legal-inquiries');
    if (inquiries) {
        const inquiryContent = document.createElement('div');
        inquiries.childNodes.forEach(node => {
            if (node.nodeType === 3) {
                inquiryContent.appendChild(document.createTextNode(node.textContent.trim()));
            } else if (node.nodeName === 'A') {
                const anchor = document.createElement('a');
                anchor.href = node.href;
                anchor.textContent = node.textContent;
                inquiryContent.appendChild(anchor);
            }
        });
        cells.push([inquiryContent, '']);
    }

    // Extract copyright section
    const copyrightInfo = element.querySelector('.awt-footer-legal-copyright');
    if (copyrightInfo) {
        const copyrightContent = document.createElement('div');
        copyrightInfo.childNodes.forEach(node => {
            if (node.nodeType === 3 || node.nodeName === 'SUP') {
                copyrightContent.appendChild(node.cloneNode(true));
            }
        });
        cells.push([copyrightContent, '']);
    }

    // Extract logo section
    const logoImage = element.querySelector('.awt-footer-logo img');
    if (logoImage) {
        const img = document.createElement('img');
        img.src = logoImage.src;
        img.alt = logoImage.alt;
        const cellContent = document.createElement('div');
        cellContent.appendChild(img);
        cells.push([cellContent, '']);
    }

    // Create the table and replace the element
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}