import pandas as pd

# ===============================
# 1. Cargar el Excel
# ===============================
archivo_entrada = "expenses/fuente.xlsx"   # tu archivo original
archivo_salida = "expenses/analisis_gastos.xlsx"

df = pd.read_excel(archivo_entrada)

# ===============================
# 2. Preparar datos numéricos
# ===============================
df_numerico = df.drop(columns="Gastos")

# ===============================
# 3. Resumen estadístico por categoría
# ===============================
resumen_categoria = pd.DataFrame({
    "Gasto": df["Gastos"],
    "Total Anual": df_numerico.sum(axis=1),
    "Promedio Mensual": df_numerico.mean(axis=1),
    "Min Mensual": df_numerico.min(axis=1),
    "Max Mensual": df_numerico.max(axis=1),
    "Desviación Std": df_numerico.std(axis=1)
})

# ===============================
# 4. Resumen por mes
# ===============================
resumen_mes = pd.DataFrame({
    "Total del Mes": df_numerico.sum(),
    "Promedio del Mes": df_numerico.mean(),
    "Min del Mes": df_numerico.min(),
    "Max del Mes": df_numerico.max()
})

# ===============================
# 5. Variación mes a mes (tendencia)
# ===============================
variacion_mensual = df_numerico.diff(axis=1)
variacion_mensual.insert(0, "Gastos", df["Gastos"])

# ===============================
# 6. Tendencia promedio por categoría
# ===============================
tendencia_categoria = pd.DataFrame({
    "Gasto": df["Gastos"],
    "Crecimiento Promedio Mensual": variacion_mensual.drop(columns="Gastos").mean(axis=1)
})

# ===============================
# 7. Exportar a Excel (varias hojas)
# ===============================
with pd.ExcelWriter(archivo_salida, engine="openpyxl") as writer:
    df.to_excel(writer, sheet_name="Datos Originales", index=False)
    resumen_categoria.to_excel(writer, sheet_name="Resumen por Categoría", index=False)
    resumen_mes.to_excel(writer, sheet_name="Resumen por Mes")
    variacion_mensual.to_excel(writer, sheet_name="Variación Mensual", index=False)
    tendencia_categoria.to_excel(writer, sheet_name="Tendencias", index=False)

print("✅ Análisis exportado correctamente a:", archivo_salida)
