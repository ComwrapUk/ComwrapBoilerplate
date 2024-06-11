/* eslint-disable no-unused-vars */
import { renderExpressions } from '../../../../../../../plusplus/plugins/expressions/src/expressions.js';

export default function decorate(block) {
  renderExpressions(document.querySelector('.text-wrapper'));
}
