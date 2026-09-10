#!/usr/bin/env bash
# Renouvellement de la signature iOS (certificat de distribution + profil de
# provisionnement) et mise à jour des secrets GitHub utilisés par le workflow
# « Expo Build Prod ». Ne nécessite ni Xcode ni accès Expo : openssl + gh.
#
#   1. ./scripts/renew-ios-signing.sh csr
#      → génère une clé privée et une demande de certificat (CSR) à déposer
#        sur developer.apple.com
#   2. déposer le CSR, télécharger le certificat (.cer) et créer/télécharger le
#      profil de provisionnement App Store (.mobileprovision) — voir les
#      instructions affichées par l'étape 1
#   3. ./scripts/renew-ios-signing.sh secrets
#      → fabrique le .p12 et met à jour les secrets du repo
set -euo pipefail

REPO="SocialGouv/1000jours"
BUNDLE_ID="com.fabrique.millejours"
WORKDIR="${IOS_SIGNING_DIR:-$HOME/1000jours-ios-signing}"

case "${1:-}" in
  csr)
    mkdir -p "$WORKDIR" && chmod 700 "$WORKDIR" && cd "$WORKDIR"
    if [ -f private.key ]; then
      echo "Une clé privée existe déjà dans $WORKDIR, on la réutilise."
    else
      openssl genrsa -out private.key 2048
      chmod 600 private.key
    fi
    openssl req -new -key private.key -out request.csr \
      -subj "/CN=1000 jours Distribution/O=Ministere des Solidarites/C=FR"
    cat <<MSG

CSR généré : $WORKDIR/request.csr

Étapes suivantes sur https://developer.apple.com/account/resources :
  1. Certificates → « + » → « Apple Distribution » → Continue
     → déposer request.csr → Continue → Download
     → enregistrer le fichier sous $WORKDIR/distribution.cer
  2. Profiles → « + » → « App Store Connect » (Distribution) → Continue
     → App ID : $BUNDLE_ID → Continue
     → cocher le certificat « 1000 jours Distribution » créé à l'étape 1
     → nom : « 1000 jours App Store 2026 » → Generate → Download
     → enregistrer le fichier sous $WORKDIR/production.mobileprovision
  3. Lancer : $0 secrets
MSG
    ;;

  secrets)
    cd "$WORKDIR"
    for f in private.key distribution.cer production.mobileprovision; do
      [ -f "$f" ] || { echo "Fichier manquant : $WORKDIR/$f" >&2; exit 1; }
    done
    # Le .cer d'Apple est au format DER ; on le passe en PEM puis en PKCS#12 avec la clé.
    openssl x509 -inform der -in distribution.cer -out distribution.pem 2>/dev/null \
      || cp distribution.cer distribution.pem
    P12_PASSWORD="$(openssl rand -hex 16)"
    openssl pkcs12 -export -inkey private.key -in distribution.pem \
      -out distribution.p12 -passout "pass:$P12_PASSWORD"
    echo "Certificat :"; openssl x509 -in distribution.pem -noout -subject -enddate

    gh secret set IOS_P12_B64 --repo "$REPO" --body "$(base64 < distribution.p12 | tr -d '\n')"
    gh secret set IOS_P12_PASSWORD --repo "$REPO" --body "$P12_PASSWORD"
    gh secret set IOS_PROVISIONNING_PROFILE_B64 --repo "$REPO" --body "$(base64 < production.mobileprovision | tr -d '\n')"
    echo
    echo "Secrets mis à jour sur $REPO. Garde $WORKDIR en lieu sûr (clé privée + mot de passe du .p12)."
    echo "Tu peux maintenant lancer le workflow « Expo Build Prod » avec platform = ios."
    ;;

  *)
    echo "Usage : $0 csr | secrets" >&2
    exit 1
    ;;
esac
