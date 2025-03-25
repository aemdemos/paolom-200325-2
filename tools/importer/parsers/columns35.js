export default function parse(element, {document}) {
    // Import the utility for table creation
    const { createTable } = WebImporter.DOMUtils;

    // Extract hero section content
    const hero = element.querySelector('awt-hero');
    const backgroundImage = hero.querySelector('img[slot="background-image"]');
    const heroText = hero.querySelector('awt-hero-text');
    const title = heroText.querySelector('span[slot="textTitle"]');
    const description = heroText.querySelector('span[slot="textDescription"]');
    const ctaButton = hero.querySelector('awt-btn');

    // Extract modal content
    const modal = element.querySelector('awt-modal-hcp');
    const modalTitle = modal.getAttribute('modaltitle');
    const modalNotice = modal.getAttribute('notice');
    const modalLogo = modal.querySelector('img[slot="logo"]');
    const modalContentBlocks = Array.from(
        modal.querySelectorAll('awt-modal-hcp-block')
    );

    // Extract registration form content
    const form = element.querySelector('form');

    // Create the cells array for the table
    const cells = [];

    // Header row - block name
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Columns';
    cells.push(headerRow);

    // Hero section row
    const heroColumn = document.createElement('div');
    if (backgroundImage) {
        const image = document.createElement('img');
        image.src = backgroundImage.src;
        image.alt = backgroundImage.alt;
        heroColumn.appendChild(image);
    }
    if (title) {
        const titleElement = document.createElement('h1');
        titleElement.innerHTML = title.innerHTML;
        heroColumn.appendChild(titleElement);
    }
    if (description) {
        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = description.innerHTML;
        heroColumn.appendChild(descriptionElement);
    }
    if (ctaButton) {
        const button = document.createElement('a');
        button.href = ctaButton.getAttribute('href');
        button.textContent = ctaButton.textContent.trim();
        button.style.backgroundColor = ctaButton.getAttribute('backgroundcolor');
        button.style.color = ctaButton.getAttribute('textcolor');
        heroColumn.appendChild(button);
    }

    // Modal content row
    const modalColumn = document.createElement('div');
    if (modalTitle) {
        const titleElement = document.createElement('h2');
        titleElement.textContent = modalTitle;
        modalColumn.appendChild(titleElement);
    }
    if (modalNotice) {
        const noticeElement = document.createElement('p');
        noticeElement.innerHTML = modalNotice;
        modalColumn.appendChild(noticeElement);
    }
    if (modalLogo) {
        const logo = document.createElement('img');
        logo.src = modalLogo.src;
        logo.alt = modalLogo.alt;
        modalColumn.appendChild(logo);
    }
    modalContentBlocks.forEach((block) => {
        const blockText = block.getAttribute('text');
        const blockButton = block.querySelector('awt-btn');
        const blockElement = document.createElement('div');

        if (blockText) {
            const textElement = document.createElement('p');
            textElement.textContent = blockText;
            blockElement.appendChild(textElement);
        }
        if (blockButton) {
            const button = document.createElement('a');
            button.href = blockButton.getAttribute('href');
            button.textContent = blockButton.textContent.trim();
            blockElement.appendChild(button);
        }
        modalColumn.appendChild(blockElement);
    });

    // Form row
    const formColumn = document.createElement('div');
    if (form) {
        const formClone = form.cloneNode(true);
        formColumn.appendChild(formClone);
    }

    // Add rows to the cells array
    cells.push([heroColumn, modalColumn]);
    cells.push([formColumn]);

    // Create the block table
    const blockTable = createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}