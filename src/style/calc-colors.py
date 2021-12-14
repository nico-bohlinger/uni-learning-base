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

dark_filter_name = "$f1"
dark_filter_hue = 191

def get_dark_filter(hue):
    return f"invert(90%) sepia(50%) saturate(1000%) hue-rotate({hue}deg) brightness(98%) contrast(92%)"

diff = target_color_hsv - main_color_hsv
new_dark_filter_hue = dark_filter_hue + diff[0] * 360

with open('colors.scss', 'w') as f:
    for color in new_colors:
        f.write(f"{color}: {new_colors[color]};\n")
    f.write(f"{dark_filter_name}: {get_dark_filter(new_dark_filter_hue)};")
