INSERT INTO public.articles_thematiques__thematiques_articles (id, article_id, thematique_id) VALUES (1, 1, 2);
INSERT INTO public.articles_thematiques__thematiques_articles (id, article_id, thematique_id) VALUES (2, 2, 2);
INSERT INTO public.articles_thematiques__thematiques_articles (id, article_id, thematique_id) VALUES (3, 7, 1);
SELECT pg_catalog.setval('public.articles_thematiques__thematiques_articles_id_seq', 3, true);
