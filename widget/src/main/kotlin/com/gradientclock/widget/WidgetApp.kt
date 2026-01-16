package com.gradientclock.widget

import com.gradientclock.shared.GradientClockAPI
import com.gradientclock.shared.model.TimeFormat
import com.gradientclock.shared.repository.FileConfigRepository
import java.io.File

/**
 * Widget application main entry point
 * Minimal display for home screen widgets
 */
class WidgetApp(configDir: File) {
    private val api = GradientClockAPI(
        FileConfigRepository(File(configDir, "clock_config.json"))
    )
    
    fun renderWidget(): String {
        val config = api.getConfig()
        val now = java.time.LocalDateTime.now()
        
        val hour = now.hour
        val minute = now.minute
        
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
        
        // Generate gradient CSS for widget
        val gradient = "background: linear-gradient(135deg, ${config.theme.startColor}, ${config.theme.endColor});"
        
        return """
            <div class="gradient-clock-widget" style="$gradient">
                <div class="time">$timeDisplay</div>
                <div class="theme">${config.theme.name}</div>
            </div>
        """.trimIndent()
    }
    
    fun getWidgetData(): Map<String, Any> {
        val config = api.getConfig()
        val now = java.time.LocalDateTime.now()
        
        return mapOf(
            "hours" to now.hour,
            "minutes" to now.minute,
            "seconds" to now.second,
            "timeFormat" to config.timeFormat.name,
            "theme" to mapOf(
                "name" to config.theme.name,
                "startColor" to config.theme.startColor,
                "endColor" to config.theme.endColor
            )
        )
    }
}

fun main() {
    val configDir = File(System.getProperty("user.home"), ".gradientclock")
    val app = WidgetApp(configDir)
    
    println("=== Gradient Clock V2 (Widget) ===")
    println(app.renderWidget())
    println("\nWidget Data:")
    println(app.getWidgetData())
}
