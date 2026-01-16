package com.gradientclock.watch

import com.gradientclock.shared.GradientClockAPI
import com.gradientclock.shared.model.TimeFormat
import com.gradientclock.shared.repository.FileConfigRepository
import java.io.File

/**
 * Watch application main entry point
 * Compact display optimized for small screens
 */
class WatchApp(configDir: File) {
    private val api = GradientClockAPI(
        FileConfigRepository(File(configDir, "clock_config.json"))
    )
    
    fun displayCompactClock() {
        val config = api.getConfig()
        val now = java.time.LocalDateTime.now()
        
        val hour = now.hour
        val minute = now.minute
        val second = now.second
        
        val timeDisplay = when (config.timeFormat) {
            TimeFormat.HOURS_12 -> {
                val h = if (hour == 0) 12 else if (hour > 12) hour - 12 else hour
                val suffix = if (hour >= 12) "PM" else "AM"
                String.format("%d:%02d %s", h, minute, suffix)
            }
            TimeFormat.HOURS_24 -> {
                String.format("%02d:%02d", hour, minute)
            }
        }
        
        // Compact display for watch
        println("┌──────────────┐")
        println("│  $timeDisplay  │")
        println("│ ${config.theme.name.take(12).padEnd(12)} │")
        println("└──────────────┘")
    }
    
    fun syncWithPhone(json: String) {
        api.importConfigJson(json)
        println("✓ Synced with phone")
    }
}

fun main() {
    val configDir = File(System.getProperty("user.home"), ".gradientclock")
    val app = WatchApp(configDir)
    
    println("=== Gradient Clock V2 (Watch) ===")
    app.displayCompactClock()
}
