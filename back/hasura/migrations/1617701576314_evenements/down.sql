ALTER TABLE "public"."etapes_evenements__evenements_etapes"
      DROP CONSTRAINT IF EXISTS "etapes_evenements__evenements_etapes_etape_id_fkey";

ALTER TABLE "public"."etapes_evenements__evenements_etapes"
      DROP CONSTRAINT IF EXISTS "etapes_evenements__evenements_etapes_evenement_id_fkey";
