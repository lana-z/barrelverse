# Barrel + Verse Design Guidelines

## Design Approach: Reference-Based (Hospitality & Lifestyle)

Drawing inspiration from premium hospitality experiences (Airbnb, boutique hotel sites, Kinfolk aesthetic), this design prioritizes storytelling, emotional connection, and intimate scale. The site should feel like a curated journal entry, not a corporate brochure.

**Core Principles:**
- Generous whitespace that invites contemplation
- Typography-led hierarchy with poetic rhythm
- Organic flow between sections
- Intimate, personal photography over stock imagery

## Typography System

**Primary Font (Headings):** Serif with character - Playfair Display, Crimson Pro, or Lora
- Hero headline: text-5xl to text-7xl, font-light or font-normal, leading-tight
- Section headings: text-3xl to text-4xl, font-normal
- Card titles: text-xl to text-2xl, font-medium

**Secondary Font (Body):** Clean serif - Crimson Text, or elegant sans like Inter for contrast
- Body text: text-base to text-lg, leading-relaxed (enhanced readability)
- Captions/labels: text-sm, tracking-wide, uppercase for emphasis

**Typographic Details:**
- Use italic variants for quotes and poetic passages
- Letter-spacing on small caps for section labels
- Line height of 1.7-1.8 for body text (enhanced reading comfort)

## Layout System

**Spacing Scale:** Tailwind units of 4, 8, 12, 16, 20, 24, 32
- Section padding: py-20 to py-32 on desktop, py-12 to py-16 on mobile
- Component spacing: mb-8, mb-12, mb-16 for vertical rhythm
- Content gaps: gap-8, gap-12, gap-16

**Grid Strategy:**
- Single column prose for storytelling sections (max-w-3xl centered)
- Two-column for Courses (cards side-by-side on desktop)
- Masonry-style or staggered grid for Experiences showcase
- Avoid three-column layouts - keep intimate and focused

**Container Widths:**
- Full-width hero and imagery sections
- Text content: max-w-4xl for readability
- Navigation: max-w-7xl

## Component Library

### Navigation
Top navigation bar with transparent background on hero, transitions to solid on scroll. Logo left, links right (Home, About, Courses, Experiences, Contact). Mobile: hamburger menu with full-screen overlay.

### Hero Section
Full-viewport height with large atmospheric wine/vineyard image (slightly darkened overlay). Centered poetic text overlay with large serif typography. Subtle scroll indicator at bottom. No CTA buttons - let the poetry breathe.

### Content Sections

**About Section:**
Split layout - photo of founder on one side (rounded corners, shadow), bio text on the other. Quote callout in italic serif, larger than body text. Personal, conversational tone maintained through design.

**Courses Section:**
Card-based layout with subtle borders or shadows. Each card includes: icon or small image, course title, short description, "Learn More" link. Stacked on mobile, 2-across on desktop (grid-cols-1 md:grid-cols-2).

**Experiences Section:**
Feature card with full-width image, overlaid title and description. "Feel Rioja" as hero experience. Additional experiences in smaller cards below. Include date/location metadata in small caps.

**Contact Section:**
Two-column: form on left (name, email, message fields with clean, minimal styling), supporting text/info on right. Form inputs with subtle borders, generous padding. Submit button with muted burgundy accent.

### Footer
Multi-column with newsletter signup, social links, quick navigation. Include copyright and subtle brand statement. py-16 minimum padding.

## Images

**Hero Image:**
Large, atmospheric vineyard or wine cellar scene. Warm lighting, slightly desaturated. Dimensions: 1920x1080 minimum. Should evoke contemplation and place.

**About Section:**
Authentic founder portrait - candid, warm, in natural setting (vineyard, wine cellar, or table setting). Square or 3:4 ratio, approximately 500x600px.

**Experiences Cards:**
Lifestyle photography of wine events - glasses, food pairings, intimate table settings. Warm tones, natural lighting. Each approximately 800x500px.

**Courses Section:**
Optional small icons or abstract wine-related imagery. Can use simple line illustrations instead of photos.

**Background Treatments:**
Consider subtle texture overlays (linen, paper) in cream sections for tactile warmth.

## Interaction Details

Minimal, purposeful animations:
- Smooth scroll behavior between sections
- Fade-in on scroll for cards (subtle, once)
- Navigation background transition on scroll
- Hover states: subtle lift on cards (transform: translateY(-4px)), underline on text links

Avoid: Parallax, complex scroll animations, auto-playing content

## Mobile Considerations

- All multi-column layouts stack to single column
- Hero text scales down (text-4xl on mobile)
- Navigation collapses to hamburger menu
- Touch-friendly button sizes (min-height: 48px)
- Maintain generous spacing even on small screens (py-12 minimum)

**Critical:** Buttons overlaid on hero image must have frosted glass/blurred backgrounds for legibility across varying image brightness.