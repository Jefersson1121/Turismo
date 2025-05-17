
import pandas as pd
import matplotlib.pyplot as plt

# Leer el archivo
df = pd.read_csv('registro.csv', sep=',')

# Filtrar solo hoteles
hoteles_df = df[df['SUB_CATEGORIA'].str.contains('HOTEL', case=False, na=False)]

# Agrupar por municipio
camas_por_municipio = hoteles_df.groupby('MUNICIPIO')['CAMAS'].sum().sort_values(ascending=False)

# Agrupar por nombre del hotel
camas_por_hotel = hoteles_df.groupby('RAZON_SOCIAL_ESTABLECIMIENTO')['CAMAS'].sum().sort_values(ascending=False).head(10)

# Graficar municipios
plt.figure(figsize=(10, 6))
camas_por_municipio.head(10).plot(kind='bar', color='skyblue')
plt.title('Top 10 Municipios con más camas en hoteles')
plt.ylabel('Número de camas')
plt.xlabel('Municipio')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# Graficar hoteles
plt.figure(figsize=(10, 6))
camas_por_hotel.plot(kind='bar', color='salmon')
plt.title('Top 10 Hoteles con más camas')
plt.ylabel('Número de camas')
plt.xlabel('Hotel')
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.show()
