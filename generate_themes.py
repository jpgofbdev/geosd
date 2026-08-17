#!/usr/bin/env python3
"""
Régénère le bloc THEMES de geosd-themes.js à partir de modele-formulaires.csv.
Ce fichier JS est partagé par les 3 versions de l'application
(geosd-admin.html, geosd-terrain-saisie.html,
geosd-terrain-consultation.html) — un seul lancement du script les
met toutes à jour.

Usage : python3 generate_themes.py

Le CSV doit avoir une ligne par champ, colonnes :
theme_key, theme_label, subtype_key, subtype_label, field_name, field_label,
field_type, required, options

- subtype_key / subtype_label restent vides si la thématique n'a pas de sous-type.
- options : valeurs séparées par des virgules, uniquement pour field_type=select.
- required : "oui" ou "non".
"""
import csv
import json
import re
import sys
from pathlib import Path

CSV_PATH = Path("modele-formulaires.csv")
JS_PATH = Path("geosd-themes.js")
START_MARKER = "// ==THEMES_START=="
END_MARKER = "// ==THEMES_END=="


def bool_fr(value):
    return value.strip().lower() in ("oui", "true", "1", "yes")


def build_field(row):
    field = {
        "name": row["field_name"].strip(),
        "label": row["field_label"].strip(),
        "type": row["field_type"].strip(),
        "required": bool_fr(row["required"]),
    }
    if field["type"] == "select":
        opts = [o.strip() for o in row["options"].split(",") if o.strip()]
        field["options"] = opts
    return field


def load_themes(csv_path):
    themes = {}
    with csv_path.open(encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            tkey = row["theme_key"].strip()
            if not tkey:
                continue
            tlabel = row["theme_label"].strip()
            skey = row["subtype_key"].strip()
            slabel = row["subtype_label"].strip()
            field = build_field(row)

            theme = themes.setdefault(tkey, {"label": tlabel, "subtypes": None, "fields": []})

            if skey:
                if theme["subtypes"] is None:
                    theme["subtypes"] = {}
                sub = theme["subtypes"].setdefault(skey, {"label": slabel, "fields": []})
                sub["fields"].append(field)
            else:
                theme["fields"].append(field)
    return themes


def to_js_object(themes):
    def field_js(f, indent):
        pad = " " * indent
        parts = [
            f'name: "{f["name"]}"',
            f'label: "{f["label"]}"',
            f'type: "{f["type"]}"',
            f'required: {"true" if f["required"] else "false"}',
        ]
        if "options" in f:
            opts = ", ".join(json.dumps(o, ensure_ascii=False) for o in f["options"])
            parts.append(f"options: [{opts}]")
        return pad + "{ " + ", ".join(parts) + " }"

    def fields_js(fields, indent):
        pad = " " * indent
        lines = ",\n".join(field_js(f, indent + 2) for f in fields)
        return pad + "[\n" + lines + "\n" + pad + "]"

    lines = ["const THEMES = {"]
    theme_keys = list(themes.keys())
    for ti, tkey in enumerate(theme_keys):
        theme = themes[tkey]
        lines.append(f'  {tkey}: {{')
        lines.append(f'    label: {json.dumps(theme["label"], ensure_ascii=False)},')
        if theme["subtypes"]:
            lines.append("    subtypes: {")
            skeys = list(theme["subtypes"].keys())
            for si, skey in enumerate(skeys):
                sub = theme["subtypes"][skey]
                lines.append(f"      {skey}: {{")
                lines.append(f'        label: {json.dumps(sub["label"], ensure_ascii=False)},')
                lines.append("        fields: " + fields_js(sub["fields"], 8).strip())
                lines.append("      }" + ("," if si < len(skeys) - 1 else ""))
            lines.append("    }")
        else:
            lines.append("    subtypes: null,")
            lines.append("    fields: " + fields_js(theme["fields"], 4).strip())
        lines.append("  }" + ("," if ti < len(theme_keys) - 1 else ""))
    lines.append("};")
    return "\n".join(lines)


def main():
    if not CSV_PATH.exists():
        sys.exit(f"Fichier introuvable : {CSV_PATH}")
    if not JS_PATH.exists():
        sys.exit(f"Fichier introuvable : {JS_PATH}")

    themes = load_themes(CSV_PATH)
    js_block = to_js_object(themes)

    js = JS_PATH.read_text(encoding="utf-8")
    if START_MARKER not in js or END_MARKER not in js:
        sys.exit(
            "Marqueurs // ==THEMES_START== / // ==THEMES_END== introuvables "
            "dans geosd-themes.js."
        )

    pattern = re.compile(re.escape(START_MARKER) + r".*?" + re.escape(END_MARKER), re.DOTALL)
    replacement = f"{START_MARKER}\n{js_block}\n{END_MARKER}"
    new_js = pattern.sub(replacement, js, count=1)

    JS_PATH.write_text(new_js, encoding="utf-8")
    print(f"OK — {len(themes)} thématique(s) écrites dans {JS_PATH} (partagé par les 3 versions)")


if __name__ == "__main__":
    main()
