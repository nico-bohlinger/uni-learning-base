import sys
import matplotlib.colors


target_color_hex = str(sys.argv[1])  # example input: "#44ca23"
main_color_hex = "#4169e1"

target_color_hsv = matplotlib.colors.rgb_to_hsv(matplotlib.colors.to_rgb(target_color_hex))
main_color_hsv = matplotlib.colors.rgb_to_hsv(matplotlib.colors.to_rgb(main_color_hex))

colors = {
    "$c1": "#06102b",
    "$c2": main_color_hex,
    "$c3": "#2f4893",
    "$c4": "#23366d",
    "$c5": "#2f4893",
    "$c6": "#3759bf",
}

new_colors = {}
for color in colors:
    selected_color_hsv = matplotlib.colors.rgb_to_hsv(matplotlib.colors.to_rgb(colors[color]))
    diff = selected_color_hsv - main_color_hsv
    new_color_hsv = target_color_hsv + diff
    new_colors[color] = matplotlib.colors.to_hex(matplotlib.colors.hsv_to_rgb(new_color_hsv))

with open('colors.scss', 'w') as f:
    for i in range(len(new_colors)):
        color = list(new_colors.keys())[i]
        line_break = "\n" if i < len(new_colors) - 1 else ""
        f.write(f"{color}: {new_colors[color]};{line_break}")
