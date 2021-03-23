CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_etape_fkey FOREIGN KEY (etape) REFERENCES public.etapes(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.articles_thematiques__thematiques_articles
    ADD CONSTRAINT articles_thematiques__thematiques_articles_article_id_fkey FOREIGN KEY (article_id) REFERENCES public.articles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.articles_thematiques__thematiques_articles
    ADD CONSTRAINT articles_thematiques__thematiques_articles_thematique_id_fke FOREIGN KEY (thematique_id) REFERENCES public.thematiques(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.etapes_parcours__parcours_etapes
    ADD CONSTRAINT etapes_parcours__parcours_etapes_etape_id_fkey FOREIGN KEY (etape_id) REFERENCES public.etapes(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.etapes_parcours__parcours_etapes
    ADD CONSTRAINT etapes_parcours__parcours_etapes_parcour_id_fkey FOREIGN KEY (parcour_id) REFERENCES public.parcours(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.etapes_thematiques__thematiques_etapes
    ADD CONSTRAINT etapes_thematiques__thematiques_etapes_etape_id_fkey FOREIGN KEY (etape_id) REFERENCES public.etapes(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.etapes_thematiques__thematiques_etapes
    ADD CONSTRAINT etapes_thematiques__thematiques_etapes_thematique_id_fkey FOREIGN KEY (thematique_id) REFERENCES public.thematiques(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.evenements
    ADD CONSTRAINT evenements_etape_fkey FOREIGN KEY (etape) REFERENCES public.etapes(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
