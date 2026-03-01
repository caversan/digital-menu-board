/**
 * Debug Script para webOS Emulator
 * Cole isso no console (F12) para diagnosticar problemas
 */

// ============================================
// 1. Verificar se app foi inicializado
// ============================================
console.log('%c=== DIAGNÓSTICO DO APP WEBOS ===', 'color: cyan; font-size: 16px; font-weight: bold;');

// Verificar window.webOS
console.log('window.webOS:', (window as any).webOS ? '✅ Detectado' : '❌ Não detectado');

// ============================================
// 2. Verificar RemoteControl
// ============================================
console.log('\n%c--- RemoteControl---', 'color: orange; font-weight: bold;');
try {
  const remoteStatus = (window as any).__WEBOS_REMOTE_CONTROL_INITIALIZED;
  console.log('RemoteControl inicializado:', remoteStatus ? '✅' : '❌');
} catch (e) {
  console.log('Erro ao verificar RemoteControl:', e);
}

// ============================================
// 3. Verificar estado do Zustand Store
// ============================================
console.log('\n%c--- Estado da Aplicação ---', 'color: green; font-weight: bold;');

// Procurar por element com ID 'root'
const root = document.getElementById('root');
if (root) {
  console.log('React root encontrado: ✅');
  console.log('HTML contenido:', root.innerHTML.substring(0, 100) + '...');
} else {
  console.log('React root NÃO encontrado: ❌');
}

// ============================================
// 4. Verificar se há scripts carregados
// ============================================
console.log('\n%c--- Assets Carregados ---', 'color: blue; font-weight: bold;');
const scripts = document.querySelectorAll('script');
const links = document.querySelectorAll('link[rel="stylesheet"]');
console.log(`Scripts carregados: ${scripts.length}`);
console.log(`Styles carregados: ${links.length}`);

// ============================================
// 5. Simular carregamento de dados
// ============================================
console.log('\n%c--- Testes de Funcionalidade ---', 'color: purple; font-weight: bold;');

// Testar localStorage
try {
  localStorage.setItem('test', 'ok');
  localStorage.removeItem('test');
  console.log('localStorage: ✅');
} catch (e) {
  console.log('localStorage: ❌', e);
}

// Testar fetch
console.log('Testando fetch de appinfo.json...');
fetch('/appinfo.json')
  .then(r => {
    console.log('appinfo.json status:', r.status, r.ok ? '✅' : '❌');
    return r.json();
  })
  .then(data => {
    console.log('appinfo.json loaded:', data);
  })
  .catch(e => {
    console.error('Erro ao carregar appinfo.json:', e);
  });

// ============================================
// 6. Testar controle remoto (simulação)
// ============================================
console.log('\n%c--- Teste de Controle Remoto ---', 'color: red; font-weight: bold;');
console.log('Simulando teclas...');

// Simular tecla bloqueada (seta UP)
console.log('\n📌 Enviando comando: Seta UP (deve ser BLOQUEADA)');
document.dispatchEvent(new KeyboardEvent('keydown', {
  keyCode: 38,
  key: 'ArrowUp',
  bubbles: true,
  cancelable: true
}));

// Simular BACK (deve funcionar)
setTimeout(() => {
  console.log('\n📌 Enviando comando: BACK/ESC (deve FUNCIONAR)');
  document.dispatchEvent(new KeyboardEvent('keydown', {
    keyCode: 27,
    key: 'Escape',
    bubbles: true,
    cancelable: true
  }));
}, 1000);

// ============================================
// 7. Resumo final
// ============================================
console.log('\n%c=== FIM DO DIAGNÓSTICO ===', 'color: cyan; font-size: 14px;');
console.log('Se tudo estiver ✅, o app deve estar funcionando corretamente.');
console.log('Se houver ❌, verifique os erros acima.');
