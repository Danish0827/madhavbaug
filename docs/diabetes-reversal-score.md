# Diabetes Reversal Score — Data Analysis & Proposed Logic

Source data: `Raw retrospective DM Data_Aziz Sir.xlsx` — **19,564 patients**, baseline vs
Day-90 outcomes (HbA1c, weight, BMI, SBP/DBP, abdominal girth). Retrospective, single arm.

---

## 1. What the data shows (aggregate, all 19,564 patients)

| Metric | Baseline | Day 90 | Mean change |
|---|---|---|---|
| HbA1c (%) | 8.68 | 6.84 | **−1.84** (−19% relative) |
| Weight (kg) | — | — | **−5.33** |
| SBP (mmHg) | — | — | **−9.43** |
| Abdominal girth (cm) | — | — | **−9.67** |

**Outcome rates**

| Outcome | Patients | Rate |
|---|---|---|
| Any HbA1c reduction | 17,388 | 88.9% |
| Reduction ≥ 1% (responder) | 13,145 | 67.2% |
| Reduction ≥ 2% | 7,725 | 39.5% |
| **Reached < 7% (glycemic control)** | 13,224 | **67.6%** |
| Reached < 6.5% (remission range) | 10,490 | 53.6% |
| Reached < 5.7% (normal) | 1,905 | 9.7% |

## 2. The single dominant predictor: baseline HbA1c band

Reversal chance falls sharply as baseline HbA1c rises. This is Dr Pravin's HbA1c-range idea,
confirmed by the data:

| Baseline HbA1c | n | Mean drop | **% reaching < 7%** |
|---|---|---|---|
| 6.5 – 7.0 | 1,902 | 0.60 | **94.6%** |
| 7.0 – 7.5 | 2,402 | 0.88 | **87.1%** |
| 7.5 – 8.5 | 4,242 | 1.42 | **76.2%** |
| 8.5 – 10.0 | 4,214 | 2.16 | **58.7%** |
| ≥ 10.0 | 4,866 | 3.59 | **36.5%** |

Note the trade-off: higher-baseline patients drop *more* absolute points but are *less* likely
to cross below 7%.

## 3. Secondary predictors

- **Baseline BMI — positive effect (counter-intuitive but clinically sound).** Higher BMI ⇒
  more reversible lifestyle/insulin-resistance component ⇒ better odds:
  BMI < 23 → 62.4% reach < 7%; 23–27.5 → 66.3%; 27.5–32 → 69.7%; ≥ 32 → **71.6%**.
  Lean diabetics more often have insulin-deficient disease that is harder to reverse.
- **Age — mild.** < 40 → 68.3% down to ≥ 70 → 65.5%. Younger slightly better.
- **Gender — negligible.** Male 67.9% vs Female 66.7%.

---

## 4. Proposed logic — two distinct scores

### A. Reversal Likelihood Score (prognostic, computed at BASELINE, 0–100)

Estimated *before/at start of* treatment to counsel a prospective patient. Weights are
anchored to the predictors above (HbA1c dominant, BMI + age secondary).

**Baseline HbA1c (0–60, inverse — the anchor)**
`<7.0 → 60 · 7.0–7.5 → 52 · 7.5–8.5 → 44 · 8.5–10 → 32 · ≥10 → 20`

**Baseline BMI (0–25 — higher = more reversible)**
`≥32 → 25 · 27.5–32 → 21 · 23–27.5 → 16 · <23 → 11`

**Age (0–15)**
`<40 → 15 · 40–60 → 12 · ≥60 → 9`

Total 0–100 → tier:

| Tier | Score | **Actual % who reached < 7% in this dataset** (calibration) |
|---|---|---|
| High likelihood | ≥ 75 | **88.7%** (n = 8,064) |
| Good likelihood | 60–74 | **66.1%** (n = 5,697) |
| Moderate | 45–59 | **40.5%** (n = 5,120) |
| Guarded | < 45 | **33.7%** (n = 683) |

The tiers separate cleanly and monotonically against real outcomes — this model is calibrated,
not guessed. The tier's actual-rate column can be shown to patients as an evidence-based
"people like you" figure.

### B. Reversal Outcome Grade (retrospective, computed at DAY 90)

Grades what actually happened — for internal reporting / follow-up dashboards. Aligns with
ADA remission conventions.

| Grade | Definition | Rate in data |
|---|---|---|
| **Remission-range** | Day-90 HbA1c < 6.5% **and** drop ≥ 1% | 53.6% |
| **Controlled** | Day-90 HbA1c < 7% | 67.6% |
| **Partial responder** | drop ≥ 1% but still ≥ 7% | ~ (67.2% − controlled overlap) |
| **Non-responder** | drop < 1% | 32.8% |

---

## 5. Caveats

- Retrospective, single-arm (no control group) — describes *observed* reversal in this cohort,
  not causal proof vs. no treatment.
- Only baseline + Day 90; no medication, diet-adherence, or diabetes-duration fields, all of
  which affect reversal. Duration especially would sharpen the score if available.
- The Likelihood Score's tier rates are in-sample; a held-out validation is recommended before
  quoting the percentages to patients.
