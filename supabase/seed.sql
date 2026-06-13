insert into public.universities (name, slug, email_domain)
values
  ('早稲田大学', 'waseda', 'waseda.jp'),
  ('慶應義塾大学', 'keio', 'keio.jp'),
  ('東京大学', 'utokyo', 'u-tokyo.ac.jp'),
  ('明治大学', 'meiji', 'meiji.ac.jp'),
  ('青山学院大学', 'aoyama', 'aoyama.ac.jp'),
  ('立教大学', 'rikkyo', 'rikkyo.ac.jp'),
  ('法政大学', 'hosei', 'hosei.ac.jp'),
  ('中央大学', 'chuo', 'chuo-u.ac.jp')
on conflict (slug) do update
set name = excluded.name,
    email_domain = excluded.email_domain;

insert into public.class_reviews (
  university_id,
  class_name,
  professor_name,
  easy_score,
  attendance,
  assignment_load,
  exam_format,
  body
)
select id, 'マーケティング論 A', '佐藤教授', 4.3, 'たまに', '少なめ', '持ち込み可', '履修登録前に一番見られる授業レビュー用の初期データ。'
from public.universities where slug = 'waseda'
on conflict do nothing;

insert into public.class_reviews (
  university_id,
  class_name,
  professor_name,
  easy_score,
  attendance,
  assignment_load,
  exam_format,
  body
)
select id, '統計学入門', '山本教授', 2.8, '毎回', '普通', '計算多め', '質問が伸びやすい授業レビュー用の初期データ。'
from public.universities where slug = 'waseda'
on conflict do nothing;

insert into public.market_items (
  university_id,
  kind,
  title,
  body,
  value
)
select id, 'sell', '経済学入門の教科書、半額で売ります', '状態きれい。明日キャンパス受け渡し可。', '¥1,200'
from public.universities where slug = 'waseda'
on conflict do nothing;

insert into public.market_items (
  university_id,
  kind,
  title,
  body,
  value
)
select id, 'recruit', '新歓イベント運営メンバー募集', '企画、SNS、デザインできる人歓迎。', '3人'
from public.universities where slug = 'waseda'
on conflict do nothing;
