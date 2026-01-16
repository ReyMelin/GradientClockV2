# GradientClockV2

A modern gradient-based clock application with synchronized configuration across multiple platforms.

## 🎨 Features

- **Beautiful Gradient Clock Display**: Time represented through animated gradient rings
- **Multi-Platform Support**: Shared configuration across Phone, Watch, and Widget
- **Customizable Themes**: 6 built-in themes (Purple Dream, Ocean Blue, Sunset Orange, Forest Green, Rose Pink, Midnight Dark)
- **Time Format Options**: Switch between 12-hour and 24-hour formats
- **Configuration Sync**: JSON-based serialization for easy config sharing

## 📁 Project Structure

```
GradientClockV2/
├── index.html              # Web-based clock interface
├── shared/                 # Pure Kotlin shared module
│   └── src/main/kotlin/
│       ├── model/          # Data models (ClockConfig, Theme, TimeFormat)
│       ├── repository/     # Configuration storage layer
│       └── GradientClockAPI.kt  # Main API
├── phone/                  # Phone application module
├── watch/                  # Watch application module
└── widget/                 # Widget application module
```

## 🚀 Getting Started

### Web Interface

Simply open `index.html` in a web browser to see the gradient clock in action.

### Kotlin Modules

#### Build the project:
```bash
./gradlew build
```

#### Run Phone App:
```bash
./gradlew :phone:run
```

#### Run Watch App:
```bash
./gradlew :watch:run
```

#### Run Widget App:
```bash
./gradlew :widget:run
```

#### Run Tests:
```bash
./gradlew test
```

## 💾 Configuration

Configuration is stored as JSON and shared across all platforms:

```json
{
  "timeFormat": "HOURS_24",
  "theme": {
    "name": "Purple Dream",
    "startColor": "#667eea",
    "endColor": "#764ba2"
  },
  "lastUpdated": 1705449600000
}
```

### Using the Shared Module

```kotlin
import com.gradientclock.shared.GradientClockAPI
import com.gradientclock.shared.model.TimeFormat
import com.gradientclock.shared.model.Theme
import com.gradientclock.shared.repository.FileConfigRepository
import java.io.File

// Initialize API
val api = GradientClockAPI(
    FileConfigRepository(File(configDir, "clock_config.json"))
)

// Get current config
val config = api.getConfig()

// Update time format
api.setTimeFormat(TimeFormat.HOURS_12)

// Change theme
api.setTheme(Theme.OCEAN)

// Export/Import for syncing
val json = api.exportConfigJson()
api.importConfigJson(json)
```

## 🎨 Available Themes

1. **Purple Dream**: `#667eea` → `#764ba2`
2. **Ocean Blue**: `#2E3192` → `#1BFFFF`
3. **Sunset Orange**: `#FF6B6B` → `#FFD93D`
4. **Forest Green**: `#134E5E` → `#71B280`
5. **Rose Pink**: `#F857A6` → `#FF5858`
6. **Midnight Dark**: `#0F2027` → `#2C5364`

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend/Shared**: Pure Kotlin with Kotlinx Serialization
- **Build System**: Gradle with Kotlin DSL
- **Serialization**: kotlinx-serialization-json

## 📱 Platform-Specific Features

### Phone
- Full-featured clock display
- Theme and format customization
- Configuration management

### Watch
- Compact display optimized for small screens
- Sync with phone configuration
- Quick time display

### Widget
- Minimal home screen widget
- HTML/CSS rendering support
- Real-time configuration updates

## 🔧 Development

### Requirements
- JDK 17 or higher
- Gradle 8.x
- Modern web browser (for HTML interface)

### Adding a New Theme

```kotlin
// In shared/src/main/kotlin/com/gradientclock/shared/model/ClockConfig.kt
val CUSTOM = Theme("Custom Name", "#START_COLOR", "#END_COLOR")

// Add to companion object's all() function
fun all(): List<Theme> = listOf(PURPLE, OCEAN, SUNSET, FOREST, ROSE, MIDNIGHT, CUSTOM)
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request
Gradient Clock with Figma UX/UI framework
