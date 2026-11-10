#!/usr/bin/env bash
# Supprime les fichiers intermédiaires d'un jour. Garde : vidéo finale, miniature, fiche, script, MP3.
# Usage : cleanup_jour.sh /home/user/videos/JXX_sujet
set -e; D="$1"; [ -d "$D" ] || { echo "dossier absent: $D"; exit 1; }
cd "$D"
rm -rf prev thumb music.wav video_noaudio.mp4 preview_sheet.jpg final_sheet.jpg shots.json words.json miniature_*_apercu.jpg 2>/dev/null || true
echo "nettoyé : $D"; du -sh "$D"
