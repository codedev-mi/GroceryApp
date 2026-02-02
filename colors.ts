/**
 * Brand Color Theme for Delivery App
 * 
 * Implements the application's brand color system based on #FFD41D (Bright Yellow):
 * - Yellow family for brand marks and CTAs
 * - Neutral whites and grays for surfaces and text
 * - Complementary accents for secondary UI
 * - Semantic colors for status and feedback
 * 
 * All colors are defined here and should be used throughout the application
 * for consistency, accessibility, and visual hierarchy.
 */

export const colors = {
  // Brand Colors - Primary Yellow Family
  // Base color: #FFD41D - All variations derived from this yellow
  brand: {
    900: '#D4AF14',   // Dark yellow (deep emphasis, dark mode)
    800: '#E6C200',   // Darker yellow
    700: '#FFD41D',   // Primary brand yellow (CTAs, main brand identity)
    600: '#FFE54C',   // Slightly lighter yellow
    500: '#FFF1A8',   // Light yellow (accents, badges, hover states)
    300: '#FFFAEB',   // Very light yellow (subtle backgrounds)
  },

  // Neutral Colors - Surfaces and Typography
  neutral: {
    bg: '#FFFFFF',         // Main content background (high contrast)
    surface: '#FAFAF9',    // Secondary surfaces (subtle contrast)
    text: '#1F2937',       // Primary text (dark gray - main content)
    textSecondary: '#6B7280', // Secondary text (medium gray)
    muted: '#9CA3AF',      // Muted text (low emphasis)
    border: '#E5E7EB',     // Border and divider color
    disabled: '#D1D5DB',   // Disabled state
  },

  // Complementary Accent Colors
  // Used for secondary UI and visual variety while keeping yellow as primary
  accent: {
    darkNavy: '#1E293B',    // Dark navy for contrast
    softGray: '#F3F4F6',    // Soft gray for subtle backgrounds
    warmGold: '#F59E0B',    // Warm gold for secondary accents
  },

  // Semantic Colors - Status & Feedback
  // Using yellow as primary with conventional semantic colors
  semantic: {
    success: '#10B981',    // Green for success / delivered
    error: '#EF4444',      // Red for errors / cancellations
    warning: '#FFD41D',    // Yellow for warnings / important notices
    info: '#FFD41D',       // Yellow for info / badges
  },

  // Legacy Structured Colors - Maintained for component compatibility
  // These are aliases to the new brand system for gradual migration
  primary: {
    liquidLava: '#FFD41D', // Mapped to brand.700 (yellow)
    white: '#FFFFFF',      // Mapped to neutral.bg
  },

  secondary: {
    lightGrey: '#FAFAF9',     // Mapped to neutral.surface
    mediumGrey: '#E5E7EB',    // Mapped to neutral.border
    dustyGrey: '#9CA3AF',     // Mapped to neutral.muted
    darkGrey: '#1F2937',      // Mapped to neutral.text
    snow: '#FFFFFF',          // Mapped to neutral.bg
  },

  background: {
    primary: '#FFFFFF',       // Main white background
    secondary: '#FFFAEB',     // Light yellow background
    tertiary: '#FFF1A8',      // Lighter yellow background
  },

  text: {
    primary: '#1F2937',       // Dark text (main content)
    secondary: '#6B7280',     // Grey text (secondary)
    muted: '#9CA3AF',         // Muted grey text
    light: '#FFFFFF',         // White text (on dark backgrounds)
  },

  status: {
    delivered: '#10B981',     // Green for delivered
    pending: '#FFD41D',       // Yellow for pending
    processing: '#FFD41D',    // Yellow for processing
    error: '#EF4444',         // Red for errors
  },

  ui: {
    accent: '#FFD41D',        // Primary CTA accent (brand.700) - YELLOW
    accentLight: '#FFF1A8',   // Light accent (brand.500)
    accentDark: '#D4AF14',    // Dark accent (brand.900)
    border: '#E5E7EB',        // Light border color
    disabled: '#D1D5DB',      // Disabled state
  },

  // Gradient Colors (for LinearGradient)
  // All gradients based around #FFD41D yellow
  gradients: {
    yellowBrand: ['#FFD41D', '#FFE54C'] as const,      // Yellow gradient
    yellowFade: ['#FFD41D', 'transparent'] as const,   // Yellow to transparent
    yellowPrimary: ['#FFD41D', '#FFFAEB'] as const,    // Yellow to very light yellow
    yellowDark: ['#D4AF14', '#FFD41D'] as const,       // Dark yellow to bright yellow
  },
};

export default colors;
