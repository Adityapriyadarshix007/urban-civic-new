import pandas as pd
import json
from pathlib import Path


def export_priority_results():
    df = pd.read_csv("data/processed/priority_results.csv")

    records = df.to_dict(orient="records")

    output_path = Path("../public/priority_results.json")

    with open(output_path, "w") as f:
        json.dump(records, f, indent=2)

    print("priority_results.json exported")


def export_hotspot_summary():
    df = pd.read_csv("data/processed/hotspot_summary.csv")

    records = df.to_dict(orient="records")

    output_path = Path("../public/hotspot_summary.json")

    with open(output_path, "w") as f:
        json.dump(records, f, indent=2)

    print("hotspot_summary.json exported")


def export_category_priority_matrix():
    priority_df = pd.read_csv("data/processed/priority_results.csv")
    raw_df = pd.read_csv("data/raw/urban_civic_reports_synthetic.csv")

    merged_df = priority_df.merge(
        raw_df[['ID', 'Category']],
        on='ID',
        how='left'
    )

    matrix = pd.crosstab(
        merged_df['Category'],
        merged_df['priority_level']
    )

    result = {
        "categories": matrix.index.tolist(),
        "priorities": matrix.columns.tolist(),
        "matrix": matrix.values.tolist()
    }

    output_path = Path("../public/category_priority_matrix.json")

    with open(output_path, "w") as f:
        json.dump(result, f, indent=2)

    print("category_priority_matrix.json exported")


def export_risk_score_bins():
    df = pd.read_csv("data/processed/priority_results.csv")

    bins = [0, 0.3, 0.5, 0.7, 1.0]
    labels = ["Very Low", "Low", "Medium", "High"]

    df['risk_bin'] = pd.cut(
        df['risk_score'],
        bins=bins,
        labels=labels
    )

    counts = df['risk_bin'].value_counts().sort_index()

    result = [
        {"bin": str(bin_name), "count": int(count)}
        for bin_name, count in counts.items()
    ]

    output_path = Path("../public/risk_score_bins.json")

    with open(output_path, "w") as f:
        json.dump(result, f, indent=2)

    print("risk_score_bins.json exported")


def run_pipeline():
    print("Running export pipeline...\n")

    export_priority_results()
    export_hotspot_summary()
    export_category_priority_matrix()
    export_risk_score_bins()

    print("\nAll exports completed successfully!")


if __name__ == "__main__":
    run_pipeline()