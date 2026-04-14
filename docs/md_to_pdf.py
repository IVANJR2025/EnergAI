"""
Gera PDF a partir de um ficheiro Markdown (Unicode PT/ES/EN).
Requisitos: pip install fpdf2 markdown
Usa Arial do Windows; em Linux/Mac ajuste FONT_DIR ou instale DejaVu.
"""
from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

import markdown
from fpdf import FPDF
from fpdf.enums import TextEmphasis
from fpdf.fonts import FontFace


def _arial_faces() -> tuple[str, Path]:
    windir = Path(os.environ.get("WINDIR", "C:/Windows"))
    font_dir = windir / "Fonts"
    if (font_dir / "arial.ttf").exists():
        return "Arial", font_dir
    # fallback: tentar DejaVu em projeto ou avisar
    raise SystemExit(
        "Não foi encontrado Arial em Windows/Fonts. "
        "Em Linux/Mac, edite md_to_pdf.py e aponte para ficheiros .ttf Unicode."
    )


def build_tag_styles(family: str) -> dict[str, FontFace]:
    def ff(size: float = 10, bold: bool = False, italic: bool = False) -> FontFace:
        emphasis = TextEmphasis.NONE
        if bold:
            emphasis |= TextEmphasis.B
        if italic:
            emphasis |= TextEmphasis.I
        return FontFace(family=family, size_pt=size, emphasis=emphasis)

    return {
        "h1": ff(20, True),
        "h2": ff(16, True),
        "h3": ff(14, True),
        "h4": ff(12, True),
        "h5": ff(11, True),
        "h6": ff(10, True),
        "p": ff(10),
        "li": ff(10),
        "code": ff(9),
        "pre": ff(8),
        "blockquote": ff(10, italic=True),
        "em": ff(10, italic=True),
        "strong": ff(10, bold=True),
        "b": ff(10, bold=True),
        "i": ff(10, italic=True),
    }


def md_to_pdf(md_path: Path, pdf_path: Path | None = None) -> Path:
    md_path = md_path.resolve()
    if pdf_path is None:
        pdf_path = md_path.with_suffix(".pdf")
    else:
        pdf_path = pdf_path.resolve()

    text = md_path.read_text(encoding="utf-8")
    # fpdf2 não suporta <strong> nem <code> dentro de <td>.
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = text.replace("\u2014", "-").replace("\u2013", "-").replace("\u2192", "->")
    html = markdown.markdown(
        text,
        extensions=["tables", "fenced_code", "nl2br"],
    )

    family, font_dir = _arial_faces()
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    for style, fname in [
        ("", "arial.ttf"),
        ("B", "arialbd.ttf"),
        ("I", "ariali.ttf"),
        ("BI", "arialbi.ttf"),
    ]:
        path = font_dir / fname
        if path.exists():
            pdf.add_font(family, style, str(path))

    pdf.set_font(family, "", 10)
    tag_styles = build_tag_styles(family)
    pdf.write_html(html, tag_styles=tag_styles, table_line_separators=True)
    pdf.output(str(pdf_path))
    return pdf_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Markdown → PDF (fpdf2)")
    parser.add_argument("input", type=Path, help="Ficheiro .md")
    parser.add_argument("-o", "--output", type=Path, default=None, help="Ficheiro .pdf de saída")
    args = parser.parse_args()
    if not args.input.exists():
        sys.exit(f"Ficheiro não encontrado: {args.input}")
    out = md_to_pdf(args.input, args.output)
    print(f"PDF gerado: {out}")


if __name__ == "__main__":
    main()
