#!/usr/bin/env python3
"""
Simulador de Emulador WebOS
Simula uma TV webOS rodando a aplicação locally
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
import sys
from datetime import datetime
from urllib.parse import urlsplit, unquote
import mimetypes

mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('application/json', '.json')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('video/mp4', '.mp4')

class WebOSEmulatorHandler(SimpleHTTPRequestHandler):
    """Handler para emular servidor webOS"""
    
    def __init__(self, *args, **kwargs):
        # Servir arquivos de dist/
        super().__init__(*args, directory='dist', **kwargs)

    def guess_type(self, path):
        mime_type = super().guess_type(path)
        if path.endswith('.js'):
            return 'application/javascript'
        return mime_type
    
    def end_headers(self):
        """Adicionar headers webOS ao final de cada resposta"""
        self.send_header('X-webOS-Version', '6.0')
        self.send_header('X-Device-ID', 'emulator-webos')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
    
    def do_GET(self):
        """Tratar requisições GET com headers webOS e MIME types corretos"""
        try:
            parsed = urlsplit(self.path)
            request_path = unquote(parsed.path)

            if request_path in ['/', '/index.html']:
                self.path = '/index.html'
            else:
                candidate = Path('dist') / request_path.lstrip('/')
                has_extension = Path(request_path).suffix != ''

                if candidate.exists() and candidate.is_file():
                    self.path = request_path
                elif has_extension:
                    self.send_error(404)
                    return
                else:
                    self.path = '/index.html'

            response_path = Path('dist') / self.path.lstrip('/')
            mime_type, _ = mimetypes.guess_type(str(response_path))
            print(f"[{datetime.now().strftime('%H:%M:%S')}] GET {request_path} -> {self.path} ({mime_type or 'unknown'})")

            super().do_GET()
        except Exception as e:
            print(f"❌ Erro ao servir {self.path}: {e}")
            self.send_error(500)
    
    def log_message(self, format, *args):
        """Suprimir logs automáticos (já fazemos isso em do_GET)"""
        pass


def start_emulator(port=3002):
    """Iniciar emulador webOS"""
    
    # Verificar se dist/ existe
    if not Path('dist').exists():
        print("❌ Erro: dist/ não encontrado!")
        print("Execute: npm run build")
        return False
    
    print("\n" + "="*70)
    print("📺 WebOS Emulator - Simulação Local")
    print("="*70)
    print(f"\n✅ Aplicação pronta para testes\n")
    print(f"🌐 Abra um navegador em:")
    print(f"   → http://localhost:{port}/")
    print(f"   → http://127.0.0.1:{port}/")
    print(f"\n📊 Informações da Simulação:")
    print(f"   Diretório: dist/")
    print(f"   Porta: {port}")
    print(f"   Plataforma: webOS 6.0+ (simulado)")
    print(f"\n🎮 Simular Controle Remoto:")
    print(f"   - Abra DevTools (F12)")
    print(f"   - Verificar console para logs")
    print(f"\n📝 Logs da Aplicação:")
    print(f"   Verifique o console do navegador (F12 → Console)")
    print(f"\n⚠️  Para sair: Pressione CTRL+C")
    print("="*70 + "\n")
    
    # Criar servidor
    server_address = ('', port)
    try:
        httpd = HTTPServer(server_address, WebOSEmulatorHandler)
        print(f"✅ Servidor iniciado na porta {port}\n")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n❌ Servidor parado pelo usuário")
        return True
    except OSError as e:
        print(f"❌ Erro ao iniciar servidor: {e}")
        if e.errno == 48 or e.errno == 'EADDRINUSE':
            print(f"   Porta {port} já está em uso!")
            print(f"   Tente: http://localhost:{port}")
        return False
    
    return True


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3003
    success = start_emulator(port)
    exit(0 if success else 1)
