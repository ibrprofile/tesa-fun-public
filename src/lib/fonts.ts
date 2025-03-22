
// Using web-safe fonts instead of next/font/google which isn't available in Vite
// We'll define CSS variables that can be used in the Tailwind config

export const fontFamilies = {
  inter: 'Inter, system-ui, sans-serif',
  roboto: 'Roboto, system-ui, sans-serif',
  montserrat: 'Montserrat, system-ui, sans-serif',
};

// We'll add these fonts to the index.html file

// Add this to the <head> of index.html
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Montserrat:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

// These variables will be used in the Tailwind config
export const fontVariables = {
  '--font-inter': fontFamilies.inter,
  '--font-roboto': fontFamilies.roboto,
  '--font-montserrat': fontFamilies.montserrat,
};

// Apply these variables to the :root element
document.documentElement.style.setProperty('--font-inter', fontFamilies.inter);
document.documentElement.style.setProperty('--font-roboto', fontFamilies.roboto);
document.documentElement.style.setProperty('--font-montserrat', fontFamilies.montserrat);
