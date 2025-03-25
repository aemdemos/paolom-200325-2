export default function parse(element, {document}) {
  const container = document.createElement('div');

  // Extract the image
  const imageElement = element.querySelector('awt-image');
  const imageSrc = imageElement.getAttribute('src');
  const image = document.createElement('img');
  image.setAttribute('src', imageSrc);

  // Extract the title
  const titleElement = element.querySelector('awt-article');
  const titleText = titleElement.getAttribute('standfirst');
  const title = document.createElement('h1');
  title.textContent = titleText;

  // Extract the subheading
  const subheadingElement = element.querySelector('awt-article-section div[slot="paragraph"]');
  const subheadingHtml = subheadingElement?.innerHTML || ''; // Handle missing subheading
  const subheading = document.createElement('p');
  subheading.innerHTML = subheadingHtml;

  // Extract the call-to-action
  const ctaElement = element.querySelector('awt-btn[slot="cta_buttons"]');
  const ctaText = ctaElement?.textContent?.trim() || ''; // Handle missing CTA text
  const ctaLink = ctaElement?.getAttribute('href') || ''; // Handle missing CTA link
  const cta = document.createElement('a');
  cta.textContent = ctaText;
  cta.setAttribute('href', ctaLink);

  // Create cells array for table
  const cells = [
    [
      (() => {
        const headerCell = document.createElement('strong');
        headerCell.textContent = 'Hero';
        return headerCell;
      })()
    ],
    [
      image,
      title,
      subheadingHtml ? subheading : null, // Add subheading only if it exists
      ctaText ? cta : null // Add CTA only if it exists
    ].filter(Boolean) // Remove null entries to ensure clean structure
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}