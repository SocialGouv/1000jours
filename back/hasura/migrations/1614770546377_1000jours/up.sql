
ALTER TABLE "public"."upload_file_morph"
    ADD CONSTRAINT "upload_file_morph_upload_file_id_fkey"
    FOREIGN KEY ("upload_file_id")
    REFERENCES "public"."upload_file"
    ("id") ON UPDATE CASCADE ON DELETE CASCADE;
