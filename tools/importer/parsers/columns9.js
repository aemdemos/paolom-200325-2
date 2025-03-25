export default function parse(element, {document}) {
    // Extract the Diagnosis section content
    const diagnosisSection = element.querySelector('awt-article-section div[slot="paragraph"]');
    const diagnosisText = diagnosisSection ? diagnosisSection.textContent.trim() : 'No content available';

    // Extract the video thumbnail and link
    const videoContainer = element.querySelector('awt-wistia-video');
    const videoThumbnail = videoContainer ? videoContainer.querySelector('img[slot="thumbnail"]') : null;
    const videoThumbnailElement = videoThumbnail ? document.createElement('img') : null;
    if (videoThumbnailElement) {
        videoThumbnailElement.src = videoThumbnail.getAttribute('src');
        videoThumbnailElement.alt = 'Video Thumbnail';
    }

    // Create the header row to EXACTLY match the block type "Columns"
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Columns';

    // Create the content rows dynamically ensuring no elements are missing
    const contentRow1 = [
        diagnosisText,
        videoThumbnailElement || 'No video thumbnail available'
    ];

    // Create the table using WebImporter.DOMUtils.createTable
    const cells = [
        headerRow,
        contentRow1
    ];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}