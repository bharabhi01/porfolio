# PostHog Analytics Setup

This portfolio includes PostHog analytics integration for tracking user interactions and behavior.

## Setup Instructions

### 1. Create PostHog Account
1. Go to [PostHog.com](https://posthog.com) and create a free account
2. Create a new project for your portfolio
3. Copy your Project API Key from the project settings

### 2. Environment Variables
Create a `.env` file in your project root with the following variables:

```env
# PostHog Analytics Configuration
VITE_POSTHOG_KEY=phc_your_actual_api_key_here
VITE_POSTHOG_HOST=https://app.posthog.com

# Optional: Set to 'true' to enable PostHog in development mode
VITE_POSTHOG_DEBUG=false
```

### 3. Replace API Key
Update the `VITE_POSTHOG_KEY` in your `.env` file with your actual PostHog project API key.

## What Gets Tracked

### Page Views
- Initial page load
- Navigation between sections
- Time spent on different pages

### User Interactions
- **Social Links**: Which social media profiles are clicked
- **Navigation Cards**: Which project sections are visited
- **Music Player**: Play, pause, next track, volume changes
- **Medium Articles**: Which articles are clicked
- **Space Pictures**: When NASA space pictures are viewed

### User Behavior
- Session duration
- User flow through the portfolio
- Feature usage patterns
- Geographic location (anonymized)

## Privacy & Compliance

### Privacy Features Enabled
- **Respect Do Not Track**: Honors browser DNT settings
- **Development Mode**: Analytics disabled in development
- **Session Recording**: Can be disabled if needed
- **Anonymized Data**: No personally identifiable information collected

### GDPR Compliance
PostHog is GDPR compliant and provides:
- Data anonymization
- Right to deletion
- Data export capabilities
- EU data residency options

## Analytics Dashboard

After setup, you can view analytics in your PostHog dashboard:
- **Events**: Track all user interactions
- **Insights**: Create custom analytics views
- **Funnels**: Analyze user journey through portfolio
- **Retention**: See how often users return
- **Feature Flags**: A/B test different features

## Tracked Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| `$pageview` | Page visits | page_name, timestamp |
| `navigation` | Internal navigation | from_page, to_page |
| `social_link_click` | Social media clicks | platform, url |
| `project_view` | Project section views | project_type |
| `music_player_interaction` | Music player usage | action, track_title |
| `medium_article_click` | Article clicks | article_title, article_url |
| `space_picture_view` | NASA picture views | picture_title |

## Customization

You can modify tracking behavior in `src/lib/posthog.ts`:
- Add new custom events
- Modify existing event properties
- Configure privacy settings
- Set up feature flags

## Troubleshooting

### PostHog Not Loading
1. Check your API key is correct
2. Verify environment variables are set
3. Check browser console for errors
4. Ensure you're in production mode or have debug enabled

### Events Not Appearing
1. Check PostHog dashboard (events may take a few minutes)
2. Verify network requests in browser dev tools
3. Check if ad blockers are interfering
4. Ensure events are being triggered correctly

## Development vs Production

- **Development**: PostHog disabled by default (unless `VITE_POSTHOG_DEBUG=true`)
- **Production**: PostHog enabled automatically
- **Debug Mode**: Logs events to console in development

This setup provides comprehensive analytics while respecting user privacy and following best practices for web analytics. 