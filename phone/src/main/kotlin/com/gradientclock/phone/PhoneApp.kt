package com.gradientclock.phone

import com.gradientclock.shared.GradientClockAPI
import com.gradientclock.shared.model.TimeFormat
import com.gradientclock.shared.model.Theme
import com.gradientclock.shared.repository.FileConfigRepository
import java.io.File

/**
 * Phone application main entry point
 * Demonstrates how to use the shared configuration module
 */
class PhoneApp(configDir: File) {
    private val api = GradientClockAPI(
        FileConfigRepository(File(configDir, "clock_config.json"))
    )
    
    fun displayClock() {
        val config = api.getConfig()
        val now = java.time.LocalDateTime.now()
        
        println("=== Gradient Clock V2 (Phone) ===")
        println("Theme: ${config.theme.name}")
        println("Colors: ${config.theme.startColor} → ${config.theme.endColor}")
        
        val hour = now.hour
        val minute = now.minute
        val second = now.second
        
        val timeDisplay = when (config.timeFormat) {
            TimeFormat.HOURS_12 -> {
                val h = if (hour == 0) 12 else if (hour > 12) hour - 12 else hour
                val suffix = if (hour >= 12) "PM" else "AM"
                String.format("%02d:%02d:%02d %s", h, minute, second, suffix)
            }
            TimeFormat.HOURS_24 -> {
                String.format("%02d:%02d:%02d", hour, minute, second)
            }
        }
        
        println("Time: $timeDisplay")
        println("Last Updated: ${java.time.Instant.ofEpochMilli(config.lastUpdated)}")
        println("================================")
    }
    
    fun changeTheme(theme: Theme) {
        api.setTheme(theme)
        println("Theme changed to: ${theme.name}")
    }
    
    fun changeTimeFormat(format: TimeFormat) {
        api.setTimeFormat(format)
        println("Time format changed to: $format")
    }
    
    fun exportConfig(): String {
        return api.exportConfigJson()
    }
    
    fun importConfig(json: String) {
        api.importConfigJson(json)
        println("Configuration imported successfully")
    }
}

fun main() {
    val configDir = File(System.getProperty("user.home"), ".gradientclock")
    val app = PhoneApp(configDir)
    
    // Display current clock
    app.displayClock()
    
    // Example: Change theme
    println("\nChanging to Ocean theme...")
    app.changeTheme(Theme.OCEAN)
    app.displayClock()
    
    // Example: Export config
    println("\nExported config:")
    println(app.exportConfig())
}
