ALTER TABLE "public"."articles_etapes__etapes_articles"
    ADD CONSTRAINT "articles_etapes__etapes_articles_article_id_fkey"
    FOREIGN KEY ("article_id")
    REFERENCES "public"."articles"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "public"."articles_etapes__etapes_articles"
    ADD CONSTRAINT "articles_etapes__etapes_articles_etape_id_fkey"
    FOREIGN KEY ("etape_id")
    REFERENCES "public"."etapes"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "public"."etapes_parcours__parcours_etapes"
    ADD CONSTRAINT "etapes_parcours__parcours_etapes_etape_id_fkey"
    FOREIGN KEY ("etape_id")
    REFERENCES "public"."etapes"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "public"."etapes_parcours__parcours_etapes"
    ADD CONSTRAINT "etapes_parcours__parcours_etapes_parcour_id_fkey"
    FOREIGN KEY ("parcour_id")
    REFERENCES "public"."parcours"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "public"."articles_thematiques__thematiques_articles"
    ADD CONSTRAINT "articles_thematiques__thematiques_articles_article_id_fkey"
    FOREIGN KEY ("article_id")
    REFERENCES "public"."articles"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "public"."articles_thematiques__thematiques_articles"
    ADD CONSTRAINT "articles_thematiques__thematiques_articles_thematique_id_fke"
    FOREIGN KEY ("thematique_id")
    REFERENCES "public"."thematiques"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "public"."upload_file_morph"
    ADD CONSTRAINT "upload_file_morph_upload_file_id_fkey"
    FOREIGN KEY ("upload_file_id")
    REFERENCES "public"."upload_file"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;
