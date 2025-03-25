export default function parse(element, {document}) {
  // Importing WebImporter.DOMUtils
  const { createTable } = WebImporter.DOMUtils;

  // Extract information from the input element
  const notificationSpan = element.querySelector('span');
  const notificationText = notificationSpan ? notificationSpan.textContent.trim() : 'No notification text'; // Handle missing text gracefully

  const linkElement = element.querySelector('a');
  const linkText = linkElement ? linkElement.textContent.trim() : 'No link text'; // Handle missing link gracefully
  const linkHref = linkElement ? linkElement.getAttribute('href') : '#'; // Default href if not provided

  // Create structured content for the table rows
  const cells = [
    // Header row indicating the block type
    [(() => { const strong = document.createElement('strong'); strong.textContent = 'Tabs'; return strong; })()],
    // Data rows
    ['Notification', notificationText],
    ['Link', (() => { 
        const a = document.createElement('a');
        a.href = linkHref;
        a.textContent = linkText;
        return a;
      })()]
  ];

  // Create the block table
  const table = createTable(cells, document);

  // Replace the original element with the structured block table
  element.replaceWith(table);
}