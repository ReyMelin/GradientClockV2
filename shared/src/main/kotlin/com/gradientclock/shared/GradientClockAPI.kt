package com.gradientclock.shared

import com.gradientclock.shared.model.ClockConfig
import com.gradientclock.shared.model.TimeFormat
import com.gradientclock.shared.model.Theme
import com.gradientclock.shared.repository.ConfigRepository

/**
 * Main API for GradientClock configuration
 * Use this class to interact with clock configuration across all platforms
 */
class GradientClockAPI(
    private val repository: ConfigRepository
) {
    
    /**
     * Get current configuration
     */
    fun getConfig(): ClockConfig = repository.loadConfig()
    
    /**
     * Update time format
     */
    fun setTimeFormat(format: TimeFormat) {
        val config = getConfig()
        repository.saveConfig(config.copy(
            timeFormat = format,
            lastUpdated = System.currentTimeMillis()
        ))
    }
    
    /**
     * Update theme
     */
    fun setTheme(theme: Theme) {
        val config = getConfig()
        repository.saveConfig(config.copy(
            theme = theme,
            lastUpdated = System.currentTimeMillis()
        ))
    }
    
    /**
     * Update full configuration
     */
    fun updateConfig(config: ClockConfig) {
        repository.saveConfig(config.copy(
            lastUpdated = System.currentTimeMillis()
        ))
    }
    
    /**
     * Export configuration as JSON for sharing
     */
    fun exportConfigJson(): String = repository.exportJson()
    
    /**
     * Import configuration from JSON
     */
    fun importConfigJson(json: String): ClockConfig = repository.importJson(json)
    
    /**
     * Reset to default configuration
     */
    fun resetToDefault() {
        repository.saveConfig(ClockConfig.default())
    }
    
    /**
     * Get all available themes
     */
    fun getAvailableThemes(): List<Theme> = Theme.all()
}
