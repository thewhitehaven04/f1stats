import Color from "color"

export function getAlternativeColor(color: string) {
    return Color(color).isDark() ? Color(color).lighten(0.5).hex() : Color(color).darken(0.5).hex()
}
