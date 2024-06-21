function setupRegionPicker(regionSelector) {
    const regionPickerElem = document.querySelector(regionSelector);
    if (!regionPickerElem) {
        console.error("Region picker element not found.");
        return;
    }

    let url;
    try {
        url = new URL(regionPickerElem.href);
    } catch (e) {
        console.error("Invalid URL for region picker.", e);
        return;
    }

    const regionPickerClass = 'feds-regionPicker';
    const regionPickerTextElem = document.createElement('span');
    regionPickerTextElem.className = 'feds-regionPicker-text';
    regionPickerTextElem.textContent = regionPickerElem.textContent;

    const regionPickerLink = document.createElement('a');
    regionPickerLink.href = regionPickerElem.href;
    regionPickerLink.className = regionPickerClass;
    regionPickerLink.setAttribute('aria-expanded', 'false');
    regionPickerLink.setAttribute('aria-haspopup', 'true');
    regionPickerLink.setAttribute('role', 'button');
    regionPickerLink.appendChild(regionPickerTextElem);

    // Depending on whether the URL has a hash, set up as modal or dropdown
    if (url.hash !== '') {
        // Setup modal
        decorateAutoBlock(regionPickerLink); // Stub: implement this to add modal-specific behaviors
        regionPickerLink.addEventListener('click', () => {
            regionPickerLink.setAttribute('aria-expanded', 'true');
        });
        window.addEventListener('milo:modal:closed', () => {
            regionPickerLink.setAttribute('aria-expanded', 'false');
        });
    } else {
        // Setup dropdown
        regionPickerLink.href = '#';
        decorateAutoBlock(regionPickerLink); // Stub: implement this to add dropdown-specific behaviors
        regionPickerLink.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = regionPickerLink.getAttribute('aria-expanded') === 'true';
            regionPickerLink.setAttribute('aria-expanded', !isExpanded);
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest(regionSelector) && regionPickerLink.getAttribute('aria-expanded') === 'true') {
                regionPickerLink.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Replace original element with new link
    regionPickerElem.replaceWith(regionPickerLink);
}

// Usage: setupRegionPicker('.region-selector a');
