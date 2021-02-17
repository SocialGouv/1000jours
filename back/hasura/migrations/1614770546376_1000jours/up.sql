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
CREATE TABLE public.articles (
    id integer NOT NULL,
    titre character varying(255),
    contenu text,
    etape integer,
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE public.articles_etapes__etapes_articles (
    id integer NOT NULL,
    etape_id integer,
    article_id integer
);
CREATE SEQUENCE public.articles_etapes__etapes_articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.articles_etapes__etapes_articles_id_seq OWNED BY public.articles_etapes__etapes_articles.id;
CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;
CREATE TABLE public.articles_thematiques__thematiques_articles (
    id integer NOT NULL,
    article_id integer,
    thematique_id integer
);
CREATE SEQUENCE public.articles_thematiques__thematiques_articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.articles_thematiques__thematiques_articles_id_seq OWNED BY public.articles_thematiques__thematiques_articles.id;
CREATE TABLE public.core_store (
    id integer NOT NULL,
    key character varying(255),
    value text,
    type character varying(255),
    environment character varying(255),
    tag character varying(255)
);
CREATE SEQUENCE public.core_store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.core_store_id_seq OWNED BY public.core_store.id;
CREATE TABLE public.etapes (
    id integer NOT NULL,
    nom character varying(255),
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    description text
);
CREATE SEQUENCE public.etapes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.etapes_id_seq OWNED BY public.etapes.id;
CREATE TABLE public.etapes_parcours__parcours_etapes (
    id integer NOT NULL,
    parcour_id integer,
    etape_id integer
);
CREATE SEQUENCE public.etapes_parcours__parcours_etapes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.etapes_parcours__parcours_etapes_id_seq OWNED BY public.etapes_parcours__parcours_etapes.id;
CREATE TABLE public.etapes_thematiques__thematiques_etapes (
    id integer NOT NULL,
    thematique_id integer,
    etape_id integer
);
CREATE SEQUENCE public.etapes_thematiques__thematiques_etapes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.etapes_thematiques__thematiques_etapes_id_seq OWNED BY public.etapes_thematiques__thematiques_etapes.id;
CREATE TABLE public.evenements (
    id integer NOT NULL,
    nom character varying(255),
    description text,
    debut integer,
    etape integer,
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    fin integer
);
CREATE SEQUENCE public.evenements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.evenements_id_seq OWNED BY public.evenements.id;
CREATE TABLE public.parcours (
    id integer NOT NULL,
    nom character varying(255),
    description text,
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE SEQUENCE public.parcours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.parcours_id_seq OWNED BY public.parcours.id;
CREATE TABLE public.posts (
    id integer DEFAULT pg_backend_pid() NOT NULL,
    title text,
    content text,
    "userId" integer,
    created_at date DEFAULT now() NOT NULL
);
CREATE TABLE public.strapi_administrator (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    username character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255),
    "resetPasswordToken" character varying(255),
    "registrationToken" character varying(255),
    "isActive" boolean,
    blocked boolean
);
CREATE SEQUENCE public.strapi_administrator_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.strapi_administrator_id_seq OWNED BY public.strapi_administrator.id;
CREATE TABLE public.strapi_permission (
    id integer NOT NULL,
    action character varying(255) NOT NULL,
    subject character varying(255),
    fields jsonb,
    conditions jsonb,
    role integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE SEQUENCE public.strapi_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.strapi_permission_id_seq OWNED BY public.strapi_permission.id;
CREATE TABLE public.strapi_role (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    code character varying(255) NOT NULL,
    description character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE SEQUENCE public.strapi_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.strapi_role_id_seq OWNED BY public.strapi_role.id;
CREATE TABLE public.strapi_users_roles (
    id integer NOT NULL,
    user_id integer,
    role_id integer
);
CREATE SEQUENCE public.strapi_users_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.strapi_users_roles_id_seq OWNED BY public.strapi_users_roles.id;
CREATE TABLE public.strapi_webhooks (
    id integer NOT NULL,
    name character varying(255),
    url text,
    headers jsonb,
    events jsonb,
    enabled boolean
);
CREATE SEQUENCE public.strapi_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.strapi_webhooks_id_seq OWNED BY public.strapi_webhooks.id;
CREATE TABLE public.thematiques (
    id integer NOT NULL,
    nom character varying(255),
    description text,
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE SEQUENCE public.thematiques_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.thematiques_id_seq OWNED BY public.thematiques.id;
CREATE TABLE public.upload_file (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "alternativeText" character varying(255),
    caption character varying(255),
    width integer,
    height integer,
    formats jsonb,
    hash character varying(255) NOT NULL,
    ext character varying(255),
    mime character varying(255) NOT NULL,
    size numeric(10,2) NOT NULL,
    url character varying(255) NOT NULL,
    "previewUrl" character varying(255),
    provider character varying(255) NOT NULL,
    provider_metadata jsonb,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE SEQUENCE public.upload_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.upload_file_id_seq OWNED BY public.upload_file.id;
CREATE TABLE public.upload_file_morph (
    id integer NOT NULL,
    upload_file_id integer,
    related_id integer,
    related_type text,
    field text,
    "order" integer
);
CREATE SEQUENCE public.upload_file_morph_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.upload_file_morph_id_seq OWNED BY public.upload_file_morph.id;
CREATE TABLE public."users-permissions_permission" (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    controller character varying(255) NOT NULL,
    action character varying(255) NOT NULL,
    enabled boolean NOT NULL,
    policy character varying(255),
    role integer,
    created_by integer,
    updated_by integer
);
CREATE SEQUENCE public."users-permissions_permission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."users-permissions_permission_id_seq" OWNED BY public."users-permissions_permission".id;
CREATE TABLE public."users-permissions_role" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    type character varying(255),
    created_by integer,
    updated_by integer
);
CREATE SEQUENCE public."users-permissions_role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."users-permissions_role_id_seq" OWNED BY public."users-permissions_role".id;
CREATE TABLE public."users-permissions_user" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    provider character varying(255),
    password character varying(255),
    "resetPasswordToken" character varying(255),
    "confirmationToken" character varying(255),
    confirmed boolean,
    blocked boolean,
    role integer,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE SEQUENCE public."users-permissions_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."users-permissions_user_id_seq" OWNED BY public."users-permissions_user".id;
ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);
ALTER TABLE ONLY public.articles_etapes__etapes_articles ALTER COLUMN id SET DEFAULT nextval('public.articles_etapes__etapes_articles_id_seq'::regclass);
ALTER TABLE ONLY public.articles_thematiques__thematiques_articles ALTER COLUMN id SET DEFAULT nextval('public.articles_thematiques__thematiques_articles_id_seq'::regclass);
ALTER TABLE ONLY public.core_store ALTER COLUMN id SET DEFAULT nextval('public.core_store_id_seq'::regclass);
ALTER TABLE ONLY public.etapes ALTER COLUMN id SET DEFAULT nextval('public.etapes_id_seq'::regclass);
ALTER TABLE ONLY public.etapes_parcours__parcours_etapes ALTER COLUMN id SET DEFAULT nextval('public.etapes_parcours__parcours_etapes_id_seq'::regclass);
ALTER TABLE ONLY public.etapes_thematiques__thematiques_etapes ALTER COLUMN id SET DEFAULT nextval('public.etapes_thematiques__thematiques_etapes_id_seq'::regclass);
ALTER TABLE ONLY public.evenements ALTER COLUMN id SET DEFAULT nextval('public.evenements_id_seq'::regclass);
ALTER TABLE ONLY public.parcours ALTER COLUMN id SET DEFAULT nextval('public.parcours_id_seq'::regclass);
ALTER TABLE ONLY public.strapi_administrator ALTER COLUMN id SET DEFAULT nextval('public.strapi_administrator_id_seq'::regclass);
ALTER TABLE ONLY public.strapi_permission ALTER COLUMN id SET DEFAULT nextval('public.strapi_permission_id_seq'::regclass);
ALTER TABLE ONLY public.strapi_role ALTER COLUMN id SET DEFAULT nextval('public.strapi_role_id_seq'::regclass);
ALTER TABLE ONLY public.strapi_users_roles ALTER COLUMN id SET DEFAULT nextval('public.strapi_users_roles_id_seq'::regclass);
ALTER TABLE ONLY public.strapi_webhooks ALTER COLUMN id SET DEFAULT nextval('public.strapi_webhooks_id_seq'::regclass);
ALTER TABLE ONLY public.thematiques ALTER COLUMN id SET DEFAULT nextval('public.thematiques_id_seq'::regclass);
ALTER TABLE ONLY public.upload_file ALTER COLUMN id SET DEFAULT nextval('public.upload_file_id_seq'::regclass);
ALTER TABLE ONLY public.upload_file_morph ALTER COLUMN id SET DEFAULT nextval('public.upload_file_morph_id_seq'::regclass);
ALTER TABLE ONLY public."users-permissions_permission" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_permission_id_seq"'::regclass);
ALTER TABLE ONLY public."users-permissions_role" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_role_id_seq"'::regclass);
ALTER TABLE ONLY public."users-permissions_user" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_user_id_seq"'::regclass);
ALTER TABLE ONLY public.articles_etapes__etapes_articles
    ADD CONSTRAINT articles_etapes__etapes_articles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.articles_thematiques__thematiques_articles
    ADD CONSTRAINT articles_thematiques__thematiques_articles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.core_store
    ADD CONSTRAINT core_store_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.etapes_parcours__parcours_etapes
    ADD CONSTRAINT etapes_parcours__parcours_etapes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.etapes
    ADD CONSTRAINT etapes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.etapes_thematiques__thematiques_etapes
    ADD CONSTRAINT etapes_thematiques__thematiques_etapes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.evenements
    ADD CONSTRAINT evenements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.parcours
    ADD CONSTRAINT parcours_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.strapi_administrator
    ADD CONSTRAINT strapi_administrator_email_unique UNIQUE (email);
ALTER TABLE ONLY public.strapi_administrator
    ADD CONSTRAINT strapi_administrator_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.strapi_permission
    ADD CONSTRAINT strapi_permission_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.strapi_role
    ADD CONSTRAINT strapi_role_code_unique UNIQUE (code);
ALTER TABLE ONLY public.strapi_role
    ADD CONSTRAINT strapi_role_name_unique UNIQUE (name);
ALTER TABLE ONLY public.strapi_role
    ADD CONSTRAINT strapi_role_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.strapi_users_roles
    ADD CONSTRAINT strapi_users_roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.strapi_webhooks
    ADD CONSTRAINT strapi_webhooks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.thematiques
    ADD CONSTRAINT thematiques_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.upload_file_morph
    ADD CONSTRAINT upload_file_morph_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.upload_file
    ADD CONSTRAINT upload_file_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."users-permissions_permission"
    ADD CONSTRAINT "users-permissions_permission_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."users-permissions_role"
    ADD CONSTRAINT "users-permissions_role_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."users-permissions_role"
    ADD CONSTRAINT "users-permissions_role_type_unique" UNIQUE (type);
ALTER TABLE ONLY public."users-permissions_user"
    ADD CONSTRAINT "users-permissions_user_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."users-permissions_user"
    ADD CONSTRAINT "users-permissions_user_username_unique" UNIQUE (username);
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
