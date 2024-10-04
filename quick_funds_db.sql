--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    company_identifier text NOT NULL,
    company_email text,
    password text,
    password_hash text,
    security_question text,
    answer text
);


--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: company_customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.company_customers (
    id integer NOT NULL,
    company_id text,
    customer_name text,
    loan_amount integer,
    interest_rate integer,
    start_date date,
    due_date date,
    reason text
);


--
-- Name: company_customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.company_customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: company_customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.company_customers_id_seq OWNED BY public.company_customers.id;


--
-- Name: company_profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.company_profiles (
    id integer NOT NULL,
    company_id text NOT NULL,
    company_name text
);


--
-- Name: company_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.company_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: company_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.company_profile_id_seq OWNED BY public.company_profiles.id;


--
-- Name: user_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_messages (
    id integer NOT NULL,
    full_name text,
    email text,
    reason text,
    phone_number text,
    message text
);


--
-- Name: user_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_messages_id_seq OWNED BY public.user_messages.id;


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: company_customers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_customers ALTER COLUMN id SET DEFAULT nextval('public.company_customers_id_seq'::regclass);


--
-- Name: company_profiles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_profiles ALTER COLUMN id SET DEFAULT nextval('public.company_profile_id_seq'::regclass);


--
-- Name: user_messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_messages ALTER COLUMN id SET DEFAULT nextval('public.user_messages_id_seq'::regclass);


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.companies (id, company_identifier, company_email, password, password_hash, security_question, answer) FROM stdin;
3	$2a$10$CnWQ48A1RbTUZWnSEVf9T.DZtWkMnvYcEU4uWxKKxjPaPjD8nIuoC	whitegold@gmail.com	password4	$2a$10$ep0dUsKfYWs5SK0RX.Tnpuwa2Fo.bcWzTs205affT4k/oUHfNs3ge	Initial value is called?	default
5	$2a$10$CV3cEDbdRBAx9.OIoUmjHOxMPqDn6dyUUZUZYFqvx5Cs3r1eWZAP6	inc.coop@gmail.com	password4	\N	Initial value is called?	default
9	$2a$10$LLWPgIN8rF1F5LSoSSOHG.hMdQvdZqI/W75iYnJR8p.ROifzUgwHe	inntech.r@gmail.com	password4	\N	Initial value is called?	default
2	$2a$10$OMe4s6wM2cL6osXRAl9v2uFt6ho.gHXqxQeLJfoqiVhMtGWc1z.gK	olomufeh@gmail.com	password1234567890	$2a$10$C1d0pJkRb7QOwi/BMcJzTuDK.zygILHB9mGFDGgiQ6DJxnNbjaYiW	Initial value is called?	default
\.


--
-- Data for Name: company_customers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.company_customers (id, company_id, customer_name, loan_amount, interest_rate, start_date, due_date, reason) FROM stdin;
7	$2a$10$OMe4s6wM2cL6osXRAl9v2uFt6ho.gHXqxQeLJfoqiVhMtGWc1z.gK	Fred johnson	500000	15	2024-09-01	2026-09-30	Capital interest to kickstart my business
8	$2a$10$OMe4s6wM2cL6osXRAl9v2uFt6ho.gHXqxQeLJfoqiVhMtGWc1z.gK	Thompson Carlson	450000	10	2024-10-15	2026-09-30	Capital interest to kickstart my business
9	$2a$10$OMe4s6wM2cL6osXRAl9v2uFt6ho.gHXqxQeLJfoqiVhMtGWc1z.gK	John doe	10000	8	2019-02-03	2024-10-11	Reason for loan
10	$2a$10$OMe4s6wM2cL6osXRAl9v2uFt6ho.gHXqxQeLJfoqiVhMtGWc1z.gK	Benjamin Carson	340000	5	2024-09-01	2026-05-04	My reasons
11	$2a$10$OMe4s6wM2cL6osXRAl9v2uFt6ho.gHXqxQeLJfoqiVhMtGWc1z.gK	Peter Smith	380000	10	2024-09-03	2027-09-03	My reasons
12	$2a$10$OMe4s6wM2cL6osXRAl9v2uFt6ho.gHXqxQeLJfoqiVhMtGWc1z.gK	Tim Berner Lee	4000	6	2024-09-02	2024-09-23	Reason reason
\.


--
-- Data for Name: company_profiles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.company_profiles (id, company_id, company_name) FROM stdin;
1	$2a$10$OMe4s6wM2cL6osXRAl9v2uFt6ho.gHXqxQeLJfoqiVhMtGWc1z.gK	control genesis
2	$2a$10$CnWQ48A1RbTUZWnSEVf9T.DZtWkMnvYcEU4uWxKKxjPaPjD8nIuoC	White Gold Inc
6	$2a$10$JKcwTpy1zkH4QehtHpvte.5No1tiv8Q1U7wXHdyLHL4E4untMhUUK	Inntech Resources
7	$2a$10$LLWPgIN8rF1F5LSoSSOHG.hMdQvdZqI/W75iYnJR8p.ROifzUgwHe	Inntech Resources
\.


--
-- Data for Name: user_messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_messages (id, full_name, email, reason, phone_number, message) FROM stdin;
1	Benedict Olom	olomufeh@gmail.com	Enquiries	08099444470	I wish to speak directly with one of your agents
2	BENEDICT OLOM	admin@verionx.com	Enquiry	\N	\N
\.


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.companies_id_seq', 10, true);


--
-- Name: company_customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.company_customers_id_seq', 12, true);


--
-- Name: company_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.company_profile_id_seq', 7, true);


--
-- Name: user_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_messages_id_seq', 2, true);


--
-- Name: companies companies_company_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_company_email_key UNIQUE (company_email);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (company_identifier);


--
-- Name: company_profiles company_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_profiles
    ADD CONSTRAINT company_profile_pkey PRIMARY KEY (company_id);


--
-- PostgreSQL database dump complete
--

