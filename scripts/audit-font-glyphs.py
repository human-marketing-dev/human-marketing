#!/usr/bin/env python3
"""Audita los glifos de una fuente y lista los que estan mapeados pero no dibujan.

Un glifo "hueco" es aquel que tiene un codepoint asignado en el cmap y un avance
horizontal distinto de cero, pero contorno vacio. El navegador reserva el espacio
y no pinta nada: el caracter desaparece en silencio, sin fallback a otra fuente.

Asi descubrimos que Human Sans trae `|` y `¦` vacios (avance 40/1000 em).

Los espacios legitimos (U+0020, NBSP, separadores y caracteres de formato) se
excluyen: para esos, no dibujar es lo correcto.

Uso:
    pip install fonttools brotli        # brotli hace falta para leer .woff2
    python3 scripts/audit-font-glyphs.py [ruta/a/fuente...]

Sin argumentos audita app/fonts/*.woff2. Sale con codigo 1 si encuentra glifos
huecos, para poder usarlo en CI.
"""

from __future__ import annotations

import glob
import sys
import unicodedata

from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont

# Categorias Unicode donde "no dibujar" es el comportamiento correcto:
# Zs separador de espacio, Zl/Zp separadores de linea/parrafo,
# Cc control, Cf formato (incluye el guion blando U+00AD).
BLANK_OK_CATEGORIES = {"Zs", "Zl", "Zp", "Cc", "Cf"}


def audit(path: str) -> list[tuple[int, str, str, int]]:
    font = TTFont(path, lazy=True)
    upm = font["head"].unitsPerEm
    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    hmtx = font["hmtx"]

    hollow: list[tuple[int, str, str, int]] = []
    for codepoint, glyph_name in sorted(cmap.items()):
        char = chr(codepoint)
        if unicodedata.category(char) in BLANK_OK_CATEGORIES:
            continue

        advance = hmtx[glyph_name][0]
        if advance == 0:
            # Sin avance no ocupa espacio: es una marca combinante o similar.
            continue

        pen = BoundsPen(glyph_set)
        glyph_set[glyph_name].draw(pen)
        if pen.bounds is None:
            hollow.append((codepoint, char, glyph_name, advance))

    return hollow, upm, len(cmap)


def main(argv: list[str]) -> int:
    paths = argv[1:] or sorted(glob.glob("app/fonts/*.woff2"))
    if not paths:
        print("No se encontro ninguna fuente que auditar.", file=sys.stderr)
        return 2

    total = 0
    for path in paths:
        hollow, upm, mapped = audit(path)
        print(f"\n{path}  —  {mapped} codepoints mapeados, unitsPerEm {upm}")
        if not hollow:
            print("  Sin glifos huecos.")
            continue

        total += len(hollow)
        print(f"  {len(hollow)} glifo(s) mapeado(s) que no dibujan:\n")
        print(f"    {'U+':>8}  {'car':^5}  {'glifo':<16} {'avance':>7}  nombre Unicode")
        print("    " + "-" * 74)
        for codepoint, char, glyph_name, advance in hollow:
            try:
                name = unicodedata.name(char)
            except ValueError:
                name = "?"
            print(
                f"    U+{codepoint:04X}  {char!r:^5}  {glyph_name:<16} "
                f"{advance:>4} ({advance / upm:.3f}em)  {name}"
            )

    return 1 if total else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
