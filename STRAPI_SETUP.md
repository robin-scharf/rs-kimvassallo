# Strapi Setup Instructions

After running the backend, you need to add content to the new content types in the Strapi admin panel.

## New Content Types Created

### 1. Terms of Service (Single Type)

- Navigate to: Content Manager → Terms
- Fields:
  - **Title**: "Terms of Service"
  - **Content**: Add your terms of service text (supports rich text)
  - **Last Updated**: Select the date

### 2. Privacy Policy (Single Type)

- Navigate to: Content Manager → Privacy
- Fields:
  - **Title**: "Privacy Policy"
  - **Content**: Add your privacy policy text (supports rich text)
  - **Last Updated**: Select the date

### 3. Approach Items (Collection Type)

- Navigate to: Content Manager → Approach Items
- Create multiple entries (examples):
  1. Acceptance and Commitment (ACT) - order: 1
  2. Emotionally Focused - order: 2
  3. Supportive Therapy - order: 3
  4. Strength-Based - order: 4
  5. Interpersonal - order: 5
  6. Clinical Supervision and Licensed Supervisors - order: 6
  7. Eye Movement Desensitization & Reprocessing Therapy (EMDR) - order: 7

### 4. Insurance Providers (Collection Type)

- Navigate to: Content Manager → Insurance Providers
- Create multiple entries (examples):
  1. Highmark - order: 1
  2. Blue Cross Blue Shield of Western NY - order: 2
  3. Independent Health - order: 3
  4. Univera - order: 4
  5. Aetna - order: 5

### 5. Global Settings (Updated)

- Navigate to: Content Manager → Global
- New fields to fill:
  - **Footer Text**: "You have the right to receive a Good Faith Estimate of what your services may cost."
  - **Footer Disclaimer**: "THE CLIENT PORTAL IS NOT TO BE USED FOR EMERGENCY SITUATIONS. IF YOU OR OTHERS ARE IN IMMEDIATE DANGER OR EXPERIENCING A MEDICAL EMERGENCY, CALL 911 IMMEDIATELY."
  - **No Surprises Act Link**: URL to the No Surprises Act information page
  - **Therapy Fee**: "Individual therapy (50-55 min): $150"

## Set Public Permissions

Don't forget to set public access for the new content types:

1. Go to Settings → Users & Permissions Plugin → Roles → Public
2. Enable the following permissions:
   - **Terms**: find
   - **Privacy**: find
   - **Approach-item**: find
   - **Insurance-provider**: find
   - **Global**: find (update if not already enabled)

## Frontend Pages Created

- `/terms` - Terms of Service page
- `/privacy` - Privacy Policy page

Both pages pull content dynamically from Strapi and can be edited at any time.
