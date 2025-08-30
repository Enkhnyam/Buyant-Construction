# How to Restore Testimonials

The testimonials section has been temporarily hidden. To restore it when you have real testimonial data:

## Quick Restore Steps:

### 1. Homepage Testimonials Section
**File:** `src/app/(main)/page.tsx`
**Line ~176:** Uncomment the testimonials section:
```tsx
{/* Testimonials - Temporarily hidden, uncomment to restore */}
<TestimonialsCarousel />
```

### 2. Admin Navigation
**File:** `src/app/admin/layout.tsx`  
**Line ~69:** Uncomment the testimonials navigation:
```tsx
{ name: getText('Сэтгэгдлүүд', 'Testimonials'), href: '/admin/testimonials', icon: Star }, // Temporarily hidden
```

### 3. Admin Dashboard Stats
**File:** `src/app/admin/page.tsx`
**Line ~123:** Change grid from `lg:grid-cols-4` to `lg:grid-cols-5`
**Line ~152:** Uncomment the testimonials stats card:
```tsx
{/* Testimonials stats card - Temporarily hidden, uncomment to restore */}
<div className="bg-white rounded-lg shadow p-6 border border-gray-200">
  {/* ... testimonials stats content ... */}
</div>
```

## What Still Works:
- All testimonial API endpoints (`/api/testimonials`, `/api/admin/testimonials`)
- Admin testimonials management page (`/admin/testimonials`) - still accessible via direct URL
- All testimonial components (`TestimonialsSection`, `TestimonialsCarousel`, `TestimonialImage`)
- Database schema and seed data

## What's Hidden:
- ✅ Homepage testimonials carousel 
- ✅ Admin navigation link to testimonials
- ✅ Dashboard testimonials statistics card

Just uncomment the marked sections when you're ready to show testimonials again!
