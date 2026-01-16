package com.gradientclock.shared.model

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

class ClockConfigTest {
    
    @Test
    fun `test default configuration`() {
        val config = ClockConfig.default()
        assertEquals(TimeFormat.HOURS_24, config.timeFormat)
        assertEquals(Theme.PURPLE, config.theme)
    }
    
    @Test
    fun `test JSON serialization`() {
        val config = ClockConfig(
            timeFormat = TimeFormat.HOURS_12,
            theme = Theme.OCEAN
        )
        
        val json = config.toJson()
        assertNotNull(json)
        
        val restored = ClockConfig.fromJson(json)
        assertEquals(config.timeFormat, restored.timeFormat)
        assertEquals(config.theme.name, restored.theme.name)
    }
    
    @Test
    fun `test time format 12h`() {
        val format = TimeFormat.HOURS_12
        assertEquals("12 AM", format.format(0))
        assertEquals("1 AM", format.format(1))
        assertEquals("12 PM", format.format(12))
        assertEquals("1 PM", format.format(13))
        assertEquals("11 PM", format.format(23))
    }
    
    @Test
    fun `test time format 24h`() {
        val format = TimeFormat.HOURS_24
        assertEquals("00", format.format(0))
        assertEquals("01", format.format(1))
        assertEquals("12", format.format(12))
        assertEquals("23", format.format(23))
    }
    
    @Test
    fun `test all themes available`() {
        val themes = Theme.all()
        assertEquals(6, themes.size)
        assertNotNull(themes.find { it.name == "Purple Dream" })
        assertNotNull(themes.find { it.name == "Ocean Blue" })
    }
    
    @Test
    fun `test find theme by name`() {
        val theme = Theme.findByName("Ocean Blue")
        assertNotNull(theme)
        assertEquals("#2E3192", theme.startColor)
        assertEquals("#1BFFFF", theme.endColor)
    }
}
