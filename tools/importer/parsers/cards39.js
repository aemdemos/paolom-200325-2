export default function parse(element, {document}) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const cells = [[headerCell]]; // Header row

  // Helper function to create rows for items
  const createCardRow = (menuLabel, itemText, itemLink) => {
    const imagePlaceholder = document.createElement('img');
    imagePlaceholder.alt = menuLabel;
    imagePlaceholder.src = '/path/to/image'; // Placeholder image src

    const textContent = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = menuLabel;
    const description = document.createElement('p');
    description.textContent = itemText;

    const link = document.createElement('a');
    link.href = itemLink;
    link.textContent = 'Learn more';

    textContent.append(heading, description, link);

    return [imagePlaceholder, textContent];
  };

  // Process navigation items
  const navItems = Array.from(element.querySelectorAll('awtcustom-header-nav-item a'));
  navItems.forEach((item) => {
    cells.push(createCardRow('Navigation Item', item.textContent.trim(), item.href));
  });

  // Process menus and submenus
  const menuItems = Array.from(element.querySelectorAll('awtcustom-header-menu'));
  menuItems.forEach((menu) => {
    const menuLabel = menu.getAttribute('menu-label');
    const items = Array.from(menu.querySelectorAll('awtcustom-header-menu-item a'));

    items.forEach((item) => {
      cells.push(createCardRow(menuLabel, item.textContent.trim(), item.href));
    });
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}