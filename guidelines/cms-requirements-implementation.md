# MyCyberClinics CMS Implementation Plan

## Scope
Marketing-managed CMS for public content and SEO, with restricted admin access and no developer dependency for routine updates.

## Phase 1 (Implemented)
- `/admin` route scaffolded and hidden from public navigation.
- Admin page set to `noindex, nofollow` via robots meta tag.
- Firebase email/password authentication wired for admin access.
- Role gate added using Firebase custom claims:
  - `role = admin`
  - `role = editor`
- Initial dashboard modules aligned to requirements:
  - General Site Settings
  - SEO Controls
  - Blog Management
  - Featured Doctors
  - Legal/Policy Pages
  - Contact/Forms/Leads
  - Media Library
  - Analytics/Search Console

## Phase 2 (Implemented)
- Firestore schema + CRUD UI for:
  - Blogs
  - Featured Doctors
  - Static policy pages
  - Site settings and navigation/contact fields
- SEO fieldset component (title, description, slug, canonical, robots, schema JSON-LD, sitemap toggle).
- Media manager (upload/search/alt text/file naming).
- Form settings (destination email, redirect, anti-spam).

## Phase 3 (Compliance & Governance)
- Audit logging (who changed what/when) with immutable change history.
- Workflow states: Draft, Review, Publish, Schedule.
- Revision history and rollback.
- Fine-grained RBAC and permission matrix.

## Firebase Role Setup
Use Admin SDK (Cloud Function or secure script) to set claims:

```ts
await admin.auth().setCustomUserClaims(uid, { role: "admin" });
// or
await admin.auth().setCustomUserClaims(uid, { role: "editor" });
```

Users must sign out/in again after claims are applied.
