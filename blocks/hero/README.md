# Hero Core Block Documentation

## Overview

The `decorate` function is designed to enhance the visual representation and interactivity of a hero section on a webpage. It applies specific styles, restructures HTML elements, and incorporates animations to create an engaging user experience.

## Functionality

### Main Features

1. **Iterate Over Block Children**
   - Adds the class `hero-item` to each child element within the block.

2. **Replace `picture` with `div`**
   - If a `picture` element is found, its parent is replaced with a `div` element containing the same content and the class `hero-image`.

3. **Transform Paragraphs to Titles**
   - Converts the first paragraph into an `h1` element with the class `hero-title`.
   - Adds the class `hero-subtitle` to the second paragraph.

4. **Add Classes to List Elements**
   - Adds the class `service-list` to `ul` elements.
   - Adds the class `service-item` to each `li` element and assigns unique classes based on their index.

5. **Hero Page Specific Code**
   - Targets elements specific to the hero page, transforming `p` elements into styled elements such as `span` and `h1` with appropriate classes.

6. **Typing Animation for Hero Title**
   - Implements a typing animation for the hero title on larger screens.
   - Splits the hero title into the first word and the rest, creating a typing and deleting effect that cycles through predefined words.

## How to Use

1. **Include the JavaScript File**
   - Ensure the JavaScript file containing the `decorate` function is included in your project.

2. **Call the Function**
   - Call the `decorate` function and pass the block element you want to enhance.

3. **Customize as Needed**
   - Modify the classes and elements targeted within the function to fit the specific requirements of your project.

## Conclusion

The `decorate` function is a powerful tool for enhancing the visual appeal and interactivity of a hero section on a webpage. By following the instructions and utilizing the main features, you can create a dynamic and engaging user experience.

