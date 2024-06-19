import DECORATE from '../../utils/blocks.js';

/**
 * Called when a user tries to load the plugin
 * @param {HTMLElement} container The container to render the plugin in
 * @param {Object} data The data contained in the plugin sheet
 * @param {string} searchTerm unused
 * @param {*} context
 */
export async function decorate(container, data, searchTerm, context) {
  await DECORATE(container, data, searchTerm, context);
}

export default {
  title: 'Templates',
  searchEnabled: false, // search handled internally
};
