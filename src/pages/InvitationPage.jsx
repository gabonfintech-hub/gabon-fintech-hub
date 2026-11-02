import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { ScrollReveal } from '../components/ScrollReveal';
import { SeoMeta } from '../components/SeoMeta';
import { submitInvitationRequest } from '../services/invitationService';
import {
  isInvitationPhase,
  APPLICATION_URL,
  APPLICATIONS_DEADLINE_LABEL,
  INVITATIONS_OPEN_LABEL,
} from '../config/eventPhase';

const PROFILES = [
  'Partenaire / Sponsor',
  'Investisseur',
  'Institution financière',
  'Régulateur / Institution publique',
  'Média',
  'Autre',
];

export function InvitationPage() {
  const open = isInvitationPhase();

  return (
    <>
      <SeoMeta
        title="Demander une invitation · Elite FinTech Competition · Gabon FinTech Hub"
        description="Finale privée de l'Elite FinTech Competition, 5 décembre 2026 à Libreville. Événement sur invitation, places limitées."
        ogUrl="/invitation"
      />

      <section className="relative isolate overflow-hidden bg-navy-800 pb-14 pt-28 text-white md:pb-20 md:pt-32">
        <div className="pointer-events-none absolute -right-28 -top-28 -z-10 h-80 w-80 rounded-full border border-blue-400/15" aria-hidden="true" />
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <Eyebrow light>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-300" />
                ELITE FINTECH COMPETITION · FINALE
              </Eyebrow>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
                Sur invitation · Places limitées
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-.06em] md:text-5xl">
              Demander une invitation
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ivory-100/85 md:text-lg">
              Assistez à la finale privée du 5 décembre 2026 à Libreville : six fintechs gabonaises
              présentent leur solution devant un jury d'experts. Chaque demande est étudiée par
              l'équipe du Hub ; le lieu est communiqué avec l'invitation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 md:py-16 lg:px-8">
        {open ? <InvitationForm /> : <NotYetOpen />}
      </section>
    </>
  );
}

function NotYetOpen() {
  return (
    <div className="rounded-3xl border border-navy-900/10 bg-white p-7 text-center md:p-10">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-blue-800">
        <Icon name="spark" className="h-5 w-5" ariaHidden={true} />
      </span>
      <h2 className="mt-4 font-display text-2xl font-semibold text-navy-950">
        Les demandes d'invitation ouvriront le {INVITATIONS_OPEN_LABEL}.
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-navy-800/80">
        Vous représentez une fintech et souhaitez concourir ? Les candidatures sont ouvertes
        jusqu'au {APPLICATIONS_DEADLINE_LABEL}.
      </p>
      <Button href={APPLICATION_URL} target="_blank" rel="noopener noreferrer" className="mt-6">
        Postuler au concours <Icon className="h-4 w-4" />
      </Button>
    </div>
  );
}

function InvitationForm() {
  const [competing, setCompeting] = useState(null); // 'oui' | 'non' | null
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setErrorMessage(null);
    setLoading(true);
    try {
      await submitInvitationRequest(Object.fromEntries(new FormData(form)));
      setSent(true);
      form.reset();
    } catch (err) {
      console.error('[InvitationPage] Erreur de soumission:', err);
      setErrorMessage(err.message || 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-emerald-300 bg-emerald-50 p-7 md:p-10"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-emerald-800">
            <Icon name="check" className="h-5 w-5" ariaHidden={true} />
          </span>
          <h2 className="font-display text-2xl font-semibold text-emerald-950">Demande bien reçue</h2>
        </div>
        <p className="mt-4 text-sm leading-6 text-emerald-900">
          Merci. L'équipe du Gabon FinTech Hub étudie chaque demande avec attention. Si votre
          invitation est confirmée, vous la recevrez par e-mail avec le lieu et les détails pratiques
          de la soirée.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-navy-900/10 bg-white">
      {/* Étape 1 : filet de sécurité pour les fintechs */}
      <div className="border-b border-navy-900/10 bg-blue-100 p-6 md:p-8">
        <p className="font-display text-lg font-semibold text-navy-950">
          Souhaitez-vous présenter votre fintech en compétition ?
        </p>
        <div className="mt-4 flex flex-wrap gap-3" role="radiogroup" aria-label="Présenter une fintech en compétition">
          {[
            ['oui', 'Oui, je veux concourir'],
            ['non', 'Non, je souhaite assister à la finale'],
          ].map(([val, label]) => (
            <button
              key={val}
              type="button"
              role="radio"
              aria-checked={competing === val}
              onClick={() => setCompeting(val)}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${
                competing === val
                  ? 'border-navy-800 bg-navy-800 text-white'
                  : 'border-navy-900/20 bg-white text-navy-950 hover:border-navy-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {competing === 'oui' && (
          <motion.div
            key="oui"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-6 md:p-8"
          >
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5">
              <p className="font-semibold text-amber-950">Ce formulaire est réservé aux invités.</p>
              <p className="mt-2 text-sm leading-6 text-amber-900">
                Les candidatures des fintechs se faisaient via le formulaire officiel et sont closes
                depuis le {APPLICATIONS_DEADLINE_LABEL}. Les six finalistes ont été contactés
                directement par l'équipe du Hub. Pour toute question, écrivez-nous via la page contact.
              </p>
              <Button to="/contact" variant="outline" className="mt-4">
                Nous contacter <Icon className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {competing === 'non' && (
          <motion.form
            key="non"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="grid gap-4 p-6 md:p-8"
            noValidate
          >
            <input type="text" name="_honeypot" tabIndex="-1" aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />

            <p className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
              <Icon name="spark" className="mt-0.5 h-4 w-4 shrink-0" ariaHidden={true} />
              Ce formulaire ne permet pas de concourir.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="form-label">
                Nom complet
                <input name="name" required autoComplete="name" placeholder="Ex. Jean Ondo" className="form-control" />
              </label>
              <label className="form-label">
                Organisation
                <input name="organization" required autoComplete="organization" placeholder="Ex. Banque, fonds, institution…" className="form-control" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="form-label">
                Fonction
                <input name="role" autoComplete="organization-title" placeholder="Ex. Directeur innovation" className="form-control" />
              </label>
              <label className="form-label">
                Profil
                <select name="profile" required defaultValue="" className="form-control">
                  <option value="" disabled>Sélectionnez…</option>
                  {PROFILES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="form-label">
                Adresse e-mail professionnelle
                <input type="email" name="email" required autoComplete="email" placeholder="nom@organisation.ga" className="form-control" />
              </label>
              <label className="form-label">
                Téléphone
                <input type="tel" name="phone" autoComplete="tel" placeholder="+241 07 00 00 00" className="form-control" />
              </label>
            </div>

            <label className="form-label">
              Pourquoi souhaitez-vous assister à la finale ?
              <textarea name="message" rows="3" placeholder="Quelques mots sur votre intérêt pour l'écosystème fintech gabonais" className="form-control" />
            </label>

            <label className="flex items-start gap-2 text-xs leading-5 text-navy-800/80">
              <input type="checkbox" name="consent" required className="mt-1 accent-blue-700" />
              J'accepte que mes informations soient utilisées par le Gabon FinTech Hub pour traiter ma
              demande d'invitation. Les places étant limitées, l'envoi de ce formulaire ne garantit pas une invitation.
            </label>

            {errorMessage && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800">
                {errorMessage}
              </div>
            )}

            <Button className="justify-self-start" type="submit" disabled={loading}>
              {loading ? 'Envoi en cours…' : 'Envoyer ma demande'} <Icon className="h-4 w-4" />
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
