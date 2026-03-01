#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

// Command to close the application
#[tauri::command]
fn close_app(app: tauri::AppHandle) {
    println!("🔐 Exit shortcut detected - closing application...");
    app.exit(0);
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let main_window = app.get_webview_window("main").unwrap();

            // Set fullscreen on startup
            let _ = main_window.set_fullscreen(true);

            println!("🖥️ Digital Menu Board - Kiosk Mode initialized");
            println!("📺 Window fullscreen: true");
            println!("🔒 Security handlers active");
            println!("⌨️  Exit shortcut: Q");

            Ok(())
        })
        .on_window_event(|window, event| {
            use tauri::WindowEvent::*;

            match event {
                CloseRequested { api, .. } => {
                    // Prevent window from being closed
                    api.prevent_close();
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![close_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
