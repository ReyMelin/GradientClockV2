package com.gradientclock.shared.repository

import com.gradientclock.shared.model.ClockConfig
import java.io.File

/**
 * Repository for managing clock configuration
 * Handles loading, saving, and syncing configuration across platforms
 */
interface ConfigRepository {
    /**
     * Load configuration from storage
     */
    fun loadConfig(): ClockConfig
    
    /**
     * Save configuration to storage
     */
    fun saveConfig(config: ClockConfig)
    
    /**
     * Export configuration as JSON
     */
    fun exportJson(): String
    
    /**
     * Import configuration from JSON
     */
    fun importJson(json: String): ClockConfig
}

/**
 * File-based implementation of ConfigRepository
 */
class FileConfigRepository(
    private val configFile: File
) : ConfigRepository {
    
    override fun loadConfig(): ClockConfig {
        return if (configFile.exists()) {
            try {
                val json = configFile.readText()
                ClockConfig.fromJson(json)
            } catch (e: Exception) {
                println("Error loading config: ${e.message}")
                ClockConfig.default()
            }
        } else {
            ClockConfig.default()
        }
    }
    
    override fun saveConfig(config: ClockConfig) {
        try {
            configFile.parentFile?.mkdirs()
            configFile.writeText(config.toJson())
        } catch (e: Exception) {
            println("Error saving config: ${e.message}")
        }
    }
    
    override fun exportJson(): String {
        return loadConfig().toJson()
    }
    
    override fun importJson(json: String): ClockConfig {
        val config = ClockConfig.fromJson(json)
        saveConfig(config)
        return config
    }
}

/**
 * In-memory implementation for testing
 */
class InMemoryConfigRepository : ConfigRepository {
    private var config: ClockConfig = ClockConfig.default()
    
    override fun loadConfig(): ClockConfig = config
    
    override fun saveConfig(config: ClockConfig) {
        this.config = config
    }
    
    override fun exportJson(): String = config.toJson()
    
    override fun importJson(json: String): ClockConfig {
        config = ClockConfig.fromJson(json)
        return config
    }
}
