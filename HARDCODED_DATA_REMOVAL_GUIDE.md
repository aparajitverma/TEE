# Hardcoded Data Removal Guide

This document outlines all sections in `src/app/admin/website/page.tsx` that contain hardcoded data and need to be replaced with empty states or API calls.

## ✅ Already Completed
- **Leads List Table** (Line ~1065-1072) - Replaced with empty state

## 🔄 Sections to Update

### 1. Lead Statistics (Lines ~829-930)
**Current:** Hardcoded numbers (1,247 total leads, 87 new, etc.)
**Replace with:**
```tsx
<p className="text-3xl font-bold text-white">0</p>
<p className="text-xs text-gray-500 mt-2">Connect API to load data</p>
```

### 2. Leads by Source Chart (Lines ~931-1020)
**Current:** Hardcoded array with 5 sources
**Replace with:** Empty state message in the chart area

### 3. Media Library Grid (Lines ~1514-1690)
**Current:** Array of 10 hardcoded media files
**Replace with:**
```tsx
<div className="col-span-full flex flex-col items-center justify-center py-12">
  <Image className="w-16 h-16 text-gray-600 mb-3" />
  <p className="text-gray-400 text-sm">No media files</p>
  <p className="text-gray-500 text-xs mt-1">Upload files to get started</p>
</div>
```

### 4. Upload Progress Indicators (Lines ~1447-1510)
**Current:** 3 sample upload progress bars
**Action:** Remove this entire section or show "No uploads in progress"

### 5. Redirects List (Lines ~2635-2686)
**Current:** Array of 5 hardcoded redirects
**Replace with:** Empty state in the redirects list

### 6. Top Pages (Lines ~2891-2920)
**Current:** Array of 5 pages with stats
**Replace with:** Empty state message

### 7. Top Products (Lines ~2929-2963)
**Current:** Array of 5 products
**Replace with:** Empty state message

### 8. Geographic Data - Countries (Lines ~2983-3018)
**Current:** Array of 6 countries with visitor data
**Replace with:** "No geographic data available"

### 9. Conversion Funnel (Lines ~3067-3095)
**Current:** 5-stage funnel with hardcoded numbers
**Replace with:** Empty funnel or all zeros

### 10. Real-time Active Pages (Lines ~3132-3144)
**Current:** Array of 5 active pages
**Replace with:** "No active pages"

### 11. Real-time Traffic Sources (Lines ~3154-3168)
**Current:** Array of 5 sources with live counts
**Replace with:** All zeros or empty state

## Recommended Approach

### Option A: Keep Structure, Show Zeros
- Maintain all UI components
- Replace hardcoded numbers with `0`
- Add subtitle: "Connect to API to load data"

### Option B: Empty States
- Replace entire data arrays with empty state components
- Show icon + message + call-to-action

### Option C: Loading States
- Show skeleton loaders
- Indicate "Waiting for API connection"

## Implementation Priority

1. **High Priority** (User-facing data):
   - Leads List ✅ Done
   - Media Library
   - Analytics sections

2. **Medium Priority** (Configuration):
   - Redirects
   - Form Settings (keep as is - these are settings, not data)

3. **Low Priority** (Can keep for demo):
   - SEO Audit results
   - Meta tags (these are editable settings)
   - Robots.txt (editable content)

## Next Steps

1. Review this guide
2. Decide on approach (A, B, or C)
3. I'll implement the changes section by section
4. Test each section after changes

## Notes

- **Form Settings, Meta Tags, SEO Settings** should probably stay as they are editable configurations, not data
- **Blog post editor** is a form, keep as is
- **Statistics cards** can show 0 with "No data" subtitle
- **Charts** should show empty state with helpful message
