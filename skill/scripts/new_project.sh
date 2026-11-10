#!/usr/bin/env bash
# Usage: new_project.sh <dossier_projet>
# Crée un projet vidéo : copie le moteur + installe three et les polices (une seule fois).
set -e
SK="$(cd "$(dirname "$0")/.." && pwd)"; P="$1"; [ -z "$P" ] && { echo "usage: $0 <dossier>"; exit 1; }
mkdir -p "$P"; cp "$SK"/assets/engine/* "$P"/
cd "$P"; [ -f package.json ] || npm init -y >/dev/null
[ -d node_modules/three ] || npm i -s three@0.170.0 @fontsource/vt323 @fontsource/montserrat >/dev/null 2>&1
echo "Projet prêt : $P (éditer scenario.js)"
