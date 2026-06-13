# Naka

Naka is a Japanese campus-local anonymous app for university students.

The product direction is closer to a campus-local anonymous feed: students can post short anonymous thoughts, questions, memes, class chatter, circle talk, and after-class updates that feel relevant to people nearby on the same campus.

## Current Direction

Naka does not include buying or selling. The app is focused on:

- Local anonymous campus posts
- Hot / new / question / nearby feeds
- Upvotes, comments, reports, and blocking
- Campus memes
- Class questions and casual advice
- Circle and event chatter
- After-class local updates
- University email gating
- Moderation before and after posting

## Local Development

```sh
npm install
npm run start
```

Open:

```txt
http://localhost:4173
```

Use a test university email:

```txt
student@waseda.jp
```

## iOS

The app is wrapped with Capacitor.

```sh
npm run sync:ios
npm run open:xcode
```

The Xcode project is:

```txt
ios/App/App.xcodeproj
```

## Validation

```sh
npm run check
npm run smoke
```

The smoke test covers:

- University email login
- Moderation warning
- Post creation
- Comment creation
- Report submission
- Admin queue visibility

## Backend Scaffold

Supabase files live in `supabase/`:

- `schema.sql`
- `policies.sql`
- `seed.sql`
- `functions/moderate-post/index.ts`

The current browser app uses local storage for beta testing. Production should connect the same flows to Supabase Auth, Postgres, RLS, and the moderation edge function.

## Launch Notes

See `docs/WEEK_1_TO_3_EXECUTION.md` for beta setup, TestFlight, and App Store readiness notes.
