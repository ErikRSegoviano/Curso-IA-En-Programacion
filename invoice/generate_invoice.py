from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from datetime import datetime


def pedir_datos_personales():
    print("\n=== DATOS DEL EMISOR ===")
    return {
        "nombre": input("Nombre: "),
        "direccion": input("Dirección: "),
        "rfc": input("RFC: "),
        "telefono": input("Teléfono: "),
        "email": input("Email: "),
    }


def pedir_datos_cliente():
    print("\n=== DATOS DEL CLIENTE ===")
    return {
        "empresa": input("Nombre de la empresa: "),
        "direccion": input("Dirección de la empresa: "),
        "rfc": input("RFC de la empresa: "),
        "telefono": input("Teléfono: "),
        "email": input("Email: "),
    }


def pedir_datos_bancarios():
    print("\n=== DATOS BANCARIOS ===")
    return {
        "banco": input("Banco: "),
        "cuenta": input("Número de cuenta: "),
        "clabe": input("CLABE: "),
    }


def pedir_items():
    print("\n=== ÍTEMS A FACTURAR ===")
    items = []
    while True:
        descripcion = input("Descripción del ítem (o ENTER para terminar): ")
        if descripcion == "":
            break
        monto = float(input("Monto: $"))
        items.append((descripcion, monto))
    return items


def generar_pdf(emisor, cliente, banco, items, total):
    archivo = "factura.pdf"
    c = canvas.Canvas(archivo, pagesize=LETTER)
    width, height = LETTER

    y = height - 2 * cm

    c.setFont("Helvetica-Bold", 14)
    c.drawString(2 * cm, y, "FACTURA")
    y -= 1 * cm

    c.setFont("Helvetica", 10)
    c.drawString(2 * cm, y, f"Fecha: {datetime.now().strftime('%d/%m/%Y')}")
    y -= 1 * cm

    c.setFont("Helvetica-Bold", 11)
    c.drawString(2 * cm, y, "EMISOR:")
    y -= 0.5 * cm

    c.setFont("Helvetica", 10)
    for v in emisor.values():
        c.drawString(2 * cm, y, v)
        y -= 0.4 * cm

    y -= 0.5 * cm
    c.setFont("Helvetica-Bold", 11)
    c.drawString(2 * cm, y, "CLIENTE:")
    y -= 0.5 * cm

    c.setFont("Helvetica", 10)
    for v in cliente.values():
        c.drawString(2 * cm, y, v)
        y -= 0.4 * cm

    y -= 0.5 * cm
    c.setFont("Helvetica-Bold", 11)
    c.drawString(2 * cm, y, "DETALLE:")
    y -= 0.5 * cm

    c.setFont("Helvetica", 10)
    for desc, monto in items:
        c.drawString(2 * cm, y, desc)
        c.drawRightString(width - 2 * cm, y, f"${monto:.2f}")
        y -= 0.4 * cm

    y -= 0.5 * cm
    c.setFont("Helvetica-Bold", 11)
    c.drawRightString(width - 2 * cm, y, f"TOTAL: ${total:.2f}")

    y -= 1 * cm
    c.drawString(2 * cm, y, "DATOS BANCARIOS:")
    y -= 0.5 * cm

    c.setFont("Helvetica", 10)
    for k, v in banco.items():
        c.drawString(2 * cm, y, f"{k.capitalize()}: {v}")
        y -= 0.4 * cm

    c.save()
    print(f"\n✅ Factura generada correctamente: {archivo}")


def main():
    emisor = pedir_datos_personales()
    cliente = pedir_datos_cliente()
    banco = pedir_datos_bancarios()
    items = pedir_items()

    total = sum(monto for _, monto in items)

    generar_pdf(emisor, cliente, banco, items, total)


if __name__ == "__main__":
    main()
