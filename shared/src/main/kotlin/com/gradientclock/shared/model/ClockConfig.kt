package com.gradientclock.shared.model

import kotlinx.serialization.Serializable

/**
 * Shared configuration model for GradientClock V2
 * This configuration is serializable to JSON and can be shared across
 * all platforms: phone, watch, and widget
 */
@Serializable
data class ClockConfig(
    val timeFormat: TimeFormat = TimeFormat.HOURS_24,
    val theme: Theme = Theme.PURPLE,
    val lastUpdated: Long = System.currentTimeMillis()
) {
    
    /**
     * Export configuration as JSON string
     */
    fun toJson(): String = kotlinx.serialization.json.Json.encodeToString(serializer(), this)
    
    companion object {
        /**
         * Import configuration from JSON string
         */
        fun fromJson(json: String): ClockConfig = 
            kotlinx.serialization.json.Json.decodeFromString(serializer(), json)
        
        /**
         * Default configuration
         */
        fun default() = ClockConfig()
    }
}

@Serializable
enum class TimeFormat {
    HOURS_12,
    HOURS_24;
    
    fun format(hour: Int): String {
        return when (this) {
            HOURS_12 -> {
                val h = if (hour == 0) 12 else if (hour > 12) hour - 12 else hour
                val suffix = if (hour >= 12) "PM" else "AM"
                "$h $suffix"
            }
            HOURS_24 -> hour.toString().padStart(2, '0')
        }
    }
}

@Serializable
data class Theme(
    val name: String,
    val startColor: String,
    val endColor: String
) {
    companion object {
        val PURPLE = Theme("Purple Dream", "#667eea", "#764ba2")
        val OCEAN = Theme("Ocean Blue", "#2E3192", "#1BFFFF")
        val SUNSET = Theme("Sunset Orange", "#FF6B6B", "#FFD93D")
        val FOREST = Theme("Forest Green", "#134E5E", "#71B280")
        val ROSE = Theme("Rose Pink", "#F857A6", "#FF5858")
        val MIDNIGHT = Theme("Midnight Dark", "#0F2027", "#2C5364")
        
        /**
         * Get all available themes
         */
        fun all(): List<Theme> = listOf(PURPLE, OCEAN, SUNSET, FOREST, ROSE, MIDNIGHT)
        
        /**
         * Find theme by name
         */
        fun findByName(name: String): Theme? = all().find { it.name == name }
    }
}
