import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

INPUT  = "채널정산 시트 자동생성.png"
OUTPUT = "채널정산 시트 자동생성_blurred.png"

IS_MAY_2026 = True   # True → 숫자 블러 + 채널명 첫글자 * 치환

# ── 테이블 그리드 경계 ────────────────────────────────────────────────
COL_NAME_X1, COL_NAME_X2 = 8, 127    # 채널사 이름 열
DATA_X1 = 130                          # 숫자 데이터 열 시작
DATA_X2 = 893

# 수평 행 경계 (y)
row_ys = [115, 139, 164, 189, 214, 239, 264, 289, 314, 339, 364,
          396, 421, 446, 471, 496, 521, 552, 577, 602]

# 수직 열 경계 (x) - 숫자 열
col_xs = [130, 208, 287, 366, 445, 524, 603, 682, 761, 893]

# 채널사 이름과 글자 수 (소계 제외)
channels = [
    ('비트버니', 4), ('메모G',   3), ('야핏무브', 4), ('베네카페', 4),
    ('포켓 CU',  4), ('디지로카', 4), ('오락',    2), ('비플페이', 4),
    ('PASS',    4), ('PASS by KT', 10), ('카카오페이', 5), ('KB Pay', 6),
    ('베네피아', 4), ('ZUM',    3), ('트레져러', 4), ('라운드',  3),
    ('광주와뱅크', 5), ('신디',   2),
]
# row 18 = 소계 (스킵)

# ── 이미지 로드 ──────────────────────────────────────────────────────
img_cv = cv2.imread(INPUT)
h, w   = img_cv.shape[:2]
result = img_cv.copy()

# ═══════════════════════════════════════════════════════════════════
# 1) 숫자 셀 블러
# ═══════════════════════════════════════════════════════════════════
blur_count = 0
for i in range(len(row_ys) - 1):
    y1, y2 = row_ys[i], row_ys[i + 1]
    for j in range(len(col_xs) - 1):
        x1, x2 = col_xs[j], col_xs[j + 1]
        cell = result[y1:y2, x1:x2]
        if cell.size == 0:
            continue
        result[y1:y2, x1:x2] = cv2.GaussianBlur(cell, (31, 31), 0)
        blur_count += 1

print(f"숫자 셀 블러: {blur_count}개")

# ═══════════════════════════════════════════════════════════════════
# 2) 채널사 첫 글자 → *  (소계 행은 스킵)
# ═══════════════════════════════════════════════════════════════════
gray = cv2.cvtColor(result, cv2.COLOR_BGR2GRAY)
pil_img = Image.fromarray(cv2.cvtColor(result, cv2.COLOR_BGR2RGB))
draw = ImageDraw.Draw(pil_img)

# 한글 폰트 (AppleSDGothicNeo)
FONT_PATH = "/System/Library/Fonts/AppleSDGothicNeo.ttc"

for i, (name, nchars) in enumerate(channels):
    y1, y2 = row_ys[i], row_ys[i + 1]
    row_h  = y2 - y1

    # 셀 내부 (테두리 제외)
    cell_gray = gray[y1 + 2: y2 - 2, COL_NAME_X1 + 2: COL_NAME_X2 - 2]
    _, binary = cv2.threshold(cell_gray, 160, 255, cv2.THRESH_BINARY_INV)
    col_sums  = np.sum(binary > 0, axis=0)  # 각 열의 dark pixel 수

    dark_cols = np.where(col_sums > 0)[0]
    if len(dark_cols) == 0:
        print(f"  row{i} {name}: 텍스트 없음, 스킵")
        continue

    # 텍스트 전체 x 범위
    rel_x_start = int(dark_cols[0])
    rel_x_end   = int(dark_cols[-1])
    text_width  = rel_x_end - rel_x_start + 1

    # 첫 글자 폭 추정 (전체 폭 / 글자 수, 단 최소 8px)
    char_w = max(8, round(text_width / nchars))

    # y 범위 (dark pixel 있는 행)
    row_sums = np.sum(binary > 0, axis=1)
    dark_rows = np.where(row_sums > 0)[0]
    if len(dark_rows) == 0:
        continue
    rel_y_start = int(dark_rows[0])
    rel_y_end   = int(dark_rows[-1])

    # 절대 좌표로 변환
    abs_x1 = COL_NAME_X1 + 2 + rel_x_start
    abs_x2 = abs_x1 + char_w + 2       # 약간 여유
    abs_y1 = y1 + 2 + rel_y_start
    abs_y2 = y1 + 2 + rel_y_end + 1

    # 배경색 샘플 (첫 글자 바로 왼쪽)
    bg_sample_x = max(COL_NAME_X1, abs_x1 - 5)
    bg_color    = tuple(int(v) for v in result[y1 + row_h // 2, bg_sample_x])
    bg_pil      = (bg_color[2], bg_color[1], bg_color[0])  # BGR→RGB

    # 첫 글자 영역 배경으로 덮기
    draw.rectangle([abs_x1 - 1, abs_y1 - 1, abs_x2 + 1, abs_y2 + 1],
                   fill=bg_pil)

    # '*' 그리기 - 폰트 크기 = 텍스트 높이
    font_size = max(8, abs_y2 - abs_y1)
    try:
        font = ImageFont.truetype(FONT_PATH, font_size)
    except Exception:
        font = ImageFont.load_default()

    # '*' 위치: 첫 글자 중앙
    cx = abs_x1 + char_w // 2
    cy = abs_y1
    bbox = draw.textbbox((0, 0), "*", font=font)
    star_w = bbox[2] - bbox[0]
    draw.text((cx - star_w // 2, cy), "*", fill=(0, 0, 0), font=font)

    print(f"  row{i} {name}: 첫글자 [{abs_x1},{abs_y1}]~[{abs_x2},{abs_y2}] char_w={char_w} font={font_size}")

# PIL → OpenCV 변환 후 저장
result_pil = pil_img
result_pil.save(OUTPUT)
print(f"\n저장 완료: {OUTPUT}")
