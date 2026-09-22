import os
from PIL import Image

input_folder = "images_original"
output_folder = "images"
max_size = (1200, 1200) # Este es el truco mágico, ninguna foto será gigantesca

if not os.path.exists(output_folder):
    os.makedirs(output_folder)

for filename in os.listdir(input_folder):
    if filename.lower().endswith((".png", ".jpg", ".jpeg")):
        input_path = os.path.join(input_folder, filename)
        name_without_ext = os.path.splitext(filename)[0]
        output_filename = f"{name_without_ext}.webp"
        output_path = os.path.join(output_folder, output_filename)
        
        try:
            with Image.open(input_path) as img:
                # Redimensionamos la imagen si es muy grande, manteniendo la proporción
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                
                # Guardamos como WebP
                img.save(output_path, "webp", quality=90, method=6)
                
                old_size = os.path.getsize(input_path) / 1024
                new_size = os.path.getsize(output_path) / 1024
                print(f"✅ {filename} optimizada y escalada | De {old_size:.1f}KB a {new_size:.1f}KB")
                
        except Exception as e:
            print(f"❌ Error al procesar {filename}: {e}")

print("\n🚀 ¡Todas las imágenes están listas para tu web!")