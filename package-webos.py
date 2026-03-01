#!/usr/bin/env python3
"""
Script para empacotar aplicação webOS em arquivo IPK
Um arquivo IPK é um tar.gz com estrutura específica para webOS
"""

import os
import shutil
import tarfile
import zipfile
from pathlib import Path

def create_ipk():
    """Criar arquivo IPK a partir de dist/"""
    
    dist_dir = Path('dist')
    output_dir = Path('webos-build')
    
    # Criar diretório de output
    output_dir.mkdir(exist_ok=True)
    
    # Nome do app
    app_id = 'com.example.digital-menu-board'
    app_version = '1.0.0'
    ipk_filename = f'{app_id}_{app_version}_all.ipk'
    ipk_path = output_dir / ipk_filename
    
    print(f"📦 Criando pacote webOS: {ipk_filename}")
    
    # Verificar se dist/ existe
    if not dist_dir.exists():
        print(f"❌ Erro: {dist_dir} não encontrado!")
        return False
    
    # Verificar se appinfo.json existe
    if not (dist_dir / 'appinfo.json').exists():
        print(f"❌ Erro: appinfo.json não encontrado em {dist_dir}")
        return False
    
    print(f"✅ dist/ encontrado ({dist_dir.stat().st_size / 1024 / 1024:.2f} MB)")
    
    try:
        # Criar arquivo tar.gz (IPK é um tar.gz renomeado)
        with tarfile.open(ipk_path, 'w:gz') as tar:
            # Adicionar todos os arquivos de dist/
            for item in dist_dir.rglob('*'):
                if item.is_file():
                    # Caminho relativo (sem "dist/")
                    arcname = item.relative_to(dist_dir)
                    tar.add(item, arcname=arcname)
                    
        file_size = ipk_path.stat().st_size / 1024 / 1024
        print(f"✅ Pacote criado: {ipk_path}")
        print(f"📊 Tamanho: {file_size:.2f} MB")
        
        # Criar também um ZIP para facilitar download
        zip_path = output_dir / f'{app_id}_{app_version}.zip'
        with zipfile.ZipFile(zip_path, 'w') as zf:
            for item in dist_dir.rglob('*'):
                if item.is_file():
                    arcname = item.relative_to(dist_dir)
                    zf.write(item, arcname=arcname)
        
        zip_size = zip_path.stat().st_size / 1024 / 1024
        print(f"✅ ZIP criado: {zip_path}")
        print(f"📊 Tamanho: {zip_size:.2f} MB")
        
        print("\n" + "="*60)
        print("🎉 Pacotes prontos para deploy!")
        print("="*60)
        print(f"\n📦 Arquivos de saída:")
        print(f"   IPK: webos-build/{ipk_filename}")
        print(f"   ZIP: webos-build/{zip_path.name}")
        print(f"\n🚀 Próximos passos:")
        print(f"   1. Instalar em emulador: ")
        print(f"      ares-install {ipk_filename} -d emulator")
        print(f"   2. Ou em TV registrada:")
        print(f"      ares-install {ipk_filename} -d tv")
        print(f"\n💡 Para desenvolvedores:")
        print(f"   - IPK (tar.gz): Compatível com ares-cli")
        print(f"   - ZIP: Para download/transferência manual")
        
        return True
        
    except Exception as e:
        print(f"❌ Erro ao criar pacote: {e}")
        return False

if __name__ == '__main__':
    success = create_ipk()
    exit(0 if success else 1)
