
export const typography = {
  fontSize: {
    // Mobile-first font sizes (smaller)
    'body-large': ['1rem', '1.5rem'],        // 16px for mobile
    'heading-large': ['2rem', '1.2'],        // 32px for mobile (reduced from 40px)
    'heading-medium': ['1.75rem', '1.2'],    // 28px for mobile (reduced from 32px)
    'subheading': ['1.125rem', '1.5'],      // 18px for mobile
    
    // Desktop font sizes (lg breakpoint - 1024px)
    'lg:body-large': ['1.125rem', '1.75rem'],   // 18px for desktop
    'lg:heading-large': ['4rem', '1.4'],        // 64px for desktop (increased from 56px)
    'lg:heading-medium': ['2.5rem', '1.4'],     // 40px for desktop
    'lg:subheading': ['1.25rem', '1.6'],        // 20px for desktop
  },
};
