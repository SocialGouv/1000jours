ALTER TABLE "public"."etapes_evenements__evenements_etapes"
    ADD CONSTRAINT "etapes_evenements__evenements_etapes_etape_id_fkey"
    FOREIGN KEY ("etape_id")
    REFERENCES "public"."etapes"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "public"."etapes_evenements__evenements_etapes"
    ADD CONSTRAINT "etapes_evenements__evenements_etapes_evenement_id_fkey"
    FOREIGN KEY ("evenement_id")
    REFERENCES "public"."evenements"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;
