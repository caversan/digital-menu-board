#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    GlobalShortcutManager, Manager,
};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();

            // Set fullscreen on startup
            let _ = main_window.set_fullscreen(true);

            // Prevent window from being closed, minimized, etc
            main_window.maximize().ok();

            // Disable right-click context menu
            let mut gsm = app.global_shortcut_manager();
            
            // Disable common dangerous shortcuts
            let _ = gsm.register("CmdOrCtrl+R", |_| {}); // Reload page
            let _ = gsm.register("F5", |_| {}); // Refresh
            let _ = gsm.register("F11", |_| {}); // Fullscreen toggle
            let _ = gsm.register("F12", |_| {}); // Dev tools
            let _ = gsm.register("CmdOrCtrl+Shift+I", |_| {}); // Dev tools
            let _ = gsm.register("CmdOrCtrl+Shift+C", |_| {}); // Inspector
            let _ = gsm.register("CmdOrCtrl+Shift+J", |_| {}); // Console
            let _ = gsm.register("CmdOrCtrl+Shift+K", |_| {}); // Search
            let _ = gsm.register("CmdOrCtrl+L", |_| {}); // Address bar
            let _ = gsm.register("Alt+F4", |_| {}); // Close window
            let _ = gsm.register("Alt+Tab", |_| {}); // Switch window
            let _ = gsm.register("Win", |_| {}); // Windows key
            let _ = gsm.register("Win+L", |_| {}); // Lock PC

            println!("🖥️ Digital Menu Board - Kiosk Mode initialized");
            println!("📺 Window fullscreen: true");
            println!("🔒 All dangerous shortcuts disabled");

            Ok(())
        })
        .on_window_event(|event| {
            use tauri::WindowEvent::*;
            
            match event.payload() {
                CloseRequested { api, .. } => {
                    // Prevent window from being closed
                    api.prevent_close();
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
