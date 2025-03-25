export default function parse(element, {document}) {
  // Initialize cells array
  const cells = [];

  // Add header row
  const headerRow = ['Cards'];
  cells.push(headerRow);

  // Helper function to create a well-structured row for the table
  const createCardRow = (imageSrc, heading, description, links) => {
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc || '';

    const textContainer = document.createElement('div');

    if (heading) {
      const headingElement = document.createElement('p');
      headingElement.textContent = heading;
      textContainer.appendChild(headingElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      textContainer.appendChild(descriptionElement);
    }

    if (links && links.length > 0) {
      links.forEach((link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent;
        textContainer.appendChild(linkElement);
      });
    }

    return [imageElement, textContainer];
  };

  // Extract and iterate through sections
  const logo = element.querySelector('.awt-footer-logo img');
  const logoRow = createCardRow(
    logo ? logo.src : '', 
    'Logo', 
    'Alexion Pharmaceuticals Logo', 
    null
  );
  cells.push(logoRow);

  const legalLinks = element.querySelector('.awt-footer-legal-links');
  if (legalLinks) {
    const links = Array.from(legalLinks.querySelectorAll('a'));
    const legalRow = createCardRow(
      null, 
      'Legal Links', 
      'Links related to legal statements and privacy information.', 
      links
    );
    cells.push(legalRow);
  }

  const inquiries = element.querySelector('.awt-footer-legal-inquiries');
  if (inquiries) {
    const inquiriesLinks = inquiries.querySelectorAll('a');
    const inquiriesRow = createCardRow(
      null, 
      'Inquiries', 
      inquiries.textContent.trim(), 
      Array.from(inquiriesLinks)
    );
    cells.push(inquiriesRow);
  }

  const copyright = element.querySelector('.awt-footer-legal-copyright');
  if (copyright) {
    const description = copyright.innerHTML
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<[^>]*>/g, '')
      .trim();
    const copyrightRow = createCardRow(
      null, 
      'Copyright', 
      description, 
      null
    );
    cells.push(copyrightRow);
  }

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}