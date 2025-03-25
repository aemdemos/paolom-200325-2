export default function parse(element, {document}) {
  // Import the utility function for creating tables
  const { createTable } = WebImporter.DOMUtils;

  // Extract footer sections
  const footerSections = element.querySelectorAll('awt-footer-section');

  // Create the header row for the table
  const headerRow = [
    document.createElement('strong'),
  ];
  headerRow[0].textContent = 'Columns';

  // Prepare columns data for the footer sections
  const columns = Array.from(footerSections).map((section) => {
    const title = section.getAttribute('footertitle') || '';
    const links = Array.from(section.querySelectorAll('a')).map((link) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.target = link.target;
      anchor.innerHTML = link.innerHTML; // Preserve inner HTML for <sup> tags
      return anchor;
    });

    const columnContent = [
      document.createElement('h2'),
      ...links
    ];

    columnContent[0].textContent = title;
    return columnContent;
  });

  // Construct rows for the table
  const rows = [headerRow, columns];

  // Create the table using the utility function
  const table = createTable(rows, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}