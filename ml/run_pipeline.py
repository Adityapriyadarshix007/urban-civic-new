import subprocess


def run_step(script):
    print(f"\nRunning {script}...\n")
    result = subprocess.run(["python", script])

    if result.returncode != 0:
        print(f"Error in {script}")
        exit()


def main():
    print("🚀 Starting FULL ML Pipeline...\n")

    run_step("scripts/generate_data.py")
    run_step("scripts/feature_engineering.py")
    run_step("scripts/train_model.py")
    run_step("scripts/hotspot_clustering.py")
    run_step("export_pipeline.py")

    print("\n✅ FULL PIPELINE COMPLETED SUCCESSFULLY!")


if __name__ == "__main__":
    main()