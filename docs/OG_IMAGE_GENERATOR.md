# OG Image Generator

## Overview
AI-powered Open Graph image generation system for all platform routes. Generates professional, branded images at 1200x630px using Lovable AI.

## Features
- ✅ 15 pre-configured routes with optimized prompts
- ✅ Consistent purple-blue gradient branding
- ✅ Perfect 1200x630px dimensions (16:9 aspect ratio)
- ✅ Batch generation with progress tracking
- ✅ Individual and bulk download options
- ✅ Error handling and retry logic
- ✅ Rate limit management

## Routes Covered
1. **Home** (`/`) - Enterprise AI Platform
2. **Pricing** (`/pricing`) - Plans & Pricing
3. **Features** (`/features`) - 27 AI Features
4. **Grok Chat** (`/grok-chat`) - xAI Conversation
5. **Documentation** (`/documentation`) - API Docs
6. **Learn** (`/learn`) - Courses & Resources
7. **Community** (`/community`) - Developer Community
8. **Enterprise** (`/enterprise`) - Enterprise Solutions
9. **API Access** (`/api-access`) - API Integration
10. **Tutorials** (`/tutorials`) - Step-by-Step Guides
11. **Mission** (`/mission`) - Our Mission
12. **Team** (`/team`) - Our Team
13. **Partners** (`/partners`) - Partner Program
14. **Analytics** (`/usage-analytics`) - Usage Analytics
15. **Memory** (`/memory`) - Multi-Modal Memory

## How to Use

### 1. Access the Generator
Navigate to: `https://3bi.ai/og-generator`

### 2. Generate Images
Click "Generate All Images" to start batch generation:
- Each image takes ~5-10 seconds
- Total time: ~2 minutes for all 15 images
- Progress bar shows real-time status
- Images generate sequentially to avoid rate limits

### 3. Download Images
**Option A: Bulk Download**
- Click "Download All" to download all successful images

**Option B: Individual Download**
- Click the download icon on each image card

### 4. Save to Project
Manually save downloaded images to:
```
public/og/[filename].png
```

Example:
- `home.png` → `public/og/home.png`
- `pricing.png` → `public/og/pricing.png`
- etc.

## Technical Details

### Architecture
```
User Browser
    ↓
OGImageGenerator Component
    ↓
Edge Function (generate-og-image)
    ↓
Lovable AI Gateway
    ↓
Google Gemini 2.5 Flash Image
```

### Files
- **Generator Page**: `src/pages/OGImageGenerator.tsx`
- **Edge Function**: `supabase/functions/generate-og-image/index.ts`
- **Prompts Config**: `src/config/og-image-prompts.ts`

### Prompt Structure
Each image uses a base template with:
- Main text (large, bold heading)
- Subtitle (supporting text)
- Visual elements (icons, graphics, patterns)
- Background (purple-blue gradient)
- Style notes (professional, modern, premium)

### Customization

#### Add New Routes
Edit `src/config/og-image-prompts.ts`:

```typescript
{
  route: '/new-route',
  filename: 'new-route.png',
  title: 'New Route Title',
  prompt: `${basePrompt}
  
Main text: "Your Main Heading"
Subtitle: "Your Subtitle"
Visual elements: [describe icons, patterns, etc.]
Background: [describe gradient/style]
Add: [additional elements]
Style: [design style keywords]`,
  priority: 16,
}
```

#### Modify Branding
Update `basePrompt` in `og-image-prompts.ts`:
- Change colors: `#7C3AED` (purple), `#3B82F6` (blue)
- Adjust dimensions: Default 1200x630px
- Style keywords: modern, professional, gradient, etc.

## Rate Limits
- **Per Request**: ~5-10 seconds
- **Cooldown**: 2 seconds between requests (built-in)
- **Workspace Limit**: Based on Lovable AI credits
- **429 Error**: Automatically displayed, retry manually

## Error Handling
- ✅ Network errors: Displayed with retry option
- ✅ Rate limits (429): Clear message shown
- ✅ Payment required (402): Credit warning
- ✅ Generation failures: Error state per image
- ✅ Partial successes: Download available images

## Best Practices
1. **Generate during off-peak hours** to avoid rate limits
2. **Review each image** before publishing
3. **Keep backups** of generated images
4. **Test on social platforms** (Twitter, LinkedIn, Facebook)
5. **Regenerate individually** if quality isn't perfect

## Validation Checklist
Before deploying generated images:
- [ ] Dimensions are exactly 1200x630px
- [ ] Text is readable at thumbnail size
- [ ] Colors match brand guidelines
- [ ] No cut-off text or elements
- [ ] File size <500KB (ideal for loading speed)
- [ ] Looks good on light and dark backgrounds

## Troubleshooting

### Images not generating?
- Check Lovable AI credits in workspace settings
- Verify LOVABLE_API_KEY is configured
- Check browser console for errors

### Rate limit errors?
- Wait 5 minutes between batches
- Reduce batch size (generate 5 at a time)
- Contact support@lovable.dev for limit increase

### Poor image quality?
- Edit prompt in `og-image-prompts.ts`
- Add more specific visual details
- Try different style keywords
- Regenerate individual images

## Credits & Pricing
- Uses Lovable AI credits per image
- ~1-2 credits per image
- Total: ~15-30 credits for full set
- Check workspace usage: Settings → Workspace → Usage

## Next Steps
After generation:
1. Download all images
2. Save to `public/og/` directory
3. Verify SEO component references match
4. Test social sharing with validator tools
5. Deploy to production

## Support
Questions? Contact: support@lovable.dev
Docs: https://docs.lovable.dev/features/ai
