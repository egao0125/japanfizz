# Naka Week 1-3 Execution

## Week 1: Product Foundation

Implemented locally:
- University email domain validation
- Persistent local app data for feed, comments, votes, reports, blocks, and beta invites
- Supabase schema in `supabase/schema.sql`
- Row-level security policies in `supabase/policies.sql`
- Seed data in `supabase/seed.sql`

Production setup:
1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Run `supabase/policies.sql`.
4. Run `supabase/seed.sql`.
5. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` to the app build environment.
6. Configure Supabase Auth magic links and restrict signups to approved university domains.

## Week 2: Safety And Operations

Implemented locally:
- Pre-post moderation checks
- Report flow with reasons and details
- Block user flow
- Admin queue for reports and moderation review
- Hide/restore/dismiss actions in the admin queue
- Terms, privacy, safety rules, support, and account deletion request surfaces

Production setup:
1. Deploy `supabase/functions/moderate-post`.
2. Send post/comment text through the moderation function before insert.
3. Store moderation decisions in `moderation_events`.
4. Require a human review path for `needs_review`.
5. Publish public URLs for privacy policy, terms, community guidelines, and support contact.

## Week 3: Closed Beta And TestFlight

Implemented locally:
- Beta waitlist and invite status screen
- Seeded campus content for first-session density
- iOS Capacitor project in `ios/App/App.xcodeproj`
- Web bundle in `www/`

TestFlight checklist:
1. Open `ios/App/App.xcodeproj`.
2. Set the Apple Developer Team.
3. Set a final bundle identifier.
4. Replace placeholder icon/splash assets.
5. Set build number and marketing version.
6. Test on a physical iPhone.
7. Archive in Xcode.
8. Upload to App Store Connect.
9. Add beta review notes explaining university-only auth, moderation, reporting, blocking, and support.
10. Invite 100-300 students from one university first.

Recommended first beta goal:
- 300 verified students
- 100 seeded useful posts/reviews/items
- Median moderation response under 24 hours
- D1 retention above 35%
- D7 retention above 15%
