from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.units import cm
from datetime import datetime


def pedir_datos(titulo, campos):
    print(f"\n=== {titulo} ===")
    datos = {}
    for campo in campos:
        datos[campo] = input(f"{campo}: ")
    return datos


def pedir_items():
    print("\n=== ÍTEMS A FACTURAR ===")
    items = []
    while True:
        descripcion = input("Descripción (ENTER para terminar): ")
        if descripcion == "":
            break
        monto = float(input("Monto: $"))
        items.append((descripcion, monto))
    return items


def generar_pdf(emisor, cliente, banco, items):
    archivo = "factura_profesional.pdf"
    c = canvas.Canvas(archivo, pagesize=LETTER)
    width, height = LETTER

    # ───── ENCABEZADO ─────
    c.setFillColor(colors.HexColor("#1f4fd8"))
    c.rect(0, height - 3 * cm, width, 3 * cm, fill=1)

    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(2 * cm, height - 2 * cm, "FACTURA")

    c.setFont("Helvetica", 10)
    c.drawRightString(
        width - 2 * cm,
        height - 2 * cm,
        f"Fecha: {datetime.now().strftime('%d/%m/%Y')}"
    )

    # ───── CUERPO ─────
    y = height - 4 * cm
    c.setFillColor(colors.black)

    def seccion(titulo, x, y):
        c.setFont("Helvetica-Bold", 11)
        c.drawString(x, y, titulo)
        c.line(x, y - 2, x + 7 * cm, y - 2)
        return y - 0.6 * cm

    def texto(dic, x, y):
        c.setFont("Helvetica", 10)
        for k, v in dic.items():
            c.drawString(x, y, f"{k}: {v}")
            y -= 0.4 * cm
        return y

    # Emisor y Cliente
    y_left = seccion("EMISOR", 2 * cm, y)
    y_left = texto(emisor, 2 * cm, y_left)

    y_right = seccion("CLIENTE", width / 2, y)
    y_right = texto(cliente, width / 2, y_right)

    y = min(y_left, y_right) - 1 * cm

    # ───── TABLA DE ÍTEMS ─────
    c.setFont("Helvetica-Bold", 11)
    c.drawString(2 * cm, y, "DETALLE DE CONCEPTOS")
    y -= 0.4 * cm

    c.setStrokeColor(colors.black)
    c.line(2 * cm, y, width - 2 * cm, y)
    y -= 0.5 * cm

    c.setFont("Helvetica-Bold", 10)
    c.drawString(2 * cm, y, "Descripción")
    c.drawRightString(width - 2 * cm, y, "Monto")
    y -= 0.3 * cm
    c.line(2 * cm, y, width - 2 * cm, y)
    y -= 0.4 * cm

    total = 0
    c.setFont("Helvetica", 10)
    for desc, monto in items:
        c.drawString(2 * cm, y, desc)
        c.drawRightString(width - 2 * cm, y, f"$ {monto:,.2f}")
        total += monto
        y -= 0.4 * cm

    y -= 0.3 * cm
    c.line(2 * cm, y, width - 2 * cm, y)
    y -= 0.6 * cm

    # TOTAL
    c.setFont("Helvetica-Bold", 12)
    c.drawRightString(width - 2 * cm, y, f"TOTAL: $ {total:,.2f}")

    # ───── DATOS BANCARIOS ─────
    y -= 1.2 * cm
    y = seccion("DATOS BANCARIOS", 2 * cm, y)
    texto(banco, 2 * cm, y)

    # ───── PIE DE PÁGINA ─────
    c.setFont("Helvetica-Oblique", 8)
    c.setFillColor(colors.grey)
    c.drawCentredString(
        width / 2,
        1.5 * cm,
        "Gracias por su preferencia"
    )

    c.save()
    print(f"\n✅ Factura profesional generada: {archivo}")


def main():
    emisor = pedir_datos(
        "DATOS DEL EMISOR",
        ["Nombre", "Dirección", "RFC", "Teléfono", "Email"]
    )

    cliente = pedir_datos(
        "DATOS DEL CLIENTE",
        ["Empresa", "Dirección", "RFC", "Teléfono", "Email"]
    )

    banco = pedir_datos(
        "DATOS BANCARIOS",
        ["Banco", "Cuenta", "CLABE"]
    )

    items = pedir_items()

    generar_pdf(emisor, cliente, banco, items)


if __name__ == "__main__":
    main()
