import { createExpression } from '../plugins/expressions/src/expressions.js';

// a sample expression, expands the text in the siteConfig, from the args
createExpression('expand', ({ args }) => window.siteConfig?.[args]);
